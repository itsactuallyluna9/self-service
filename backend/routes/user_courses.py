from flask import Blueprint, jsonify, request

from backend.db import get_db
from backend.waitlist import get_waitlist_position, get_waitlist


bp = Blueprint('user_courses', __name__)

@bp.get('/registered_courses/<string:username>')
def get_registered_courses(username):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT
                co.id,
                co.academicyear,
                co.totalseats,
                co.openseats,
                cd.coursecode,
                co.session AS blocknum,
                cd.title,
                co.professor,
                cd.credits,
                cd.department,
                cd.fee
            FROM REGISTERED_COURSES rc
            JOIN COURSE_OFFER co ON rc.keycode = co.id
            JOIN COURSE_DATA cd ON co.courseid = cd.id
            WHERE rc.username = ?
            ORDER BY co.academicyear DESC, co.session ASC, cd.department ASC, cd.coursecode ASC;
        """, (username,))
        result = cursor.fetchall()
        for course in result:
            waitlist_position = get_waitlist_position(username, course["id"])
            if waitlist_position:
                course["waitlist_position"] = waitlist_position

        return jsonify({"courses": result, "success": True})

@bp.delete('/registered_courses/<string:username>/<int:course_id>')
def drop_registered_course(username, course_id):
    conn = get_db()
    with conn.cursor(dictionary=True) as cursor:
        cursor.execute(
            'DELETE FROM REGISTERED_COURSES WHERE username = ? AND keycode = ?;',
            (username, course_id),
        )
        deleted = cursor.rowcount

        if deleted:
            # TODO: ACTUALLY CHECK THIS. we're not handling waitlist here!!!
            cursor.execute(
                'UPDATE COURSE_OFFER SET openseats = openseats + 1 WHERE id = ?;',
                (course_id,),
            )
            if username in get_waitlist(course_id):
                cursor.execute(
                    'UPDATE COURSE_OFFER SET waitcount = waitcount - 1 WHERE id = ?;',
                    (course_id,),
                )

        conn.commit()
        return jsonify({'success': deleted > 0})
    
#This function checks if given courses offered at the same block 
#return True if there is a conflict
def check_session_conflicts(conn, courses_to_register, username):
    # return None if courses is an empty list
    if courses_to_register == []: 
        return False # well. can't have conflicts if nothing is being registered.

    #execute the query and fetch the results to rows 
    with conn.cursor() as cursor:
        # Query the selected offerings by their ids with proper placeholders
        _placeholders = ", ".join(["?"] * len(courses_to_register))
        course_selection_query = f"SELECT id, academicyear, session FROM COURSE_OFFER WHERE id IN ({_placeholders})"
        cursor.execute(course_selection_query, courses_to_register)
        new_course_data = cursor.fetchall()

        existing_course_query = f"SELECT co.id, co.academicyear, co.session FROM COURSE_OFFER co JOIN REGISTERED_COURSES rc ON co.id = rc.keycode WHERE rc.userName = ?"
        cursor.execute(existing_course_query, (username,))
        existing_course_data = cursor.fetchall()

    # combine both new and existing course data
    combined = new_course_data + existing_course_data

    block_map = {}
    adjunct_seen = set()
    for id, academicyear, session in combined:
        key = (academicyear, session)
    
        if "Adjunct" in session or "Experiential" in session:
            # Allow multiple adjunct/experiential offerings, but block exact duplicates
            if id in adjunct_seen:
                return True
            adjunct_seen.add(id)
            continue

        #create a new list of key if not exist in block_map
        if key not in block_map:
            block_map[key] = []
        
        # append offering id to the list for this block/year
        block_map[key].append(id)

    print(block_map)
    for key, couse_list in block_map.items():
        print(key, len(couse_list))
        if len(couse_list) > 1:
            return True
    return False


@bp.post('/courses/create')
def create_course():
    data = request.json
    coursecode = data['coursecode']
    title = data['title']
    credits = data['credits']
    department = data['department']
    fee = data['fee']
    description = data['description']
    prereqs = data.get('prereqs')
    coursetypes = data.get('coursetypes')

    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute(
            'INSERT INTO COURSE_DATA(coursecode, title, credits, department, fee, description, prereqs, coursetypes)'
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',(coursecode, title, credits, department, fee, description, prereqs, coursetypes))
        course_id = cursor.lastrowid

    return jsonify({"success": True, "id": course_id})


@bp.post('/courses/list_course')
def list_course():
    data = request.json
    academicyear = data['academicyear']
    openseats = data['openseats']
    totalseats = data['totalseats']
    waitcount = data['waitcount']
    session = data['session']
    professor = data['professor']
    course_id = data['course_id']
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute('INSERT INTO COURSE_OFFER(academicyear, openseats, totalseats, waitcount, session, professor, courseid) '
                       'SELECT ?, ?, ?, ?, ?, ?, id FROM COURSE_DATA WHERE id = ?',(academicyear,openseats,totalseats,waitcount,session,professor,course_id))

    return jsonify({"success": True, "listed_course": course_id})


@bp.post('/register_courses')
def registering_courses():
    # get data from frontend in JSON
    data = request.get_json()
    username = data.get("username")
    courses = data.get("courseIDs", [])  # get courses in a list

    if courses == []:
        return jsonify({"error": "No courses to register", "success": False}), 400

    #prints the data from frontend
    print(f"From frontend Username:{username}, Courses:{courses}")

    # connection to the database
    conn = get_db()

    if check_session_conflicts(conn, courses, username):
        return jsonify({"error": "Session conflict detected", "success": False}), 400

    try:
        with conn.cursor() as cursor:
            # register one course at a time
            for course in courses:
                #check if class has available seats
                cursor.execute('SELECT openseats FROM COURSE_OFFER WHERE id = ?', (course,))
                seats = cursor.fetchone()

                cursor.execute('INSERT INTO REGISTERED_COURSES (userName, keycode)' \
                               'VALUES (?, ?)', (username, course))

                conn.commit() # commit the change

                if seats[0] > 0:
                    print(f"{username} is registered to {course}")
                    cursor.execute(
                        'UPDATE COURSE_OFFER SET openseats = openseats - 1 WHERE id = ?;',
                        (course,),
                    )
                    conn.commit()
                    waitlist_position = None
                else:
                    print(f"{username} is added to waitlist for {course}")
                    cursor.execute(
                        'UPDATE COURSE_OFFER SET waitcount = waitcount + 1 WHERE id = ?;',
                        (course,),
                    )
                    conn.commit()
                    #call function for calculating spot on waitlist
                    waitlist_position = get_waitlist_position(username, course)

            return jsonify({"success": True })

    except Exception as e:
        conn.rollback() #rollback if there is any problem
        return jsonify({"error": str(e), "success": False}), 400


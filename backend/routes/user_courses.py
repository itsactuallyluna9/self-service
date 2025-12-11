from flask import Blueprint, jsonify, request

from backend.db import get_db
from backend.waitlist import get_waitlist_position

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
            WHERE rc.username = ?;
        """, (username,))
        result = cursor.fetchall()
        for course in course:
            waitlist_position = get_waitlist_position(username, course["id"])
            if waitlist_position:
                course["waitlist_position"] = waitlist_position

        return jsonify({"courses": result, "success": True})

@bp.delete('/registered_courses/<string:username>/<int:course_id>')
def drop_registered_course(username, course_id):
    with get_db().cursor(dictionary=True) as cursor:
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

        get_db().commit()
        return jsonify({'success': deleted > 0})
    
#This function checks if given courses offered at the same block 
#return True if there is a conflict
def check_session_conflicts(conn, courses):
   # return None if courses is an empty list
   if courses == []: 
      return None
   
   #This quesr selects courseid, academicyear and session from all courses of the argument
   query = f"SELECT courseid, academicyear, session FROM COURSE_OFFER WHERE courseid IN ({", ".join(["?"] * len(courses))})" # create placeholders as many as courses
   print(query)

   #execute the query and fetch the results to rows 
   with conn.cursor() as cursor:
     cursor.execute(query, courses)
     rows = cursor.fetchall()
    
   block_map = {}
   for courseid, academicyear, sessions in rows:
        key = (academicyear, sessions)

        #create a new list of key if not exist in block_map
        if key not in block_map:
            block_map[key] = []    
        
        #append courseid to the list of key
        block_map[key].append(courseid)
    
   print(block_map)
   for key, couse_list in block_map.items():
      print(key, len(couse_list))
      if len(couse_list) > 1:
         return True
    
   return False

@bp.post('/register_courses')
def registering_courses():
  # get data from frontend in JSON
  data = request.get_json()  
  username = data.get("username") 
  courses = data.get("courseIDs", []) # get courses in a list

  #prints the data from frontend
  print(f"From frontend Username:{username}, Courses:{courses}")

  # connection to the database
  conn = get_db() 

  if check_session_conflicts(conn, courses):
     return jsonify({"error", "Session conflict detected"}, 400)

  try:
    with conn.cursor() as cursor:
      # register one course at a time
      for course in courses:
        #check if class has available seats
        seats = cursor.execute('SELECT openseats FROM COURSE_OFFER WHERE id = ?',(course))

        cursor.execute('INSERT INTO REGISTERED_COURSES (userName, keycode)' \
                       'VALUES (?, ?)', (username, course))
        
        conn.commit() # commit the change
        
        if seats > 0:
            print(f"{username} is registered to {course}")
            cursor.execute(
                'UPDATE COURSE_OFFER SET openseats = openseats - 1 WHERE id = ?;',
                (course,),
            )
            waitlist_position = None
        else:
           print(f"{username} is added to waitlist for {course}")
           #call function for calculating spot on waitlist
           waitlist_position = get_waitlist_position(username, course)
        
        return jsonify({"success": True, "waitlist_position": waitlist_position})

  except Exception as e:
     conn.rollback() #rollback if there is any problem
     return jsonify({"error", e}, 400)






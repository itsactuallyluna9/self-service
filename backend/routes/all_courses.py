from flask import Blueprint, jsonify, request

from backend.db import get_db

bp = Blueprint('all_courses', __name__)

@bp.get('/courses')
def get_all_courses():
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT
                    co.id,
                    cd.coursecode,
                    cd.title,
                    cd.credits,
                    cd.department,
                    cd.fee,
                cd.prereqs,
                cd.coursetypes,
                    co.academicyear,
                    co.session AS blocknum,
                    co.professor,
                    co.openseats,
                    co.totalseats,
                    co.waitcount
                FROM COURSE_DATA cd
                LEFT JOIN COURSE_OFFER co ON cd.id = co.courseid;
        """)
        courses = cursor.fetchall()
        return jsonify({"courses": courses, "success": True})

@bp.post('/courses')
def get_filtered_courses():
    data = request.get_json(force=True, silent=True) or {}

    # Normalized incoming filters
    sf = {
        "semester": data.get("semester"),
        "department": data.get("department"),
        "professor": data.get("professor"),
        "seats": data.get("available"),
        "fees": data.get("fees"),
        "coursetypes": data.get("attributes"),
        "session": data.get("block"),
    }

    conditions = []
    params = []

    semester = sf.get("semester")
    if semester:
        if semester.lower() == "fall":
            sessions = ["Block 1", "Block 2", "Block 3", "Block 4", "Adjunct Fall"]
        elif semester.lower() == "spring":
            sessions = ["Block 5", "Block 6", "Block 7", "Block 8", "Adjunct Spring"]
        else:
            sessions = []
        if sessions:
            placeholders = ", ".join(["%s"] * len(sessions))
            conditions.append(f"co.session IN ({placeholders})")
            params.extend(sessions)

    department = sf.get("department")
    if department:
        conditions.append("cd.department = %s")
        params.append(department)

    professor = sf.get("professor")
    if professor:
        # match substring to allow partial names
        conditions.append("co.professor LIKE %s")
        params.append(f"%{professor}%")

    seats = sf.get("seats")
    if seats == "true":
        conditions.append("co.openseats > 0")

    fees = sf.get("fees")
    if fees == "true":
        conditions.append("cd.fee IS NOT NULL")

    course_types = sf.get("coursetypes")
    if course_types:
        # allow matching a single attribute substring
        conditions.append("cd.coursetypes LIKE %s")
        params.append(f"%{course_types}%")

    session = sf.get("session")
    if session:
        conditions.append("co.session = %s")
        params.append(session)

    where_clause = f"WHERE {' AND '.join(conditions)}" if conditions else ""

    query = f"""
        SELECT
            co.id,
            cd.coursecode,
            cd.title,
            cd.credits,
            cd.department,
            cd.fee,
            cd.prereqs,
            cd.coursetypes,
            co.academicyear,
            co.session AS blocknum,
            co.professor,
            co.openseats,
            co.totalseats,
            co.waitcount
        FROM COURSE_DATA cd
        LEFT JOIN COURSE_OFFER co ON cd.id = co.courseid
        {where_clause}
        ORDER BY cd.coursecode, co.session;
    """

    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute(query, params)
        courses = cursor.fetchall()
        return jsonify({"courses": courses, "success": True})


@bp.get('/courses/<int:course_id>')
def get_course_details(course_id):
    with get_db().cursor(dictionary=True) as cursor:
            cursor.execute("""
                SELECT
                    co.id,
                    cd.coursecode,
                    cd.title,
                    cd.credits,
                    cd.department,
                    cd.fee,
                    cd.prereqs,
                    cd.coursetypes,
                    co.academicyear,
                    co.session AS blocknum,
                    co.professor,
                    co.openseats,
                    co.totalseats,
                    co.waitcount,
                    cd.description
                FROM COURSE_DATA cd
                LEFT JOIN COURSE_OFFER co ON cd.id = co.courseid
                WHERE co.id = ?
                LIMIT 1;
                """,
                (course_id,),
            )
            course = cursor.fetchone()
            if course is None:
                return jsonify({"error": "Course not found", "success": False}), 404

            course['success'] = True
            return jsonify(course)

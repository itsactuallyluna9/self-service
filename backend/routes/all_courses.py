from flask import Blueprint, jsonify, request
from db import get_db

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
                    co.seats
                FROM COURSE_DATA cd
                LEFT JOIN COURSE_OFFER co ON cd.id = co.courseid;
        """)
        courses = cursor.fetchall()
        return jsonify({"courses": courses, "success": True})

@bp.post('/courses')
def get_filtered_courses():
    data = request.get_json()
    #search_filter
    sf = {"semester": data.get('SEMESTER'), "department": data.get('DEPARTMENT'), "professor": data.get('PROFESSOR'), "seats": data.get('AVAILABLE'), "fees": data.get('FEES'), "coursetypes": data.get('ATTRIBUTES'), "session": data.get('BLOCKNUM')}
    
    #check how many filters have been applied
    amount_filters = 0
    for key in sf:
        if key:
            amount_filters += 1

    #filter processing. Output should look something like filters = "session IN ("1", "2", "3", "4", "Adjunct Fall") AND department = "CSC" AND ..."
    filters = ""
    for key in sf:
        if sf[key]:
            if key == "semester":
                if sf[key] == 'Fall':
                    filters += 'session IN ("1", "2", "3", "4", "Adjunct Fall")'
                else:
                    filters += 'session IN ("5", "6", "7", "8", "Adjunct Sprint")'
            elif key == "fees":
                filters +=" fees IS NOT NULL"
            elif key == "seats":
                #ignore for now
                filterlist = ''
            else:
                filters += f"{key} = {sf[key]}"
            if amount_filters > 1:
                filters += " AND "
            amount_filters -= 1

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
                cd.coursetyps,
                    co.academicyear,
                    co.session as blocknum
                    co.professor,
                    co.seats
                FROM COURSE_DATA cd
                LEFT JOIN COURSE_OFFER co ON cd.id = co.courseid;
                WHERE ?;
                """,
                (filters,),
            )
            courses = cursor.fetchall()
            if courses is None:
                return jsonify({"error": "Courses not found"})
            return jsonify(courses)


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
                    co.seats
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

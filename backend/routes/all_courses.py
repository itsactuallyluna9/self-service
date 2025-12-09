from flask import Blueprint, jsonify

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
    # not implemented yet
    raise NotImplementedError("Filtering courses is not implemented yet.")

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
                    co.waitcount
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

from flask import Blueprint, jsonify

from backend.db import get_db

bp = Blueprint('all_courses', __name__)

@bp.get('/courses')
def get_all_courses():
    try:
        with get_db().cursor(dictionary=True) as cursor:
            cursor.execute("SELECT KEYCODE, ACADEMICYEAR, SEATS, COURSECODE, BLOCKNUM, TITLE, PROFESSOR, CREDITS, DEPARTMENT, FEE FROM COURSE_DATA;")
            courses = cursor.fetchall()
            return jsonify({"courses": courses, "success": True})
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500

@bp.post('/courses')
def get_filtered_courses():
    # not implemented yet
    raise NotImplementedError("Filtering courses is not implemented yet.")

@bp.get('/details/<int:course_id>')
def get_course_details(course_id):
    try:
        with get_db().cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM COURSE_DATA WHERE KEYCODE = ?;", (course_id,))
            if cursor.rowcount == 0:
                return jsonify({"error": "Course not found", "success": False}), 404
            course = cursor.fetchone()
            course['success'] = True
            return jsonify(course)
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500

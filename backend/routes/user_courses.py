from flask import Blueprint, jsonify

from backend.db import get_db

bp = Blueprint('user_courses', __name__)

@bp.get('/registered_courses/<string:username>')
def get_registered_courses(username):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute('SELECT COURSE_DATA.* FROM REGISTERED_COURSES '
                       'INNER JOIN COURSE_DATA ON REGISTERED_COURSES.KEYCODE = COURSE_DATA.KEYCODE WHERE USERNAME = ?;', (username,))
        result = cursor.fetchall()
        return jsonify(result)

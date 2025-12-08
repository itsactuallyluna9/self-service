from flask import Blueprint, jsonify

from backend.db import get_db

bp = Blueprint('user_courses', __name__)

@bp.get('/registered_courses/<string:username>')
def get_registered_courses(username):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT COURSE_DATA.* FROM REGISTERED_COURSES '
                   'INNER JOIN COURSE_DATA ON REGISTERED_COURSES.KEYCODE = COURSE_DATA.KEYCODE WHERE USERNAME = %s;', (username,))
    result = cursor.fetchall()
    cursor.close()

    return jsonify(result)

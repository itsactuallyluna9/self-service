from flask import Blueprint, jsonify

from backend.db import get_db

bp = Blueprint('user_courses', __name__)

@bp.get('/registered_courses/<string:username>')
def get_registered_courses(username):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT
                cd.keycode,
                co.academicyear,
                co.seats,
                cd.coursecode,
                co.session AS blocknum,
                cd.title,
                co.professor,
                cd.credits,
                cd.department,
                cd.fee
            FROM REGISTERED_COURSES rc
            JOIN COURSE_DATA cd ON rc.keycode = cd.keycode
            JOIN COURSE_OFFER co ON rc.keycode = co.courseid
            WHERE rc.username = ?;
        """, (username,))
        result = cursor.fetchall()
        return jsonify(result)

@bp.delete('/registered_courses/<string:username>/<string:keycode>')
def drop_registered_course(username, keycode):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute('DELETE FROM REGISTERED_COURSES WHERE username = ? AND keycode = ?;', (username, keycode))
        cursor.execute('UPDATE COURSE_OFFER SET openseats = openseats + 1 WHERE keycode = ?;',(keycode,))
        result = cursor.rowcount

        get_db().commit()
        return jsonify({'success': result > 0})

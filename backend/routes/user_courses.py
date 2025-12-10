from flask import Blueprint, jsonify

from backend.db import get_db

bp = Blueprint('user_courses', __name__)

@bp.get('/registered_courses/<string:username>')
def get_registered_courses(username):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT
                co.id AS offer_id,
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
        return jsonify({"registered_courses": result, "success": True})

@bp.delete('/registered_courses/<string:username>/<int:offer_id>')
def drop_registered_course(username, offer_id):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute(
            'DELETE FROM REGISTERED_COURSES WHERE username = ? AND keycode = ?;',
            (username, offer_id),
        )
        deleted = cursor.rowcount

        if deleted:
            # TODO: ACTUALLY CHECK THIS. we're not handling waitlist here!!!
            cursor.execute(
                'UPDATE COURSE_OFFER SET openseats = openseats + 1 WHERE id = ?;',
                (offer_id,),
            )

        get_db().commit()
        return jsonify({'success': deleted > 0})

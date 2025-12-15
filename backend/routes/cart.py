from flask import Blueprint, jsonify

from backend.db import get_db

bp = Blueprint('cart', __name__)

# saves a class to the cart


@bp.get('cart/cart_save/<string:username>')
def cart_save(user_id, course_id):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute(
            'INSERT INTO CART_SAVE (userid, course) VALUES (?, ?)', (user_id, course_id))

    return jsonify({"success": True, "cart": "saved"})


# loads courses that were saved onto a users cart


@bp.get('cart/cart_load/<string:username')
def cart_load(user_id):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute(
            "SELECT course FROM CART_SAVE WHERE userid = ?",
            (user_id,)
        )
        rows = cursor.fetchall()

    return jsonify({"success": True, "cart": rows})


# removes a course from a users cart


@bp.get('cart/remove/<string:username')
def remove_class(user_id, course_id):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute("DELETE FROM CART_SAVE WHERE userid = ? AND course = ?",
                        (user_id, course_id))

        deleted_rows = cursor.rowcount
        return jsonify({"success": True, "removed": deleted_rows})


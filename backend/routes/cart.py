from flask import Blueprint, jsonify, request

from backend.db import get_db

bp = Blueprint('cart', __name__)

@bp.get('cart/cart_save/<string:username>')
def cart_save(user_id, course_id):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute(
            'INSERT INTO CART_SAVE (userid, course) VALUES (?, ?)', (user_id, course_id))

    return jsonify({"success": True, "cart": "saved"})

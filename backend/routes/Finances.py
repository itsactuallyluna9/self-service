from flask import Blueprint, jsonify
from backend.db import get_db

bp = Blueprint('Finances', __name__)



@bp.get('/finances/view/<string:username>')
def view_finances(username):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute('SELECT * FROM FINANCE_DATA WHERE username = ?',(username, ))

        finances = cursor.fetchall()
    return jsonify({"courses": finances, "success": True})

# returns entire table
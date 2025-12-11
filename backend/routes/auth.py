from flask import Blueprint, jsonify, request

from backend.db import get_db

bp = Blueprint('login', __name__)

def check_user_credentials(username, password):
    with get_db().cursor() as cur:
        query = "SELECT usertype FROM USERS WHERE username = ? AND password = ?"
        cur.execute(query, (username, password))
        result = cur.fetchone() 
        if result:
            return True, result[0]
        return False, None

def get_user_type(username):
    with get_db().cursor() as cur:
        query = "SELECT usertype FROM USERS WHERE username = ?"
        cur.execute(query, (username,))
        result = cur.fetchone()
        if result:
            return result[0]
        return None

@bp.post('/login')
def login():
    data = request.get_json()
    
    username = data.get("username")
    password = data.get("password")
    
    success, usertype = check_user_credentials(username, password)

    if success:
        return jsonify({"success": True, "usertype": usertype})
    else:
        return jsonify({"success": False}), 401

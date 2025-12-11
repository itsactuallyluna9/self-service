from flask import Blueprint, jsonify, request

from backend.db import get_db

bp = Blueprint('login', __name__)

def check_user_credentials(username, password):
    with get_db().cursor() as cur:
        query = "SELECT * FROM USERS WHERE username = ? AND password = ?"
        cur.execute(query, (username, password))
        result = cur.fetchone() 
        return bool(result)

@bp.post('/login')
def login():
    data = request.get_json()
    
    username = data.get("username")
    password = data.get("password")
    
    result = check_user_credentials(username, password)

    return jsonify({"success": result})

@bp.post('/reset_password')
def reset_password():
    data = request.get_json()
    
    username = data.get("username")
    new_password = data.get("new_password")
    
    with get_db().cursor() as cur:
        query = "UPDATE USERS SET password = ? WHERE username = ?"
        cur.execute(query, (new_password, username))
        get_db().commit()
    
    return jsonify({"success": True})

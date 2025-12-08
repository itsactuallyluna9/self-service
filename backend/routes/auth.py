from flask import Blueprint, jsonify, request

from ..db import get_db

bp = Blueprint('login', __name__)

def check_user_credentials(username, password):
    with get_db().cursor() as cur:
        query = "SELECT * FROM USERS WHERE userName = ? AND pswd = ?"
        cur.execute(query, (username, password))
        result = cur.fetchone() 
        return bool(result)

@bp.post('/login')
def login():
    data = request.get_json()
    
    username = data.get("username")
    password = data.get("password")
    print(f"From frontend, Username: {username}, password: {password}")

    result = check_user_credentials(username, password)

    return jsonify({"success": result})

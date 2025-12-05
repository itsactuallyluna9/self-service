from flask import Blueprint, jsonify, request

from backend.db import get_db

bp = Blueprint('login', __name__)

def check_user_credentials(username, password):
    conn = get_db()
    cur = conn.cursor()
    query = "SELECT * FROM USERS WHERE userName = ? AND pswd = ?"
    cur.execute(query, (username, password))

    result = cur.fetchone() 
    cur.close()

    return bool(result)

@bp.post('/login')
def login():
    data = request.get_json()
    
    username = data.get("username")
    password = data.get("password")
    print(f"From frontend, Username: {username}, password: {password}")

    result = check_user_credentials(username, password)

    return jsonify({"success": result})

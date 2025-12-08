from flask import Flask, jsonify

@app.get('/api/registered_courses/<string:username>')
def get_registered(username, ):
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT COURSE_DATA.* FROM REGISTERED_COURSES '
                   'INNER JOIN COURSE_DATA ON REGISTERED_COURSES.KEYCODE = COURSE_DATA.KEYCODE WHERE USERNAME = %s;', (username,))
    result = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(result)

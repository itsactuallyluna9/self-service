from flask import Flask, jsonify


@app.delete('/api/course_drop/<string:username>')
def drop_course(keycode, username):
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)
    cursor.execute('DELETE FROM REGISTERED_COURSES WHERE keycode = ? AND username = ?', (keycode, username))
    result = cursor.rowcount
    conn.commit()

    return jsonify({'unregistered': result})



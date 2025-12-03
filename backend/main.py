import os
import mariadb
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
#enable CORS in Flask
CORS(app) 

# database configuration - these can be loaded from environment variables!
# by default, we'll use localhost and the sandbox database with the selfservice user.
# see sql/create_sandbox_user.sql to create this user and database.
DB_HOST = os.environ.get('DB_HOST', '127.0.0.1')
DB_PORT = int(os.environ.get('DB_PORT', 3306))
DB_USER = os.environ.get('DB_USER', 'selfservice')
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'password')
DB_NAME = os.environ.get('DB_NAME', 'sandbox')

# other config
FLASK_PORT = int(os.environ.get('PORT', 5000))


def get_db_connection():
    """Establishes a connection to the database."""
    try:
        conn = mariadb.connect(
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME
        )
        return conn
    except mariadb.Error as e:
        print(f"Error connecting to the database: {e}")
        # we should probably handle this more gracefully...
        # oh well, it works, doesn't it?
        return None

def check_user_credentials(username, password):
    conn = get_db_connection()
    cur = conn.cursor()
    query = "SELECT * FROM USERS WHERE userName = ? AND pswd = ?"
    cur.execute(query, (username, password))

    result = cur.fetchone() 
    cur.close()
    conn.close()

    return bool(result)

@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")
    print(f"From frontend, Username: {username}, password: {password}")

    result = check_user_credentials(username, password)

    return jsonify({"success": result})

@app.get('/api/details/<int:course_id>')
def get_course_details(course_id):
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)
    
    # check if the course actually exists
    try:
        cursor.execute("SELECT * FROM COURSE_DATA WHERE KEYCODE = ?;", (course_id,))
        if cursor.rowcount == 0:
            return jsonify({"error": "Course not found", "success": False}), 404
        course = cursor.fetchone()
        course['success'] = True
        return jsonify(course)
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500
    finally:
        conn.close()
        cursor.close()


def get_courses():
    #filterlist = [year,department,semester,professor,seats,fees,credits,coursetypes]
    '''
    year = filterlist[0]
    filters = ''

    department = filterlist[1]
    if department:
        filters += f' AND department = {department}'

    semester = filterlist[2]
    if semester:
        if semester == "Fall":
            filters += ' AND BLOCKNUM IN ("1", "2", "3", "4", "Adjunct Fall")'
        elif semester == "Spring":
            filters += ' AND BLOCKNUM IN ("5", "6", "7", "8", "Adjunct Spring")'

    professor = filterlist[3]
    if professor:
        filters += f'AND PROFESSOR = {professor}'
    
    seats = filterlist[4]
    if seats:
        filters += ' AND SEATS > 0'

    fees = filterlist[5]
    if fees:
        filters += ' AND FEES > 0'

    credits = filterlist[6]
    if credits:
        filters += f' AND CREDITS = {credits}'

    coursetypes = filterlist[7]
    if coursetypes:
        filters += f' AND COURSETYPES = {coursetypes}'
    '''
    try:
        conn = mariadb.connect(
            user = DB_USER,
            password = DB_PASSWORD,
            host = DB_HOST,
            port = DB_PORT,
            database = DB_NAME
        )

        cursor = conn.cursor
        query = 'SELECT KEYCODE, ACADEMICYEAR, SEATS, COURSECODE, BLOCKNUM, TITLE, PROFESSOR, CREDITS, DEPARTMENT, FEE FROM COURSE_DATA'
        cursor.execute(query)
        rows = cursor.fetchall()
        
        cursor.close()
        conn.close()

        return(rows)

    except mariadb.error as e:
        print(f'Error connecting to the database: {e}')
        return None

@app.route('/', methods = ['GET','POST'])
def courses():
    data = request.get_json()
    #searchfilter = [data.get("academic_year"), data.get("department"), data.get("semester"), data.get("professor"), 
                    #data.get("seats"), data.get("fees"), data.get("credits"), data.get("attributes")]
    
    rows = get_courses()
    courses = [dict(row) for row in rows]
    return jsonify({"courses": courses})

@app.route('/internal/mariadb-sample')
def mariadb_sample():
    # this is a simple endpoint to test connectivity to the MariaDB database
    # this should NEVER be called. i plan to remove this later once there's actual functions.
    # ~luna

    conn = get_db_connection()
    if conn is None:
        # if we can't connect to the database, return an error
        # in the style of <response>, <status code>
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT 'Hello from MariaDB!' AS message;")
        result = cursor.fetchone()
        return jsonify({"message": result[0]})
    except mariadb.Error as e:
        # if the query fails, return an error
        print(f"Error: {e}")
        return jsonify({"error": "Query failed"}), 500
    finally:
        # clean up database resources...
        cursor.close()
        conn.close()


if __name__ == '__main__':
    # TODO: we could add some things here to automatically run migrations, etc.
    # later problems... y'know once we *have* a database schema.
    # my favorite <3
    app.run(debug=True, host='0.0.0.0', port=FLASK_PORT)

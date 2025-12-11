from flask import Blueprint, jsonify, request

from backend.db import get_db

bp = Blueprint('user_courses', __name__)

@bp.get('/registered_courses/<string:username>')
def get_registered_courses(username):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT
                co.id,
                co.academicyear,
                co.totalseats,
                co.openseats,
                cd.coursecode,
                co.session AS blocknum,
                cd.title,
                co.professor,
                cd.credits,
                cd.department,
                cd.fee
            FROM REGISTERED_COURSES rc
            JOIN COURSE_OFFER co ON rc.keycode = co.id
            JOIN COURSE_DATA cd ON co.courseid = cd.id
            WHERE rc.username = ?;
        """, (username,))
        result = cursor.fetchall()
        return jsonify({"courses": result, "success": True})

@bp.delete('/registered_courses/<string:username>/<int:course_id>')
def drop_registered_course(username, course_id):
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute(
            'DELETE FROM REGISTERED_COURSES WHERE username = ? AND keycode = ?;',
            (username, course_id),
        )
        deleted = cursor.rowcount

        if deleted:
            # TODO: ACTUALLY CHECK THIS. we're not handling waitlist here!!!
            cursor.execute(
                'UPDATE COURSE_OFFER SET openseats = openseats + 1 WHERE id = ?;',
                (course_id,),
            )

        get_db().commit()
        return jsonify({'success': deleted > 0})
    
#This function checks if given courses offered at the same block 
#return True if there is a conflict
def check_session_conflicts(conn, courses):
   # return None if courses is an empty list
   if courses == []: 
      return None
   
   #This quesr selects courseid, academicyear and session from all courses of the argument
   query = f"SELECT courseid, academicyear, session FROM COURSE_OFFER WHERE courseid IN ({", ".join(["?"] * len(courses))})" # create placeholders as many as courses

   #execute the query and fetch the results to rows 
   with conn.cursor() as cursor:
     cursor.execute(query, courses)
     rows = cursor.fetchall()
    
   block_map = {}
   for courseid, academicyear, sessions in rows:
        key = (academicyear, sessions)

        #create a new list of key if not exist in block_map
        if key not in block_map:
            block_map[key] = []    
        
        #append courseid to the list of key
        block_map[key].append(courseid)
    
   print(block_map)
   for key, couse_list in block_map.items():
      print(key, len(couse_list))
      if len(couse_list) > 1:
         return True
    
   return False

#This function retrives the overall GPA of a user in the specific year
def calculate_overall_gpa_academicyear(conn, username, academicyear):
   
   #SQL query
   query = "SELECT AVG(coursegrade) FROM REGISTERED_COURSES JOIN COURSE_OFFER ON COURSE_OFFER.id = REGISTERED_COURSES.keycode WHERE userName = ? and COURSE_OFFER.academicyear = ?;"

   #execute the query and fetch the results 
   with conn.cursor() as cursor:
     cursor.execute(query, (username, academicyear))
     academicyear_gpa = cursor.fetchone()[0]
    
    # return None if user does not have GPA otherwise return the GPA
   if academicyear_gpa == None:
      return None
   else:
      return academicyear_gpa
   
#This function retrives the overall GPA of a user in the specific semester 
def calculate_overall_gpa_semester(conn, username, academicyear, semester):
    #sessions define the blocks of a semester, if semester is inappropriate return None
    if semester == "fall":
        sessions = ["Block 1", "Block 2", "Block 3", "Block 4", "Adjunct Fall"]
    elif semester =="spring":
        sessions = ["Block 5", "Block 6", "Block 7", "Block 8", "Adjunct Spring"]
    else:
       return None
    
    #SQL query
    query = f"SELECT AVG(coursegrade) FROM COURSE_OFFER JOIN REGISTERED_COURSES ON COURSE_OFFER.id = REGISTERED_COURSES.keycode WHERE REGISTERED_COURSES.userName = ? and COURSE_OFFER academicyear = ? and COURSE_OFFER.session IN (?);"

    #fetch GPA store to a variable
    with conn.cursor() as cursor:
        cursor.execute(query, (username, academicyear, sessions))
        semester_gpa = cursor.fetchone()[0]
    
    if semester_gpa == None:
       return None
    else:
       return semester_gpa

@bp.post('/register_courses')
def registering_courses():
  # get data from frontend in JSON
  data = request.get_json()  
  username = data.get("username") 
  courses = data.get("courseIDs", []) # get courses in a list

  #prints the data from frontend
  print(f"From frontend Username:{username}, Courses:{courses}")

  # connection to the database
  conn = get_db() 

  if check_session_conflicts(conn, courses):
     return jsonify({"error", "Session conflict detected"}, 400)

  try:
    with conn.cursor() as cursor:
      # register one course at a time
      for course in courses:
        cursor.execute('INSERT INTO REGISTERED_COURSES (userName, keycode)' \
                       'VALUES (?, ?)', (username, course))
        print(f"{username} is registered to {course}")

      conn.commit() # commit the change
      return jsonify({"success": True})
  except Exception as e:
     conn.rollback() #rollback if there is any problem
     return jsonify({"error", e}, 400)






from flask import Blueprint, jsonify, request
from backend.db import get_db
from datetime import date


bp = Blueprint('unofficial_transcript', __name__)

def get_student_fullname(conn, username):
  query = f"SELECT fullname FROM STUDENTS JOIN USERS ON STUDENTS.studentid = USERS.userid WHERE username=?;"

  with conn.cursor(dictionary=True) as cursor:
    cursor.execute(query, (username,))
    row = cursor.fetchone()
  
  #if row is None then student data is not added to the table
  if row == None:
    return None

  return row["fullname"]

def get_programs(conn, username):
  query = f"SELECT ACADEMIC_PROGRAMS.degree, ACADEMIC_PROGRAMS.curriculum, STUDENT_STUDY_FIELD.degreeaward, STUDENTS.dategranted FROM USERS JOIN STUDENTS ON USERS.userid = STUDENTS.studentid JOIN STUDENT_STUDY_FIELD ON STUDENTS.studentid = STUDENT_STUDY_FIELD.studentid JOIN ACADEMIC_PROGRAMS ON STUDENT_STUDY_FIELD.programid = ACADEMIC_PROGRAMS.programid WHERE username = ?;"

  with conn.cursor(dictionary=True) as cursor:
     cursor.execute(query, (username,))
     rows = cursor.fetchall()

  if not rows:
     return None

  # add program to all dictionaries in rows
  for row in rows:
     row["program"] = "Undergraduate"
     # if dategranted is defined, change the format for JSON
     if isinstance(row['dategranted'], date):
        row['dategranted'] = row['dategranted'].isoformat()
  
  return rows

def calc_total_credit(conn, username):
  query = f"SELECT SUM(credits) FROM REGISTERED_COURSES JOIN COURSE_OFFER ON REGISTERED_COURSES.keycode = COURSE_OFFER.id JOIN COURSE_DATA ON COURSE_OFFER.courseid = COURSE_DATA.id WHERE REGISTERED_COURSES.coursegrade IS NOT NULL AND REGISTERED_COURSES.username = ?;"

  with conn.cursor() as cursor:
    cursor.execute(query, (username,))
    row = cursor.fetchone()

  if row is None or row[0] is None: #return None if row is None
    return None

  return row[0]

#This function retrives the overall GPA of a user
def calculate_overall_gpa(conn, username):
   
   #SQL query
   query = "SELECT AVG(coursegrade) FROM REGISTERED_COURSES JOIN COURSE_OFFER ON COURSE_OFFER.id = REGISTERED_COURSES.keycode WHERE userName = ?;"

   #execute the query and fetch the results 
   with conn.cursor() as cursor:
     cursor.execute(query, (username,))
     overall_gpa = cursor.fetchone()[0]
    
    # return None if user does not have GPA otherwise return the GPA
   if overall_gpa == None:
      return None
   else:
      return float(overall_gpa)
   
#This function retrives the gpa of a user in the specific semester 
def calculate_gpa_per_semester(conn, username, academicyear, semester):
    #sessions define the blocks of a semester, if semester is inappropriate return None
    if semester == "fall":
        sessions = ["Block 1", "Block 2", "Block 3", "Block 4", "Adjunct Fall"]
    elif semester =="spring":
        sessions = ["Block 5", "Block 6", "Block 7", "Block 8", "Adjunct Spring"]
    else:
       return None
    
    #SQL query
    query = f"SELECT AVG(coursegrade) FROM COURSE_OFFER JOIN REGISTERED_COURSES ON COURSE_OFFER.id = REGISTERED_COURSES.keycode WHERE REGISTERED_COURSES.userName = ? and COURSE_OFFER.academicyear = ? and COURSE_OFFER.session IN (?);"

    #fetch GPA store to a variable
    with conn.cursor() as cursor:
        cursor.execute(query, (username, academicyear, sessions))
        semester_gpa = cursor.fetchone()[0]
    
    if semester_gpa == None:
       return None
    else:
       return semester_gpa
    
# This function will be used in get_ranscript to convert grade from float to a letter
def grade_to_letter(grade):
    if grade is None:
        return " "

    if grade >= 4.0:
        return "A"
    elif grade >= 3.7:
        return "A-"
    elif grade >= 3.3:
        return "B+"
    elif grade >= 3.0:
        return "B"
    elif grade >= 2.7:
        return "B-"
    elif grade >= 2.3:
        return "C+"
    elif grade >= 2.0:
        return "C"
    elif grade >= 1.7:
        return "C-"
    elif grade >= 1.0:
        return "D"
    else:
        return "F"

def get_transcript(conn, username):
  query = f"SELECT coursecode, title,credits, department,coursetypes, coursegrade, academicyear, COURSE_OFFER.session FROM REGISTERED_COURSES JOIN COURSE_OFFER ON REGISTERED_COURSES.keycode = COURSE_OFFER.id JOIN COURSE_DATA ON COURSE_OFFER.courseid = COURSE_DATA.id WHERE REGISTERED_COURSES.username = ?;"

  with conn.cursor(dictionary=True) as cursor:
    cursor.execute(query, (username,))
    rows = cursor.fetchall()
  #create transcript
  transcript = []

  #take row one at a time and append to transcript
  for row in rows:
    # make sure if the academic year is in transcript already
    year_dict = next((year for year in transcript if year["year"] == row["academicyear"]), None)

    if year_dict == None:
      year_dict = {
          "year": row["academicyear"],
          "terms": []
      }

      # make lists of courses depending to terms
      for term_name in ["Fall", "Spring"]:
          year_dict["terms"].append({
              "term": term_name,
              "courses": []
          })
      #append year_dict to transcript    
      transcript.append(year_dict)
    
    

    #creater dictionary of a course
    course_dict = {
        "coursecode" : row["department"] + str(row["coursecode"]),
        "title" : row["title"],
        "subtype" : "コース",
        "grade" : grade_to_letter(row["coursegrade"]) if row["coursegrade"] is not None else 0.0,  ##must be retured in a letter
        "credits" : row["credits"],
        "qualityPoints" : float(row["credits"]) * float(row["coursegrade"] if row["coursegrade"] is not None else 0.0)
    }

    print(f"course_dict: {course_dict}")

    if row["session"] in ["Block 1", "Block 2", "Block 3", "Block 4", "Adjunct Fall"]:
      semester_name = "Fall"
    else:
      semester_name = "Spring"
    # append course_dict to the certain term
    for term in transcript:
      if term["year"] == row["academicyear"]:
        for t in term["terms"]:
           if t["term"] == semester_name:
              t["courses"].append(course_dict)
              break
           
  return transcript

    
  

# check unofficial_transcript.JSON
@bp.post('/unofficial_transcript')
def unofficial_transcript():
  data = request.get_json()
  username = data.get("username")
  print(f"From frontend username: {username}")
  
  conn = get_db()

  #student data
  fullname = get_student_fullname(conn, username)

  if fullname == None:
    return jsonify({"error" : "Student Not Found", "success": False}), 400
  
  #program
  program = get_programs(conn, username)

  # overall gpa
  overall_gpa = calculate_overall_gpa(conn, username)
  print(f"overall GPA type: {type(overall_gpa)}")

  #total credit
  total_credit = calc_total_credit(conn, username)

  #transcript
  transcript = get_transcript(conn, username)
  # print(f"transctipt: {transcript}")
  #put all of them together
  transcript_data = {
    "username" : username,
    "fullname" : fullname,
    "programs" : program,
    "overallCredits" : total_credit,
    "overallGPA": overall_gpa,
    "transcript": transcript
  }

  

  return jsonify(transcript_data)

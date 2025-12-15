from flask import Blueprint, jsonify, request
from user_courses import calculate_overall_gpa, calculate_gpa_per_semester
from backend.db import get_db

bp = Blueprint('unofficial_transcript', __name__)

def get_student_data(conn, username):
  query = f"SELECT fullname, major, minor FROM STUDENTS JOIN USERS ON STUDENTS.id = USERS.userid WHERE username=?;"

  with conn.cursor(dictionary=True) as cursor:
    cursor.execute(query, (username,))
    row = cursor.fetchone()
  
  if row == None:
    return None
  
  studen_data = {
    "fullname" : row[0],
    "major" : row[1],
    "minor" : row[2]
  }

  return studen_data

def calc_total_credit(conn, username):
  query = f"SELECT SUM(credits) FROM REGISTERED_COURSES JOIN COURSE_OFFER ON REGISTERED_COURSES.keycode = COURSE_OFFER.id JOIN COURSE_DATA ON COURSE_OFFER.courseid = COURSE_DATA.id WHERE REGISTERED_COURSES.coursegrade IS NOT NULL AND REGISTERED_COURSES.username = ?;"

  with conn.cursor() as cursor:
    cursor.execute(query, (username,))
    row = cursor.fetchone()

  if row is None or row[0] is None: #return None if row is None
    return 0

  return row[0]

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
        "course" : row["department"] + row["coursecode"],
        "title" : row["title"],
        "subtype" : row["coursetypes"],
        "grade" : row["grade"],
        "credits" : row["credits"],
        "qualityPoints" : row["credits"] * row["grade"]
    }

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
@bp.post('/unofficial_transcript/')
def unofficial_transcript():
  data = request.get_json()
  username = data.get("username")

  conn = get_db()

  #student data
  student_data = get_student_data(conn, username)
  if student_data == None:
    return jsonify({"error" : "Student Not Found", "success": False}), 400
  
  # overall gpa
  overall_gpa = calculate_overall_gpa(conn, username)

  #total credit
  total_credit = calc_total_credit(conn, username)

  #transcript
  transcipt = get_transcript(conn, username)

  #put all of them together
  transcript_data = {
    "userID" : username,
    "fullname" : student_data["fullname"],
    "major": student_data["major"],
    "minor": student_data["minor"],
    "over_all_gpa" : overall_gpa,
    "total_credit": total_credit,
    "trannscript": transcipt
  }

  return jsonify(transcript_data)

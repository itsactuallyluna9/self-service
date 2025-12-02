import os
from pathlib import Path
import json
import mariadb
import sys

def add_course(conn, academic_year, seats, course_code, block_num, title, professor, credits, department, fee, descr, prereqs, course_types):
    """Inserts a course into the database."""
    try:
        cursor = conn.cursor()
        query = """
        INSERT INTO COURSE_DATA (
            ACADEMICYEAR, SEATS, COURSECODE, BLOCKNUM, TITLE, PROFESSOR, CREDITS,
            DEPARTMENT, FEE, DESCR, PREREQS, COURSETYPES
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            academic_year, seats, course_code, block_num, title, professor, credits,
            department, fee, descr, prereqs, course_types
        )
        cursor.execute(query, values)
        print(f"Successfully added course: {department} {course_code}")
    except mariadb.Error as e:
        print(f"Error adding course {department} {course_code}: {e}")


def process_class(conn, file: Path):
    with file.open() as f:
        data = json.load(f)
        course_data = data.get("data", {})
        if not course_data:
            print(f"No data found in {file.name}")
            return

        # Extract and parse data from JSON
        academic_year = int(course_data.get("academicYear", 0))
        seats = course_data.get("maximumSeats", 0)

        event_id = course_data.get("eventId", "")
        event_id_parts = event_id.split(" ", 1)
        department = None
        course_code = None
        if len(event_id_parts) == 2:
            department = event_id_parts[0]
            try:
                # remove any non-numeric characters from course code
                course_code_str = ''.join(filter(str.isdigit, event_id_parts[1]))
                if course_code_str:
                    course_code = int(course_code_str)
            except (ValueError, TypeError):
                course_code = None
        
        if not all([academic_year, seats, course_code, department]):
            print(f"Skipping {file.name} due to missing required information.")
            return

        session_desc = course_data.get("sessionDesc", "")
        block_num = session_desc.split(" ")[-1] if " " in session_desc else session_desc

        title = course_data.get("eventName", "N/A")

        instructors = course_data.get("instructors") or []
        professor = ", ".join([i["fullName"] for i in instructors if i.get("fullName")]) or "N/A"

        credits_str = course_data.get("credits", "0")
        try:
            credits = float(credits_str)
        except (ValueError, TypeError):
            credits = 0.0

        fee = None
        if course_data.get("areFeesApplicable") and course_data.get("sectionFees"):
            fee_list = course_data.get("sectionFees")
            if fee_list:
                fee_str = fee_list[0].get("amount", "$0.00")
                try:
                    fee = int(float(fee_str.replace("$", "").replace(",", "")))
                except (ValueError, TypeError):
                    fee = None
        
        description = course_data.get("description")
        # prereqs = course_data.get("prerequisites")
        prereqs = "" # TBA

        credit_types_list = course_data.get("creditTypes", [])
        # course_types = ", ".join([ct["description"] for ct in credit_types_list if ct.get("description")])
        course_types = "" # TBA

        add_course(
            conn=conn,
            academic_year=academic_year,
            seats=seats,
            course_code=course_code,
            block_num=block_num,
            title=title,
            professor=professor,
            credits=credits,
            department=department,
            fee=fee,
            descr=description,
            prereqs=prereqs,
            course_types=course_types,
        )

DB_HOST = os.environ.get('DB_HOST', '127.0.0.1')
DB_PORT = int(os.environ.get('DB_PORT', 3306))
DB_USER = os.environ.get('DB_USER', 'selfservice')
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'password')
DB_NAME = os.environ.get('DB_NAME', 'sandbox')

def bulk_import(detail_path: Path):
    try:
        conn = mariadb.connect(
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME
        )
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        sys.exit(1)
    
    # commit changes automatically
    conn.autocommit = True

    for f in detail_path.glob("*.json"):
        process_class(conn, f)
    
    conn.close()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python bulk_import_current_self_service.py <path_to_json_files>")
        sys.exit(1)
    detail_path = Path(sys.argv[1])
    bulk_import(detail_path)

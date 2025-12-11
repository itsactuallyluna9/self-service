from db import get_db

def get_waitlist(course):
    conn = get_db()
    with conn.cursor(dictionary = True) as cursor:
        #Check if class is full (if not, there is no waitlist)
        cursor.execute("SELECT openseats FROM COURSE_OFFER WHERE id = ?", (course))
        course_open = cursor.fetchone()
        course_open = cursor["openseats"]
        if course_open > 0:
            return None

        #Get rows of registered students
        cursor.execute("SELECT userName, enrollmentDate FROM REGISTERED_COURSES WHERE keycode = ?", (course))
        rows = cursor.fetchall()
        registered = []
        
        #convert rows to a list of tuples
        for row in rows:
            registered += [(row['userName'], row['enrollmentDate'])]

        #Get total seats of Course
        cursor.execute("SELECT totalseats FROM COURSE_OFFER WHERE id = ?",(course))
        course_seats = cursor.fetchone()
        course_seats = course_seats["totalseats"]

        #Sort Registered List
        sorted_registered = sorted(registered, key = lambda x: x[1])

        #Narrow List down to Waitlist using seat count
        for remove in range(course_seats):
            del sorted_registered[0]

        #Convert to a list of usernames in waitlist order
        [waitlist = student[0] for student in sorted_registered]

        return waitlist

#Calculate Position of Student in Waitlist of Course
def get_waitlist_position(username, course):
    waitlist = get_waitlist(course)   
    position = waitlist.index(username)
    return position
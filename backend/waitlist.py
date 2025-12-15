from backend.db import get_db

def get_waitlist(course):
    conn = get_db()
    with conn.cursor(dictionary = True) as cursor:
        #Check if class is full (if not, there is no waitlist)
        cursor.execute("SELECT openseats FROM COURSE_OFFER WHERE id = ?", (course,))
        course_open = cursor.fetchone()
        if not course_open:
            # invalid course id
            return []
        course_open = course_open["openseats"]
        if course_open > 0:
            # class is not full, no waitlist
            return []

        #Get rows of registered students
        cursor.execute("SELECT userName, enrollmentDate FROM REGISTERED_COURSES WHERE keycode = ?", (course,))
        rows = cursor.fetchall()
        registered = []
        
        #convert rows to a list of tuples
        for row in rows:
            registered += [(row['userName'], row['enrollmentDate'])]

        #Get total seats of Course
        cursor.execute("SELECT totalseats FROM COURSE_OFFER WHERE id = ?",(course,))
        course_seats = cursor.fetchone()
        course_seats = course_seats["totalseats"]

        #Sort Registered List
        sorted_registered = sorted(registered, key = lambda x: x[1])

        #Narrow List down to Waitlist using seat count
        for remove in range(course_seats):
            del sorted_registered[0]

        #Convert to a list of usernames in waitlist order
        waitlist = [student[0] for student in sorted_registered]

        return waitlist

# dummy classes with no seats available:
# (1,2025,18,0,0,'Block 7','Jack Messitt',121),
# (2,2025,25,0,0,'Block 2','Sherri-Lynn Putz, Sophie Gillett',122),
# (3,2025,25,0,0,'Block 2','Christi Johnson',123),
# (4,2025,25,0,0,'Block 8','Niloofar Kamran',124),
# (5,2025,25,0,0,'Block 1','Ajit Chavan',125),

#Calculate Position of Student in Waitlist of Course
def get_waitlist_position(username, course):
    waitlist = get_waitlist(course) 
    if waitlist and username in waitlist:  
        position = waitlist.index(username)
    else:
        position = None

    return position

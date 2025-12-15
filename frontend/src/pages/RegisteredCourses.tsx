import { useState, useEffect } from 'react';
import '../cssFiles/RegisteredCoursesPage.css'
import {useNavigate} from 'react-router'

import Navbar from '../components/Navbar' 

interface CourseData {
  id: number;
  department: string;
  title: string;
  professor: string;
  academicyear: string;
  blocknum: string;
  openseats: number;
  credits: number;
  fee: number;
  coursecode: number;
  waitlist_position: null | number;
}

// waitlist_position = number

/*const testClasses: CourseData[] = [
  {
    KEYCODE: 1,
    DEPARTMENT: 'CSC',
    TITLE: 'Software Development Processes',
    PROFESSOR: 'Ajit Chavan',
    ACADEMICYEAR: '2025',
    BLOCKNUM: '4',
    SEATS: 10,
    CREDITS: 1.00,
    FEE: 0.00,
    COURSECODE: 318
  },
  {
    KEYCODE: 2,
    DEPARTMENT: 'MAT',
    TITLE: 'Calculus I',
    PROFESSOR: 'Dr. Smith',
    ACADEMICYEAR: '2025',
    BLOCKNUM: '2',
    SEATS: 25,
    CREDITS: 0.75,
    FEE: 50.00,
    COURSECODE: 101
  },
  {
    KEYCODE: 3,
    DEPARTMENT: 'ENG',
    TITLE: 'Writing Seminar',
    PROFESSOR: 'Ms. Jones',
    ACADEMICYEAR: '2025',
    BLOCKNUM: '1',
    SEATS: 15,
    CREDITS: 1.00,
    FEE: 0.00,
    COURSECODE: 150
 },
];*/


function DisplayRegisteredCourses() {
  const UserID = localStorage.getItem('UserID')
    useEffect(() => {
        console.log("Current Logged In User ID:", UserID);
    }, []);

    const [courses, setCourses] = useState<CourseData[]>([])

    const nav = useNavigate()
  
    const toCourseInfo = (id: number) => {
      nav('/CourseInfo',{state:{code:id}})
    }

    const removeCourse = async (id: number) => {
      // DELETE https://10.101.128.72:6001/api/registered_courses/<string:username>/<int:course_id>
      const reply = await fetch(`https://10.101.128.72:6001/api/registered_courses/${localStorage.getItem('UserID')}/${id}`, {
        method: 'DELETE',
      })
      const result = (await reply.json())['success']
      if (result === true) {
          console.log("success register")
          setCourses(courses.filter((course) => course.id !== id));
      }
      else {
          console.log("false register")
      }
    }

    const sortByBlockNum = (courseList: CourseData[]): CourseData[] => {
        return courseList.slice().sort((a,b) => {
            const blockA = parseInt(a.blocknum);
            const blockB = parseInt(b.blocknum);

        if (isNaN(blockA) || isNaN(blockB)) {
                return a.blocknum.localeCompare(b.blocknum);
        }
        return blockA - blockB;
    });
    };

  useEffect(() => {
    async function loadCourses() {
        let fetchedData: CourseData[] = [];
      try {
        //  Fetch call to backend course data API endpoint. CarterLampe 12/1/2025
        const response = await fetch(`https://10.101.128.72:6001/api/registered_courses/${UserID}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); 
        } 

        const data = await response.json();
        fetchedData = data.courses;      
    
      } catch (e: any) {
        console.error("Error fetching courses:", e);
        return (
          <h1>An Error Occurred, Please Try Again Later</h1>
        )
    
    }
    const sortedCourses = sortByBlockNum(fetchedData);
    setCourses(sortedCourses);
    }
    loadCourses();
    }, []);

    return (
    <>
    <Navbar />
    <div className='display'>
      <div className="courses">
        {courses.length === 0 ? (
          <h1>No Courses Detected</h1>
        ) : (
          courses.map((course: CourseData) => (
            <div key={course.id} className = 'course-card'>
              <div className ='card-left'>
                <h2
                onClick={() => toCourseInfo(course.id)}
                style={{ cursor: "pointer"}}
                >
                  {course.department}{course.coursecode}: {course.title}
                </h2>
                <p>Year: {course.academicyear} |
                  
                    Term: {Number(course.blocknum.split(" ")[1]) >= 1 && Number(course.blocknum.split(" ")[1]) <= 4
                    ? "Fall"
                    : Number(course.blocknum.split(" ")[1]) >= 5 && Number(course.blocknum.split(" ")[1]) <= 8
                    ? "Spring"
                    : course.blocknum.includes("Fall")
                    ? "Fall"
                    : course.blocknum.includes("Spring")
                    ? "Spring"
                    : ""}
                  </p>
                  {course.blocknum !== null && (
                    <p>{course.blocknum}</p>
                  )}

              </div>
              <div className = 'card-right'>
                  <div className='card-column'>
                    <p>{course.professor}</p>
                  </div>
                  <div className='card-column'>
                    <h3>{course.credits}</h3> 
                    <p>Credit{course.credits == 1 ? "" : "s"}</p>
                  </div>
                  <div className='card-column'>
                    {course.waitlist_position == null ? (
                      <>
                        <h3>Seats Left</h3>
                        <p>{course.openseats}</p>
                      </>
                    ) : (
                      <>
                        <h3>Waitlist Position</h3>
                        <p>{course.waitlist_position}</p>
                      </>
                    )}
                  </div>
                  <div className='card-column'>
                    {course.fee !== null && (
                      <div>
                        <h3>${course.fee}</h3> 
                        <p>Applicable fees</p>
                      </div>
                    )}
                  </div>
                  <div className='card-column'>
                    <button type="button" onClick={()=>{removeCourse(course.id)}}>Remove</button>
                  </div>
              </div>
            </div>
        ))
      )}
      </div>

    </div>
    </>
  );
}

export default DisplayRegisteredCourses

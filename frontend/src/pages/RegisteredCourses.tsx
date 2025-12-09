import { useState, useEffect } from 'react';
import './RegisteredCoursesPage.css'
import {useNavigate} from 'react-router'

import Navbar from '../components/Navbar' 

interface CourseData {
  KEYCODE: number;
  DEPARTMENT: string;
  TITLE: string;
  PROFESSOR: string;
  ACADEMICYEAR: string;
  BLOCKNUM: string;
  SEATS: number;
  CREDITS: number;
  FEE: number;
  COURSECODE: number;
}

const testClasses: CourseData[] = [
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
];


function DisplayRegisteredCourses() {
  const UserID = localStorage.getItem('UserID')
    useEffect(() => {
        console.log("Current Logged In User ID:", UserID);
    }, []);

    const [courses, setCourses] = useState<CourseData[]>([])

    const nav = useNavigate()
  
    const toCourseInfo = (KEYCODE: number) => {
      nav('/CourseInfo',{state:{code:KEYCODE}})
    }

    const sortByBlockNum = (courseList: CourseData[]): CourseData[] => {
        return courseList.slice().sort((a,b) => {
            const blockA = parseInt(a.BLOCKNUM);
            const blockB = parseInt(b.BLOCKNUM);

        if (isNaN(blockA) || isNaN(blockB)) {
                return a.BLOCKNUM.localeCompare(b.BLOCKNUM);
        }
        return blockA - blockB;
    });
    };

  useEffect(() => {
    async function loadCourses() {
        let fetchedData: CourseData[] = [];
      try {
        //  Fetch call to backend course data API endpoint. CarterLampe 12/1/2025
        const response = await fetch(`https://10.101.128.56:6001/api/registered_courses/${UserID}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); 
        }

        const data = await response.json();
        fetchedData = testClasses;      
    
      } catch (e: any) {
        console.error("Error fetching courses:", e);
        fetchedData = testClasses;
    
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
          <p>Loading courses...</p>
        ) : (
          courses.map((course: CourseData) => (
            <div key={course.KEYCODE} className = 'course-card'>
              <div className ='card-left'>
                <h2
                onClick={() => toCourseInfo(course.KEYCODE)}
                style={{ cursor: "pointer"}}
                >
                  {course.DEPARTMENT}{course.COURSECODE}: {course.TITLE}
                </h2>
                <p>Year: {course.ACADEMICYEAR} |
                
                  Term: {Number(course.BLOCKNUM) >= 1 && Number(course.BLOCKNUM) <= 4
                  ? "Fall"
                  : Number(course.BLOCKNUM) >= 5 && Number(course.BLOCKNUM) <= 8
                  ? "Spring"
                  : course.BLOCKNUM.includes("Fall")
                  ? "Fall"
                  : course.BLOCKNUM.includes("Spring")
                  ? "Spring"
                  : ""}
                </p>
                {course.BLOCKNUM !== null && (
                  <h1>Block: {course.BLOCKNUM}</h1>
                )}

              </div>
              <div className = 'card-right'>
                    <div className='card-column'>
                      <p>{course.PROFESSOR}</p>
                    </div>
                    <div className='card-column'>
                      <h3>{course.CREDITS}</h3> 
                      <p>Credits</p>
                    </div>
                    <div className='card-column'>
                      <h3>{course.SEATS}</h3> 
                      <p>Seats Left</p>
                    </div>
                    <div className='card-column'>
                      {course.FEE !== null && (
                        <div>
                          <h3>${course.FEE}</h3> 
                          <p>Applicable fees</p>
                        </div>
                      )}
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

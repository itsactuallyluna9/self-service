import { useState, useEffect } from 'react';
import './CourseInformationPage.css'
import {useNavigate, useLocation} from 'react-router'
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
];


function DisplayCourses() {
  const nav = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState<CourseData[]>([]);  
    
  useEffect(() => {
    // If navigated from filter page
    if (location.state && (location.state as any).classes) {
      setCourses((location.state as any).classes);
    } else {
    
    // Otherwise, load all courses
      async function loadCourses() {
        try {
        //  Fetch call to backend course data API endpoint. CarterLampe 12/1/2025
        const response = await fetch('https://10.101.128.56:6001/');
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); 

        const data = await response.json();
        setCourses(data.courses || testClasses);
    
        } catch (e) {
          console.error("Error fetching courses:", e);
          setCourses(testClasses);
        }
      }
      loadCourses();
    }
  }, [location.state]);

  const toCourseInfo = (KEYCODE: number) => {
    nav('/CourseInfo',{state:{code:KEYCODE}});
  };

    return (
    <>
    <Navbar />
    <div className='display'> 
      {/* <h1
        onClick={() => nav('/Filter')}
        style={{ cursor: "pointer"}}
        >
        Advanced Search
      </h1>   */}

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
              <p>Block: {course.BLOCKNUM}</p>
          

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
    </>
  );
}

export default DisplayCourses

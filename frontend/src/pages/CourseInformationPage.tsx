import { useState, useEffect } from 'react';
import './CourseInformationPage.css'
import {useNavigate} from 'react-router'
import Navbar from '../components/Navbar' 
import { useCart } from '../components/CartContext';
import CartTemplate from '../components/CartTemplate'


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

interface CartProps { // edit later to have full info
    KEYCODE : number,
    TITLE : string,
    DEPARTMENT : string,
    COURSECODE : number,

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
  const [courses, setCourses] = useState<CourseData[]>([]);
  const { AddCourseToCart } = useCart();
  const nav = useNavigate();

  const handleAdd = (data: CourseData) => {
    const cartData: CartProps = {
      KEYCODE: data.KEYCODE,
      COURSECODE: data.COURSECODE,
      TITLE: data.TITLE,
      DEPARTMENT: data.DEPARTMENT,
    };

    AddCourseToCart(cartData);
  };

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await fetch("https://10.101.128.56:6001/api/courses");
        if (!response.ok) throw new Error();

        const data = await response.json();
        setCourses(data.courses || testClasses);
      } catch {
        setCourses(testClasses);
      }
    }
    loadCourses();
  }, []);

  return (
    <>
      <Navbar />

      <div className="display">
        
        {/* LEFT SIDE: COURSES */}
        <div className="course-left">
          {courses.length === 0 ? (
            <p>Loading courses...</p>
          ) : (
            courses.map((course) => (
              <div key={course.KEYCODE} className="course-card">

                <div className="card-left">
                  <h2
                    onClick={() => nav("/CourseInfo", { state: { code: course.KEYCODE } })}
                    style={{ cursor: "pointer" }}
                  >
                    {course.DEPARTMENT}{course.COURSECODE}: {course.TITLE}
                  </h2>
                  <p>Year: {course.ACADEMICYEAR}</p>
                  <p>Block: {course.BLOCKNUM}</p>
                </div>

                <div className="card-right">
                  <div className="card-column">
                    <p>{course.PROFESSOR}</p>
                  </div>
                  <div className="card-column">
                    <h3>{course.CREDITS}</h3>
                    <p>Credits</p>
                  </div>
                  <div className="card-column">
                    <h3>{course.SEATS}</h3>
                    <p>Seats Left</p>
                  </div>
                  <div className="card-column">
                    <h3>${course.FEE}</h3>
                    <p>Applicable fees</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(course)}
                  >
                    Add Course To Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="course-right">
          <CartTemplate />
        </div>

      </div>
    </>
  );
}

export default DisplayCourses;

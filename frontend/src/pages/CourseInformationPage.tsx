import { useState, useEffect } from 'react';
import './CourseInformationPage.css'
import {useNavigate, useLocation} from 'react-router'
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
    const [courses, setCourses] = useState<CourseData[]>([])
    const { cartCourses, RemoveCourseFromCart, AddCourseToCart } = useCart();
    const [cartButtonText, setCartButtonText] = useState("Add course to cart")
    const [canAddCart, setCanAddCart] = useState(true) 
    const nav = useNavigate()
    const location = useLocation()

    const handleClearFilter = () => {
      // Reload the page to clear filters
      window.location.reload();
    }

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
    // If navigated from filter page
    if (location.state && (location.state as any).classes) {
      setCourses((location.state as any).classes);
    } else {
    
    // Otherwise, load all courses
      async function loadCourses() {
        try {
        //  Fetch call to backend course data API endpoint. CarterLampe 12/1/2025
        const response = await fetch('https://10.101.128.56:6001/api/courses');
        
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
    
    <div className='split'>
      <div className='display'>
        <div className= "filter-button-container">
          <button className= "filter-button" onClick={() => nav("/Filter") }>Filter Courses</button>
          <button className= "clear-filter-button" onClick={handleClearFilter}>Clear Filter</button>
        </div> {/* filter-button-container */}
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
                    <p>Block: {course.BLOCKNUM}</p>
                  )}

                </div> {/* card-left */}
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
                  <div className='card-column'>
                    <button type="button" disabled={!canAddCart} onClick={()=>{handleAdd(course)}}>{cartButtonText}</button>
                  </div>
                </div> {/* card-right */}
              </div> /* course-card */
          ))
        )}
        </div> {/* courses  */}
        
      </div> {/* display */}
      <div className='course-right'>
        <CartTemplate></CartTemplate>
      </div>
    </div> {/* split */}
    </>
  );
}

export default DisplayCourses;

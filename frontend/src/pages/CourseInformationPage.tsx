import { useState, useEffect } from 'react';
import '../cssFiles/CourseInformationPage.css'
import {useNavigate, useLocation} from 'react-router'
import Navbar from '../components/Navbar' 
import { useCart } from '../components/CartContext';
import CartTemplate from '../components/CartTemplate'


interface CourseData {
  id: number;
  department: string;
  title: string;
  professor: string;
  academicyear: string;
  blocknum: string;
  seats: number;
  credits: number;
  fee: number | null;
  coursecode: number;
}

interface CartProps { // edit later to have full info
    id : number,
    title : string,
    department : string,
    coursecode : number,

}


const testClasses: CourseData[] = [
  {
    id: 1,
    department: 'CSC',
    title: 'Software Development Processes',
    professor: 'Ajit Chavan',
    academicyear: '2025',
    blocknum: '4',
    seats: 10,
    credits: 1.00,
    fee: 0.00,
    coursecode: 318
  },
  {
    id: 2,
    department: 'MAT',
    title: 'Calculus I',
    professor: 'Dr. Smith',
    academicyear: '2025',
    blocknum: '2',
    seats: 25,
    credits: 0.75,
    fee: 50.00,
    coursecode: 101
  },
];


function DisplayCourses() {
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    const [courses, setCourses] = useState<CourseData[]| null>(null);
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
      id: data.id,
      coursecode: data.coursecode,
      title: data.title,
      department: data.department,
    };

    const result = AddCourseToCart(cartData);

     if (result) {
      setPopupMessage(`${data.department}${data.coursecode} added to cart!`);
      setShowPopup(true);

      // Auto-close popup after 2 seconds
      setTimeout(() => setShowPopup(false), 2000);
    } else {
      setPopupMessage(`Already in cart!`);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
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
        //const response = await fetch('https://10.101.128.56:6001/api/courses');
        
        //if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); 

        //const data = await response.json();
        //setCourses(data.courses || testClasses);
        setCourses(testClasses);
    
        } catch (e) {
          console.error("Error fetching courses:", e);
          setCourses(testClasses);
        }
      }
      loadCourses();
    }
  }, [location.state]);

  const toCourseInfo = (id: number, page: string) => {
    nav('/CourseInfo',{state:{code:id, route: page}});
  };

  return (
    <>
    {showPopup && (
    <div className="popup-overlay">
      {popupMessage}
    </div>
    )}
    <Navbar />
    
    <div className='split'>
      <div className='display'>
        <div className= "filter-button-container">
          <button className= "filter-button" onClick={() => nav("/Filter") }>Filter Courses</button>
          <button className= "clear-filter-button" onClick={handleClearFilter}>Clear Filter</button>
        </div> {/* filter-button-container */}
        <div className="courses">
          {courses === null ? (
            <p>Loading courses...</p>
          ) : courses.length === 0 ? (
          <p>No results found</p>
        ) : (
            courses.map((course: CourseData) => (
              <div key={course.id} className = 'course-card'>
                <div className ='card-left'>
                  <h2
                  onClick={() => toCourseInfo(course.id, '/CourseInformationPage')}
                  style={{ cursor: "pointer"}}
                  >
                    {course.department}{course.coursecode}: {course.title}
                  </h2>
                  <p>Year: {course.academicyear} |
                  
                    Term: {Number(course.blocknum) >= 1 && Number(course.blocknum) <= 4
                    ? "Fall"
                    : Number(course.blocknum) >= 5 && Number(course.blocknum) <= 8
                    ? "Spring"
                    : course.blocknum.includes("Fall")
                    ? "Fall"
                    : course.blocknum.includes("Spring")
                    ? "Spring"
                    : ""}
                  </p>
                  {course.blocknum !== null && (
                    <p>Block: {course.blocknum}</p>
                  )}

                </div> {/* card-left */}
                <div className = 'card-right'>
                  <div className='card-column'>
                    <p>{course.professor}</p>
                  </div>
                  <div className='card-column'>
                    <h3>{course.credits}</h3> 
                    <p>credits</p>
                  </div>
                  <div className='card-column'>
                    <h3>{course.seats}</h3> 
                    <p>seats Left</p>
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

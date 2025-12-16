import { useState, useEffect } from 'react';
import '../cssFiles/CourseInformationPage.css'
import {useNavigate, useLocation} from 'react-router'
import Navbar from '../components/Navbar' 
import { useCart } from '../components/CartContext';
import CartTemplate from '../components/CartTemplate'
import TextPopup from '../components/TextPopup';


interface CourseData {
  id: number;
  department: string;
  title: string;
  professor: string;
  academicyear: string;
  blocknum: string;
  openseats: number;
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

function DisplayCourses() {
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")

    const [courses, setCourses] = useState<CourseData[]| null>(null);
    const { cartCourses, RemoveCourseFromCart, AddCourseToCart } = useCart();
    const [cartButtonText, setCartButtonText] = useState("Add to cart")
    const [canAddCart, setCanAddCart] = useState(true) 
    const nav = useNavigate()
    const location = useLocation()

    const handleClearFilter = () => {
      // Reload the page to clear filters
      return(
        nav('/CourseInformationPage/')
      )
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
    } else {
      setPopupMessage(`Already in cart!`);
    }
    setShowPopup(true);
  };

    
    

    
  useEffect(() => {
    // If navigated from filter page
    console.warn(location.state);
    if (location.state && (location.state as any).classes.courses) {
      setCourses((location.state as any).classes.courses);
    } else {
    // Otherwise, load all courses
      async function loadCourses() {
        try {
        //  Fetch call to backend course data API endpoint. CarterLampe 12/1/2025
        const response = await fetch('https://10.101.128.72:6001/api/courses');
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); 

        const data = await response.json();
        setCourses(data.courses);
    
        } catch (e) {
          console.error("Error fetching courses:", e);
          return (
            <h1>An Error was Detected, Please Try Again Later</h1>
          )
        }
      }
      loadCourses();
    }
  }, [location.state]);

  const toCourseInfo = (id: number) => {
    nav('/CourseInfo',{state:{code:id}});
  };

  return (
    <>
    <div className="CourseInformationPage-wrapper">
      
   <TextPopup 
        key={popupMessage}
        isVisible={showPopup} 
        message= {popupMessage}
        onClose={() => setShowPopup(false)} 
      />

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

                </div> {/* card-left */}
                <div className = 'card-right'>
                  <div className='card-column'>
                    <p>{course.professor}</p>
                  </div>
                  <div className='card-column'>
                    <h3>{course.credits}</h3> 
                    <p>Credit{course.credits == 1 ? "" : "s"}</p>
                  </div>
                  <div className='card-column'>
                    <h3>{course.openseats}</h3> 
                    <p>Seats Left</p>
                  </div>
                  <div className='card-column'>
                    {course.fee !== null && (
                      <div>
                        <h3>${course.fee}</h3> 
                        <p>Fees</p>
                      </div>
                    )}
                  </div>
                  <div className='card-column'>
                    <button type="button" disabled={!canAddCart} onClick={()=>{handleAdd(course)}}>{cartButtonText}</button>
                  </div>
                </div> 
              </div> /* course-card */
          ))
        )}
        </div> {/* courses  */}
        
      </div> {/* display */}
      <div className='course-right'>
        <CartTemplate></CartTemplate>
      </div> 
    </div> {/* split */}
    </div> {/* wrapper */}
    </>
  );
}

export default DisplayCourses;

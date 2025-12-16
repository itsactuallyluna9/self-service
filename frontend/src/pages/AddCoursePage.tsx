import { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router'
import Navbar from '../components/Navbar' 
import '../cssFiles/AddCourse.css'
import AddCourseModal from '../components/AddCoursePopup';

interface BaseCourseData {
  id: number;
  department: string | null;
  title: string | null;
  credits: number;
  fee: number | null;
  coursecode: number;
}

interface AddCourseData {
  professor: string;
  academicyear: number | "";
  blocknum: string;
  openseats: number | "";
  session: string;
  totalseats: number | null;
}

interface CourseData {
  id: number;
  department: string | null;
  title: string | null;
  credits: number;
  fee: number | null;
  coursecode: number;
  totalseats: number | null;
  professor: string;
  academicyear: number | "";
  blocknum: string;
  openseats: number | "";
  session: string;
}



function AddCoursePage() {
    const nav = useNavigate()
    const location = useLocation()

    // State for popup message. CarterLampe 12/16/2025.
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for all course data. CarterLampe 12/16/2025.
    const [courses, setCourses] = useState<BaseCourseData[]| null>(null);
    
    //State for current selected course to add. CarterLampe 12/16/2025.
    const [selectedCourse, setSelectedCourse] = useState<BaseCourseData | null>(null);

    // Handlers for Add Course Modal. CarterLampe 12/16/2025.
    const handleAddCourseClick = (course: BaseCourseData) => {
      setSelectedCourse(course);
      setIsModalOpen(true);
    };

    // Confirm adding course from modal. CarterLampe 12/16/2025.
    const handleConfirmAddCourse = (addCourseData: AddCourseData) => {
      // Update selected course with modal data. CarterLampe 12/16/2025.
      if (addCourseData){
        const course = {
          id: selectedCourse!.id,
          department: selectedCourse!.department,
          title: selectedCourse!.title,
          credits: selectedCourse!.credits,
          fee: selectedCourse!.fee,
          coursecode: selectedCourse!.coursecode,
          totalseats: Number(addCourseData.totalseats),
          professor: addCourseData.professor,
          academicyear: addCourseData.academicyear,
          blocknum: addCourseData.session,
          openseats: Number(addCourseData.openseats),
          session: addCourseData.session,
        };
        handleAdd(course)
        }
        setIsModalOpen(false);
      }
    
    const handleCancelAddCourse = () => {
        setIsModalOpen(false);
    }

    const handleClearFilter = () => {
      // Reload the page to clear filters
      return(
        nav('/AddCoursePage/')
      )
    }

    const handleAdd = async (course: CourseData) => {
        setPopupMessage(`${course.department}${course.coursecode} added!`);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);

        try{
            // Fetch call to backend login API endpoint. CarterLampe 12/1/2025.
            const response = await fetch('TODO: Backend API for adding course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: course.id }),
            })
            
            // Dummy response for testing. CarterLampe 12/6/2025.
            // const response = {
            //     ok: true,
            //     json: async () => ({
            //         success: false,
            //         token: "test-token",
            //         message: "Login unsuccessful"
            //     })
            // };

            const data = await response.json();

            if (response.ok){
                
                if (data.success){
                    console.log("Adding of course successful.", data)
        
                }
                else {
                console.log("Adding of course failed.", data);
                }
            }
        }
        catch (err) {
            console.error('Adding course error:', err);
        }
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
    <div className="AddCoursePage-wrapper">
    {showPopup && (
    <div className="popup-overlay">
      {popupMessage}
    </div>
    )}
    <Navbar />
    
    <div className='split'>
      <div className='display'>
        <div className= "filter-button-container">
          <button className= "filter-button" onClick={() => nav("/Filter", { state: { String: "/AddCoursePage/" } })}>Filter Courses</button>
          <button className= "clear-filter-button" onClick={handleClearFilter}>Clear Filter</button>
        </div> {/* filter-button-container */}
        <div className="courses">
          {courses === null ? (
            <p>Loading courses...</p>
          ) : courses.length === 0 ? (
          <p>No results found</p>
        ) : (
            courses.map((course: BaseCourseData) => (
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
                        <p>Applicable fees</p>
                      </div>
                    )}
                  </div>
                  <div className='card-column'>
        
                    <button type="button" onClick={() => handleAddCourseClick(course)}>
                        Add
                    </button>
                    
                  </div>
                
                </div> 
              </div> /* course-card */
          ))
        )}
        <AddCourseModal
                isOpen={isModalOpen}
                onConfirm={(addCourseData) => handleConfirmAddCourse(addCourseData)}
                onCancel={handleCancelAddCourse}
        />
        </div> {/* courses  */}
        
      </div> {/* display */}
    </div> {/* split */}
    
    </div> {/* wrapper */}
    </>
  );
}

export default AddCoursePage;
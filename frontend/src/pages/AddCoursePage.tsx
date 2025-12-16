import { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router'
import Navbar from '../components/Navbar' 
import '../cssFiles/AddCourse.css'

interface CourseData {
  id: number;
  department: string;
  title: string;
  professor: string;
  academicyear: string;
  blocknum: string;
  credits: number;
  fee: number | null;
  coursecode: number;
}

function AddCoursePage() {
    // State to track added courses to prevent duplicates. CarterLampe 12/5/2025.
    const [addedCourses, setAddedCourses] = useState<number[]>([]);


    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    const [courses, setCourses] = useState<CourseData[]| null>(null);
    const nav = useNavigate()
    const location = useLocation()

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
        console.log(course.id)

        try{
            // Fetch call to backend login API endpoint. CarterLampe 12/1/2025.
            const response = await fetch('TODO: Backend API for adding course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: course.id }),
            })
            
            // Dummy response for testing. CarterLampe 12/1/2025.
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

        // Prevent adding the same course multiple times. CarterLampe 12/5/2025.
        setAddedCourses(prev => [...prev, course.id]);
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
        const response = await fetch('https://10.101.128.72:6001/api/courses/catalog');
        
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
    nav('/addCourseInfo',{state:{code:id}});
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
                    {course.fee && (
                      <div>
                        <h3>${course.fee}</h3> 
                        <p>Fees</p>
                      </div>
                    )}
                    {!course.fee && (
                      <div>
                        <h3>None</h3>
                        <p>Fees</p>
                      </div>
                    )}
                  </div>
                  <div className='card-column'>
                    {/* Disable "Add Course" button if course already added. CarterLampe 12/5/2025. */}
                    {addedCourses.includes(course.id) ? (
                    <button disabled style={{ opacity: 0.5 }}>
                        Added
                    </button>
                    ) : (
                    <button type="button" onClick={() => handleAdd(course)}>
                        Add
                    </button>
                    )}
                  </div>
                </div> 
              </div> /* course-card */
          ))
        )}
        </div> {/* courses  */}
        
      </div> {/* display */}
    </div> {/* split */}
    </div> {/* wrapper */}
    </>
  );
}

export default AddCoursePage;
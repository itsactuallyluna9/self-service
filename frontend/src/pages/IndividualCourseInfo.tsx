import React from 'react';
import { useState, useEffect } from 'react';
import IndividualCourseTemplate from '../components/IndividualCourseTemplate';
import { useLocation } from 'react-router';
import '../cssFiles/IndivdualCoursePage.css';
import Navbar from '../components/Navbar';


interface CourseProps {
    academicyear: number,
    blocknum: string,
    coursecode: number,
    coursetypes: string,
    credits: number,
    department: string,
    description: string,
    fee: null | number,
    professor: string,
    id: number,
    prereqs: string,
    totalseats: number,
    title: string,
    openseats: number,
    waitcount: number
}

function IndividualCourseInfo() {
    const { state } = useLocation()
    const courseID = state.code;
    const prevRoute = state.route
    const [myData, setMyData] = useState<any>(null);
    const [error, setError] = useState('');
    const [course, setCourse] = useState()

    
        useEffect(() => {
            try {
                const fetchCourse =  async () => {
                    console.log("Page has loaded.");

                    //  Fetch call to backend indivdual course info API endpoint. CarterLampe 12/1/2025
                    const response = await fetch(`https://10.101.128.72:6001/api/courses/${courseID}`, {})
                
     
     
                    
                    // Dummy response for testing. CarterLampe 12/1/2025
                    // const response = {
                    //     ok: true,
                    //     json: async () => ({
                    //         success: true,
                    //         ACADEMICYEAR: 2023,
                    //         BLOCKNUM:  "4",
                    //         COURSECODE: "CS101",
                    //         COURSETYPES: "ExampleType",
                    //         CREDITS: 3,
                    //         DEPARTMENT: "Computer Science",
                    //         DESCR: "An introductory course to computer science.",
                    //         fee: null,
                    //         INSTRUCTORS: "Dr. Smith",
                    //         id: 12345,
                    //         prereqs: "None",
                    //         seats: 50,
                    //         title: "Introduction to Computer Science",
                    //                         })
                    // };
                    
                    const data = await response.json();
                    // Check if course was found successfully. Store CarterLampe 12/1/2025
                        if (data.success){
                            console.log("Course found succesfully.", data)
                            setMyData(data)
                        }
                        else {
                        console.log("Course ID not found..", data);
                        setError("Course ID not found")
                        console.log(myData.name)
                        }
                }
                
                fetchCourse();
            } 
            catch (err) {
                setError('An error occurred. Please try again.');
                console.error('Course id error:', err);
            }
        }, [])
    if (!myData) {
        return <div className='ind'><form><h1>Course not found. ERROR 404.</h1></form></div>
    }
    const courseInfo: CourseProps = myData as CourseProps
    return (
        <>
        <Navbar />
        <div className='individual-course-info-page'>
            <IndividualCourseTemplate {...courseInfo}/>
        </div>
        </>
    );
    
} 

export default IndividualCourseInfo;

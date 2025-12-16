import React from 'react';
import { useState, useEffect } from 'react';
import AddIndividualCourseTemplate from '../components/AddIndividualCourseTemplate';
import { useLocation } from 'react-router';
import '../cssFiles/IndivdualCoursePage.css';
import Navbar from '../components/Navbar';


interface CourseProps {
    coursecode: number | null,
    coursetypes: string | null,
    credits: number | null,
    department: string | null,
    description: string | null,
    fee: null | number,
    id: number,
    prereqs: string | null,
    title: string | null,
}

function IndividualCourseInfo() {
    const { state } = useLocation()
    const courseID = state.code;
    const [myData, setMyData] = useState<any>(null);
    const [error, setError] = useState('');
    const [course, setCourse] = useState('')

    
        useEffect(() => {
            try {
                const fetchCourse =  async () => {
                    console.log("Page has loaded.");

                    //  Fetch call to backend indivdual course info API endpoint. CarterLampe 12/1/2025
                    const response = await fetch(`https://10.101.128.72:6001/api/courses/catalog/${courseID}`, {})
                    
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
    const courseInfo: CourseProps = myData.course as CourseProps
    return (
        <>
        <Navbar />
        <div className='individual-course-info-page'>
            <AddIndividualCourseTemplate {...courseInfo}/>
        </div>
        </>
    );
    
} 

export default IndividualCourseInfo;

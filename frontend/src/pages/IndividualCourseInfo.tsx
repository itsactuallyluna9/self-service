import React from 'react';
import { useState, useEffect } from 'react';
import IndividualCourseTemplate from '../components/IndividualCourseTemplate';
import { useLocation } from 'react-router';


interface CourseProps {
    ACADEMICYEAR: number,
    BLOCKNUM: string,
    COURSECODE: string,
    COURSETYPES: string,
    CREDITS: number,
    DEPARTMENT: string,
    DESCR: string,
    FEE: null | number,
    PROFESSOR: string,
    KEYCODE: number,
    PREREQS: string,
    SEATS: number,
    TITLE: string
}

function IndividualCourseInfo() {
    const { state } = useLocation()
    const courseID = state.code;
    const [myData, setMyData] = useState<any>(null);
    const [error, setError] = useState('');
    const [course, setCourse] = useState()

    
        useEffect(() => {
            try {
                const fetchCourse =  async () => {
                    console.log("Page has loaded.");

                    //  Fetch call to backend indivdual course info API endpoint. CarterLampe 12/1/2025
                    const response = await fetch(`https://10.101.128.56:6001/api/details/${courseID}`, {})
                
     
     
                    
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
                    //         FEE: null,
                    //         INSTRUCTORS: "Dr. Smith",
                    //         KEYCODE: 12345,
                    //         PREREQS: "None",
                    //         SEATS: 50,
                    //         TITLE: "Introduction to Computer Science",
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
    const courseInfo: CourseProps = {
        ACADEMICYEAR: myData.ACADEMICYEAR,
        BLOCKNUM: myData.BLOCKNUM,
        COURSECODE: myData.COURSECODE,
        COURSETYPES: myData.COURSETYPES,
        CREDITS: myData.CREDITS,
        DEPARTMENT: myData.DEPARTMENT,
        DESCR: myData.DESCR,
        FEE: myData.FEE,
        PROFESSOR: myData.PROFESSOR,
        KEYCODE: myData.KEYCODE,
        PREREQS: myData.PREREQS,
        SEATS: myData.SEATS,
        TITLE: myData.TITLE};
    return (
        <IndividualCourseTemplate {...courseInfo}/>
    );
    
} 

export default IndividualCourseInfo;

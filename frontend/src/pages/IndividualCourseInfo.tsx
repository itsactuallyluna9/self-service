import React from 'react';
import { useState, useEffect } from 'react';
import IndividualCourseTemplate from '../components/IndividualCourseTemplate';

interface CourseProps {
    name: string
    year: string
    seats: string
    code: string
    block: string
    professor: string
    department: string
    credits: string
    feeAmount: string
    description: string
    prereqs: string
    type: string
}


function IndividualCourseInfo() {
    const [courseID, setCourseID] = useState('');

    const CourseInfoPageLoader = () => {
        useEffect(() => {
            try {
                const handlePageLoad = () => {
                    console.log("Page has loaded.");
                    // Fetch call to backend login API endpoint. CarterLampe 12/1/2025
                    const response = await fetch('TODO: Enter Course Info Endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ courseID }),
                    })
     
     
                    const data = await response.json();
     
     
                    if (response.ok){
     
     
                        if (data.success){
                            console.log("Course found succesfully.", data)
                        }
                       
                        else {
                        console.log("Course ID not found..", data);
                        setError("Course ID not found")
                        }
                    }
                }
            }
            catch (err) {
                setError('An error occurred. Please try again.');
                console.error('Course id error:', err);
            };
            
            window.addEventListener("load",handlePageLoad)
     
     
            return () => {
                window.removeEventListener("load",handlePageLoad)
            }
        }
     )
     

    const courseInfo: CourseProps = {
        name: 'Software Development Processes',
        year: '2025-2026',
        seats: '9',
        code: 'CSC 318',
        block: '4',
        professor: 'Ajit Chavan',
        department: 'Computer Science',
        credits: '1',
        feeAmount: '0',
        description: '',
        prereqs: '',
        type: ''};
    return (
        <IndividualCourseTemplate {...courseInfo}/>
    );
    
}

export default IndividualCourseInfo;

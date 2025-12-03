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
    const [myData, setMyData] = useState<any>(null);
    const [error, setError] = useState('');
    const [course, setCourse] = useState()
    

    
        useEffect(() => {
            try {
                const fetchCourse =  async () => {
                    
                    console.log("Page has loaded.");
                //   Fetch call to backend login API endpoint. CarterLampe 12/1/2025
                //   const response = await fetch('TODO: Enter Course Info Endpoint', {
                //   method: 'POST',
                //   headers: {
                //   'Content-Type': 'application/json',
                //   },
                //   body: JSON.stringify({ courseID }),
                //  / })
     
     
                    
                    // Dummy response for testing. CarterLampe 12/1/2025
                    const response = {
                        ok: true,
                        json: async () => ({
                            success: true,
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
                            type: ''
                                            })
                    };
                    
                    const data = await response.json();
     
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
            } catch (err) {
                setError('An error occurred. Please try again.');
                console.error('Course id error:', err);
            }
            
            
        })
    if (!myData) {
        return <div>Loading Course Info...</div>
    }
    const courseInfo: CourseProps = {
        name: myData.name,
        year: myData.year,
        seats: myData.seats,
        code: myData.code,
        block: myData.block,
        professor: myData.professor,
        department: myData.department,
        credits: myData.credits,
        feeAmount: myData.feeAmount,
        description: myData.description,
        prereqs: myData.prereqs,
        type: myData.type};
    return (
        <IndividualCourseTemplate {...courseInfo}/>
    );
    
}

export default IndividualCourseInfo;

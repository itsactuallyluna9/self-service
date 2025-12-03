import { useState } from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react'

const [courseID, setCourseID] = useState('')

const CoursesPageTemplate = (courseData) => {
  const { code, title, professor, block, seats, department, credits, fees } = courseData;
    
    return (
        <div> 
            <h1> ${title} </h1>
            <p> ${code} </p>
            <p> ${professor} </p>
            <p> ${block} </p>
            <p> ${seats} </p>
            <p> ${department} </p>
            <p> ${credits} </p>
            <p> ${fees} </p>
        </div>
    )
}

function DisplayCourses
    
}
export default CoursesPageTemplate
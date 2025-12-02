import { useState } from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react'

const [courseID, setCourseID] = useState('')

const CoursesPageTemplate = ({courseData}) => {
    const {code, title, professor, block, seats, department, credits, fees} = courseData
}
    

    return (
        // Put Course Information Template inside of div when finished. CarterLampe 12/2/2025
        <div> 
            <h1> {courseData.title} </h1>
            <span> {courseData.code} </span>
            <span> {courseData.professor} </span>
            <span> {courseData.block} </span>
            <span> {courseData.seats} </span>
            <span> {courseData.department} </span>
            <span> {courseData.creits} </span>
        </div>
    );
}
export default CourseInfoPageLoader
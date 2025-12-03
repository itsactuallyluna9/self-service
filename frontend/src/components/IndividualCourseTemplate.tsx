import React from 'react'
import './IndividualCourseTemplate.css'

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

const IndividualCourseTemplate = (data: CourseProps) => {
    return(
        <form>
            <h1>{data.code}: {data.name}</h1>
            <h3>Professor: {data.professor}</h3>
            <h3>Block: {data.block}</h3>
            <h4>Seats: {data.seats}</h4>
            <h4>Department: {data.department}</h4>
            <h4>Credits: {data.credits}</h4>
            <h6>{data.description}</h6>
            <h5>Fees: {data.feeAmount}</h5>
            <h5>Course Type: {data.type}</h5>
            <h5>Prerequisites: {data.prereqs}</h5>
        </form>
    )
}
export default IndividualCourseTemplate
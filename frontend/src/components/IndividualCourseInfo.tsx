import React from 'react'

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
        <div>
            <h1>Name: {data.name}</h1>
            <h2>Course Code: {data.code}</h2>
            <h4>Professor: {data.professor}</h4>
            <h4>Seats: {data.seats}</h4>
            <h3>Block: {data.block}</h3>
            <h3>Department: {data.department}</h3>
            <h3>Fees: {data.feeAmount}</h3>
            <h3>Credits: {data.credits}</h3>
            <h5>{data.description}</h5>
            <h5>Course Type: {data.type}</h5>
        </div>
    )
}
export default IndividualCourseTemplate
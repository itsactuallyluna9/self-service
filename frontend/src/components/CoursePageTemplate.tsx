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
    feeAmount: number | null
    description: string
    prereqs: string
    type: string
}

const CoursePageTemplate = (data: CourseProps) => {
    return(
        <form>
            <h2>{data.code} {data.name}</h2>
            <p>Professor: {data.professor}</p>
            <p>Department: {data.department}</p>
            <p>Year: {data.year}</p>
            <p>Block: {data.block}</p>
            <p>Seats: {data.seats}</p>
            <p>Credits: {data.credits}</p>
            <p>Fees: ${data.feeAmount}</p>
        </form>
    )
}
export default CoursePageTemplate
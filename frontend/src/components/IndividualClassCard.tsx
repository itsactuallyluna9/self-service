import React from "react";

/*Seats (Total & Available)
Number of people on the wait list (If the course is full.)
Course Code
Block (1-8, or Adjunct Fall / Adjunct Spring)
Title
Professor
Department
Credits
Fee Amount
Description
Prerequisites
Course Types (e.g. First Year Writing Credit, FYS, SYS, Intenstive Qualitative, Social Sciences,...)
*/
class course {
    constructor(name, courseCode, professor, seats, block, department, fees, credits, description, )
}

const IndividualClassCard = ({ course }) => {
    return(
        <div>
            <h1>Name: {course.name}</h1>
            <h2>Course Code: {course.courseCode}</h2>
            <h4>Professor: ${course.professor}</h4>
            <h4>Seats: ${course.seats}</h4>
            <h3>Block: ${course.block}</h3>
            <h3>Department: ${course.department}</h3>
            <h3>Fees: ${course.fees}</h3>
            <h3>Credits: ${course.credits}</h3>
            <h5>${course.description}</h5>
            <h5>Course Type: ${course.courseType}</h5>
        </div>
    )
}
export default IndividualcourseCard
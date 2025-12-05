import React from 'react'

interface CourseData {
    KEYCODE: number;
    DEPARTMENT: string;
    TITLE: string;
    PROFESSOR: string;
    ACADEMICYEAR: string;
    BLOCKNUM: string;
    SEATS: number;
    CREDITS: number;
    FEE: number;
    COURSECODE: number;
  }

const CartCourseTemplate = (course: CourseData) => {

    return (
        <div key={course.KEYCODE} className = 'course-card'>
                <h2>{course.DEPARTMENT}{course.COURSECODE}: {course.TITLE}</h2>
                <p>Professor: {course.PROFESSOR}</p>
                <p>Academic Year: {course.ACADEMICYEAR}</p>
                <p>Block: {course.BLOCKNUM}</p>
                <p>Seats Available: {course.SEATS}</p>
                <p>Credits: {course.CREDITS}</p>
                {course.FEE !== null && (
                        <p>Fees: ${course.FEE}</p>
                    )}
                    {course.FEE == null && (
                        <p>No Fees</p>
                    )}
        </div>
)}
export default CartCourseTemplate
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
        <div key={course.KEYCODE} className = 'cartTemplate'>
                <h2>{course.DEPARTMENT}{course.COURSECODE}: {course.TITLE}</h2>
        </div>
)}
export default CartCourseTemplate
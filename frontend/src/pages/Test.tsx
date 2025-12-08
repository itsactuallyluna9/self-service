import React from 'react'
import CartCourseTemplate from '../components/CartCourseTemplate'
import './Test.css'

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

function Test() {
    const CourseInfo: CourseData = {
        KEYCODE: 12345,
        DEPARTMENT: 'tst',
        TITLE: 'test',
        PROFESSOR: 'test',
        ACADEMICYEAR: 'test',
        BLOCKNUM: 'test',
        SEATS: 12,
        CREDITS: 1,
        FEE: 0,
        COURSECODE: 123,
    }
    return (
        <div className='test'>
            <form><CartCourseTemplate {...CourseInfo}></CartCourseTemplate></form>
        </div>
    )
}
export default Test
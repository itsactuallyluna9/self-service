import React, { useState } from 'react'
import './IndividualCourseTemplate.css'
import Logo from '../assets/Cornell_logo.png'
import { useNavigate }  from 'react-router'


interface CourseProps {
    ACADEMICYEAR: number,
    BLOCKNUM: string,
    COURSECODE: number,
    COURSETYPES: null | string,
    CREDITS: number,
    DEPARTMENT: string,
    DESCR: null | string,
    FEE: null | number,
    PROFESSOR: any,
    KEYCODE: number,
    PREREQS: null | string,
    SEATS: number,
    TITLE: string
}


interface CartProps { // edit later to have full info
    KEYCODE : number,
    TITLE : string,
    DEPARTMENT : string,
    COURSECODE : number,

}



const IndividualCourseTemplate = (data: CourseProps) => {
const nav = useNavigate()

    return (
        <div className='ind'>
            <form>
                <img src={Logo} alt="Logo" />
                <h2>{data.DEPARTMENT}{data.COURSECODE}: {data.TITLE}</h2>
                <div className="course-info">
                    <div className="course-info-left">
                        <p>
                        Block: {data.BLOCKNUM} | Year: {data.ACADEMICYEAR}
                        </p>
                    </div>
                    <div className="course-info-right">
                        <p>Seats: {data.SEATS}</p>
                        <p>Seats Left: 0 </p>
                    </div>
                </div>
                <div className="instructor-info">
                    <p>Instructors:</p>
                    <div className="instructor-label">
                        <p>{data.PROFESSOR}</p>
                    </div>
                </div>
                <div className="additional-course-info">
                    <div className="course-description">
                        <h4>Description:</h4>
                        <p>{data.DESCR ? data.DESCR : 'None'}</p>
                    </div>
                    <div className="course-specs">
                        <p>Prerequisites: {data.PREREQS ? data.PREREQS : 'None'}</p>
                        <p>Department: {data.DEPARTMENT} Course Type: {data.COURSETYPES ? data.COURSETYPES : 'None'}</p>
                        <p>Fees: {data.FEE ? `$${data.FEE}` : 'None'}</p>
                    </div>
                </div>
                <div className="button-container">
                    <button 
                    type='button'
                    className="back-button" 
                    onClick={()=>nav(-1)}
                    >Back</button>
                </div>
            </form>
        </div>
    )}
export default IndividualCourseTemplate
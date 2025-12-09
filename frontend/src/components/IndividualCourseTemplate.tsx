import React, { useState } from 'react'
import '../cssFiles/IndividualCourseTemplate.css'
import Logo from '../assets/Cornell_logo.png'
import { useNavigate }  from 'react-router'
import register from './Register'


interface CourseProps {
    academicyear: number,
    blocknum: string,
    coursecode: number,
    coursetypes: null | string,
    credits: number,
    department: string,
    DESCR: null | string,
    fee: null | number,
    professor: any,
    id: number,
    prereqs: null | string,
    seats: number,
    title: string
}


interface CartProps { // edit later to have full info
    id : number,
    title : string,
    department : string,
    coursecode : number,

}



const IndividualCourseTemplate = (data: CourseProps) => {
    const nav = useNavigate()
    const registerCourse = async (code : number) => {
        const courses = [code]
        const reply = register("jwaughon27", courses)
        const result = await reply
        if (result === true) {
            console.log("success register")
        }
        else {
            console.log("false register")
        }
    }

    return (
        <div className='ind'>
            <form>
                <img src={Logo} alt="Logo" />
                <h2>{data.department}{data.coursecode}: {data.title}</h2>
                <div className="course-info">
                    <div className="course-info-left">
                        <p>
                        Block: {data.blocknum} | Year: {data.academicyear}
                        </p>
                    </div>
                    <div className="course-info-right">
                        <p>Seats: {data.seats}</p>
                        <p>Seats Left: 0 </p>
                    </div>
                </div>
                <div className="instructor-info">
                    <p>Instructors:</p>
                    <div className="instructor-label">
                        <p>{data.professor}</p>
                    </div>
                </div>
                <div className="additional-course-info">
                    <div className="course-description">
                        <h4>Description:</h4>
                        <p>{data.DESCR ? data.DESCR : 'None'}</p>
                    </div>
                    <div className="course-specs">
                        <p>Prerequisites: {data.prereqs ? data.prereqs : 'None'}</p>
                        <p>Department: {data.department} Course Type: {data.coursetypes ? data.coursetypes : 'None'}</p>
                        <p>Fees: {data.fee ? `$${data.fee}` : 'None'}</p>
                        <p>Credits: {data.credits}</p>
                    </div>
                </div>
                <div className="button-container">
                    <button 
                    type='button'
                    className="back-button" 
                    onClick={()=>nav(-1)}
                    >Back</button>
                </div>
                <div className="button-container">
                    <button 
                    type='button'
                    className="back-button" 
                    onClick={()=>void registerCourse(data.coursecode)}
                    >Register</button>
                </div>
            </form>
        </div>
    )}
export default IndividualCourseTemplate
import React from 'react'
import './IndividualCourseTemplate.css'
import Logo from '../assets/Cornell_logo.png'
import { useNavigate }  from 'react-router'

interface CourseProps {
    ACADEMICYEAR: number,
    BLOCKNUM: string,
    COURSECODE: string,
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



const IndividualCourseTemplate = (data: CourseProps) => {

    const nav = useNavigate()

    const returnToHome = () =>  {
        return nav('/CourseInformationPage')
    }

    return(
        <div className='ind'>
            <form>
                <img src={Logo} alt="Logo" />
                <h1>{data.DEPARTMENT}{data.COURSECODE}: {data.TITLE}</h1>
                <h3>Professor: {data.PROFESSOR}</h3>
                <h3>Block: {data.BLOCKNUM}</h3>
                <h4>Seats: {data.SEATS}</h4>
                <h4>Department: {data.DEPARTMENT}</h4>
                <h4>Credits: {data.CREDITS}</h4>
                {data.DESCR !== null && (
                    <h6>{data.DESCR}</h6>
                )}
                {data.FEE !== null && (
                    <h5>Fees: ${data.FEE}</h5>
                )}
                {data.FEE == null && (
                    <h5>No Fees</h5>
                )}
                {data.COURSETYPES !== null && (
                    <h5>Course Type: {data.COURSETYPES}</h5>
                )}
                {data.PREREQS !== null && (
                    <h5>Prerequisites: {data.PREREQS}</h5>
                )}
                {data.PREREQS == null && (
                    <h5>Prerequisites: None</h5>
                )}
                <button onClick={()=>{returnToHome()}}>Back</button>
            </form>
        </div>
    )
}
export default IndividualCourseTemplate
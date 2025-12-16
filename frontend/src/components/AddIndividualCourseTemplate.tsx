import React from 'react'
import '../cssFiles/IndividualCourseTemplate.css'
import Logo from '../assets/Cornell_logo.png'
import { useNavigate }  from 'react-router'
import register from './Register'


interface CourseProps {
    coursecode: number | null,
    coursetypes: string | null,
    credits: number | null,
    department: string | null,
    description: string | null,
    fee: null | number,
    id: number,
    prereqs: string | null,
    title: string | null,
}



const AddIndividualCourseTemplate = (data: CourseProps) => {
    const nav = useNavigate()

    return (
        <div className='ind'>
            <form>
                <img src={Logo} alt="Logo" />
                <h2>{data.department}{data.coursecode}: {data.title}</h2>
                <div className="course-info">
                </div>
                <div className="additional-course-info">
                    <div className="course-description">
                        <p>Description:</p>
                        <p>{data.description && data.description} {!data.description && "Data Missing"}</p>
                    </div>
                    <div className="course-specs">
                        <p>Prerequisites: {data.prereqs ? data.prereqs : 'None'}</p>
                        <p>Department: {data.department} </p>
                        <p>Course Type: {data.coursetypes ? data.coursetypes : 'None'}</p>
                        <p>Fees: {data.fee ? `$${data.fee}` : 'None'}</p>
                        <p>Credits: {data.credits && data.credits} {!data.credits && "Data Missing"}</p>
                    </div>
                </div>
                <div className='buttons'>
                    <div className="button-container">
                        <button 
                        type='button'
                        className="back-button" 
                        onClick={()=>nav(-1)}
                        >Back</button>
                    </div>
                </div>
            </form>
        </div>
    )}
export default AddIndividualCourseTemplate
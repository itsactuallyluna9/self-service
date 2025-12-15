import React from 'react'
import '../cssFiles/IndividualCourseTemplate.css'
import Logo from '../assets/Cornell_logo.png'
import { useNavigate }  from 'react-router'
import register from './Register'


interface CourseProps {
    academicyear: number | null,
    blocknum: string | null,
    coursecode: number | null,
    coursetypes: null | string,
    credits: number | null,
    department: string | null,
    description: null | string,
    fee: null | number,
    professor: string | null,
    id: number,
    prereqs: null | string,
    totalseats: number | null,
    title: string | null,
    openseats: number | null,
    waitcount: number | null
}



const IndividualCourseTemplate = (data: CourseProps) => {
    const nav = useNavigate()
    const registerCourse = async (code : number) => {
        const courses = [code]
        const reply = register(localStorage.getItem('UserID'), courses)
        const result = await reply
        if (result === true) {
            console.log("success removal")
            nav('/RegisteredCourses')
        }
        else {
            console.log("false removal")
            //setError("Registration Failed. Please try again.")
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
                        {data.blocknum && data.blocknum} {!data.blocknum && "Block: Data Missing"} | 
                        Year: {data.academicyear && data.academicyear} {!data.academicyear && "Data Missing"}
                        </p>
                    </div>
                    <div className="course-info-right">
                        { data.openseats && data.openseats > 0 && (
                            <>
                                <p>Seats: {data.totalseats && data.totalseats} {!data.totalseats && "Data Missing"} 
                                | Seats Left: {data.openseats && data.openseats} {!data.openseats && "Data Missing"}</p>
                            </>
                        )}
                        {data.openseats && data.openseats <= 0 && (
                            <p>In Waitlist: {data.waitcount}</p>
                        )}
                        {!data.openseats && 
                        <p>Seats: Data Missing | Seats Left: Data Missing</p>}
                    </div>
                </div>
                <div className="instructor-info">
                    <p>Instructors:</p>
                    <div className="instructor-label">
                        <p>{data.professor && data.professor} {!data.professor && "Data Missing"}</p>
                    </div>
                </div>
                <div className="additional-course-info">
                    <div className="course-description">
                        <p>Description:</p>
                        <p>{data.description && data.description} {!data.description && "Data Missing"}</p>
                    </div>
                    <div className="course-specs">
                        <p>Prerequisites: {data.prereqs ? data.prereqs : 'None'}</p>
                        <p>Department: {data.department} Course Type: {data.coursetypes ? data.coursetypes : 'None'}</p>
                        <p>Fees: {data.fee ? `$${data.fee}` : 'None'}</p>
                        <p>Credits: {data.credits && data.credits} {!data.credits && "Data Missing"}</p>
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
                    onClick={()=>void registerCourse(data.id)}
                    >Register</button>
                    {/* {error && <p>{error}</p>} */}
                </div>
            </form>
        </div>
    )}
export default IndividualCourseTemplate
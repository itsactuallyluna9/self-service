import React from 'react'
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
    description: null | string,
    fee: null | number,
    professor: any,
    id: number,
    prereqs: null | string,
    totalseats: number,
    title: string,
    openseats: number,
    waitcount: number
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
                        {data.blocknum} | Year: {data.academicyear}
                        </p>
                    </div>
                    <div className="course-info-right">
                        {data.openseats > 0 && (
                            <>
                                <p>Seats: {data.totalseats} | Seats Left: {data.openseats}</p>
                            </>
                        )}
                        {data.openseats <= 0 && (
                            <p>In Waitlist: {data.waitcount}</p>
                        )}
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
                        <p>Description:</p>
                        <p>{data.description ? data.description : 'None'}</p>
                    </div>
                    <div className="course-specs">
                        <p>Prerequisites: {data.prereqs ? data.prereqs : 'None'}</p>
                        <p>Department: {data.department} </p>
                        <p>Course Type: {data.coursetypes ? data.coursetypes : 'None'}</p>
                        <p>Department: {data.department} </p>
                        <p>Course Type: {data.coursetypes ? data.coursetypes : 'None'}</p>
                        <p>Fees: {data.fee ? `$${data.fee}` : 'None'}</p>
                        <p>Credits: {data.credits}</p>
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
                    <div className="button-container">
                        <button 
                        type='button'
                        className="back-button" 
                        onClick={()=>void registerCourse(data.id)}
                        >Register</button>
                        {/* {error && <p>{error}</p>} */}
                    </div>
                </div>
            </form>
        </div>
    )}
export default IndividualCourseTemplate
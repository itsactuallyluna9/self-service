import React, { useState } from 'react'
import './IndividualCourseTemplate.css'
import Logo from '../assets/Cornell_logo.png'
import { useNavigate }  from 'react-router'
import { useCart } from "./CartContext";

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

    const { cartCourses, RemoveCourseFromCart, AddCourseToCart } = useCart();
    const [cartButtonText, setCartButtonText] = useState("Add course to cart")
    const [canAddCart, setCanAddCart] = useState(true)

    const nav = useNavigate()

    const returnToHome = () =>  {
        return nav('/CourseInformationPage')
    }

    const handleAdd = () => {
    const result = AddCourseToCart(data); // must return true/false

    if (result) {
        setCartButtonText("Success");
        setCanAddCart(false); // preventg double register
    } else {
        setCartButtonText("Failure");
        setCanAddCart(false);

        // revert after 5 seconds??
        setTimeout(() => {
        setCartButtonText("Add to cart");
        setCanAddCart(true);
        }, 5000);
    }
    };

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
                <button type="button" disabled={!canAddCart} onClick={()=>{handleAdd()}}>{cartButtonText}</button>
                <button type="button" onClick={()=>{returnToHome()}}>Back</button>
            </form>
        </div>
    )
}
export default IndividualCourseTemplate
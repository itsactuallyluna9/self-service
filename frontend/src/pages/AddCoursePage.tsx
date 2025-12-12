import { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router'
import Navbar from '../components/Navbar' 
import { useCart } from '../components/CartContext';
import CartTemplate from '../components/CartTemplate'


function AddCoursePage() {
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")
    const nav = useNavigate()
    const location = useLocation()
    
    return (
        <div>
            <Navbar/>
            <div className="add-course">
            </div>
        </div>
    );
}

export default AddCoursePage;
import { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router'
import Navbar from '../components/Navbar' 
import '../cssFiles/CreateCourse.css'

function CreateCoursePage() {
    const nav = useNavigate()
    const location = useLocation
    return (
        <div className="CreateCoursePage-wrapper">
            <Navbar />
            <h1>Create Course Page - Under Construction</h1>
        </div>
    )
}

export default CreateCoursePage
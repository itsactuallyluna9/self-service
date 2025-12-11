import logo from '../assets/Cornell_logo.png'
import '../cssFiles/Navbar.css'
import { useNavigate } from 'react-router'
import { useState } from 'react';
import LogoutModal from './Logout';

const Navbar = () => {

    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSignOutClicked = () => {
        setIsModalOpen(true);
    }
    const handleConfirmSignOut = () => {
        // Implement signout logic here. CarterLampe 12/5/2025.
        localStorage.removeItem('UserId');
        console.log("User signed out.")
        
        return navigate('/SignIn/')
    }

    const handleCancelSignOut = () => {
        setIsModalOpen(false);
    }
    return(
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/HomePage" className="logo">
                <img src={logo} alt="Logo" />
                </a>
            </div>
            
            <div className="navbar-center">
                <ul className="nav-links">
                {/*Add links here for Students */}
                {localStorage.getItem('UserType') == "STUDENT" && (
                    <>
                        <a href="/CourseInformationPage">Courses</a>
                        <a href="/RegisteredCourses">My Schedule</a>
                    </>)}
                {/*Add links here for the Registrar */}
                {localStorage.getItem('UserType') == "REGISTRAR" && (
                    <>
                        <a href="/AddCoursePage">Add Course</a>
                        <a href="/CreateCoursePage">Create Course</a>
                    </>
                )}

                </ul>
            </div>
            <div className="navbar-right">
                <button className="signout-button" onClick={handleSignOutClicked}>
                Sign Out
                </button>
            </div>
            <LogoutModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmSignOut}
                onCancel={handleCancelSignOut}
            />
        </nav>
    );
};

export default Navbar;
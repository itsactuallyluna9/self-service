import logo from '../assets/Cornell_logo.png'
import './Navbar.css'
import LoginID from '../components/LoginID'
import { useNavigate } from 'react-router'

const Navbar = () => {

    const navigate = useNavigate()

    const handleSignout = () => {
        // Implement signout logic here. CarterLampe 12/5/2025.
        LoginID.id = ''
        console.log("User signed out.")
        return navigate('/SignIn/')
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
                {<><a href="/CourseInformationPage">Courses</a>
                <a href="/RegisteredCourses">My Schedule</a></>}

                </ul>
            </div>
            <div className="navbar-right">
                <button className="signout-button" onClick={handleSignout}>
                Sign Out
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
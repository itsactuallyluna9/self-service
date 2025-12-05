


const Navbar = () => {

    const handleSignout = () => {
        // Implement signout logic here. CarterLampe 12/5/2025.
        console.log("Signout button clicked");
    }

    return(
        <nav className= "navbar">
            <div className = "navbar-left">
                <a href = "#" className="logo">Course Info</a>
            </div>

            <div className = "navbar-center">
                <ul className="links">
                    <li><a href="/CourseInformationPage/">Home</a></li>
                </ul>
            </div>

            <div className = "navbar-right">
                <div className="button-container">
                <button onClick={handleSignout}>Submit</button>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
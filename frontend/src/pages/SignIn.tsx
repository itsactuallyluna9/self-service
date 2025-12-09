import { useState } from "react"
import { useNavigate } from "react-router"
import { useLocation } from "react-router"
import './SignIn.css'
import Logo from '../assets/Cornell_logo.png'
import { createContext } from 'react'
import UserID from '../components/LoginID'

//TESTING LOGIN FOR STUDENT : 
//user: ckawase25
//password: password123
function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const navigate = useNavigate()
    
    const handleSubmit = async (e: React.FormEvent) => {
        // Prevent default form submission behavior. CarterLampe 12/1/2025
        e.preventDefault()
        setError('')
    

        // Simple check to ensure both username and password are not empty. CarterLampe 12/1/2025
        if (!username || !password) {
        setError('Please enter both username and password.')
        return
        }

        try{
            // Fetch call to backend login API endpoint. CarterLampe 12/1/2025.
            const response = await fetch('https://10.101.128.56:6001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            })
            
            // Dummy response for testing. CarterLampe 12/1/2025.
            // const response = {
            //     ok: true,
            //     json: async () => ({
            //         success: false,
            //         token: "test-token",
            //         message: "Login unsuccessful"
            //     })
            // };

            const data = await response.json();

            if (response.ok){
                
                if (data.success){
                    console.log("Login successful.", data)
                    UserID.id = username
                    //Object.freeze(LoginID)
                    return navigate('/CourseInformationPage/')
        
                }
                else {
                console.log("Login failed.", data);
                setError("Username or password is incorrect.")
                }
            }
        }
        catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        }
    }

    return (
        <div className="signin">
            <img src={Logo} alt="Logo" />

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                type = "text"
                name =  "username"
                id = "username"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
                autoComplete="off"
                />

                <label htmlFor = "password"> Password</label>
                <input
                type = "password"
                id = "password"
                name =  "password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                autoComplete="off"
                />
                
                <div className="button-container">
                <button onClick={handleSubmit}>Submit</button>
                </div>

                {error && <p>{error}</p>}
            </form>
        </div>
        
    )
}
export default SignIn

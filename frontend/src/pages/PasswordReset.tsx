import { useState } from "react"
import { useNavigate } from "react-router"
import { useLocation } from "react-router"
import '../cssFiles/SignIn.css'
import Logo from '../assets/Cornell_logo.png'

function PasswordReset() {
    const [username, setUsername] = useState('')
    const [new_password, setPasswordNew] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [error, setError] = useState('')
    const [confirm, setConfirm] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    const navigate = useNavigate()
    
    const handleSubmit = async (e: React.FormEvent) => {
        // Prevent default form submission behavior. CarterLampe 12/1/2025
        e.preventDefault()
        setError('')
    
        if (!username || !new_password || !passwordConfirm) {
        setError('Please fill out all fields.')
        return
        }

        if (new_password != passwordConfirm) {
        setError('Passwords do not match.')
        return
        }

        try{
            // Fetch call to backend login API endpoint. CarterLampe 12/1/2025.
            const response = await fetch('https://10.101.128.72:6001/api/reset_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, new_password }),
            })
            
            //Dummy response for testing. CarterLampe 12/1/2025.
             /*
             const response = {
                 ok: true,
                 json: async () => ({
                     success: true,
                 })
            }; 
            */

            const data = await response.json();

            if (response.ok){
                
                if (data.success){
                    console.log("Password changed", data)
                    setConfirm("Password changed successfully.")
                    setIsDisabled(true)
                    //setIsVisible(false)
                }
                else {
                console.log("Password change failed.", data);
                setError("Username or password is incorrect.")
                }
            }
        }
        catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Password reset error:', err);
        }
    }

    return (
        <div className="signin">
            <img src={Logo} alt="Logo" />
            <h1>Password Reset</h1>
            {isVisible ? (
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                type = "text"
                value = {username}
                disabled = {isDisabled}
                onChange = {(e) => setUsername(e.target.value)}
                autoComplete="off"
                />

                <label htmlFor = "new_password">New Password</label>
                <input
                type = "password"
                value = {new_password}
                disabled = {isDisabled}
                onChange = {(e) => setPasswordNew(e.target.value)}
                autoComplete="off"
                />

                <label htmlFor = "passwordConfirm">Confirm New Password</label>
                <input
                type = "password"
                value = {passwordConfirm}
                disabled = {isDisabled}
                onChange = {(e) => setPasswordConfirm(e.target.value)}
                autoComplete="off"
                />
                
                <div className="button-container">
                <button onClick={handleSubmit}>Submit</button>
                </div>

                <div className="error">{error && <p>{error}</p>}</div>

                <div className="confirm">{confirm && <p>{confirm}</p>}</div>
                
            </form>

            ) : null }
            <a href="/SignIn" className="reset-link">Return to sign-in page</a>
        </div>
        
    )
}
export default PasswordReset

import { useState } from "react"
import { createRoot } from "react-dom/client"
import { useNavigate } from "react-router"
import './SignIn.css'


function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true);
        
        if (!username || !password) {
        setError('Please enter both username and password.')
        return
        }

        try{
            // Fetch call to backend login API endpoint. CarterLampe 12/1/2025
            const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            })
            
            // Dummy response for testing. CarterLampe 12/1/2025
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
                    return navigate('/HomePage')
        
                }
                
                else {
                console.log("Login failed.", data);
                setError("Login failed.")
                }
            }
        }
        catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
            type = "text"
            name =  "username"
            id = "username"
            value = {username}
            onChange = {(e) => setUsername(e.target.value)}
            />

            <label htmlFor = "password"> Password</label>
            <input
            type = "password"
            id = "password"
            name =  "password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            />
            
            <div>
            <button onClick={handleSubmit}>Submit</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        
    )
}
export default SignIn
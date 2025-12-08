import { useState } from "react"

export const register = async (courseIDs: number[]) => {
    console.log("Registering for courses")

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    try{
                // Fetch call to backend Register API endpoint. CarterLampe 12/1/2025.

                // const response = await fetch('TODO: Put register API here.', {
                // method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({ username, courseIDs }),
                // })
                
                
                const response = {
                    ok: true,
                    json: async () => ({
                        success: true
                    })
                };

                const data = await response.json();
    
                if (response.ok){
                    if (data.success){
                        return true
                    }
                    else {
                    console.log("Registration failed.", data);
                    setError("Registration failed.")
                    }
                }
            }
            catch (err) {
                setError('An error occurred. Please try again.');
                console.error('Registration Error', err);
            }
}
// register.ts
export const register = async (
    username: string | null,
    courseIDs: number[]
): Promise<boolean> => {
    console.log("Registering for courses...");

    try {
        console.log({username, courseIDs})
        // Replace with real API call
        const response = await fetch('https://10.101.128.72:6001/api/register_courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, courseIDs }),
        });

        // // Fake response for testing
        // const response = {
        //     ok: true,
        //     json: async () => ({ success: true })
        // };

        const data = await response.json();

        if (response.ok && data.success) {
            return true;
        }

       // data.waitlist_position = number 

        console.error("Registration failed:", data);
        return false;
    } catch (err) {
        console.error("Registration error:", err);
        return false;
    }
};

export default register;

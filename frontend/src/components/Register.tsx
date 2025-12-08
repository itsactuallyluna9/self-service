// register.ts
export const register = async (
    username: string,
    courseIDs: number[]
): Promise<boolean> => {
    console.log("Registering for courses...");

    try {
        // Replace with real API call
        // const response = await fetch('YOUR_REGISTER_API', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ username, courseIDs }),
        // });

        // Fake response for testing
        const response = {
            ok: true,
            json: async () => ({ success: true })
        };

        const data = await response.json();

        if (response.ok && data.success) {
            return true;
        }

        console.error("Registration failed:", data);
        return false;
    } catch (err) {
        console.error("Registration error:", err);
        return false;
    }
};

export default register;

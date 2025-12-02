import react from 'react';
import { useEffect, useState}  from 'react';
import IndividualClassCard from './components/IndividualClassCard.tsx';

const [courseID, setCourseID] = useState('')

function App() {

    /*const CourseInfoPageLoader = () => {
    useEffect(() => {
        try {
            const handlePageLoad = () => {
                console.log("Page has loaded.");
                // Fetch call to backend login API endpoint. CarterLampe 12/1/2025
                const response = await fetch('TODO: Enter Course Info Endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseID }),
                })

                const data = await response.json();

                if (response.ok){

                    if (data.success){
                        console.log("Course found succesfully.", data)
                    }
                    
                    else {
                    console.log("Course ID not found..", data);
                    setError("Course ID not found")
                    }
                }
        }
        catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Course id error:', err);
        }
            
        };
        window.addEventListener("load",handlePageLoad)

        return () => {
            window.removeEventListener("load",handlePageLoad)
        }
    } )
*/

    return(
        <div>
            <IndividualClassCard 
            name = 'Software Development Processes'
            professor = 'Ajit Chavan'
            seats = '5'
            block = '4'
            department = 'Computer Science'
            credits = '1'
            description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            courseType = ''
            />
        </div>
    )
}
export default App;
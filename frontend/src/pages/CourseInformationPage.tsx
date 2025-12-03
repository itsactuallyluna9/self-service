import React from 'react';
import { useState, useEffect } from 'react';

interface CourseData {
  id: number;
  code: string;
  title: string;
  professor: string;
  year: string;
  block: string;
  seats: number;
  department: string;
  credits: number;
  fees: number;
}

interface CoursePageTemplateProps {
    courseData: CourseData;
}
const testClasses = [
  {
    id: 1,
    code: 'CSC318',
    title: 'Software Development Processes',
    professor: 'Ajit Chavan',
    year: '2025',
    block: '4',
    seats: 10,
    department: 'Computer Science',
    credits: 1.00,
    fees: 0.00,
  },
  {
    id: 2,
    code: 'MAT101',
    title: 'Calculus I',
    professor: 'Dr. Smith',
    year: '2025',
    block: '2',
    seats: 25,
    department: 'Mathematics',
    credits: 0.75,
    fees: 50.00,
  },
];


const CoursesPageTemplate: React.FC<CoursePageTemplateProps> = ({ courseData }) => {
  const {id, code, title, professor, block, year, seats, department, credits, fees } = courseData;

  return (
    <div>
      <h2>{code} {title}</h2>
      <p>Professor: {professor}</p>
      <p>Department: {department}</p>
      <p>Year: {year}</p>
      <p>Block: {block}</p>
      <p>Seats: {seats}</p>
      <p>Credits: {credits}</p>
      <p>Fees: ${fees}</p>
    </div>
  );
};

export default function CoursePageLoader() {
  
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await fetch('/'); 
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); 
        }
        
        const data = await response.json();

        setCourses(data.courses || testClasses); // Use testClasses as fallback
        
      } catch (e: any) {
        console.error("Error fetching courses:", e);
        setError(`Failed to load courses: ${e.message}`);
        setCourses(testClasses);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourses();
  }, []);

  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p className="error">Error: {error} | Displaying mock data.</p>;
  }

  if (courses.length === 0) {
    return <p>No courses found.</p>;
  }

  return (
    <main className="course-grid">
      {/* Map over the fetched courses array */}
      {courses.map((courseData) => (
        // Key prop is essential for list rendering
        <CoursesPageTemplate key={courseData.id} courseData={courseData} />
      ))}
    </main>
  );
}

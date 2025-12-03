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

/*
 export default function CoursePageLoader() {
    return (
        <main>
          {testClasses.map((courseData) => (
            <CoursesPageTemplate key={courseData.id} courseData={courseData} />
          ))}
        </main>



        )
  */
        
function DisplayCourses() {
    const [courses, setCourses] = useState<CourseData[]>([])
    const [courseID, setCourseID] = useState<string>("");

    useEffect(() => {
    async function loadCourses() {
        try {
            const response = await fetch('/');
            const data = await response.json();

        if (response.ok){
            setCourses(data.courses);
        }
            
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
    }
    loadCourses();
    }, []);

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

  }

  

  export default DisplayCourses
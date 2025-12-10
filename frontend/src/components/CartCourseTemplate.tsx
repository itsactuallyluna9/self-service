
interface CourseData {
  id: number;
  department: string;
  title: string;
  professor: string;
  academicyear: string;
  blocknum: string;
  seats: number;
  credits: number;
  fee: number | null;
  coursecode: number;
  }

const CartCourseTemplate = (course: CourseData) => {

    return (
        <div key={course.id} className = 'cartTemplate'>
                <h2>{course.department}{course.coursecode}: {course.title}</h2>
        </div>
)}
export default CartCourseTemplate
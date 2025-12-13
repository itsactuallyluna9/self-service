import '../../cssFiles/UTComponents.css'
import { type UTCourse} from '../../data/UnofficialTranscriptData'

interface UTCourseProps {
  course: UTCourse;
  keyId: string;
}

const Course = ({ course, keyId }: UTCourseProps) => {
  return (
    <div key={keyId} className="ut-course">
      <p>{course.coursecode}</p>
      <p>{course.title}</p>
      <p>{course.subtype}</p>
      <p>{course.grade}</p>
      <p>{course.credits}</p>
      <p>{course.qualityPoints}</p>
    </div>
  );
};

export default Course;
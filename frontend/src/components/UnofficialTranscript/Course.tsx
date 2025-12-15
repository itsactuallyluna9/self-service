import '../../cssFiles/UTComponents.css'
import { type UTCourse} from '../../data/UnofficialTranscriptData'

interface UTCourseProps {
  course: UTCourse;
  keyId: string;
}

const Course = ({ course, keyId }: UTCourseProps) => {
  return (
    <div key={keyId} className="ut-course">
      <p className="col">{course.coursecode}</p>
      <p className="col-title">{course.title}</p>
      <p className="col">{course.subtype}</p>
      <p className="col">{course.grade}</p>
      <p className="col">{course.credits.toFixed(2)}</p>
      <p className="col">{course.qualityPoints.toFixed(2)}</p>
    </div>
  );
};

export default Course;
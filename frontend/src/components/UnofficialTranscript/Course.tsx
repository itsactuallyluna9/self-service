import '../../cssFiles/UTComponents.css'
import { type UTCourse} from '../../data/UnofficialTranscriptData'

interface UTCourseProps {
  course: UTCourse;
}

const Course = ({ course }: UTCourseProps) => {
  return (
    <div className="ut-course">
      <p className="col">{course.coursecode}</p>
      <p className="col-title">{course.title}</p>
      <p className="col">{course.subtype}</p>
      <p className="col">{course.grade || ""} </p>
      <p className="col">{course.credits != null ? course.credits.toFixed(2) : "0.00"}</p>
      <p className="col">{course.qualityPoints != null ? course.qualityPoints.toFixed(2) : "0.00"}</p>
    </div>
  );
};

export default Course;
import '../../cssFiles/UTComponents.css'
import { type UTTerm } from '../../data/UnofficialTranscriptData'
import Course from './Course';

interface UTTermProps {
  term: UTTerm;
  year: number;
}

const Term = ({ term, year }: UTTermProps) => {
  if (!term.courses || term.courses.length === 0) {
    return null;
  }
  return (
    <div className="ut-term">
      <p className='ut-term-title'><strong>{term.term === "Spring" ? ` ${year + 1} ${term.term}` : `${year} ${term.term}`}</strong></p>

      <div className="ut-term-header">
        <p className="col">Course</p>	
        <p className="col-title">Title</p>	
        <p className="col">Subtype</p>	
        <p className="col">Grade</p>	
        <p className="col">Credits</p>	
        <p className="col">Quality Points</p>
      </div>

      {term.courses.map((course, index) => (
        <Course
          key={`${course.coursecode}-${year}-${term.term}-${index}`}
          course={course}
        />
      ))}
      <div>
      {/* <div className="ut-term-header">
        <p></p>
        <p>Attempted Credit</p>
        <p>Earned Credits</p>	
        <p>Total Credits</p>
        <p>GPA Credits</p>	
        <p>Quality Points</p>	
        <p>GPA</p>	
        <p>Class Rank</p>	
        <p>Class Size</p>
      </div>
      <div className="ut-term-stats">
        <p><strong>Term</strong></p>
        <p>{term.termStats.attemptedCredits.toFixed(2)}</p>
        <p>{term.termStats.earnedCredits.toFixed(2)}</p>
        <p>{term.termStats.totalCredits.toFixed(2)}</p>
        <p>{term.termStats.gpaCredits.toFixed(2)}</p>
        <p>{term.termStats.qualityPoints.toFixed(2)}</p>
        <p>{term.termStats.gpa.toFixed(4)}</p>
        <p>{term.termStats.classRank}</p>
        <p>{term.termStats.classSize}</p>
      </div>
      <div className="ut-term-stats">
        <p><strong>Overall</strong></p>
        <p>{term.overallStats.attemptedCredits.toFixed(2)}</p>
        <p>{term.overallStats.earnedCredits.toFixed(2)}</p>
        <p>{term.overallStats.totalCredits.toFixed(2)}</p>
        <p>{term.overallStats.gpaCredits.toFixed(2)}</p>
        <p>{term.overallStats.qualityPoints.toFixed(2)}</p>
        <p>{term.overallStats.gpa.toFixed(4)}</p>
        <p>{term.overallStats.classRank}</p>
        <p>{term.overallStats.classSize}</p>
      </div> */}
        
      </div>
    </div>
  );
};

export default Term;
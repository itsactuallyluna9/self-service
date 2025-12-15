import '../../cssFiles/UTComponents.css'
import { type UTTerm } from '../../data/UnofficialTranscriptData'
import Course from './Course';

interface UTTermProps {
  term: UTTerm;
  year: number;
}

const Term = ({ term, year }: UTTermProps) => {
  return (
    <div className="ut-term">
      <p><strong>{year} {term.term}</strong></p>
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
          keyId={`${course.coursecode}-${year}-${term.term}-${index}`}
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
        <p>{term.termStats.attemptedCredits}</p>
        <p>{term.termStats.earnedCredits}</p>
        <p>{term.termStats.totalCredits}</p>
        <p>{term.termStats.gpaCredits}</p>
        <p>{term.termStats.qualityPoints}</p>
        <p>{term.termStats.gpa}</p>
        <p>{term.termStats.classRank}</p>
        <p>{term.termStats.classSize}</p>
      </div>
      <div className="ut-term-stats">
        <p><strong>Overall</strong></p>
        <p>{term.overallStats.attemptedCredits}</p>
        <p>{term.overallStats.earnedCredits}</p>
        <p>{term.overallStats.totalCredits}</p>
        <p>{term.overallStats.gpaCredits}</p>
        <p>{term.overallStats.qualityPoints}</p>
        <p>{term.overallStats.gpa}</p>
        <p>{term.overallStats.classRank}</p>
        <p>{term.overallStats.classSize}</p>
      </div> */}
        
      </div>
    </div>
  );
};

export default Term;
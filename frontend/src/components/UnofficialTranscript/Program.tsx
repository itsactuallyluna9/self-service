import '../../cssFiles/UTComponents.css'
import { type UTProgram } from '../../data/UnofficialTranscriptData'

interface UTProgramsProps {
  programs: UTProgram[];
}

const Program = ({ programs }: UTProgramsProps) => {
  return (
    <>
    <div className="ut-term-header">
        <p>Program / Degree / Curriculum</p>
        <p>Degree Awarded</p>	
        <p>Date Granted</p>
    </div>
    { programs.map((program, idx) => (
        <div key={idx} className="ut-course">
        <p>{program.program}/{program.degree}/{program.curriculum}</p> 
        <p>{program.degreeAwarded
            ? `Awarded ${program.dateGranted}`
            : "No Degree Awarded Yet"}</p>
        <p>{program.dateGranted}</p>
        </div>
  ))}
  </>
  );
};

export default Program;
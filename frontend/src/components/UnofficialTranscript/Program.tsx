import '../../cssFiles/UTComponents.css'
import { type UTProgram } from '../../data/UnofficialTranscriptData'

interface UTProgramsProps {
  programs: UTProgram[];
}

const Program = ({ programs }: UTProgramsProps) => {
  return (
    <>
    <div className="ut-term-header">
        <p className="col-program">Program / Degree / Curriculum</p>
        <p className='col-mid'>Degree Awarded</p>	
        <p className='col-mid'>Date Granted</p>
    </div>
    { programs.map((program, idx) => (
        <div key={idx} className="ut-course">
        <p className='col-program'>{program.program}/{program.degree}/{program.curriculum}</p> 
        <p className='col-mid'>{program.degreeAwarded
            ? `Awarded ${program.dateGranted}`
            : "No Degree Awarded Yet"}</p>
        <p className="col-mid">{program.dateGranted}</p>
        </div>
  ))}
  </>
  );
};

export default Program;
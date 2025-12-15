import '../../cssFiles/Transcript.css'
import { type UT } from '../../data/UnofficialTranscriptData'
import Year from './Year';
import Programs from './Program';

interface UTProps {
  utData: UT;
}

const Transcript = ({ utData }: UTProps) => {
  return (
    <div className="transcript">
      <div className="transcript-header">
        <h1>Unofficial Transcript</h1>
        <h2>Cornell College</h2>
        <h2>Office of the Registrar</h2>
        <p>600 First Street SW </p>
        <p>Mount Vernon, IA 52314</p>
      </div>

      <p><strong>Name:</strong> {utData.firstname} {utData.lastname}</p>
      <Programs programs={utData.programs} />

      <div className='ut-right'>
        <p><strong>Cumulative GPA:</strong> {utData.overallGPA}</p>
      </div>

      {utData.transcript.map((yearData) => (
        <Year key={yearData.year} yearData={yearData} />
      ))}

      <div className='ut-right'>
        <p><strong>Overall Credits:</strong> {utData.overallCredits.toFixed(2)}</p>
      </div>

    </div>
  );
};

export default Transcript;



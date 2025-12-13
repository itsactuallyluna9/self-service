import mockUT from '../data/UnofficialTranscriptData'
import Navbar from '../components/Navbar'
import Transcript from '../components/UnofficialTranscript/Transcript'

function UnofficialTranscript() {

  return (
    <>
    <Navbar />
    <Transcript utData={mockUT} />
    
    </>
  );
}

export default UnofficialTranscript;

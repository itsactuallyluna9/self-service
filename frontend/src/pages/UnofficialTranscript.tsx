import { useEffect, useState } from 'react';
import '../cssFiles/UnofficialTranscript.css'
import Navbar from '../components/Navbar'
import Transcript from '../components/UnofficialTranscript/Transcript'
import { type UT } from '../data/UnofficialTranscriptData'
import mockUT from '../data/UnofficialTranscriptData'


function UnofficialTranscript() {
  const [utData, setUtData] = useState<UT | null>(null);
  const [loading, setLoading] = useState(true);

  const USE_MOCK = true;

  useEffect(() => {
    if (USE_MOCK) {
      setUtData(mockUT);
      setLoading(false);
      return;
    }

    const fetchTranscript = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/transcript");
      const data = await res.json();
      setUtData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchTranscript();
  }, []);

  return (
    <div className="ut-page">
      <Navbar />
      {loading && <p className="message">Loading unofficial transcript...</p>}

      {!loading && !utData && (
        <p className="message">There is no unofficial transcript available</p>
      )}

      {!loading && utData && (
        <Transcript utData={utData} />
      )}
    </div>
  );
}

export default UnofficialTranscript;

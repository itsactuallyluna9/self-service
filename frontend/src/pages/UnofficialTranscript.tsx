import { useEffect, useState } from 'react';
import '../cssFiles/UnofficialTranscript.css'
import Navbar from '../components/Navbar'
import Transcript from '../components/UnofficialTranscript/Transcript'
import { type UT } from '../data/UnofficialTranscriptData'
import mockUT from '../data/UnofficialTranscriptData'



function UnofficialTranscript() {
  const [utData, setUtData] = useState<UT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const USE_MOCK = false; // Set to true to use mock data

  useEffect(() => {
    const UserID = localStorage.getItem('UserID');
    console.log("Current Logged In User ID:", UserID);

    if (USE_MOCK) {
      setUtData(mockUT);
      setLoading(false);
      return;
    }

    if (!UserID) {
    setError("User not logged in. Please log in to view your transcript.");
    setLoading(false);
    return;
    }
    // Reset states when fetching
    setLoading(true);
    setError(null);

    const fetchTranscript = async () => {
    try {
      const res = await fetch("https://10.101.128.72:6001/api/unofficial_transcript/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: UserID })
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setUtData(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching unofficial transcript:", err);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
          setError("Unable to connect to the server.");
        } else {
          setError(err instanceof Error ? err.message : "Failed to load transcript");
        }
        
        setUtData(null);
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

       {/* ✅ Display error message */}
      {error && (
        <div className="error-message" style={{
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          color: '#721c24',
          padding: '15px',
          margin: '20px',
          borderRadius: '4px'
        }}>
          <h3>⚠️ Error</h3>
          <p>{error}</p>
        </div>
      )}

      {/* ✅ Only show "no transcript" if no error and no data */}
      {!loading && !error && !utData && (
        <p className="message">There is no unofficial transcript available</p>
      )}

      {/* ✅ Only show transcript if no error */}
      {!loading && !error && utData && (
        <Transcript utData={utData} />
      )}
    </div>
  );
}

export default UnofficialTranscript;

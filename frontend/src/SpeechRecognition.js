import React, { useEffect, useState } from 'react';

const SpeechRecognition = () => {
  const [spokenResult, setSpokenResult] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStartRecording = async () => {
    setIsLoading(true);
    setError('');
    setSpokenResult('');

    try {
      const response = await fetch('http://localhost:5000/record');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSpokenResult(data.result);
    } catch (error) {
      setError('Error recording speech: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='inner1'>
      <h2>Speech Recognition</h2>
      <button className="btn1" onClick={handleStartRecording}>Start Recording</button>
      {isLoading && <p>Listening...</p>}
      {error && <p>{error}</p>}
      {spokenResult && <p>Spoken Text: {spokenResult}</p>}
    </div>
  );
};

export default SpeechRecognition;

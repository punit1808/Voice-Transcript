import React, { useState } from 'react';

const TextToSpeech = () => {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');

  const handleConvertToSpeech = async () => {
    try {
      const response = await fetch('http://localhost:5000/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle success as needed (playing audio, etc.)
      // For simplicity, assume success if no error is thrown
    } catch (error) {
      setError('Error converting text to speech: ' + error.message);
    }
  };

  return (
    <div className='inner2'>
      <h2>Text to Speech</h2>
      <textarea className='txt1'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to convert to speech..."
        rows="4"
        cols="50"
      />
      <br />
      <button className='btn1' onClick={handleConvertToSpeech}>Convert text</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default TextToSpeech;

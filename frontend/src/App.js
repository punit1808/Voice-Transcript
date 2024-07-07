import React from 'react';
import SpeechRecognition from './SpeechRecognition';
import TextToSpeech from './TextToSpeech';
import './App.css'

function App() {
  return (
    <div className='outerApp'>
        <div className="App">
            <h1>Speech Recognition and Text to Speech</h1>
            <div>
            <SpeechRecognition />
            <TextToSpeech />
            </div>
        </div>
    </div>
  );
}

export default App;

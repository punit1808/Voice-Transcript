from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
import pyttsx3

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Initialize the recognizer
r = sr.Recognizer()

# Function to convert text to speech
def text_to_speech(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

# Endpoint for speech recognition
@app.route('/record', methods=['GET'])
def record_speech():
    try:
        # use the microphone as source for input
        with sr.Microphone() as source:
            print("Speak:")
            audio = r.listen(source)
            # Using Google Speech Recognition
            text = r.recognize_google(audio)
            return jsonify({'result': text})
    except sr.UnknownValueError:
        return jsonify({'error': 'Speech recognition could not understand audio'}), 400
    except sr.RequestError as e:
        return jsonify({'error': f"Could not request results; {e}"}), 500

# Endpoint for text to speech
@app.route('/text-to-speech', methods=['POST'])
def convert_text_to_speech():
    try:
        data = request.get_json()
        text = data['text']
        text_to_speech(text)
        return jsonify({'message': 'Text converted to speech successfully'})
    except KeyError:
        return jsonify({'error': 'Text not provided in request body'}), 400

if __name__ == '__main__':
    app.run(debug=True)

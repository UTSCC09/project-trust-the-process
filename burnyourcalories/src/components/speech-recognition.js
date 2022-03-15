import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const listenContinuously = () => {
	SpeechRecognition.startListening({
		continuous: true,
		language: "en-US"
	});
}

const Dictaphone = () => {
	const commands = [
		{
			command: 'start',
			callback: async() => await SpeechRecognition.stopListening()
		},
		{
			command: 'stop',
			callback: async() => await SpeechRecognition.stopListening()
		}
	]

	const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

	listenContinuously();

  return (
    <div>
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;
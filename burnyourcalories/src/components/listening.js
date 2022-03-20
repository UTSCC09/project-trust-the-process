
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Listening = ({loadModel, loadWebcam, startOrStopWebcam}) => {
    const commands = [
        {
          command: 'Start',
          callback: async () => {
              await loadModel();
              loadWebcam();
              await startOrStopWebcam();
          },
          matchInterim: true
        }
    ]
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })
    if (!browserSupportsSpeechRecognition) {
        return null
    }
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: "en-US" });

    startListening();

    return (
        <>
        </>
    )
}

export default Listening;
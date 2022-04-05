
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

let isReportInit = false;

const Listening = ({loadModel, loadWebcam, startSession, stopSession, createReport}) => {

    const commands = [
        {
            command: 'Start',
            callback: async () => {
                if(isReportInit == false) {
                    isReportInit = true;
                    createReport();
                    await loadModel();
                    loadWebcam();
                    await startSession();
                }
            },
            matchInterim: true
        },
        {
            command: 'Stop',
            callback: async () => {
                await stopSession();
            },
            matchInterim: true
        }
    ]
    const {browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })
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
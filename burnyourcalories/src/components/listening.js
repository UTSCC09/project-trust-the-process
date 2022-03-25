
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useMutation, gql } from '@apollo/client';

const INIT_REPORT = gql`
  mutation($userId: String!) {
    initReport(userId: $userId) {
      ... on ReportFail {
        message,
        statusCode
      }
      ... on ReportId {
        reportId,
        statusCode
      }
    }
  }
`;

const Listening = ({loadModel, loadWebcam, startOrStopWebcam}) => {
    let report, reportId, userId = "623d4a099d89d0950438a820";

    const [initReport] = useMutation(INIT_REPORT, {
        onCompleted: (data) => {
            return data.reportId
        },
        onError: () => {
            return null;
        }
    });

    const commands = [
        {
            command: 'Start',
            callback: async () => {
                report = await initReport({variables: {userId}});
                if(report) {
                    reportId = report.data.initReport.reportId;
                    await loadModel();
                }
                
                loadWebcam();
                await startOrStopWebcam();
            },
            matchInterim: true
        },
        {
            command: 'Stop',
            callback: async () => {
                await startOrStopWebcam();
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
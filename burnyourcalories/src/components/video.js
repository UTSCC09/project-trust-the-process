// REFERENCE: https://github.com/yining1023/teachable-machine-p5/blob/master/poseclassifier/poseclassifier-on-webcam/sketch.js

import { useEffect, useState } from "react";
import Sketch from 'react-p5';
import { Button, Container } from '@mui/material';
import Data from "./data";
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import { useMutation, gql } from '@apollo/client';

import Listening from "./listening";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex !important',
		alignItems: 'center',
        justifyItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		flexDirection: 'column',
	},
    button: {
        position: "relative !important",
        marginTop: "5% !important"   
    },
}))

const size = 600;
let webcam;
let model;
let totalClasses;
let myCanvas;
let ctx;
let startTime, endTime, duration, prevExercise = "", newExercise = "";
let count = 0;
let report, reportId; 

const INIT_REPORT = gql`
  mutation {
    initReport {
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

const END_REPORT = gql`
mutation($reportId: String!) {
  endReport(reportId: $reportId) {
    ... on ReportFail {
      message,
      statusCode
    }
    ... on ReportEnd {
      endTime,
      statusCode
    }
  }
}
`;

const Video = ({getReportId, updateExercises, view, ...props}) => {
    const classes = useStyles(props);

    const [data, setData] = useState('');
    const [button, setButton] = useState('Start');

    const modelURL = 'https://teachablemachine.withgoogle.com/models/isZ-5lO5X/';
    const checkpointURL = modelURL + "model.json";
    const metadataURL = modelURL + "metadata.json";

    const [initReport] = useMutation(INIT_REPORT, {
        onCompleted: (data) => {
            return data;
        },
        onError: () => {
            return null;
        }
    });

    const [closeReport] = useMutation(END_REPORT, {
        onCompleted: (data) => {
            return data;
        },
        onError: () => {
            return null;
        }
    });

    useEffect(() => {
        if (data && count > 2) {
            let splitData, exercise, duration
            splitData = data.split(",")
            exercise = splitData[1]
            duration = splitData[2]
            if(duration != 0) {
                updateExercises(prevState => [...prevState, {'exerciseName': exercise, 'duration': duration}]);
            }
        }
        else {
            count += 1;
        }
    }, [data])

    const loadModel = async() => {
        model = await tmPose.load(checkpointURL, metadataURL);
        totalClasses = model.getTotalClasses();
    }

    const loadWebcam = () => {
        webcam = new tmPose.Webcam(size, size, true); 
    }

    const createReport = async() => {
        report = await initReport();
        if(report) {
            reportId = report.data.initReport.reportId;
            getReportId(reportId);
        }
    }
    const endReport = async() => {
        await closeReport({variables: {reportId}});
    }

    const startSession = async() => {
        startTime = Date.now();
        await webcam.setup();
        await webcam.play();
        setButton('Stop');
        window.requestAnimationFrame(loopWebcam);
    }

    const stopSession = async() => {
        webcam.pause();
        await endReport();
    }

    const startOrStopWebcam = async() => {
        if(button == 'Start') {
           await createReport();
           startSession();
        }
        else {
            await stopSession();
            updateExercises([]);
            setButton('Start');
        }
    }

    const setup = async(p5, canvasParentRef) => {
        myCanvas = p5.createCanvas(size, size).parent(canvasParentRef);
        myCanvas.position(7, 20);
        ctx = myCanvas.elt.getContext("2d");
        await loadModel();
      	loadWebcam();
    }

    const loopWebcam = async(timestamp) => {
        webcam.update(); 
        await predict();

        window.requestAnimationFrame(loopWebcam);
    }

    const predict = async() => {
        const { pose, posenetOutput } = await model.estimatePose(
            webcam.canvas,
            false
        );
        const prediction = await model.predict(
            posenetOutput,
            false,
            totalClasses
        );

        const sortedPrediction = prediction.sort((a, b) => - a.probability + b.probability);
        const prob = sortedPrediction[0].probability.toFixed(2);
        newExercise = sortedPrediction[0].className;

        if(prob > 0.9 && prevExercise != newExercise) {
            endTime = Date.now();
            duration = Math.round((endTime - startTime) / 1000);
            startTime = endTime;
            
            const data = newExercise + "," + prevExercise + "," + duration.toString();
            setData(data);
            prevExercise = sortedPrediction[0].className;
        }

        if (pose) {
          drawPose(pose);
      	}
    }

    const drawPose = (pose) => {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    }

    return (
        <Container className={classes.root}>
            <Listening loadModel={loadModel} loadWebcam={loadWebcam} startSession={startSession} stopSession={stopSession} createReport={createReport}/>
            <Data data = {data} />
            <Sketch setup = {setup} />
            <Button variant="contained" onClick={startOrStopWebcam} className={classes.button}>{button}</Button>
        </Container>
    )
} 

export default Video;

// https://github.com/yining1023/teachable-machine-p5/blob/master/poseclassifier/poseclassifier-on-webcam/sketch.js

import { useEffect, useState } from "react";
import Sketch from 'react-p5';
import { Button, Container } from '@mui/material';
import Data from "./data";
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'

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

const Video = ({updateExercises, view, ...props}) => {
    const classes = useStyles(props);

    const [data, setData] = useState('');
    const [button, setButton] = useState('Start');
    let startTime, endTime, duration, prevExercise = "", newExercise = "";

    const modelURL = 'https://teachablemachine.withgoogle.com/models/isZ-5lO5X/';
    const checkpointURL = modelURL + "model.json";
    const metadataURL = modelURL + "metadata.json";

    const size = 600;
    let webcam;
    let model;
    let totalClasses;
    let myCanvas;
    let ctx;

    useEffect(() => {
        if (data) {
            let splitData, exercise, duration
            splitData = data.split(",")
            exercise = splitData[0]
            duration = splitData[2]
            updateExercises(prevState => [...prevState, {'exerciseName': exercise, 'duration': duration}])
        }
    }, [data])

    const loadModel = async() => {
        model = await tmPose.load(checkpointURL, metadataURL);
        totalClasses = model.getTotalClasses();
    }

    const loadWebcam = () => {
        webcam = new tmPose.Webcam(size, size, true); 
    }

    const startOrStopWebcam = async() => {
        if(button == 'Start') {
            startTime = Date.now();
            await webcam.setup();
            await webcam.play();
            setButton('Stop');
            window.requestAnimationFrame(loopWebcam);
        }
        else {
            // webcam.stop();
 
            // Send the very last data. This doesn't work somehow. 
            endTime = Date.now();
            duration = Math.round((endTime - startTime) / 1000);
            const data = newExercise + "," + prevExercise + "," + duration.toString();

            // Redirect to a new page and show the report.
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
            <Data data = {data} />
            <Sketch setup = {setup} />
            <Button variant="contained" onClick={startOrStopWebcam} className={classes.button}>{button}</Button>
        </Container> 
    )
} 

export default Video;

import { useEffect, useState } from "react";
import Sketch from 'react-p5';
import { Button } from '@mui/material';
import Data from "./data";

const Video = (updateExercises) => {
    const [data, setData] = useState('');
    const [button, setButton] = useState('Start');
    let startTime, endTime, duration, prevExercise = "", newExercise = ""

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
            updateExercises.updateExercises(prevState => [...prevState, {'exerciseName': exercise, 'duration': duration}])
        }
    }, [data])

    async function load() {
        model = await tmPose.load(checkpointURL, metadataURL);
        totalClasses = model.getTotalClasses();
    }

    function loadWebcam() {
        webcam = new tmPose.Webcam(size, size, true); 
    }

    async function startOrStopWebcam() {
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

    let setup = async(p5, canvasParentRef) => {
        myCanvas = p5.createCanvas(size, size).parent(canvasParentRef);
        myCanvas.position(5, 100);
        ctx = myCanvas.elt.getContext("2d");
        await load();
      	loadWebcam();
    }

    async function loopWebcam(timestamp) {
        webcam.update(); 
        await predict();

        window.requestAnimationFrame(loopWebcam);
    }

    async function predict() {
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

    function drawPose(pose) {
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
        <>
            <Data data = {data} />
            <Sketch setup = {setup} />
            <Button variant="contained" onClick={startOrStopWebcam}>{button}</Button>
        </> 
    )
} 

export default Video;

import { useState, useRef } from "react";
import Sketch from 'react-p5';
import { Button } from '@mui/material';
import { Chip } from '@mui/material';

const Video = () => {
    const [exercise, setExercise] = useState('Enjoy Your Workout');
    const [button, setButton] = useState('Start');

    const modelURL = 'https://teachablemachine.withgoogle.com/models/isZ-5lO5X/';
    const checkpointURL = modelURL + "model.json";
    const metadataURL = modelURL + "metadata.json";

    const size = 600;
    let webcam;
    let model;
    let totalClasses;
    let myCanvas;
    let ctx;

    async function load() {
        model = await tmPose.load(checkpointURL, metadataURL);
        totalClasses = model.getTotalClasses();
    }

    function loadWebcam() {
        webcam = new tmPose.Webcam(size, size, true); 
    }

    async function startOrStopWebcam() {
        if(button == 'Start') {
            await webcam.setup();
            await webcam.play();
            setButton('Stop');
            window.requestAnimationFrame(loopWebcam);
        }
        else {
            console.log("STOP");
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

        if(sortedPrediction[0].probability.toFixed(2) > 0.9) {
            setExercise(sortedPrediction[0].className);
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
            <Chip label = {exercise} color = "success" size = "medium" />
            <Sketch setup={setup} />
            <Button variant="contained" onClick={startOrStopWebcam}>{button}</Button>
        </> 
    )
} 

export default Video;

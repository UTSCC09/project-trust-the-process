import Sketch from "react-p5";
import { useState } from "react";

const Video = () => {
    const [exercise, setExercise] = useState('Rest');

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

    async function loadWebcam() {
        webcam = new tmPose.Webcam(size, size, true); 
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loopWebcam);
    }

    let setup = async(p5, canvasParentRef) => {
        myCanvas = p5.createCanvas(size, size).parent(canvasParentRef);
        myCanvas.position(5, 100);
        ctx = myCanvas.elt.getContext("2d");
        await load();
        await loadWebcam();
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

        if(sortedPrediction[0].probability.toFixed(2) > 0.8) {
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
            <h1> {exercise} </h1>
            <Sketch setup={setup} />
        </> 
    )
}

export default Video;
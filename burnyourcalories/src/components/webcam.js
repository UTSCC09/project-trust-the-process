const Webcam = () => {

    const size = 600;
    let webcam;
    const loadWebcam = () => {
        webcam = new tmPose.Webcam(size, size, true); 
    }

    return (
        <>
            {loadWebcam()}
        </>
    )
}

export default Webcam;
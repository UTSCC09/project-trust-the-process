import { Chip } from '@mui/material';

const dataArray = [];
let splitData, exercise, duration;
let count = 0;

const Data = ({data}) => {
    if(count > 3) {
        splitData = data.split(",");
        exercise = splitData[1];
        duration = splitData[2];
        dataArray.push({
            exercise: exercise,
            duration: duration
        })

        console.log(dataArray);
    }

    count += 1;

    return (
        <>
            <Chip sx = {{ml: "-25vh", mt: "3vh"}} label = {data.substring(0, data.indexOf(","))} color = "success" size = "medium" />
        </>
    )
}

export default Data;
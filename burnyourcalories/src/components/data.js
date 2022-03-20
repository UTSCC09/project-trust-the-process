import { Chip } from '@mui/material';
import { withStyles } from '@mui/styles';

let splitData, exercise, duration;

const StyledChip = withStyles({
    root: {
        height: '40px !important',
    },
    label: {
        fontSize: '40px',
        paddingLeft: '20px !important',
        paddingRight: '20px !important',
    },
})(Chip);

const Data = ({data}) => {
    splitData = data.split(",");
    exercise = splitData[1];
    duration = splitData[2];


    return (
        <>
            <StyledChip sx = {{ mt: "3vh"}} label = {data.substring(0, data.indexOf(","))} color = "success" size = "medium" />
        </>
    )
}

export default Data;
import {
	Box,
	Typography,
    Container,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    exerciseStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px',
    }
  }));

ExerciseStat.defaultProps = {
    exerciseName: 'Eating Food',
    duration: 100
};

export default function ExerciseStat(props) {
    const { exerciseName, duration } = props;
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ width: 400, height: 50, borderBottom: 2.5}} className={classes.exerciseStyle}>
                <Typography variant="h5" >
                    {exerciseName}
				</Typography>
                <Typography variant="h5" >
                    {duration}
				</Typography>
            </Box>
        </Container>
    );
}

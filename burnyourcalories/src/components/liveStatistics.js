import { makeStyles } from '@mui/styles';
import { Container, Box, Typography } from '@mui/material';
import ExerciseStat from './exerciseStat';

const useStyles = makeStyles(() => ({
  liveStat: {
    width: 300,
    height: 500,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
  },
  bpad: {    
    padding: '10px',
    display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
  },
}));

LiveStatistic.defaultProps = {
  exercise: [],
  totalDuration: 599
};

export default function LiveStatistic(props) {
    const { exercises, totalDuration} = props;
    const classes = useStyles();

    function secondsToTime(duration) {
      var hours = Math.floor(Number(duration) / 3600);
      var minutes = Math.floor(Number(duration) % 3600 / 60);
      var seconds = Math.floor(Number(duration) % 3600 % 60);

      var hoursDisplay = (hours < 10 ? "0" + hours : hours);
      var minutesDisplay = (minutes < 10 ? "0" + minutes : minutes);
      var secondsDisplay = (seconds < 10 ? "0" + seconds : seconds);

      return hoursDisplay + ":" + minutesDisplay + ":" + secondsDisplay; 
    }

    const paginatedExercises = exercises.slice(Math.max(exercises.length - 10, 0));

    return (
      <Container className={classes.liveStat}>
        <Box sx={{ border: 3 }} className={classes.bpad}>
          <Typography className={classes.header} variant="h3">
            Live Statistics
          </Typography>

          {paginatedExercises.length === 0 ? (
            <h2>No exercises added yet, try adding some.</h2>
          ) : (
            paginatedExercises.map((exercise, idx) => (
              <ExerciseStat
                exerciseName={exercise.exerciseName} duration={secondsToTime(exercise.duration)}
              />
            ))
          )}
          
          <Typography variant="h6">
            {secondsToTime(totalDuration)}
          </Typography>
        </Box>
      </Container>
    );
}

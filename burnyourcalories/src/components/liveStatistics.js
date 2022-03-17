import { makeStyles } from '@mui/styles';
import { ExerciseStat } from "./exerciseStat";
import { Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  liveStat: {
    width: 300,
    height: 500,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
  },
}));

LiveStatistic.defaultProps = {
  exercise: [],
  totalWorkoutTime: 100
};

export default function LiveStatistic(props) {
    const { exercises, totalWorkoutTime } = props;
    const classes = useStyles();

    return (
      <div className={classes.liveStat}>
        <Typography align="centre" variant="h2">
          Live Statistics
        </Typography>

        {exercises.length === 0 ? (
          <h2>No exercises added yet, try adding some.</h2>
        ) : (
          exercises.map((exercise, idx) => (
            <ExerciseStat
              exercise={exercise}
            />
          ))
        )}
        
        <Typography align="centre" variant="h6">
          {totalWorkoutTime}
        </Typography>
      </div>
    );
}

import {
	Box,
	Typography,
    Container,
} from '@mui/material';

ExerciseStat.defaultProps = {
    exercise: {
        exerciseName: 'Eating Food',
        duration: 100
    }
};

export default function ExerciseStat(props) {
    const { exercise } = props;

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ width: 300, height: 100 }}/>
                <Typography variant="h6">
                    {exercise.exerciseName} {exercise.duration}
				</Typography>
            <Box/>
        </Container>
    );
}

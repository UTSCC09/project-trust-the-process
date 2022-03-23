import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignInUp from '../components/signinup';
import {
	Container, Typography,
} from '@mui/material';
import Video from '../components/video';
import LiveStatistic from '../components/liveStatistics';
import NavBar from '../components/navbar';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#606B6F',
		minHeight: '100vh',
		minWidth: '100vw !important'
	},
	body: {
		padding: '2px 4px',
		display: 'flex !important',
		alignItems: 'center',
        justifyItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		flexDirection: 'row',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	title: {
		color: 'black',
	},
}));

export default function Workout({
    view,
    ...props
}) {
	const classes = useStyles(props);
	const [exercises, setExercises] = useState([]);

	let totalDuration = 0;

	exercises.map((exercise, idx) => (
		totalDuration += Number(exercise.duration)
	));

	return (
        <Container className={classes.root}>
			<NavBar />
			<Container className={classes.body}>
				<Video view={view} updateExercises={setExercises}/>
				<LiveStatistic exercises={exercises} totalDuration={totalDuration}/>
			</Container>
			{/* <LiveStatistic exercises={[{exerciseName: "squat", duration: 100}, {exerciseName: "pushup", duration: 50}]} totalDuration={totalDuration}/> */}
        </Container>
	)
}

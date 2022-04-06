import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import Video from '../components/video';
import LiveStatistic from '../components/liveStatistics';
import NavBar from '../components/navbar';
import PopulateReport from '../components/populateReport';

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
		width: '90%',
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
	onLogout,
    ...props
}) {
	const classes = useStyles(props);
	const [exercises, setExercises] = useState([]);
	const [reportId, setReportId] = useState('');

	let totalDuration = 0;

	exercises.map((exercise, idx) => (
		totalDuration += Number(exercise.duration)
	));

	return (
        <Container className={classes.root}>
			<NavBar onLogout={onLogout} />
			<Container className={classes.body}>
				<Video view={view} updateExercises={setExercises} getReportId={setReportId}/>
				<LiveStatistic exercises={exercises} totalDuration={totalDuration}/>
				<PopulateReport exercises={exercises} reportId={reportId} />
			</Container>
        </Container>
	)
}

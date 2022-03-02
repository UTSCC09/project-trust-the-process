import React from 'react'
import {
	Box,
	Card,
	CardContent,
	Button,
	Typography,
	IconButton,
	Link,
	FormControl,
	MenuItem,
	InputLabel,
	Select,
} from '@material-ui/core'

import { AddCircleOutline } from '@material-ui/icons'
import Loading from '../images/loading.gif'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	title: {
		width: '100%',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	formControl: {
		margin: theme.spacing(1),
		width: 80,
	},
	formSelect: {
		height: 40,
	},
	resultRoot: {
		display: 'flex',
		margin: theme.spacing(1),
		justifyContent: 'space-between',
		width: '95%',
	},
	details: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	content: {
		flex: '1 0 auto',
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingRight: theme.spacing(1),
	},
	addIcon: {
		height: 30,
		width: 30,
	},
	loading: {
		height: 70,
		width: 70,
	},
	loadingCard: {
		display: 'flex',
		margin: theme.spacing(1),
		padding: theme.spacing(1),
		justifyContent: 'center',
		width: '95%',
	},
	limitCard: {
		display: 'flex',
		margin: theme.spacing(1),
		padding: theme.spacing(1),
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '95%',
		textAlign: 'center',
	},
	submitButton: {
		backgroundColor: '#5da2d5',
		'&:hover': {
			backgroundColor: '#90ccf4',
		},
	},
}))

const _renderResults = (
	movies,
	addNomination,
	checkIfIDExists,
	loading,
	limitReached,
	max,
	onSubmit
) => {
	const classes = useStyles()

	if (limitReached) {
		return (
			<Card className={classes.limitCard}>
				<Typography variant='subtitle1' color='error'>
					<b>Limit reached</b>
				</Typography>
				<Typography variant='subtitle1'>
					To submit your nominations hit the button below
				</Typography>
				<Box m={1}>
					<Button
						variant='contained'
						color='primary'
						onClick={() => onSubmit()}
						className={classes.submitButton}
					>
						Submit Nominations
					</Button>
				</Box>
			</Card>
		)
	} else if (loading) {
		return (
			<Card className={classes.loadingCard}>
				<img className={classes.loading} src={Loading} />
			</Card>
		)
	} else if (movies.length < 1) {
		return <Card className={classes.loadingCard}>No results were found</Card>
	} else if (movies[0] === 0) {
		return (
			<Card className={classes.loadingCard}>
				Need inspiration? Try searching 'Star Wars'
			</Card>
		)
	} else {
		return movies.map(
			(movie, i) =>
				i < max && (
					<Card className={classes.resultRoot} key={i}>
						<Box className={classes.details}>
							<Box>
								<CardContent className={classes.content}>
									<Typography component='h6' variant='h6'>
										{movie.Title}
									</Typography>
									<Typography
										variant='subtitle1'
										color='textSecondary'
										className={classes.subtitle}
									>
										{movie.Year}
									</Typography>
									<Link
										color='inherit'
										href={`https://www.imdb.com/title/${movie.imdbID}`}
									>
										More info &#x3e;
									</Link>
								</CardContent>
							</Box>
							<Box className={classes.controls}>
								<IconButton
									disabled={checkIfIDExists(movie)}
									onClick={() => addNomination(movie)}
								>
									<AddCircleOutline className={classes.addIcon} />
								</IconButton>
							</Box>
						</Box>
					</Card>
				)
		)
	}
}

export default function Results({
	movies,
	onAdd,
	checkIfIDExists,
	loading,
	limitReached,
	searchTerm,
	onSubmit,
	...props
}) {
	const classes = useStyles(props)

	const [max, setMax] = React.useState(3)

	const handleChange = (event) => {
		setMax(event.target.value)
	}

	const addNomination = (movie) => {
		onAdd(movie)
	}

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<Box className={classes.title}>
				<Typography variant='h6'>Results</Typography>
				<FormControl
					variant='outlined'
					className={classes.formControl}
					disabled={limitReached}
				>
					<InputLabel>Max</InputLabel>
					<Select
						value={max}
						onChange={handleChange}
						label='Max'
						className={classes.formSelect}
					>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={7}>7</MenuItem>
					</Select>
				</FormControl>
			</Box>
			{movies &&
				_renderResults(
					movies,
					addNomination,
					checkIfIDExists,
					loading,
					limitReached,
					max,
					onSubmit
				)}
		</Box>
	)
}

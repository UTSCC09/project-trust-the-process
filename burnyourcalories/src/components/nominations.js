import {
	Box,
	Card,
	CardContent,
	Button,
	Typography,
	IconButton,
	Link,
} from '@material-ui/core'

import { RemoveCircleOutline } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	title: {
		width: '100%',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
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
	removeIcon: {
		height: 30,
		width: 30,
	},
	noNominations: {
		display: 'flex',
		margin: theme.spacing(1),
		padding: theme.spacing(1),
		justifyContent: 'center',
		width: '95%',
	},
}))

const _renderResults = (movies, removeNomination) => {
	const classes = useStyles()
	if (movies.length < 1) {
		return (
			<Card className={classes.noNominations}>
				Add some movies to your nominations
			</Card>
		)
	} else {
		return movies.map((movie, i) => (
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
					<div className={classes.controls}>
						<IconButton onClick={() => removeNomination(movie)}>
							<RemoveCircleOutline className={classes.removeIcon} />
						</IconButton>
					</div>
				</Box>
			</Card>
		))
	}
}

export default function Nominations({
	movies,
	onRemove,
	setSaveForLater,
	...props
}) {
	const classes = useStyles(props)

	const removeNomination = (movie) => {
		onRemove(movie)
	}

	return (
		<Box display='flex' flexDirection='column'>
			<Box className={classes.title}>
				<Typography variant='h6'>Nominations</Typography>
				<Box display='flex' flexDirection='row' alignItems='center'>
					{movies.length > 0 && (
						<Box mr={1}>
							<Button onClick={() => setSaveForLater(true)}>
								Save for later
							</Button>
						</Box>
					)}
					<Typography variant='subtitle1'>{movies.length}/5</Typography>
				</Box>
			</Box>
			{movies && _renderResults(movies, removeNomination)}
		</Box>
	)
}

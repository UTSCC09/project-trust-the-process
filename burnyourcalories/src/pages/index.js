import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchBox from '../components/searchbox'
import Nominations from '../components/nominations'
import Results from '../components/results'
import {
	Container,
	Box,
	Grid,
	Typography,
	Modal,
	Backdrop,
	Fade,
	Snackbar,
	SnackbarContent,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		paddingBottom: theme.spacing(4),
	},
	title: {
		position: 'relative',
		marginTop: theme.spacing(2),
		textAlign: 'center',
		[theme.breakpoints.up('md')]: {
			textAlign: 'left',
		},
	},
	searchContainer: {
		marginTop: theme.spacing(2),
		boxShadow:
			'0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
		position: 'relative',
		height: 200,
		width: '100%',
		backgroundColor: '#5da2d5',
		display: 'flex',
		justifyContent: 'center',
		borderRadius: 6,
		[theme.breakpoints.up('md')]: {
			height: 150,
		},
	},
	searchBox: {
		position: 'absolute',
		top: 172,
		width: '90%',
		[theme.breakpoints.up('md')]: {
			width: '80%',
			top: 122,
		},
	},
	resultsContainer: {
		marginTop: theme.spacing(5),
		borderRadius: 6,
		width: '100%',
		backgroundColor: '#bcd9ef',
	},
	nominationsContainer: {
		borderRadius: 6,
		width: '100%',
		backgroundColor: '#bcd9ef',
		marginTop: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			marginLeft: theme.spacing(2),
			marginTop: theme.spacing(9),
		},
	},
	mainContainer: {
		minHeight: '100%',
		display: 'block',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: 6,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	popUp: {
		marginBottom: theme.spacing(1),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}))

export default function Shoppies({ ...props }) {
	const classes = useStyles(props)

	const [movies, setMovies] = useState([])
	const [nominations, setNominations] = useState([])
	const [loading, setLoading] = useState(false)
	const [limitReached, setLimitReached] = useState(false)
	const [saveForLater, setSaveForLater] = useState(false)
	const [open, setOpen] = useState(false)
	const [state, setState] = useState({
		open: false,
		Transition: Fade,
	})

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setNominations([])
		setMovies([0])
		setLimitReached(false)
		window.localStorage.clear()
	}

	const checkIfIDExists = (movie) => {
		return nominations.some((item) => item.imdbID === movie.imdbID)
	}

	const addNomination = (movie) => {
		if (!checkIfIDExists(movie) && nominations.length < 5) {
			setNominations(nominations.concat(movie))
		}
	}

	const removeNomination = (movie) => {
		setNominations(nominations.filter((item) => item.imdbID !== movie.imdbID))
		setLimitReached(false)
	}

	const handleClosePopUp = () => {
		setState({
			...state,
			open: false,
		})
	}

	useEffect(() => {
		if (nominations.length >= 5) {
			setLimitReached(true)
			setState({
				open: true,
			})
		} else {
			setState({
				open: false,
			})
		}
	}, [nominations])

	useEffect(() => {
		if (movies.length > 0) {
			window.localStorage.setItem('nominations', JSON.stringify(nominations))
			setSaveForLater(false)
		}
	}, [saveForLater])

	useEffect(() => {
		if (window.localStorage.getItem('nominations')) {
			setNominations(JSON.parse(window.localStorage.getItem('nominations')))
		}
		setMovies([0])
	}, [])

	return (
		<Container maxWidth='md' className={classes.root}>
			<Modal
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2>Great picks!</h2>
						<p>Your nominations were successfully submitted</p>
					</div>
				</Fade>
			</Modal>
			<Snackbar
				className={classes.popUp}
				open={state.open}
				onClose={handleClosePopUp}
				TransitionComponent={state.Transition}
			>
				<SnackbarContent
					style={{
						backgroundColor: '#f3d250',
						color: 'black',
					}}
					message='Warning: Nomination limit (5) reached'
				/>
			</Snackbar>
			<Grid container>
				<Grid item container xs={12} md={6} className={classes.mainContainer}>
					<Grid item xs={12} className={classes.title}>
						<Typography variant='h4'>The Shoppies</Typography>
					</Grid>
					<Grid item xs={12} className={classes.searchContainer}>
						<Box
							pt={1}
							display='flex'
							flexDirection='column'
							alignItems='center'
						>
							<Box maxWidth='85%' textAlign='center' pt={2} color='white'>
								<Typography variant='subtitle1'>
									<b>Tip: </b>Search and choose your top 5 favourite movies. Hit
									submit when you're happy with the 5 choices.
								</Typography>
							</Box>
						</Box>
						<Box className={classes.searchBox}>
							<SearchBox
								onSearch={setMovies}
								onLoad={setLoading}
								limitReached={limitReached}
							/>
						</Box>
					</Grid>
					<Grid item xs={12} className={classes.resultsContainer}>
						<Results
							movies={movies}
							onAdd={addNomination}
							checkIfIDExists={checkIfIDExists}
							loading={loading}
							limitReached={limitReached}
							onSubmit={handleOpen}
						/>
					</Grid>
				</Grid>
				<Grid item container xs={12} md={6}>
					<Grid item xs={12}>
						<Box className={classes.nominationsContainer}>
							<Nominations
								onRemove={removeNomination}
								movies={nominations}
								setSaveForLater={setSaveForLater}
							/>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

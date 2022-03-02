import React, { useState } from 'react'
import { Paper, InputBase, IconButton } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const APIkey = 42661839

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
}))

export default function SearchBox({
	onSearch,
	onLoad,
	limitReached,
	...props
}) {
	const classes = useStyles(props)

	const [searchTerm, setSearchTerm] = useState('')

	const getMoviesOnly = (movies) => {
		let listOfMovies = []
		if (movies) {
			movies.forEach((movie) => {
				if (movie.Type === 'movie') {
					listOfMovies.push(movie)
				}
			})
			return listOfMovies
		}
		return movies
	}

	const handleChange = (event) => {
		setSearchTerm(event.target.value)
	}

	const submit = (event) => {
		event.preventDefault()
		onLoad(true)
		let trimSearch = searchTerm.trim()
		setSearchTerm(trimSearch)
		sleep(1000).then(() =>
			fetch(`https://www.omdbapi.com/?s=${trimSearch}&apikey=${APIkey}`)
				.then((resp) => resp.json())
				.then((response) => {
					if (response.Search) {
						onLoad(false)
						onSearch(getMoviesOnly(response.Search))
					} else {
						onLoad(false)
						onSearch([])
					}
				})
				.catch((error) => {
					console.log(error)
				})
		)
	}

	const sleep = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	return (
		<form onSubmit={submit}>
			<Paper className={classes.root}>
				<InputBase
					className={classes.input}
					placeholder='Search for a movie title'
					onChange={handleChange}
					disabled={limitReached}
				/>
				<IconButton
					className={classes.iconButton}
					type='submit'
					aria-label='search'
					disabled={limitReached}
				>
					<Search />
				</IconButton>
			</Paper>
		</form>
	)
}

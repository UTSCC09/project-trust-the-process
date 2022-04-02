import React, { useState } from 'react'
import { Paper, InputBase, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SignInUp from '../components/signinup'
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
} from '@mui/material'

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
        justifyItems: 'center',
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

export default function Welcome({
    view,
	onLogin,
    ...props
}) {
	const classes = useStyles(props)

	const [searchTerm, setSearchTerm] = useState('')

	return (
        <Container maxWidth='xs' className={classes.root}>
            <SignInUp view={view} onLogin={onLogin} />
        </Container>
	)
}

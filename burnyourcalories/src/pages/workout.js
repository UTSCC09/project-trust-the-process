import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SignInUp from '../components/signinup'
import {
	Container,
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

export default function Workout({
    view,
    ...props
}) {
	const classes = useStyles(props)

	return (
        <Container maxWidth='xs' className={classes.root}>
            {/* <SignInUp view={view}/> ADD COMPONENT SIMILAR TO THIS*/}
        </Container>
	)
}

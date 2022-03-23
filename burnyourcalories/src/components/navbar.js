import React from 'react'
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import {
	AppBar,
	Box,
	Button,
	Toolbar,
    Link
} from '@mui/material'
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
        paddingTop: '10px',
		display: 'flex',
		alignItems: 'center',
	},
    title: {
        textDecoration: 'none',
        color: 'inherit !important',
        fontSize: '24px',
    },
    toolbox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    appbox: {
        backgroundColor: '#333C3E !important',
        borderRadius: '5px',
    },
}))

export default function NavBar({
    view,
    client,
    ...props
}) {
	const classes = useStyles(props)
    const navigate = useNavigate()

	return (
        <Box sx={{ flexGrow: 1 }} className={classes.root}>
            <AppBar position="static" className={classes.appbox}>
                <Toolbar className={classes.toolbox}>
                    <Link href={'/dashboard'} className={classes.title} underline={'none'}>
                        BurnYourCalories
                    </Link>
                    <Button color="inherit" onClick={() => navigate('/signin')}>Sign out</Button>
                </Toolbar>
            </AppBar>
        </Box>
	)
}

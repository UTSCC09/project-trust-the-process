import React from 'react'
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import {
    Box,
    Typography,
} from '@mui/material'
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
        paddingTop: '10px',
		display: 'flex !important',
		marginRight: 'unset',
	},
    box: {
        border: '3px solid red',
        height: '70vh',
        width: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C9C9BD',
        color: 'white',
        borderColor: '#C9C9BD',
        borderRadius: '5px',
    }
}))

const _renderReports = (reports) => {
    const classes = useStyles()
    if (reports.length == 0) {
        return (
            <Typography variant={'h5'} color={'black'}>
                There were no reports found for this date
            </Typography>
        )
    }
}

export default function DisplayReports({
    reports,
    ...props
}) {
	const classes = useStyles(props)
    const navigate = useNavigate()

	return (
            <Box className={classes.box} sx={{ boxShadow: 2 }}>
                {reports && _renderReports(reports)}
            </Box>
	)
}

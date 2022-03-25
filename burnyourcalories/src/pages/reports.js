import React, { useEffect, useState } from 'react'
import { Paper, InputBase, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
	Container,
	Box,
} from '@mui/material'
import ReportCalendar from '../components/reportCalendar'
import NavBar from '../components/navbar'
import DisplayReports from '../components/displayReports'

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#606B6F',
		minHeight: '100vh',
		minWidth: '100vw !important'
	},
    body: {
        display: 'flex !important',
        flexDirection: 'row',
        justifyContent: 'space-between !important',
        margin: '20px',
    }
}))

export default function Reports({
    view,
    ...props
}) {
	const classes = useStyles(props)
    const [date, setDate] = useState(new Date)
    const [reports, setReports] = useState([])

    useEffect(() => {
        if (date) {
            // make req for reports here
        }
    }, [date])

	return (
        <Container maxWidth='xs' className={classes.root}>
            <NavBar />
            <Box className={classes.body}>
                <ReportCalendar updateDate={setDate}/>
                <DisplayReports reports={reports}/>
            </Box>
        </Container>
	)
}

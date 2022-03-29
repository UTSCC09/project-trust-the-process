import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
	Container,
	Box,
    Alert,
    Typography,
    Modal,
    ButtonGroup,
    Button,
} from '@mui/material'
import ReportCalendar from '../components/reportCalendar'
import NavBar from '../components/navbar'
import DisplayReports from '../components/displayReports'
import ReportViz from '../components/reportViz'
import {
    useMutation,
    useQuery,
    gql
} from '@apollo/client'

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#606B6F',
		minHeight: '100vh',
		minWidth: '100vw !important',
	},
    body: {
        display: 'flex !important',
        flexDirection: 'row',
        justifyContent: 'space-between !important',
        margin: '20px',
    },
    select: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '33%',
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'green',
        border: '2px solid #000',
        padding: '16px',
    }
}))

const GET_REPORT_TIMES_BY_DATE = gql`
    mutation($userId: String!, $date: String!) {
        getReportTimesByDate(userId: $userId, date: $date) {
        ... on ReportFail {
            message,
            statusCode
        }
        ... on ReportTimes {
            times {
                startTime,
                endTime,
                reportId
            },
            statusCode
            }
        }
    }
`

const userId = '623d4a099d89d0950438a820' // DELETE LATER (TESTING ONLY)

export default function Reports({
    view,
    ...props
}) {
	const classes = useStyles(props)
    const [selectedDate, setSelectedDate] = useState(new Date)
    const [reports, setReports] = useState([])

    const [open, setOpen] = useState(false)
    const [reportModal, setReportModal] = useState('')

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false) 

    const [getReports] = useMutation(GET_REPORT_TIMES_BY_DATE, {
        onCompleted: (data) => {
        },
        onError: (error) => {
            console.log(error)
        }
    })

    useEffect(() => {
        if (selectedDate) {
            let dateBroken = selectedDate.toString().split(' ')
            let date = dateBroken[1] + " " + dateBroken[2] + " " + dateBroken[3]
            getReports({ variables: { userId, date } })
            .then((res) => {
                setReports(res.data.getReportTimesByDate.times)
            })
            
        }
    }, [selectedDate])

    useEffect(() => {
        if (reportModal) {
            console.log("THIS IS THE ID STATE: " + reportModal)
        }
    }, [reportModal])

	return (
        <Container maxWidth='xs' className={classes.root}>
            <Modal
                open={open && reportModal != ''}
                onClose={handleClose}
            >
                <Box className={classes.modal}>
                    <ReportViz reportId = {reportModal}/>
                </Box>
            </Modal>
            <NavBar />
            <Box className={classes.body}>
                <Box className={classes.select}>
                    <Alert severity={'info'}>Select a date below to see your reports populated on the right side. Dates with the 🟢 mean you have report(s) available for that day.</Alert>
                    <ReportCalendar updateDate={setSelectedDate}/>
                </Box>
                <DisplayReports reports={reports} openModal={handleOpen} setReport={setReportModal}/>
            </Box>
        </Container>
	)
}

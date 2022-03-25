import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
	Container,
	Box,
    Alert,
} from '@mui/material'
import ReportCalendar from '../components/reportCalendar'
import NavBar from '../components/navbar'
import DisplayReports from '../components/displayReports'
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
		minWidth: '100vw !important'
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

const userId = '62253040d391f4d51508deae' // DELETE LATER (TESTING ONLY)

export default function Reports({
    view,
    ...props
}) {
	const classes = useStyles(props)
    const [selectedDate, setSelectedDate] = useState(new Date)
    const [reports, setReports] = useState([])

    const [getReports] = useMutation(GET_REPORT_TIMES_BY_DATE, {
        onCompleted: (data) => {
        },
        onError: (error) => {
            console.log(error)
        }
    })

    useEffect(() => {
        if (selectedDate) {
            // make req for reports here
            let dateBroken = selectedDate.toString().split(' ')
            let date = dateBroken[1] + " " + dateBroken[2] + " " + dateBroken[3]
            console.log(date)
            getReports({ variables: { userId, date } })
            .then((res) => {
                console.log(res)
            })
            
        }
    }, [selectedDate])

	return (
        <Container maxWidth='xs' className={classes.root}>
            <NavBar />
            <Box className={classes.body}>
                <Box className={classes.select}>
                    <Alert severity={'info'}>Select a date below to see your reports populated on the right side. Dates with the 🟢 mean you have report(s) available for that day.</Alert>
                    <ReportCalendar updateDate={setSelectedDate}/>
                </Box>
                <DisplayReports reports={reports}/>
            </Box>
        </Container>
	)
}

import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import {
	Badge,
	TextField,
	Box,
    Typography,
} from '@mui/material'

import {
    LocalizationProvider,
    PickersDay,
    DatePicker,
    CalendarPickerSkeleton,
} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {
    useMutation,
    gql
} from '@apollo/client'

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#606B6F',
		minHeight: '100vh',
		minWidth: '100vw !important',
	},
    box: {
        border: '3px solid red',
        height: '20vh',
        paddingLeft: '40px',
        paddingRight: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C9C9BD',
        borderColor: '#C9C9BD',
        borderRadius: '5px',
        marginTop: '10px',
    }
}))

const GET_USER_REPORT_DATES = gql`
    mutation($month: String!, $year: String!) {
        getUserReportDates(month: $month, year: $year) {
        ... on ReportFail {
            message,
            statusCode
        }
        ... on UserReportDates {
            dates,
            statusCode
        }
    }
  }
`

const initialValue = new Date();

export default function ReportCalendar({
    view,
    updateDate,
    ...props
}) {
	const classes = useStyles(props)
    const requestAbortController = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [value, setValue] = useState(initialValue);

    const [getHighlights] = useMutation(GET_USER_REPORT_DATES, {
        onCompleted: (data) => {
        },
        onError: (error) => {
            if (error.name !== 'AbortError') throw error;
        }
    })

    const fetchHighlightedDays = (date) => {
        const controller = new AbortController();
        let dateBroken = date.toString().split(' ')
        let month = dateBroken[1]
        let year = dateBroken[3]
        getHighlights({ variables: { month, year } })
        .then((res) => {
            let toHighlight = []
            for (const date of res.data.getUserReportDates.dates) {
                let dateBroken = date.split(' ')
                toHighlight.push(parseInt(dateBroken[1]))
            }
            setHighlightedDays(toHighlight)
            setIsLoading(false)
        })
        .catch((error) => {
            // ignore the error if it's caused by `controller.abort`
            if (error.name !== 'AbortError') {
                throw error;
            }
        })
        requestAbortController.current = controller;
    }

    useEffect(() => {
        // Make request for reports here
        if (value) updateDate(value)
    }, [value])
    

    useEffect(() => {
        fetchHighlightedDays(initialValue);
        // abort request on unmount
        return () => requestAbortController.current?.abort();
    }, [])

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
          // make sure that you are aborting useless requests
          // because it is possible to switch between months pretty quickly
          requestAbortController.current.abort();
        }
    
        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };

	return (
        <Box className={classes.box}>
            <Typography variant={'h6'} color={'black'}>
                Currently selected date: 
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={value}
                    loading={isLoading}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    onMonthChange={handleMonthChange}
                    renderInput={(params) => <TextField {...params} />}
                    renderLoading={() => <CalendarPickerSkeleton />}
                    renderDay={(day, _value, DayComponentProps) => {
                        const isSelected =
                            !DayComponentProps.outsideCurrentMonth &&
                            highlightedDays.indexOf(day.getDate()) > -1;
                        return (
                            <Badge
                            key={day.toString()}
                            overlap="circular"
                            badgeContent={isSelected ? '🟢' : undefined}
                            >
                                <PickersDay {...DayComponentProps} />
                            </Badge>
                        );
                    }}
                />
            </LocalizationProvider>
        </Box>
	)
}

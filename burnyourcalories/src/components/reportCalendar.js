import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
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
import getDaysInMonth from 'date-fns/getDaysInMonth'

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#606B6F',
		minHeight: '100vh',
		minWidth: '100vw !important'
	},
    box: {
        border: '3px solid red',
        height: '20vh',
        width: '33%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C9C9BD',
        borderColor: '#C9C9BD',
        borderRadius: '10px',
    }
}))

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysInMonth = getDaysInMonth(date);
        const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));
  
        resolve({ daysToHighlight });
      }, 500);
  
      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException('aborted', 'AbortError'));
      };
    });
}

const initialValue = new Date();

export default function ReportCalendar({
    view,
    updateDate,
    ...props
}) {
	const classes = useStyles(props)
    const requestAbortController = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
    const [value, setValue] = useState(initialValue);

    const fetchHighlightedDays = (date) => {
        const controller = new AbortController();
        fakeFetch(date, {
          signal: controller.signal,
        })
          .then(({ daysToHighlight }) => {
            setHighlightedDays(daysToHighlight);
            setIsLoading(false);
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
                Select a date: 
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
                        highlightedDays.indexOf(day.getDate()) > 0;

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

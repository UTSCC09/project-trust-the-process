import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    ButtonGroup,
} from '@mui/material'
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '20px',
        width: '100%',
    },
    box: {
        border: '3px solid red',
        marginTop: '0px !important',
        marginLeft: '0px !important',
        height: '70vh',
        width: '100% !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C9C9BD',
        color: 'white',
        borderColor: '#C9C9BD',
        borderRadius: '5px',
    },
    item: {
        paddingRight: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    times: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '12px',
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
    },
    controls: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

const _renderReports = (reports, openModal, setReport, start, end) => {
    const classes = useStyles()
    if (reports.length == 0) {
        return (
            <Typography variant={'h5'} color={'black'}>
                There were no reports found for this date
            </Typography>
        )
    } else if (reports.length > 0) {
        return reports.map(
            (report, index) => {
                if (start <= index && index <= end) {
                    return (
                        <Grid item xs={6} key={report.reportId} className={classes.item}>
                            <Card variant={'outlined'}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        Burned calories from
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {report.startTime}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        to
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {report.endTime}
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.btn}>
                                    <Button variant={'outlined'} onClick={() => { openModal(); setReport(report.reportId)} }>Open report</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }
            }  
        )
    }
}

export default function DisplayReports({
    reports,
    openModal,
    setReport,
    ...props
}) {
	const classes = useStyles(props)
    const navigate = useNavigate()

    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [start, setStart] = useState(-1)
    const [end, setEnd] = useState(-1)
    const [arrSize, setArrSize] = useState(-1)

    const [data, setData] = useState(reports)

    useEffect(() => {
        setData(reports)
        setPrev(false)
        setNext(false)
        setArrSize(reports.length)
    }, [reports])

    useEffect(() => {
        setStart(0)
        if (data.length > 4) {
            setEnd(3)
            setNext(true)
        } else {
            setEnd(data.length - 1)
        }
        console.log(data)
    }, [data])

    const handleNext = () => {
        if (end + 4 > arrSize) setNext(false)
        setStart(end+1)
        setPrev(true)
        setEnd(end+4)
    }

    const handlePrev = () => {
        if (start - 4 <= 0) setPrev(false)
        setStart(start - 4)
        setEnd(end - 4)
        setNext(true)
    }


	return (
        <Grid className={classes.root}>
            <Typography variant={'h5'} color={'white'} pb={'15px'} textAlign={'center'}>Your Reports</Typography>
            <Grid container spacing={{ xs: 3 }} columns={{ xs: 12 }} className={classes.box} sx={{ boxShadow: 2 }}>
                {data && _renderReports(data, openModal, setReport, start, end)}
            </Grid>
            <Box className={classes.controls}>
                <ButtonGroup disableElevation variant="contained">
                    {prev ? <Button onClick={() => handlePrev()}>Prev</Button> : <Button disabled>Prev</Button>}
                    {next ? <Button onClick={() => handleNext()}>Next</Button> : <Button disabled>Next</Button>}
                </ButtonGroup>
            </Box>
        </Grid>
	)
}

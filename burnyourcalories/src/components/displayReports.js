import React from 'react'
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
} from '@mui/material'
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	// root: {
	// 	padding: '2px 4px',
    //     paddingTop: '10px',
	// 	display: 'flex !important',
	// 	marginRight: 'unset',
	// },
    box: {
        border: '3px solid red',
        marginTop: '0px !important',
        height: '70vh',
        width: '60% !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C9C9BD',
        color: 'white',
        borderColor: '#C9C9BD',
        borderRadius: '5px',
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
    }
}))

const _renderReports = (reports, openModal, setReport) => {
    const classes = useStyles()
    if (reports.length == 0) {
        return (
            <Typography variant={'h5'} color={'black'}>
                There were no reports found for this date
            </Typography>
        )
    } else if (reports.length > 0) {
        return reports.map(
            (report) => (
                <Grid item xs={4} pr={'10px'} pl={'10px'} key={report.reportId}>
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
                            <Button variant={'outlined'} onClick={() => { openModal; setReport(report.reportId)} }>Open report</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )
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

	return (
        <Grid container spacing={{ xs: 3 }} columns={{ xs: 12 }} className={classes.box} sx={{ boxShadow: 2 }}>
            {reports && _renderReports(reports, openModal, setReport)}
        </Grid>
	)
}

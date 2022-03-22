import React from 'react'
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardActionArea,
    Container,
} from '@mui/material'
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
        paddingTop: '10px',
		display: 'flex',
		marginRight: 'unset',
	},
    content: {
        backgroundColor: '#F0EFEE', // 333C3E
        color: '#333C3E', // F0EFEE
    },
}))

export default function FlashCard({
    image = '/static/images/cards/contemplative-reptile.jpg',
    title = 'Lizard',
    text = 'Lizards are a widespread group of squamate reptiles, with over 6,000' + 'species, ranging across all continents except Antarctica',
    path = '#',
    ...props
}) {
	const classes = useStyles(props)
    const navigate = useNavigate()

	return (
        <Container className={classes.root}>
            <Card>
                <CardActionArea href={path}>
                    <CardMedia
                        component="img"
                        height="400"
                        image={image}
                    />
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2">
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
	)
}

import React, { useState } from 'react'
import { Paper, InputBase, IconButton } from '@mui/material'
import { Search, LockOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
	Container,
	Box,
	Grid,
	Typography,
	Avatar,
	TextField,
	FormControlLabel,
	Checkbox,
	Button,
    Link,
    Copy
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
    
}))

export default function SignInUp({
    view,
    ...props
}) {
	const classes = useStyles(props)

	const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.currentTarget);

        console.log({
            username: data.get('username'),
            password: data.get('password'),
        })
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }

	return (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              {view == 'signin' ? 'Sign in' : 'Sign up'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                variant='outlined'
                id="username"
                label="Username"
                name="username"
                // autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                variant='outlined'
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
              >
                {view == 'signin' ? 'Sign In' : 'Sign Up'}
              </LoadingButton>
            </Box>
          </Box>
        </Container>
	)
}

import React, { useEffect, useState } from 'react'
import { LockOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import {
	Container,
	Box,
	Typography,
	Avatar,
	TextField,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
  useMutation, 
  gql 
} from '@apollo/client'
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
    
}))

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
       ... on UserFail {
        message,
        statusCode
      }
      ... on UserLoginSuccess {
        user {
          firstName,
          lastName,
          email,
          password
        }
        token
        statusCode
      }
    }
  }
`

const SIGN_UP = gql`
  mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      ... on UserFail {
        message,
        statusCode
      }
      ... on UserRegisterSuccess {
        user {
          firstName,
          lastName,
          email,
          password
        }
        statusCode
      }
    }
  }
`

export default function SignInUp({
    view,
    client,
    ...props
}) {
	const classes = useStyles(props)

  const [load, setLoad] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [signIn] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      console.log(data)
      setTimeout(() => {
        setLoad(false)
        if (data.loginUser.statusCode == 200) navigate('/dashboard')
      }, 1500)
    },
    onError: (error) => {
      console.log(error)
      setLoad(false)
    }
  })

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      console.log(data)
      setTimeout(() => {
        setLoad(false)
        if (data.registerUser.statusCode == 200) navigate('/signin')
      }, 500)
    },
    onError: (error) => {
      console.log(error)
      setLoad(false)
    }
  })

  useEffect(() => {
    if (load) {
      if (email && password && view == 'signin') {
        signIn({ variables: { email, password } })
      } else if (firstName && lastName && email && password && view == 'signup'){
        signUp({ variables: { firstName, lastName, email, password } })
      } else {
        setLoad(false)
      }
    }
  }, [load])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoad(true)
    const data = new FormData(e.currentTarget)
    setEmail(data.get('email'))
    setPassword(data.get('password'))
    if (view == 'signup') {
      setFirstName(data.get('firstName'))
      setLastName(data.get('lastName'))
      if (!email || !password || !firstName || !lastName) {
        setLoad(false)
      }
    }
    if (!email || !password) {
      setLoad(false)
    }
  }

  function SubmitButton() {
    if (email && password && view == 'signin') {
      return (
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={load}
        >
          Sign In
        </LoadingButton>
      )
    } else if (firstName && lastName && email && password && view == 'signup') {
      return (
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={load}
        >
          Sign Up
        </LoadingButton>
      )
    } else {
      return (
        <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              disabled
            >
              {view == 'signin' ? 'Sign In' : 'Sign Up'}
        </LoadingButton>
      )
    }
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
              {view == 'signup' ? 
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={firstName}
                  onChange={ e => setFirstName(e.target.value) }
                  variant='outlined'
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={lastName}
                  onChange={ e => setLastName(e.target.value) }
                  variant='outlined'
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                /> 
              </>
              : null}
              <TextField
                margin="normal"
                required
                fullWidth
                value={email}
                onChange={ e => setEmail(e.target.value) }
                variant='outlined'
                id="email"
                label="Email"
                name="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={ e => setPassword(e.target.value) }
                variant='outlined'
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <SubmitButton />
            </Box>
          </Box>
        </Container>
	)
}

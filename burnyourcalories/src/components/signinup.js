import React, { useEffect, useState } from 'react'
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
import { 
  ApolloClient, 
  HttpLink, 
  useMutation, 
  gql 
} from '@apollo/client'

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

  const [signIn] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      console.log(data)
      setTimeout(() => {
        setLoad(false);
      }, 1500)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      console.log(data)
      setTimeout(() => {
        setLoad(false);
      }, 1500)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (firstName && lastName && email && password && view == 'signup'){
      signUp({ variables: { firstName, lastName, email, password } })
    }
  }, [firstName, lastName, email, password])

  useEffect(() => {
    if (email && password && view == 'signin') {
      signIn({ variables: { email, password } })
    }
  }, [email, password])



  const handleSubmit = (e) => {
      e.preventDefault();
      setLoad(true);
      const data = new FormData(e.currentTarget);
      setEmail(data.get('email'))
      setPassword(data.get('password'))
      if (view == 'signup') {
        setFirstName(data.get('firstName'))
        setLastName(data.get('lastName'))
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
                  variant='outlined'
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  // autoComplete="username"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  variant='outlined'
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  // autoComplete="username"
                /> 
              </>
              : null}
              <TextField
                margin="normal"
                required
                fullWidth
                variant='outlined'
                id="email"
                label="Email"
                name="email"
                // autoComplete="username"
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
                loading={load}
              >
                {view == 'signin' ? 'Sign In' : 'Sign Up'}
              </LoadingButton>
            </Box>
          </Box>
        </Container>
	)
}

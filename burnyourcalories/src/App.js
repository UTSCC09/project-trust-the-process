import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import {
  ApolloClient, 
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Welcome from './pages/welcome';
import Workout from './pages/workout';
import Dashboard from './pages/dashboard';
import Reports from './pages/reports';

const httpLink = new HttpLink({
  uri: '/graphql',
});

// REFERENCE: https://www.apollographql.com/docs/react/networking/authentication/
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("c09-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

const PrivateRoute = () => {
  // REFERENCE: https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou

  let auth = false

  if (localStorage.getItem("c09-token") != null) {
    auth = true
  }
  
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to signin page
  return auth ? <Outlet /> : <Navigate to="/signin" />
}

const SignRoute = () => {
  let auth = true

  if (localStorage.getItem("c09-token") == null) {
    auth = false
  }

  return auth ? <Navigate to="/dashboard" /> : <Outlet />
}

function App() {
  const [token, setToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = (token) => {
    setToken(token)
    localStorage.setItem("c09-token", token)
    setLoggedIn(true)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem("c09-token")
    setLoggedIn(false)
  }

  return (
    <Router>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Sign-up page */}
            <Route exact path="/" element={<SignRoute />}>
              <Route exact path="/" element={<Welcome view={'signup'} client={client}/>} />
            </Route>
            {/* Sign-in page */}
            <Route exact path="/signin" element={<SignRoute />}>
              <Route exact path="/signin" element={<Welcome view={'signin'} onLogin={handleLogin} client={client}/>} />
            </Route>
            {/* Video page */}
            <Route exact path="/workout" element={<PrivateRoute />}>
              <Route exact path="/workout" element={<Workout client={client} onLogout={handleLogout} />} />
            </Route>
            {/* Dashboard page */}
            <Route exact path="/dashboard" element={<PrivateRoute />}>
              <Route exact path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
            </Route>
            {/* Reports page */}
            <Route exact path="/reports" element={<PrivateRoute />}>
              <Route exact path="/reports" element={<Reports onLogout={handleLogout} />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;

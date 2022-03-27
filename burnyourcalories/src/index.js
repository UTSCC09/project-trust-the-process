import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import {
  ApolloClient, 
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Shoppies from './pages/index';
import Welcome from './pages/welcome';
import Workout from './pages/workout';
import Dashboard from './pages/dashboard';
import Reports from './pages/reports';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3001',
  })
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Example path */}
          <Route exact path="/example" element={<Shoppies />} />
          {/* Sign-up page */}
          <Route exact path="/" element={<Welcome view={'signup'} client={client}/>} />
          {/* Sign-in page */}
          <Route exact path="/signin" element={<Welcome view={'signin'} client={client}/>} />
          {/* Video page */}
          <Route exact path="/workout" element={<Workout client={client}/>} />
          {/* Dashboard page */}
          <Route exact path="/dashboard" element={<Dashboard />} />
          {/* Reports page */}
          <Route exact path="/reports" element={<Reports />} />
        </Routes>
      </ThemeProvider>
    </ApolloProvider>
  </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

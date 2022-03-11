import './App.css';
import React from 'react';
import RoutesHandler from './Routes';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#542788',
      contrastText: '#ffffff',
    }
  },
});

export default function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <RoutesHandler />
      </ThemeProvider>
    </React.Fragment>
  );
}


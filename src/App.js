import './App.css';
import React, { useEffect } from 'react';
import RoutesHandler from './Routes';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./Redux/userSlice";

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

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is ", authUser);
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
        <RoutesHandler />
      </ThemeProvider>
    </React.Fragment>
  );
}


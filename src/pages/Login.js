import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginContent from '../components/Login/Content';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
  }));

export default function Login() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <LoginContent />
        </div>
    )
}
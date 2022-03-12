import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RegisterContent from '../components/Register/Content';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
  }));

export default function Register() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <RegisterContent />
        </div>
    )
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ResetContent from '../components/Reset/Content';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
  }));

export default function Reset() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <ResetContent />
        </div>
    )
}
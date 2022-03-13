import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeContent from '../components/Home/Content';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
  }));

export default function Home() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <HomeContent />
        </div>
    )
}
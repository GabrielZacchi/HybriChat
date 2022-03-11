import React from "react";
import { Grid } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Carregando() {
    return(
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <CircularProgress />
                </Grid> 
            </Grid>
        </div>  
    );
}


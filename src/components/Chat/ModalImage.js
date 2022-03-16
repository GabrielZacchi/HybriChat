import React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Grid } from '@material-ui/core';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalImage(props) {
    const { open, handleClose, postImg } = props;

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                PaperProps={{
                    style: {
                        backgroundColor: `rgba(0, 0, 0, 0.7)`,
                        boxShadow: 'none',
                    },
                }}
            >
                <AppBar
                    sx={{ position: 'relative' }}
                    style={{
                        backgroundColor: `rgba(0, 0, 0, 0.7)`,
                    }}
                >
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Imagem
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '80vh' }}
                >
                    <Grid item>
                        <TransformWrapper>
                            <TransformComponent>
                                <img
                                    src={postImg}
                                    alt={postImg}
                                    style={{ height: "auto", maxHeight: "100%", width: "auto", maxWidth: "100%" }}
                                />
                            </TransformComponent>
                        </TransformWrapper>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}
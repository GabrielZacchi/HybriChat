import React from 'react';
import { Grid, Paper, TextField, Button } from '@material-ui/core'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { BrowserView, MobileView } from 'react-device-detect';
import Carregando from '../carregando';

import { Link as RouterLink } from "react-router-dom";


const LoginContent = props => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [titulo, setTitulo] = React.useState("");
    const [mensagem, setMensagem] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [showPwd, setShowPwd] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [usuario, setUsuario] = React.useState("");
    const [senha, setSenha] = React.useState("");

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPwd(!showPwd);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleOpen = (motivo) => {
        if (motivo === 'erroLogin') {
            setTitulo('Erro Login');
            setMensagem('Email ou Senha Inválidos.');
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('erroLogin')
        window.location.reload();
    };

    const handleUsuario = (event) => {
        setUsuario(event.target.value);
    };

    const handleSenha = (event) => {
        setSenha(event.target.value);
    };

    const handleSubmit = values => {
        if (localStorage.erroLogin) {
            if (localStorage.erroLogin === 'undefined') {
                setMensagem('Necessário preencher todos os campos !');
            } else {
                setMensagem(localStorage.erroLogin);
            }
            setOpen(true);
        }
    };

    const paperStyle = { 
        padding: 20, 
        height: 'auto', 
        width: 'auto', 
        margin: '20px auto'
    }
    const btnstyle = { margin: '8px 0' }
    return (
        <React.Fragment>
            {loading === false ?
                <div style={{ flexGrow: 1 }}>
                    <MobileView style={{ padding: 20 }}>
                        <div id="recptcha-container" />
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <Grid container spacing={3} align='center' direction="column">
                                <Grid item>
                                    <img draggable="false" width="180" />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label='Email'
                                        fullWidth
                                        required
                                        onChange={(e) => handleEmail(e)}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label='Senha'
                                        type={showPwd ? 'text' : 'password'}
                                        fullWidth
                                        required
                                        onChange={(e) => handlePassword(e)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {

                                            }
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPwd ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item />
                                <Grid item >
                                    <Button
                                        type='submit'
                                        color='primary'
                                        variant="contained"
                                        style={btnstyle}
                                        fullWidth

                                    >
                                        Entrar
                                    </Button>
                                    <div>
                                        <Link component={RouterLink} to="/reset" >
                                            Esqueceu sua senha ?
                                        </Link>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MobileView>
                    <BrowserView style={{ backgroundColor: '#36393f' }}>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: '100vh' }}
                        >
                            <Paper elevation={10} style={paperStyle}>
                                <Grid container spacing={3} align='center' direction="column">
                                    <Grid item>
                                        <img width="180" />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label='Usuário'
                                            fullWidth required
                                            onChange={(e) => handleUsuario(e)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSubmit({ username: usuario, password: senha });
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label='Senha'
                                            type={showPwd ? 'text' : 'password'}
                                            fullWidth
                                            required
                                            onChange={(e) => handleSenha(e)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSubmit({ username: usuario, password: senha });
                                                }
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPwd ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                    </IconButton>
                                                </InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item />
                                    <Grid item >
                                        <Button
                                            type='submit'
                                            color='primary'
                                            variant="contained"
                                            style={btnstyle}
                                            fullWidth
                                            onClick={() => handleSubmit({ username: usuario, password: senha })}
                                        >
                                            Entrar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </BrowserView>
                </div>
                :
                <div style={{ flexGrow: 1, padding: 20 }}>
                    <Carregando />
                </div>
            }
        </React.Fragment>
    )
}

export default LoginContent
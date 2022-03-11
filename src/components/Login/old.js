import React, {Component} from "react";
import { Grid,Paper, Avatar, TextField, Button } from '@material-ui/core'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const LoginContent = props => {
    const [usuario, setUsuario] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [mensagem, setMensagem] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [showPwd, setShowPwd] = React.useState(false);

    const handleUsuario = (event) => {
        setUsuario(event.target.value);
    };

    const handleSenha = (event) => {
        setSenha(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPwd(!showPwd);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const handleSubmit = values => {
        if(localStorage.erroLogin){
            if(localStorage.erroLogin === 'undefined'){
                setMensagem('Necessário preencher todos os campos !');
            } else {
                setMensagem(localStorage.erroLogin);
            }
            setOpen(true);
        }
    };
    
    const handleClose = () => {
        setOpen(false);
        localStorage.removeItem('erroLogin')
        window.location.reload();
    };
    
    const paperStyle={padding :20, height:'auto', width:'auto', margin:"20px auto"}
    const btnstyle={margin:'8px 0'}
    return(
        <React.Fragment>
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
                        <img  width="180" />
                    </Grid>
                    <Grid item>
                        <TextField 
                            label='Usuário' 
                            fullWidth required
                            onChange={(e) => handleUsuario(e)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit({username: usuario, password: senha});
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
                                    handleSubmit({username: usuario, password: senha});
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
                            onClick={() => handleSubmit({username: usuario, password: senha})}
                        >
                            Entrar
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default LoginContent
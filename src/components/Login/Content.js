import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { BrowserView, MobileView } from "react-device-detect";
import logo from "../../assets/hybri.png";
import back from "../../assets/back.png";
import GoogleButton from "react-google-button";
import Carregando from "../carregando";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  auth,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginContent = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [open, setOpen] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

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
    if (motivo === "erroLogin") {
      setTitulo("Erro Login");
      setMensagem("Email ou Senha Inválidos.");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem("erroLogin");
    window.location.reload();
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "auto",
    margin: "20px auto",
  };
  return (
    <React.Fragment>
      {!loading ? (
        <div style={{ flexGrow: 1 }}>
          <MobileView style={{ padding: 20 }}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid container spacing={3} align="center" direction="column">
                <Grid item>
                  <img src={logo} draggable="false" width="180" />
                </Grid>
                <Grid item>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    required
                    onChange={(e) => handleEmail(e)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Senha"
                    type={showPwd ? "text" : "password"}
                    fullWidth
                    value={password}
                    required
                    onChange={(e) => handlePassword(e)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        logInWithEmailAndPassword(email, password);
                      }
                    }}
                    helperText={
                      <Link component={RouterLink} to="/reset">
                        Esqueceu sua senha ?
                      </Link>
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="tornar senha visivel"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPwd ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item />
                <Grid item>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                    fullWidth
                  >
                    Entrar
                  </Button>
                </Grid>
                <Grid item>
                  <div>
                    {`Ainda não tem uma conta? `}
                    <Link component={RouterLink} to="/register">
                      Registre-se
                    </Link>
                  </div>
                </Grid>
                <Grid item>
                  <Divider>Ou</Divider>
                </Grid>
                <Grid item>
                  <GoogleButton
                    label="Entrar com Google"
                    style={{
                      width: "100%",
                    }}
                    onClick={() => {
                      signInWithGoogle();
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </MobileView>
          <BrowserView
            style={{
              backgroundColor: "#f1e2ff",
              backgroundImage: `url(${back})`,
              backgroundPosition: 'right',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Paper elevation={10} style={paperStyle}>
                <Grid container spacing={3} align="center" direction="column">
                  <Grid item>
                    <img src={logo} draggable="false" width="180" />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                      value={email}
                      required
                      onChange={(e) => handleEmail(e)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Senha"
                      type={showPwd ? "text" : "password"}
                      fullWidth
                      value={password}
                      required
                      onChange={(e) => handlePassword(e)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          logInWithEmailAndPassword(email, password);
                        }
                      }}
                      helperText={
                        <Link component={RouterLink} to="/reset">
                          Esqueceu sua senha ?
                        </Link>
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="tornar senha visivel"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPwd ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item />
                  <Grid item>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      onClick={() => logInWithEmailAndPassword(email, password)}
                      fullWidth
                    >
                      Entrar
                    </Button>
                  </Grid>
                  <Grid item>
                    <div>
                      {`Ainda não tem uma conta? `}
                      <Link component={RouterLink} to="/register">
                        Registre-se
                      </Link>
                    </div>
                  </Grid>
                  <Grid item>
                    <Divider>Ou</Divider>
                  </Grid>
                  <Grid item>
                    <GoogleButton
                      label="Entrar com Google"
                      style={{
                        width: "100%",
                      }}
                      onClick={() => {
                        signInWithGoogle();
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </BrowserView>
        </div>
      ) : (
        <div style={{ flexGrow: 1 }}>
          <Carregando />
        </div>
      )}
    </React.Fragment>
  );
};

export default LoginContent;

import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { BrowserView, MobileView } from "react-device-detect";
import GoogleButton from "react-google-button";
import Carregando from "../carregando";
import ModalAlerta from "../modalAlerta";

import logo from "../../assets/hybri.png";
import back from "../../assets/back.png";
import astronauta from "../../assets/astronauta.png";

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
  const [user, loadingAuth, error] = useAuthState(auth);
  const [clicked, setClicked] = useState(false);
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = () => {
    setLoading(true);
    setClicked(true);
    logInWithEmailAndPassword(email, password, setResponse);
  };

  useEffect(() => {
    if (loadingAuth) return;
    if (user) navigate("/");
  }, [user, loadingAuth]);

  useEffect(() => {
    setLoading(false);
    if (response.status === 400) {
      if (response.message) {
        setTitulo("Erro");
        setMensagem(response.message);
        handleOpen();
      }
    }
  }, [response]);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "auto",
    margin: "20px auto",
  };
  return (
    <React.Fragment>
      {!loading && !loadingAuth ? (
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
                    error={clicked ? (email ? false : true) : false}
                    helperText={
                      clicked ? (email ? "" : "Por favor, digite o email") : ""
                    }
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
                    error={clicked ? (password ? false : true) : false}
                    required
                    onChange={(e) => handlePassword(e)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        login();
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
                    onClick={() => login()}
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
              backgroundImage: `url(${back}), url(${astronauta})`,
              backgroundPosition: "right, left bottom",
              backgroundRepeat: "no-repeat",
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
                      error={clicked ? (email ? false : true) : false}
                      helperText={
                        clicked
                          ? email
                            ? ""
                            : "Por favor, digite o email"
                          : ""
                      }
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
                      error={clicked ? (password ? false : true) : false}
                      helperText={
                        clicked
                          ? password
                            ? ""
                            : "Por favor, digite a senha"
                          : ""
                      }
                      required
                      onChange={(e) => handlePassword(e)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          login();
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
                      onClick={() => login()}
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
      <ModalAlerta
        open={open}
        handleClose={handleClose}
        mensagem={mensagem}
        titulo={titulo}
      />
    </React.Fragment>
  );
};

export default LoginContent;

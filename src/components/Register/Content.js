import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Link from "@material-ui/core/Link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { BrowserView, MobileView } from "react-device-detect";
import { useAuthState } from "react-firebase-hooks/auth";
import Carregando from "../carregando";
import ModalAlerta from "../modalAlerta";

import logo from "../../assets/hybri.png";
import back from "../../assets/back.png";
import astronauta from "../../assets/astronauta.png";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";

const RegisterContent = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [user, loadingAuth, error] = useAuthState(auth);
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [open, setOpen] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = () => {
    setLoading(true);
    setClicked(true);
    registerWithEmailAndPassword(name, email, password, setResponse);
  };

  useEffect(() => {
    if (loadingAuth) return;
    if (user) navigate("/");
  }, [user, loadingAuth]);

  useEffect(() => {
    setLoading(false);
    if (response.status === 200) {
      setTitulo("Sucesso");
      setMensagem("Registro realizado com sucesso!");
      handleOpen();
    } else if (response.status === 400) {
      if (response.message) {
        setTitulo("Erro");
        setMensagem(response.message);
        handleOpen();
      }
    }
  }, [response]);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
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
    if (response.status === 200) navigate("/");
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
                    label="Nome"
                    type="text"
                    error={clicked ? (name ? false : true) : false}
                    helperText={
                      clicked ? (name ? "" : "Por favor, digite o nome") : ""
                    }
                    fullWidth
                    value={name}
                    required
                    onChange={(e) => handleName(e)}
                  />
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
                    error={clicked ? (password ? false : true) : false}
                    helperText={
                      clicked
                        ? password
                          ? ""
                          : "Por favor, digite a senha"
                        : ""
                    }
                    value={password}
                    required
                    onChange={(e) => handlePassword(e)}
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
                <Grid item>
                  <TextField
                    label="Confirmar Senha"
                    type={showPwd ? "text" : "password"}
                    error={
                      clicked
                        ? password
                          ? password === passwordConfirm
                            ? false
                            : true
                          : false
                        : false
                    }
                    helperText={
                      clicked
                        ? password
                          ? password === passwordConfirm
                            ? ""
                            : "As senhas devem ser iguais!"
                          : ""
                        : ""
                    }
                    fullWidth
                    value={passwordConfirm}
                    required
                    onChange={(e) => handlePasswordConfirm(e)}
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
                    onClick={() => register()}
                    fullWidth
                  >
                    Registrar
                  </Button>
                </Grid>
                <Grid item>
                  <div>
                    {`Já tem uma conta? `}
                    <Link component={RouterLink} to="/login">
                      Entrar
                    </Link>
                  </div>
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
                      label="Nome"
                      type="text"
                      error={clicked ? (name ? false : true) : false}
                      helperText={
                        clicked ? (name ? "" : "Por favor, digite o nome") : ""
                      }
                      fullWidth
                      value={name}
                      required
                      onChange={(e) => handleName(e)}
                    />
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
                      error={clicked ? (password ? false : true) : false}
                      helperText={
                        clicked
                          ? password
                            ? ""
                            : "Por favor, digite a senha"
                          : ""
                      }
                      fullWidth
                      value={password}
                      required
                      onChange={(e) => handlePassword(e)}
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
                  <Grid item>
                    <TextField
                      label="Confirmar Senha"
                      type={showPwd ? "text" : "password"}
                      error={
                        clicked
                          ? password
                            ? password === passwordConfirm
                              ? false
                              : true
                            : false
                          : false
                      }
                      helperText={
                        clicked
                          ? password
                            ? password === passwordConfirm
                              ? ""
                              : "As senhas devem ser iguais!"
                            : ""
                          : ""
                      }
                      fullWidth
                      value={passwordConfirm}
                      required
                      onChange={(e) => handlePasswordConfirm(e)}
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
                      onClick={() => register()}
                      fullWidth
                    >
                      Registrar
                    </Button>
                  </Grid>
                  <Grid item>
                    <div>
                      {`Já tem uma conta? `}
                      <Link component={RouterLink} to="/login">
                        Entrar
                      </Link>
                    </div>
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

export default RegisterContent;

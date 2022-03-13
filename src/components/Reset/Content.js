import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import Carregando from "../carregando";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import Link from "@material-ui/core/Link";
import { auth, sendPasswordReset } from "../../firebase";
import ModalAlerta from "../modalAlerta";

import logo from "../../assets/hybri.png";
import back from "../../assets/back.png";
import astronauta from "../../assets/astronauta.png";

const ResetContent = (props) => {
  const [email, setEmail] = useState("");
  const [user, loadingAuth, error] = useAuthState(auth);
  const [response, setResponse] = useState({});
  const [clicked, setClicked] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const reset = () => {
    setLoading(true);
    setClicked(true);
    sendPasswordReset(email, setResponse);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if(response.status === 200) navigate("/");
  };

  useEffect(() => {
    if (loadingAuth) return;
    if (user) navigate("/");
  }, [user, loadingAuth]);

  useEffect(() => {
    setLoading(false);
    if (response.status === 200) {
      setTitulo("Sucesso");
      setMensagem(
        `Link para recuperação de senha enviado para o email ${email}`
      );
      handleOpen();
    } else if (response.status === 400) {
      if (response.message) {
        setTitulo("Erro");
        setMensagem(response.message);
        handleOpen();
      }
    }
  }, [response]);

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
                    fullWidth
                    value={email}
                    required
                    onChange={(e) => handleEmail(e)}
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={() => reset()}
                    fullWidth
                  >
                    Enviar
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
                      fullWidth
                      value={email}
                      required
                      error={clicked ? (email ? false : true) : false}
                      helperText={
                        clicked
                          ? email
                            ? ""
                            : "Por favor, digite o email"
                          : ""
                      }
                      onChange={(e) => handleEmail(e)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      onClick={() => reset()}
                      fullWidth
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          reset();
                        }
                      }}
                    >
                      Enviar
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

export default ResetContent;

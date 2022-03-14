import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HomeContent from "../components/Home/Content";
import AppBarChat from "../components/Home/AppBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Carregando from "../components/carregando";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#f1e2ff !important",
    height: "100vh",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [user, loadingAuth, error] = useAuthState(auth);
  return (
    <React.Fragment>
      {!loadingAuth ?
        <div className={classes.root}>
          <AppBarChat user={user} />
          <main className={classes.content}>
            <div className={classes.toolbar} style={{ minHeight: "50px" }} />
            <HomeContent user={user} />
          </main>
        </div>
        :
        <div className={classes.root}>
          <Carregando />
        </div>
      }
    </React.Fragment>
  );
}

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "50px",
    paddingBottom: "25px",
  },
  heading: {
    fontSize: "2.2em",
    fontWeight: "700",
    color: "grey"
  },
  channelDiv: {
    padding: "15px",
  },
  channelContent: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    padding: "20px",
    alignItems: "center",
  },
  square: {
    height: "80px",
    width: "80px",
    fontSize: "2rem",
  },
  rootChannel: {
    height: "calc(100vh - 185px)",
    position: "relative",
    padding: "15px",
    overflowY: "scroll",
  },
  channelText: {
    paddingTop: "10px",
    fontSize: "1.2rem",
  },
}));

function HomeContent() {
  const classes = useStyles();
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshChannelList();
  }, []);

  const refreshChannelList = () => {
    const channelRef = collection(db, "channels");
    const q = query(channelRef, orderBy("channelName", "asc"));
    onSnapshot(q, (snapshot) => {
        setChannels(
        snapshot.docs.map((doc) => ({
          channelName: doc.data().channelName,
          id: doc.id,
        }))
      );
    });
  };

  const goToChannel = (id) => {
    navigate(`/channel/${id}`);
  };

  return (
    <div >
      <Grid container className={classes.root}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography component="h1" className={classes.heading}>
            Bem Vindo ao HybriChat
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.rootChannel}>
        {channels.map((channel) => (
          <Grid
            item
            xs={6}
            md={3}
            className={classes.channelDiv}
            key={channel.id}
          >
            <Card className={classes.channelCard}>
              <CardActionArea
                style={{ display: "flex" }}
                onClick={() => goToChannel(channel.id)}
              >
                <CardContent className={classes.channelContent}>
                  <Avatar
                    variant="square"
                    className={classes.square}
                  >
                    {channel.channelName.substr(0, 1).toUpperCase()}
                  </Avatar>
                  <Typography className={classes.channelText}>
                    {channel.channelName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HomeContent;

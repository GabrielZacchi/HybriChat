import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@mui/icons-material/Add";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import TagIcon from "@mui/icons-material/Tag";
import CreateRoom from "./CreateRoom";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconDesign: {
    fontSize: "1.5em",
    color: "#542788",
  },
  primary: {
    color: "#542788",
  },
}));

const Rooms = (props) => {
  const { setMobileOpen } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [channelList, setChannelList] = useState([]);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    refreshChannelList();
  }, []);

  const refreshChannelList = () => {
    const channelRef = collection(db, "channels");
    const q = query(channelRef, orderBy("channelName", "asc"));
    onSnapshot(q, (snapshot) => {
      setChannelList(
        snapshot.docs.map((doc) => ({
          channelName: doc.data().channelName,
          id: doc.id,
        }))
      );
    });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const goToChannel = (id) => {
    setMobileOpen(false);
    navigate(`/channel/${id}`);
  };

  const manageCreateRoomModal = () => {
    setShowCreateRoom(!showCreateRoom);
  };

  const handleAlert = () => {
    setAlert(!alert);
  };

  const addChannel = (cName) => {
    if (cName) {
      cName = cName.toLowerCase();
      for (var i = 0; i < channelList.length; i++) {
        if (cName === channelList[i].channelName) {
          handleAlert();
          return;
        }
      }

      addDoc(collection(db, "channels"), {
        channelName: cName.toLowerCase(),
      })
        .then((res) => {
          console.log("added new channel");
        })
        .then((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        onClose={handleAlert}
        TransitionComponent={Fade}
        message="Room Name Already Exits!!"
        key={Fade}
        action={
          <IconButton aria-label="close" color="inherit" onClick={handleAlert}>
            <CloseIcon />
          </IconButton>
        }
      />

      {showCreateRoom ? (
        <CreateRoom create={addChannel} manage={manageCreateRoomModal} />
      ) : null}
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Button endIcon={<AddIcon className={classes.primary} />} onClick={manageCreateRoomModal}>
          Criar Novo Canal
        </Button>
      </ListItem>
      <Divider />

      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ChatIcon className={classes.iconDesign} />
          </ListItemIcon>
          <ListItemText primary="Canais" />
          {open ? (
            <ExpandLessIcon className={classes.primary} />
          ) : (
            <ExpandMoreIcon className={classes.primary} />
          )}
        </ListItem>

        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {channelList.map((channel) => (
              <ListItem
                key={channel.id}
                button
                className={classes.nested}
                onClick={() => goToChannel(channel.id)}
              >
                <ListItemIcon style={{ minWidth: "30px" }}>
                  <TagIcon
                    className={classes.iconDesign}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={channel.channelName}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
}

export default Rooms;

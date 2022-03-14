import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Messages from "./Messages";
import IconButton from "@material-ui/core/IconButton";
import { useParams } from "react-router-dom";
import { db, auth } from "../../firebase";
import ScrollableFeed from "react-scrollable-feed";
import TagIcon from "@mui/icons-material/Tag";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Picker } from "emoji-mart";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FileUpload from "./FileUpload";
import "emoji-mart/css/emoji-mart.css";
import AppBarChat from "../Home/AppBar";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  chat: {
    position: "relative",
    height: "calc(100vh - 200px)",
    paddingLeft: "10px",
    paddingBottom: "5px",
    paddingTop: "5px",
    backgroundColor: "#f1e2ff"
  },
  footer: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "10px",
  },
  message: {
    width: "100%",
    color: "white",
  },
  roomName: {
    borderLeft: 0,
    borderRight: 0,
    padding: "15px",
    display: "flex",
  },
  roomNameText: {
    marginBlockEnd: 0,
    marginBlockStart: 0,
    paddingLeft: "5px",
  },
  iconDesign: {
    fontSize: "1.5em",
  },
  footerContent: {
    display: "flex",
    borderRadius: "5px",
    alignItems: "center",
  },
  inputFile: {
    display: "none",
  },
}));

function Chat() {
  const classes = useStyles();
  const params = useParams();
  const [allMessages, setAllMessages] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [userNewMsg, setUserNewMsg] = useState("");
  const [emojiBtn, setEmojiBtn] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [file, setFileName] = useState(null);
  const [user, loadingAuth, error] = useAuthState(auth);

  useEffect(() => {
    if (params.id) {
      const channelRef = doc(db, "channels", params.id);
      onSnapshot(channelRef, { includeMetadataChanges: true }, (doc) => {
        setChannelName(doc.data().channelName);
      });
      const messagesRef = collection(channelRef, "messages");
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setAllMessages(
          snapshot.docs.map((message) => ({
            id: message.id,
            data: message.data(),
          }))
        );
      });
      return unsubscribe;
    }
  }, [params]);

  const sendMsg = async (e) => {
    e.preventDefault();
    if (userNewMsg && params.id) {
      if (user) {
        const imgUrl = user.photoURL;
        const uid = user.uid;
        const likeCount = 0;
        const likes = {};
        const fireCount = 0;
        const fire = {};
        const heartCount = 0;
        const heart = {};
        const postImg = null;
        const obj = {
          text: userNewMsg,
          timestamp: serverTimestamp(),
          userImg: imgUrl,
          userName: user.displayName,
          uid: uid,
          likeCount: likeCount,
          likes: likes,
          fireCount: fireCount,
          fire: fire,
          heartCount: heartCount,
          heart: heart,
          postImg: postImg,
        };

        const channelRef = doc(db, "channels", params.id);
        const messagesRef = collection(channelRef, "messages");

        await addDoc(messagesRef, obj)
          .then((res) => {
            console.log("message sent");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setUserNewMsg("");
      setEmojiBtn(false);
    }
  };

  const addEmoji = (e) => {
    setUserNewMsg(userNewMsg + e.native);
  };

  const openModal = () => {
    setModalState(!modalState);
  };

  const handelFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setFileName(e.target.files[0]);
      openModal();
    }
    e.target.value = null;
  };

  return (
    <div className={classes.root}>
      <AppBarChat user={user} />
      <main className={classes.content}>
        <div className={classes.toolbar} style={{ minHeight: "50px" }} />
        {modalState ? <FileUpload setState={openModal} file={file} /> : null}
        <Grid item xs={12} className={classes.roomName}>
          <TagIcon className={classes.iconDesign} />
          <h3 className={classes.roomNameText}>{channelName}</h3>
        </Grid>
        <Grid item xs={12} className={classes.chat}>
          <ScrollableFeed>
            {allMessages.map((message) => (
              <Messages
                key={message.id}
                values={message.data}
                msgId={message.id}
              />
            ))}
          </ScrollableFeed>
        </Grid>
        <div className={classes.footer}>
          <Grid item xs={12} className={classes.footerContent}>
            <input
              accept="image/*"
              className={classes.inputFile}
              id="icon-button-file"
              type="file"
              onChange={(e) => handelFileUpload(e)}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>

            <IconButton
              color="primary"
              component="button"
              onClick={() => setEmojiBtn(!emojiBtn)}
            >
              <InsertEmoticonIcon />
            </IconButton>
            {emojiBtn ? <Picker onSelect={addEmoji} theme="dark" /> : null}

            <form
              autoComplete="off"
              style={{ width: "100%", display: "flex" }}
              onSubmit={(e) => sendMsg(e)}
            >
              <TextField
                className={classes.message}
                required
                id="outlined-basic"
                label="Mensagem"
                variant="outlined"
                multiline
                rows={1}
                rowsMax={2}
                value={userNewMsg}
                autoFocus
                onChange={(e) => {
                  setUserNewMsg(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMsg(e);
                  }
                }}
              />
              <IconButton type="submit" component="button">
                <SendIcon />
              </IconButton>
            </form>
          </Grid>
        </div>
      </main>
    </div>
  );
}

export default Chat;

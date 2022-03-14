import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { storage, db, auth } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useParams } from "react-router-dom";
import { addDoc, collection, serverTimestamp, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const useStyles = makeStyles((theme) => ({
  displayImage: {
    height: "105px",
    width: "180px",
  },
  imageName: {
    paddingLeft: "15px",
    fontSize: "1.3em",
  },
  imageDiv: {
    marginLeft: "16px",
    marginRight: "16px",
    marginTop: "-33px",
  },
}));

function FileUpload({ setState, file }) {
  const params = useParams();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressBar, setProgressBar] = useState({ display: "none" });
  const [message, setMessage] = useState("");
  const [user, loadingAuth, error] = useAuthState(auth);

  const handleClose = () => {
    setOpen(false);
    setState();
  };

  const sendMsg = (downloadURL) => {
    if (params.id) {

      if (user) {
        const displayName = user.displayName;
        const imgUrl = user.photoURL;
        const uid = user.uid;
        const likeCount = 0;
        const likes = {};
        const fireCount = 0;
        const fire = {};
        const heartCount = 0;
        const heart = {};
        const postImg = downloadURL;
        const obj = {
          text: message,
          timestamp: serverTimestamp(),
          userImg: imgUrl,
          userName: displayName,
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

        addDoc(messagesRef, obj)
          .then((res) => {
            console.log("message sent");
          })
          .catch((err) => {
            console.log(err);
          });
      }

      setMessage("");
    }
  };

  const fileObj = URL.createObjectURL(file);

  const handleUpload = (e) => {
    e.preventDefault();
    setProgressBar({ display: "block" });
    const uploadRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(uploadRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          sendMsg(downloadURL);
        });
        handleClose();
      }
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.imageDiv}>
          <img src={fileObj} alt={file.name} className={classes.displayImage} />
          <Typography className={classes.imageName}>{file.name}</Typography>
        </div>

        <DialogTitle id="alert-dialog-title">Enviar Imagem</DialogTitle>

        <DialogContent>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              handleUpload(e);
            }}
          >
            <TextField
              id="outlined-basic"
              label="Mensagem"
              fullWidth
              margin="normal"
              variant="outlined"
              autoFocus
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setMessage(e.target.value);
                }
              }}
            />
          </form>

          <div style={progressBar}>
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2">{Math.round(progress)}%</Typography>
              </Box>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={(e) => handleUpload(e)}
            color="primary"
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FileUpload;

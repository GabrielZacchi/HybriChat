import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, IconButton } from "@material-ui/core";
import { db, auth, storage } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "@material-ui/core";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import CircularProgress from '@mui/material/CircularProgress';

function EditProfile({ toggler, alert }) {
  const [open, setOpen] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const [user, loadingAuth, error] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    toggler();
    if (newPhotoURL !== photoURL) {
      const delRef = ref(storage, newPhotoURL);
      deleteObject(delRef).then(() => {
        console.log('Old photo deleted successfully');
      }).catch((error) => {
        console.log('Uh-oh, an error occurred!');
      });
    }
  };

  const update = (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: newPhotoURL,
    }).then(res => {
      console.log(res);
      const delRef = ref(storage, photoURL);
      deleteObject(delRef).then(() => {
        console.log('Old photo deleted successfully');
      }).catch((error) => {
        console.log('Uh-oh, an error occurred!');
      });
    }).catch(err => {
      console.log(err);
    });
    setOpen(false);
    toggler();
  };

  const handelFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setLoading(true);
      if (newPhotoURL !== photoURL) {
        const delRef = ref(storage, newPhotoURL);
        deleteObject(delRef).then(() => {
          console.log('Old photo deleted successfully');
        }).catch((error) => {
          console.log('Uh-oh, an error occurred!');
        });
      }
      const file = e.target.files[0];
      var time = Math.floor(new Date().getTime() / 1000);
      const uploadRef = ref(storage, `images/${time}`);
      const uploadTask = uploadBytesResumable(uploadRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
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
            setNewPhotoURL(downloadURL);
            setLoading(false);
          });
        }
      );
    }
    e.target.value = null;
  };

  useEffect(() => {
    setDisplayName(user.displayName);
    setEmail(user.email);
    setUid(user.uid);
    setPhotoURL(user.photoURL);
    setNewPhotoURL(user.photoURL);
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar Perfil</DialogTitle>
        <DialogContent >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-button-file"
                type="file"
                onChange={(e) => handelFileUpload(e)}
              />
              <label htmlFor="profile-button-file">
                <IconButton
                  aria-label="upload picture"
                  component="span"
                >{loading ?
                  <CircularProgress style={{ color: '#542788' }} />
                  :
                  <Avatar
                    style={{ height: '80px', width: '80px' }}
                    alt={displayName}
                    src={newPhotoURL}
                  />
                  }
                </IconButton>
              </label>
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                disabled
                autoComplete='off'
                value={email}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Nome"
                fullWidth
                margin="normal"
                variant="outlined"
                value={displayName}
                autoComplete='off'
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={(e) => update(e)}
            color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}

export default EditProfile;

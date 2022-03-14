import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, IconButton } from "@material-ui/core";
import { db, auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "@material-ui/core";
import { updateProfile  } from "firebase/auth";

function EditProfile({ toggler, alert }) {
  const [open, setOpen] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [user, loadingAuth, error] = useAuthState(auth);

  const handleClose = () => {
    setOpen(false);
    toggler();
  };

  const update = (e) => {
    e.preventDefault();
    updateProfile (auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    setOpen(false);
    toggler();
  };

  const handelFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setPhotoURL(URL.createObjectURL(e.target.files[0]));
    }
    e.target.value = null;
  };

  useEffect(() => {
    setDisplayName(user.displayName);
    setEmail(user.email);
    setUid(user.uid);
    setPhotoURL(user.photoURL);
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
                id="icon-button-file"
                type="file"
                onChange={(e) => handelFileUpload(e)}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  aria-label="upload picture"
                  component="span"
                >
                  <Avatar
                    style={{ height: '80px', width: '80px' }}
                    alt={displayName}
                    src={photoURL}
                  />
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

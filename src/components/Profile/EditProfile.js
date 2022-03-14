import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db, auth } from "../../firebase";
import { collection, doc, getDoc, query, setDoc, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function EditProfile({ toggler, alert }) {
  const [open, setOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [user, loadingAuth, error] = useAuthState(auth);

  const handleClose = () => {
    setOpen(false);
    toggler();
  };

  const updateProfile = (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", uid);
    setDoc(userRef, {
      displayName: displayName,
    })
      .then((res) => {
        alert();
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
    toggler();
  };

  useEffect(() => {
    setDisplayName(user.displayName);
    setEmail(user.email);
    setUid(user.uid);
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar Perfil</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              disabled
              value={email}
            />

            <TextField
              id="outlined-basic"
              label="Nome"
              fullWidth
              margin="normal"
              variant="outlined"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={(e) => updateProfile(e)}
            color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfile;

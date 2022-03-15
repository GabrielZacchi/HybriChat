import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import {
  getStorage
} from "firebase/storage";

import VerifyErroCode from "./components/traduzirErros";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
const logInWithEmailAndPassword = async (email, password, setResponse) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setResponse({
      status: 200,
      message: "Sucesso!",
    });
  } catch (err) {
    console.error(err);
    setResponse({
      status: 400,
      message: VerifyErroCode(err.code),
    });
  }
};
const registerWithEmailAndPassword = async (
  name,
  email,
  password,
  setResponse
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
    updateProfile(user, {
      displayName: name,
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      displayName: name,
      authProvider: "local",
      email,
    });
    setResponse({
      status: 200,
      message: "Sucesso!",
    });
  } catch (err) {
    console.error(err);
    setResponse({
      status: 400,
      message: VerifyErroCode(err.code),
    });
  }
};

const sendPasswordReset = async (email, setResponse) => {
  try {
    await sendPasswordResetEmail(auth, email);
    setResponse({
      status: 200,
      message: "Sucesso!",
    });
  } catch (err) {
    console.error(err);
    setResponse({
      status: 400,
      message: VerifyErroCode(err.code),
    });
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  storage,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};

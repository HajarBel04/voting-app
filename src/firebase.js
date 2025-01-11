// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHS0asPK97r2bCw7Byh_dsM97rnzApuTw",
  authDomain: "examr-572ef.firebaseapp.com",
  projectId: "examr-572ef",
  storageBucket: "examr-572ef.firebasestorage.app",
  messagingSenderId: "722537517670",
  appId: "1:722537517670:web:db26c023daabb49f4853a7",
  measurementId: "G-RXGPMTSLFG"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup };
 import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfhuCPUrttr5675thJCDGJ7I-7mAJ_WxbbwnCOmoDwk",
  authDomain: "ecommerce-8f4y55548fb.firebaseapp.com",
  projectId: "ecommerce-84y54454hf8fb",
  storageBucket: "ecommerce-8f4yu8fb.65appspot.com",
  messagingSenderId: "1470234y3684y4u1432",
  appId: "1:14702368q3y41432:wy3qeb:42eea3y4u53a63a76c8qy400559y4bded"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
const storage = getStorage(app);

 
export {
  auth,
  db,
  storage,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  doc,
  setDoc,
  ref,
  uploadBytes,
  uploadBytesResumable
};

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendSignInLinkToEmail } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCuZVVKrYVNTyZVcA21lU0urfd5KTOJsSA",
  authDomain: "event-management-app-aa9bc.firebaseapp.com",
  projectId: "event-management-app-aa9bc",
  storageBucket: "event-management-app-aa9bc.appspot.com",
  messagingSenderId: "805134895358",
  appId: "1:805134895358:web:d398dbe6b0dd74ded47daf"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app)
const auth = getAuth(app);
export {db, storage, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendSignInLinkToEmail}
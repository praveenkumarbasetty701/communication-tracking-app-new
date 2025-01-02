// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmVjb2EgOm-5lPhR1Lbwt_lxTZag6Wbsc",
  authDomain: "communication-tracking-a-d5f08.firebaseapp.com",
  projectId: "communication-tracking-a-d5f08",
  storageBucket: "communication-tracking-a-d5f08.firebasestorage.app",
  messagingSenderId: "685126997495",
  appId: "1:685126997495:web:2fe8adeff0cc55de448af2",
  measurementId: "G-60K3R1ZBWX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

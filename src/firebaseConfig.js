// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGwR8xoLWuewOEgbIMui8JI6Z97fAYUGk",
  authDomain: "lumos-424314.firebaseapp.com",
  projectId: "lumos-424314",
  storageBucket: "lumos-424314.appspot.com",
  messagingSenderId: "858548677963",
  appId: "1:858548677963:web:870ce1202eeecc91570cce",
  measurementId: "G-8ETHP2S7WK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

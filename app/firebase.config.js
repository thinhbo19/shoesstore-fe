// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUlfQCQK6GSuRaAjeOGCofxI0ESY4U6GM",
  authDomain: "shoes-store-otp-8bef8.firebaseapp.com",
  projectId: "shoes-store-otp-8bef8",
  storageBucket: "shoes-store-otp-8bef8.appspot.com",
  messagingSenderId: "237925744998",
  appId: "1:237925744998:web:da8cf6d5c2bb4ea56748a7",
  measurementId: "G-PDKNHEZY1Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

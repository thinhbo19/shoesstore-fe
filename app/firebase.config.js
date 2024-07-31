// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRyDaTtQnpCVZpHUyvGfw1xl98X8TwQ2w",
  authDomain: "shoes-store-otp-ca0e7.firebaseapp.com",
  projectId: "shoes-store-otp-ca0e7",
  storageBucket: "shoes-store-otp-ca0e7.appspot.com",
  messagingSenderId: "1065553265735",
  appId: "1:1065553265735:web:e78189890c8b66c1e39d62",
  measurementId: "G-YEDVQGTGLZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

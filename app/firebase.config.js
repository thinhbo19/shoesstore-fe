// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa2_zj9DvCJ8LgKhhfi7JfRyzXnYDl5yQ",
  authDomain: "shoes-store-opt.firebaseapp.com",
  projectId: "shoes-store-opt",
  storageBucket: "shoes-store-opt.appspot.com",
  messagingSenderId: "244447464595",
  appId: "1:244447464595:web:7a8da108c660f277ef5166",
  measurementId: "G-9LSJZCDHS4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

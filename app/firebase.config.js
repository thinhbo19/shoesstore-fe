// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiqDF8HLczc4R0mM_uOAZFhixI_LPsVBI",
  authDomain: "shoes-store-otp-2c94a.firebaseapp.com",
  projectId: "shoes-store-otp-2c94a",
  storageBucket: "shoes-store-otp-2c94a.appspot.com",
  messagingSenderId: "364928727604",
  appId: "1:364928727604:web:8ee19a9f6d02aa291e2861",
  measurementId: "G-LGB4HQFH14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

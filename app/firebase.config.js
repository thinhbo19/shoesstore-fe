// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZCAMvJnzuz0YoMZkw2sIuMQAYx0bi3Qs",
  authDomain: "shoes-store-b4353.firebaseapp.com",
  projectId: "shoes-store-b4353",
  storageBucket: "shoes-store-b4353.appspot.com",
  messagingSenderId: "468067621036",
  appId: "1:468067621036:web:fb2f77c47dabc286a92709",
  measurementId: "G-P8TB3SGQMM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

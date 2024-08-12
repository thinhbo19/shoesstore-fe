// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWLlA70aMyQfTi_EyHOxvA8o3tdQ0ffLw",
  authDomain: "shoes-store-b0f4d.firebaseapp.com",
  projectId: "shoes-store-b0f4d",
  storageBucket: "shoes-store-b0f4d.appspot.com",
  messagingSenderId: "333610019938",
  appId: "1:333610019938:web:734b6265cb540bc7a4353b",
  measurementId: "G-QHM6BC8906",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

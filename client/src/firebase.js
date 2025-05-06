// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3e852.firebaseapp.com",
  projectId: "mern-estate-3e852",
  storageBucket: "mern-estate-3e852.firebasestorage.app",
  messagingSenderId: "221558670139",
  appId: "1:221558670139:web:03a86ee1974c4126722d1e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
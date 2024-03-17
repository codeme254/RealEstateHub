// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestatehub-58d5c.firebaseapp.com",
  projectId: "realestatehub-58d5c",
  storageBucket: "realestatehub-58d5c.appspot.com",
  messagingSenderId: "643123925868",
  appId: "1:643123925868:web:a8599598399039338b9949",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

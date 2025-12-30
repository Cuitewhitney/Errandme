// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeL0hwUhh753WPRuG6lZStfG13QM0YKpc",
  authDomain: "errandme-5ee73.firebaseapp.com",
  projectId: "errandme-5ee73",
  storageBucket: "errandme-5ee73.firebasestorage.app",
  messagingSenderId: "278920523648",
  appId: "1:278920523648:web:48f6183a4ee856f6c29b65",
  measurementId: "G-6HTQFGYEJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
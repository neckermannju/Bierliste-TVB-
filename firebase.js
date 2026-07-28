// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// ----------------------------
// DEDATEN
// ----------------------------


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj3jI1PzVzBe_XIy4on4gc3zpwfGml4AE",
  authDomain: "strichliste-4afe6.firebaseapp.com",
  projectId: "strichliste-4afe6",
  storageBucket: "strichliste-4afe6.firebasestorage.app",
  messagingSenderId: "1070678845280",
  appId: "1:1070678845280:web:f5eb6cef6a58b1e0fea005",
  measurementId: "G-DV9BPD7GDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

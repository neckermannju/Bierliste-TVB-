// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// ----------------------------
// DEINE FIREBASE-DATEN
// ----------------------------

const firebaseConfig = {

    apiKey: "HIER_API_KEY",

    authDomain: "DEIN_PROJEKT.firebaseapp.com",

    projectId: "DEIN_PROJEKT",

    storageBucket: "DEIN_PROJEKT.firebasestorage.app",

    messagingSenderId: "DEINE_SENDER_ID",

    appId: "DEINE_APP_ID"

};

// ----------------------------

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

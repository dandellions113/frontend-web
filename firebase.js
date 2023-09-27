import "firebase/compat/firestore";
import "firebase/compat/auth";

import firebase from "firebase/compat/app";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

const firebaseConfig = {
    apiKey: "AIzaSyA4Ii3KCrrnj76mNBed04u1a9h9eeeriOE",
    authDomain: "news-room-c5326.firebaseapp.com",
    projectId: "news-room-c5326",
    storageBucket: "news-room-c5326.appspot.com",
    messagingSenderId: "533848678841",
    appId: "1:533848678841:web:603923d0124fea499d5668",
};

let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
export default db;

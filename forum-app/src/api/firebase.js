// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyCayi2qFrto9Z2DEulmsI3JxKBgfn9II3U",
    authDomain: "forum-app-9d1c4.firebaseapp.com",
    projectId: "forum-app-9d1c4",
    storageBucket: "forum-app-9d1c4.appspot.com",
    messagingSenderId: "905082844652",
    appId: "1:905082844652:web:dd800b06c62a3ed671fcc9",
    measurementId: "G-3P9029P87L"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALmxI5QPcwQsQirZnVwdUff7qZ-UAvdPs",
    authDomain: "monkeystyping-7629b.firebaseapp.com",
    databaseURL: "https://monkeystyping-7629b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "monkeystyping-7629b",
    storageBucket: "monkeystyping-7629b.appspot.com",
    messagingSenderId: "82642563224",
    appId: "1:82642563224:web:87583565aa534790fd60ed",
    measurementId: "G-KW719LLVZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
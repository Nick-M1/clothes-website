import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_CONFIG_APIKEY!,
    authDomain: "clothes-website-eefb8.firebaseapp.com",
    projectId: "clothes-website-eefb8",
    storageBucket: "clothes-website-eefb8.appspot.com",
    messagingSenderId: "45457361430",
    appId: "1:45457361430:web:9ee14d83f26438a88f8337",
    measurementId: "G-Q9J4N10D5L"
};

// Initialize Firebase
const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)

const db = getFirestore(app)

export {db}


// // Initialize analytics
// const analytics = getAnalytics(app);
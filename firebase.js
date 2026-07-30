// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtyfATABrDZMRGHFOvdDMRc2_HX2xad9k",
    authDomain: "lavaant-d4d96.firebaseapp.com",
    projectId: "lavaant-d4d96",
    storageBucket: "lavaant-d4d96.firebasestorage.app",
    messagingSenderId: "635828219789",
    appId: "1:635828219789:web:99da0698d40bb1d856d7c4",
    measurementId: "G-W6R8KMZ42C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

let analytics = null;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    }).catch(() => {});
}

export { app, auth, db, storage, functions, analytics };
export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 
        apiKey: "AIzaSyDBjGP6x-Rf08KkG_FtDe5OYudA5lF8I6c",
        authDomain: "socialmedia-d3d44.firebaseapp.com",
        projectId: "socialmedia-d3d44",
        storageBucket: "socialmedia-d3d44.appspot.com",
        messagingSenderId: "1079361607351",
        appId: "1:1079361607351:web:54802e74b67c9789c81f32",
        measurementId: "G-KRLW2WVFLR"
      
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app, firestore, storage };

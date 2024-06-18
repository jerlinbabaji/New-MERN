// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    //the api key should be kept private so create an environmental variable for it.
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-6ea49.firebaseapp.com",
  projectId: "mern-blog-6ea49",
  storageBucket: "mern-blog-6ea49.appspot.com",
  messagingSenderId: "510344268911",
  appId: "1:510344268911:web:a9e332545017c6afa3919a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
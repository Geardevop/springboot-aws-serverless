// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cloud-project-f2d58.firebaseapp.com",
  projectId: "cloud-project-f2d58",
  storageBucket: "cloud-project-f2d58.appspot.com",
  messagingSenderId: "105158917666",
  appId: "1:105158917666:web:edd7259a938eabf44e947b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
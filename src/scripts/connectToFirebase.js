import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEx3llrrO1-cJPv_4K8b2frPs91sHLmBU",
  authDomain: "learning-ms-creative-writing.firebaseapp.com",
  projectId: "learning-ms-creative-writing",
  storageBucket: "learning-ms-creative-writing.appspot.com",
  messagingSenderId: "422542914745",
  appId: "1:422542914745:web:652d86ec6547ebec109768",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);
export const firebaseAuth = getAuth(app);
export const cloudStorage = getStorage(app);

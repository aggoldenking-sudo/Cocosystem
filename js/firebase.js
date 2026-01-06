import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCB-Osbg7CnNVMAtfqfvZ62hy0R6kpO9Tg",
  authDomain: "cocosystem-75a66.firebaseapp.com",
  projectId: "cocosystem-75a66",
  storageBucket: "cocosystem-75a66.firebasestorage.app",
  messagingSenderId: "684433165818",
  appId: "1:684433165818:web:3a69c81f4bccda8808a843",
  measurementId: "G-NNCVD5THKX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

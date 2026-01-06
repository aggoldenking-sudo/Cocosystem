// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };


// firebase/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBDUXX2NUyob3lIdyqsDrhb1TJmHlsrF0o",
  authDomain: "skillsboosthub-ec346.firebaseapp.com",
  projectId: "skillsboosthub-ec346",
  storageBucket: "skillsboosthub-ec346.firebasestorage.app",
  messagingSenderId: "536326001110",
  appId: "1:536326001110:web:175dea7ff973448c7d9477",
  measurementId: "G-600CYBXNT0"
};

// Initialize app ONLY ONCE
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

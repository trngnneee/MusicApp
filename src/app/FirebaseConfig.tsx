import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBCJdZw6jv-hNMnGSx_JXa0iXFdETXHyJ4",
  authDomain: "musicapp-249e1.firebaseapp.com",
  databaseURL: "https://musicapp-249e1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "musicapp-249e1",
  storageBucket: "musicapp-249e1.firebasestorage.app",
  messagingSenderId: "772406042679",
  appId: "1:772406042679:web:595ae8447df522a7d6dfb2",
  measurementId: "G-1RYJFFV6N1"
};

const app = initializeApp(firebaseConfig);
export const dbFirebase = getDatabase(app);

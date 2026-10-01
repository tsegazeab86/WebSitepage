import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApiR7wmt2ve60HXE-QmsAIlnzbdHYdYEI",
  authDomain: "clone-c4104.firebaseapp.com",
  projectId: "clone-c41 04",
  storageBucket: "clone-c4104.firebasestorage.app",
  messagingSenderId: "909021192052",
  appId: "1:909021192052:web:acc15ca5bb789d0dbed621",
  measurementId: "G-35P087RXPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Database Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// For development purposes only - remove in production
const fallbackConfig = {
  apiKey: "demo-key-for-development-only",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000"
};

// Use environment variables if available, otherwise use the provided config for development
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyALaqtY1M5AT6yJgPDdirO4YsER3H4LR8w",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nexusblog-b48e2.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nexusblog-b48e2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nexusblog-b48e2.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "743256384863",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:743256384863:web:4883cd11f4bea269cb02ea",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-X87H1GLZ50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;

// Console warning for development environments
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  console.log(
    "Using hard-coded Firebase credentials. For better security, set up environment variables. See README for instructions."
  );
}

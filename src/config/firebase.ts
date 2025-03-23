
// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For development purposes only - remove in production
const fallbackConfig = {
  apiKey: "demo-key-for-development-only",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000"
};

// Use environment variables if available, otherwise use fallback for development
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || fallbackConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || fallbackConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || fallbackConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || fallbackConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || fallbackConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || fallbackConfig.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

// Console warning for development environments
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  console.warn(
    "Firebase is running with demo credentials. To use Firebase services properly, please set up environment variables. See README for instructions."
  );
}

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBMYfBi6LHlO6zjtzurFeQFCcsQDK-FYLc",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "growify-731cd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "growify-731cd",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "growify-731cd.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "106857310947",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:106857310947:web:0eef6fbffddbb84a60f3d6",
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-GL6LJLKDN2"
};

let app;
let auth = null;
let googleProvider = null;
let analytics = null;

const hasFirebaseConfig = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "YOUR_API_KEY"
);

if (hasFirebaseConfig) {
  try {
    // Initialize Firebase App
    app = getApps().length === 0
      ? initializeApp(firebaseConfig)
      : getApp();

    // Firebase Auth
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();

    // Firebase Analytics (only works in browser)
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log("Firebase Analytics initialized.");
      }
    });

    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Error initializing Firebase app:", error);
  }
} else {
  console.log(
    "No Firebase configuration detected. Running in Demo / OAuth Simulator mode."
  );
}

export {
  app,
  auth,
  googleProvider,
  analytics,
  hasFirebaseConfig
};
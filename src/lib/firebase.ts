// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported as analyticsIsSupported } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAFzyttLFNe0fke9uEZp-jgLf5bzbBpmpw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "apartments-d0e9f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "apartments-d0e9f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "apartments-d0e9f.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "284584742416",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:284584742416:web:06a57aac0692f8b904c495",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RW638V3WGV",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://apartments-d0e9f-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
let analytics: ReturnType<typeof getAnalytics> | undefined;
// Initialize Analytics only when supported to avoid noisy errors in dev/unsupported environments
try {
  analyticsIsSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // ignore analytics support errors silently
    });
} catch {
  // ignore
}

// App Check with reCAPTCHA v3
// Only initialize when a site key is provided and app check is not explicitly disabled.
let appCheck: ReturnType<typeof initializeAppCheck> | undefined;
const disableAppCheckDefault = typeof window !== "undefined" && window.location.hostname === "localhost";
const appCheckDisabled = import.meta.env.VITE_DISABLE_APP_CHECK === "true" || disableAppCheckDefault;
const appCheckKey = import.meta.env.VITE_RECAPTCHA_V3_KEY;

if (!appCheckDisabled && appCheckKey) {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(appCheckKey),
    isTokenAutoRefreshEnabled: true
  });
}

export { app, auth, db, analytics, appCheck };
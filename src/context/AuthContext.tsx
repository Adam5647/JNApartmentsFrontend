import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { auth } from "../lib/firebase";
import { executeRecaptcha, verifyRecaptchaToken } from "../lib/recaptcha";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";


type UserProfile = {
  uid: string;
  email: string;
  displayName?: string;
};

type AuthContextValue = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  register: (payload: { fullName: string; email: string; password: string }) => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  sendEmailLink: (email: string) => Promise<void>;
  completeEmailLinkSignIn: (email: string, link: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName || undefined
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = useCallback(async ({ fullName, email, password }: { fullName: string; email: string; password: string }) => {
    // Get reCAPTCHA token for registration action
    const recaptchaToken = await executeRecaptcha("REGISTER");
    
    // Verify token with backend
    if (recaptchaToken) {
      const verification = await verifyRecaptchaToken(recaptchaToken, "REGISTER");
      if (!verification.valid) {
        throw new Error(`reCAPTCHA verification failed: ${verification.error || "Unknown error"}`);
      }
      console.log(`Registration passed reCAPTCHA check (score: ${verification.score || "N/A"})`);
    }
    
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: fullName });
      setUser({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email || "",
        displayName: fullName
      });
    }
  }, []);

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    // Get reCAPTCHA token for login action
    const recaptchaToken = await executeRecaptcha("LOGIN");
    
    // Verify token with backend
    if (recaptchaToken) {
      const verification = await verifyRecaptchaToken(recaptchaToken, "LOGIN");
      if (!verification.valid) {
        throw new Error(`reCAPTCHA verification failed: ${verification.error || "Unknown error"}`);
      }
      console.log(`Login passed reCAPTCHA check (score: ${verification.score || "N/A"})`);
    }
    
    await signInWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      setUser({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email || "",
        displayName: auth.currentUser.displayName || undefined
      });
    }
  }, []);

  const logout = useCallback(() => {
    signOut(auth);
    setUser(null);
  }, []);

  // Email link sign-in
  const sendEmailLink = useCallback(async (email: string) => {
    const actionCodeSettings = {
      url: window.location.origin + "/login", // redirect to login page after sign-in
      handleCodeInApp: true
    };
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
  }, []);

  const completeEmailLinkSignIn = useCallback(async (email: string, link: string) => {
    await signInWithEmailLink(auth, email, link);
    if (auth.currentUser) {
      setUser({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email || "",
        displayName: auth.currentUser.displayName || undefined
      });
    }
  }, []);

  // Google sign-in
  const googleSignIn = useCallback(async () => {
    // Get reCAPTCHA token for Google sign-in action
    const recaptchaToken = await executeRecaptcha("GOOGLE_SIGNIN");
    
    // Verify token with backend
    if (recaptchaToken) {
      const verification = await verifyRecaptchaToken(recaptchaToken, "GOOGLE_SIGNIN");
      if (!verification.valid) {
        throw new Error(`reCAPTCHA verification failed: ${verification.error || "Unknown error"}`);
      }
      console.log(`Google sign-in passed reCAPTCHA check (score: ${verification.score || "N/A"})`);
    }
    
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    if (auth.currentUser) {
      setUser({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email || "",
        displayName: auth.currentUser.displayName || undefined
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      register,
      login,
      logout,
      sendEmailLink,
      completeEmailLinkSignIn,
      googleSignIn
    }),
    [user, register, login, logout, sendEmailLink, completeEmailLinkSignIn, googleSignIn]
  );

  if (loading) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

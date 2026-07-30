import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInAnonymously, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { DEMO_USERS, ROLE_META } from "./mock-firebase";

const STORAGE_KEY = "lavaant.session";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 1. Try to load cached user from localStorage
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }

    // 2. Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch or create user record in Firestore
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const profile = userSnap.data();
            setUser(profile);
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
          }
        } catch (e) {
          console.warn("Error fetching user profile from Firestore:", e);
        }
      }
      setReady(true);
    });

    setReady(true);
    return () => unsubscribe();
  }, []);

  const signIn = useCallback((role) => {
    const next = DEMO_USERS[role];
    setUser(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }

    // Try signing in anonymously with Firebase Auth & storing role in Firestore
    signInAnonymously(auth)
      .then(async (cred) => {
        if (cred?.user) {
          const profile = { ...next, uid: cred.user.uid };
          await setDoc(doc(db, "users", cred.user.uid), profile, { merge: true }).catch(() => {});
        }
      })
      .catch(() => {});

    return next;
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    firebaseSignOut(auth).catch(() => {});
  }, []);

  const value = useMemo(() => ({ user, ready, signIn, signOut }), [user, ready, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export function homeForRole(role) {
  return ROLE_META[role]?.home || "/";
}

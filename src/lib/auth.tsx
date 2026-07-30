import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEMO_USERS, ROLE_META, type MockUser, type Role } from "./mock-firebase";

/**
 * Mocked Firebase Authentication.
 * Session is persisted to localStorage; swap for onAuthStateChanged later.
 */

const STORAGE_KEY = "lavaant.session";

type AuthState = {
  user: MockUser | null;
  ready: boolean;
  signIn: (role: Role) => MockUser;
  signOut: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as MockUser);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const signIn = useCallback((role: Role) => {
    const next = DEMO_USERS[role];
    setUser(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    return next;
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ user, ready, signIn, signOut }), [user, ready, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export function homeForRole(role: Role) {
  return ROLE_META[role].home;
}

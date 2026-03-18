import { createContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebase";
import {
  initAuthPersistence,
  logout as logoutService,
  signInWithEmail,
  signUpWithEmail,
} from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;
    let unsubscribe = () => {};

    const start = async () => {
      try {
        await initAuthPersistence();
      } catch (error) {
        // Ignore persistence errors to avoid blocking auth.
      }

      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (!mounted) return;
        setUser(currentUser);
        setInitializing(false);
      });
    };

    start();

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      initializing,
      signIn: signInWithEmail,
      signUp: signUpWithEmail,
      logout: logoutService,
    }),
    [user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { validateUser } from "@/utils/localStorageHelpers";

interface User {
  id: string;
  username: string;
  role: "Developer" | "Manager";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  async function login(username: string, password: string) {
    const foundUser = validateUser(username, password);
    if (foundUser) {
      const { id, role } = foundUser;
      const userData = { id, username, role };
      setUser(userData);
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

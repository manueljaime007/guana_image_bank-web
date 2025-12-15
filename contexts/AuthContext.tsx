"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiConfig } from "@/config/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função auxiliar para chamadas à API
async function postJSON(url: string, body: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro na requisição");
  }

  return res.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ao carregar a aplicação, tentar restaurar sessão
  useEffect(() => {
    const savedUser = localStorage.getItem("imagehub_user");
    const savedToken = localStorage.getItem("imagehub_token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await postJSON(apiConfig.endpoints.auth.login, { email, password });
      
      const { user: loggedUser, tokens } = data;

      // Salvar token e usuário no localStorage
      localStorage.setItem("imagehub_token", tokens.accessToken);
      localStorage.setItem("imagehub_user", JSON.stringify(loggedUser));

      setUser(loggedUser);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await postJSON(apiConfig.endpoints.auth.register, { name, email, password });
      
      const { user: newUser, tokens } = data;

      localStorage.setItem("imagehub_token", tokens.accessToken);
      localStorage.setItem("imagehub_user", JSON.stringify(newUser));

      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("imagehub_token");
    localStorage.removeItem("imagehub_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}

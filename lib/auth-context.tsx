'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, API_ENDPOINTS } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = async () => {
    try {
      const data = await apiClient<{ user: User }>(API_ENDPOINTS.auth.me);
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const data = await apiClient<{ user: User }>(API_ENDPOINTS.auth.login, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setUser(data.user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await apiClient<{ user: User }>(API_ENDPOINTS.auth.signup, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    setUser(data.user);
  };

  const logout = async () => {
    await apiClient(API_ENDPOINTS.auth.logout, { method: 'POST' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

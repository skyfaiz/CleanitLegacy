'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'citizen' | 'cleaner' | 'admin';
  avatar?: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => void;
  logout: () => void;
  register: (name: string, email: string, phone: string, password: string, role: 'citizen' | 'cleaner') => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role?: string) => {
    const mockUser: User = {
      id: '1',
      name: 'Priya Sharma',
      email,
      phone: '+91 98765 43210',
      role: (role as User['role']) || 'citizen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      joinedDate: '2025-01-15',
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const register = (name: string, email: string, phone: string, password: string, role: 'citizen' | 'cleaner') => {
    const newUser: User = {
      id: Math.random().toString(),
      name,
      email,
      phone,
      role,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

"use client";

import React, { createContext, useState, ReactNode } from 'react';
import type { User } from '@/lib/types';
import { users } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  authenticate: (email: string, name?: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const authenticate = (email: string, name?: string) => {
    // Dummy authentication: find user by email or create a new stub for registration
    const foundUser = users.find(u => u.username === email.split('@')[0]) || {
        ...users[0],
        id: `user-${Date.now()}`,
        name: name || `User ${email.split('@')[0]}`,
        username: email.split('@')[0],
        avatar: `https://placehold.co/100x100/1DBAB4/FFFFFF/png?text=${(name || email).charAt(0).toUpperCase()}`
    };
    setUser(foundUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

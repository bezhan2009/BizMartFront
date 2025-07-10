
"use client";

import React, { createContext, useState, ReactNode } from 'react';
import type { User, UserRole } from '@/lib/types';
import { users } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  authenticate: (email: string, name?: string, role?: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  const authenticate = (email: string, name?: string, userRole: UserRole = 'customer') => {
    // Dummy authentication: find user by email or create a new stub for registration
    const foundUser = users.find(u => u.username === email.split('@')[0]) || {
        ...users[0],
        id: `user-${Date.now()}`,
        name: name || `User ${email.split('@')[0]}`,
        username: email.split('@')[0],
        avatar: `https://images.unsplash.com/photo-1527980965255-d3b416303d12`,
    };
    setUser(foundUser);
    setRole(userRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

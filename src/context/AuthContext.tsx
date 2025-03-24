
import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (password: string) => {
    // Simple password check for admin access
    const validPassword = password === import.meta.env.VITE_ADMIN_PASSWORD || password === "admin123";
    setIsAdmin(validPassword);
    return validPassword;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const value = {
    isAdmin,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

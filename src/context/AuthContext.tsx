
import React, { createContext, useContext, useState, useEffect } from 'react';
import { isAdmin } from '@/config/firebase';

interface AuthContextProps {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  adminEmail: string | null;
  setAdminEmail: (email: string | null) => void;
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
  const [isAdminState, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(
    localStorage.getItem('adminEmail')
  );

  // Check if admin is logged in from localStorage on component mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(storedAdmin);
  }, []);

  // Update localStorage when isAdmin changes
  useEffect(() => {
    localStorage.setItem('isAdmin', isAdminState.toString());
  }, [isAdminState]);

  // Update localStorage when adminEmail changes
  useEffect(() => {
    if (adminEmail) {
      localStorage.setItem('adminEmail', adminEmail);
    } else {
      localStorage.removeItem('adminEmail');
    }
  }, [adminEmail]);

  const login = (password: string) => {
    const validPassword = isAdmin(password);
    setIsAdmin(validPassword);
    return validPassword;
  };

  const logout = () => {
    setIsAdmin(false);
    setAdminEmail(null);
  };

  const value = {
    isAdmin: isAdminState,
    login,
    logout,
    adminEmail,
    setAdminEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

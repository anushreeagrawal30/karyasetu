import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: User['role']) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Partial<User>, role: User['role']) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('karyasetu_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: User['role']): Promise<boolean> => {
    setIsLoading(true);
    // Mock authentication - in real app, this would hit an API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'citizen' ? 'John Citizen' : role === 'admin' ? 'Admin Singh' : 'Field Officer Kumar',
      email,
      phone: '+91-9876543210',
      role,
      region: role !== 'admin' ? 'Ranchi' : undefined,
      department: role === 'field_officer' ? 'sanitation' : undefined,
      createdAt: new Date(),
    };

    setUser(mockUser);
    localStorage.setItem('karyasetu_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const signup = async (userData: Partial<User>, role: User['role']): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role,
      region: userData.region,
      department: userData.department,
      createdAt: new Date(),
    };

    setUser(newUser);
    localStorage.setItem('karyasetu_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('karyasetu_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
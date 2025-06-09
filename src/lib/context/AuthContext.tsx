'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axiosInstance from '../axiosInstance';

type Role = 'CUSTOMER' | 'ORGANIZER';

interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get('/api/auth/users/me');
      setUser(res.data);
    } catch  {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

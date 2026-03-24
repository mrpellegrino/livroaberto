import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '../api/client';

type User = {
  sub: string;
  email: string;
  role: 'ADMIN' | 'PROFESSOR' | 'ALUNO';
};

type AuthContextValue = {
  token?: string;
  user?: User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | undefined>(() => localStorage.getItem('token') ?? undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', token);
      api.get('/auth/me').then((response) => setUser(response.data)).catch(() => {
        localStorage.removeItem('token');
        setToken(undefined);
        setUser(undefined);
      });
    } else {
      localStorage.removeItem('token');
      setUser(undefined);
    }
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        setToken(response.data.accessToken);
      },
      logout: () => {
        setToken(undefined);
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}

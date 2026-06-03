import { createContext, useContext, useState, useCallback } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

// Configuration for the cookie (e.g., expires in 7 days, secure)
const COOKIE_NAME = 'adminToken';
const COOKIE_OPTIONS = { 
  expires: 7, 
  secure: true, 
  sameSite: 'strict' 
};  

export const AuthProvider = ({ children }) => {
  // Initialize state from cookie
  const [token, setToken] = useState(() => Cookies.get(COOKIE_NAME));

  const login = useCallback((newToken) => {
    Cookies.set(COOKIE_NAME, newToken, COOKIE_OPTIONS);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove(COOKIE_NAME);
    setToken(null);
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
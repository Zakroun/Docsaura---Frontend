import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('docsaura_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const login = useCallback((userData) => {
    // In production: use HTTP-only cookies for JWT (more secure against XSS)
    // Here we simulate with sessionStorage (safer than localStorage)
    const safeUser = { id: userData.id || 1, name: userData.name, email: userData.email, token: `sim_jwt_${Date.now()}` };
    sessionStorage.setItem('docsaura_user', JSON.stringify(safeUser));
    setUser(safeUser);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('docsaura_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

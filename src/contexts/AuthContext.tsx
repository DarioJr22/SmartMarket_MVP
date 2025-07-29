import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  mlUserId?: string;
  accessToken?: string;
  refreshToken?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  loginWithML: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem('smartmarket_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'João Silva',
        email: credentials.email,
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100',
        mlUserId: 'ML123456789'
      };
      
      setUser(mockUser);
      localStorage.setItem('smartmarket_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Credenciais inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithML = async () => {
    setIsLoading(true);
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: '1',
        name: 'João Silva',
        email: 'joao@email.com',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100',
        mlUserId: 'ML123456789',
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token'
      };
      
      setUser(mockUser);
      localStorage.setItem('smartmarket_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Erro na autenticação com Mercado Livre');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartmarket_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithML, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  telephone?: string;
  pays?: string;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Charger l'utilisateur et le token depuis AsyncStorage au démarrage
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    };
    loadUser();
  }, []);

  // Persister l'utilisateur et le token à chaque changement
  useEffect(() => {
    if (user) {
  console.log(user);
      AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      AsyncStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      AsyncStorage.setItem('userToken', token);
    } else {
      AsyncStorage.removeItem('userToken');
    }
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('userToken');
  };

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé dans UserProvider');
  }
  return context;
} 
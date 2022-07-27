import React, { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import useToast, { ToastType } from './NotificationContext';

export type User = {
  id: string;
  username: string;
  exp: number;
  iat: number;
}

export interface AuthProps {
  token: string;
  user: User,
  getToken: () => string | undefined;
  clearSession: () => void;
  setToken: (value: string) => void;
}

const AuthContext = React.createContext<AuthProps>(
  {} as AuthProps
);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User>({} as User);
  const navigate = useNavigate();
  const { setToast } = useToast();

  const getTokenHandler = () => {
    try {
      if (token) return token;
      if (!token) {
        const localToken = localStorage.getItem('auth_token');
        if (!localToken) return undefined;
        return localToken;
      }
    } catch (error) {
      throw new Error('[authProvider] something went wrong');
    }
    return undefined;
  };

  const setTokenHandler = (value: string) => {
    localStorage.setItem('auth_token', value);
    setToken(value);
  };

  const clearSessionHandler = () => {
    localStorage.clear();
    setUser({} as User);
    setToken('');
    setToast({ message: 'logout in progress...', type: ToastType.WARNING });
    setTimeout(() => navigate('/'), 1500);
  };

  useEffect(() => {
    if (token) {
      const userData = jwtDecode<User>(token);
      setUser(userData);
    }
  }, [token]);

  useEffect(() => {
    const onLoadToken = getTokenHandler();
    if (onLoadToken) {
      const userData = jwtDecode<User>(onLoadToken);
      setUser(userData);
    }
  }, []);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        token,
        user,
        setToken: setTokenHandler,
        getToken: getTokenHandler,
        clearSession: clearSessionHandler
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default (): AuthProps => {
  const context = useContext(AuthContext);
  return context;
};

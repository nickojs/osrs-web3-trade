import React, { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

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

  const getTokenHandler = () => {
    try {
      if (token) return token;
      if (!token) {
        const localToken = localStorage.getItem('auth_token');
        if (!localToken) return undefined;
        return localToken;
      }
    } catch (error) {
      console.log(error);
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
  };

  useEffect(() => {
    if (token) {
      const userData = jwtDecode<User>(token);
      setUser(userData);
    }
  }, [token]);

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

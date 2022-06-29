import { useEffect, useState } from 'react';

const useAuth = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const handleStorage = () => {
      const localStorageToken = localStorage.getItem('auth_token');
      if (localStorageToken) setToken(localStorageToken);
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return token;
};

export default useAuth;

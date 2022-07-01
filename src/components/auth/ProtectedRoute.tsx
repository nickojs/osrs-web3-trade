import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import useAuth, { User } from '../../context/AuthContext';
import useToast, { ToastType } from '../../context/NotificationContext';

interface ProtectedRoute {
  children: any // fix later
}

export default ({ children }: ProtectedRoute) => {
  const { token } = useAuth();
  const { setToast } = useToast();
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      if (!token) return navigate('/');
      const decodedToken = jwtDecode<User>(token);

      if (Date.now() >= decodedToken.exp * 1000) {
        setToast({ message: 'Expired session, please log in again', type: ToastType.ERROR });
        return navigate('/');
      }
    } catch (error) {
      setToast({ message: 'Something went wrong with your credentials', type: ToastType.ERROR });
    }
  }, []);

  return children;
};

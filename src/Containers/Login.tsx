import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import useAuth from '../hooks/useAuth';
import { LoginContainer } from './styles';

export default () => {
  const token = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token.length > 0 && token !== undefined) {
      setTimeout(() => navigate('/app'), 1500);
    }
  }, [token]);

  return (
    <LoginContainer>
      <LoginScreen />
    </LoginContainer>
  );
};

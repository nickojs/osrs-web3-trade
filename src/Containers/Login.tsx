import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import useAuth from '../context/AuthContext';
import { LoginContainer, Title } from './styles';

export default () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token.length > 0 && token !== undefined) {
      setTimeout(() => navigate('/app'), 1500);
    }
  }, [token]);

  return (
    <LoginContainer>
      <Title>OSRS Trade Simulator</Title>
      <LoginScreen />
    </LoginContainer>
  );
};

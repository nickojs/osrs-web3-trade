import styled from 'styled-components';
import bg from '../assets/bg_texture.jpg';

export const Container = styled.section`
  position: relative;

  height: 100vh;
  width: 100vw;
`;

export const LoginContainer = styled(Container)`
  background-image: url(${bg});
  background-repeat: repeat;
  display: grid;
  align-items: center;
  justify-content: center;
`;

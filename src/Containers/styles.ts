import styled from 'styled-components';
import bg from '../assets/bg_texture.jpg';

export const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const LoginContainer = styled(Container)`
  background-image: url(${bg});
  background-repeat: repeat;
  display: grid;
  align-items: center;
  justify-content: center;
`;

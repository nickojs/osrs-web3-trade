import styled from 'styled-components';
import bg from '../assets/bg_texture.png';

export const Container = styled.section`
  position: relative;
  background-image: url(${bg});
  background-size: 100px;
  height: 100vh;
  width: 100vw;
`;

export const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  background-image: url(${bg});
  background-repeat: repeat;
`;

export const Title = styled.h1`
  position: absolute;
  top: 10%; left: 50%;
  transform: translate(-50%);
  
  width: 100%;
  text-align: center;

  font-size: 42px;
  color: gold;
  text-shadow: 0 0 10px black;
`;

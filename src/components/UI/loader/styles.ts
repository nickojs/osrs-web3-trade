import styled, { keyframes } from 'styled-components';

const loaderAnimation = keyframes`
  0% {
    background: hsl(0, 100%, 50%);
    width: 0%;
  }100% { 
    background: hsl(0, 100%, 50%);
    width: 100%;
  }
`;

export const LoaderContainer = styled.div`
  height: 30px;
  width: 160px;
  margin: 24px auto;
  
  border: 1px inset white;
  background: black;
`;

export const LoaderInner = styled.div`
  height: 100%;
  background: white;
  animation: ${loaderAnimation} 3s linear infinite;
  
  & p{ 
    margin: 0;
    padding: 0;
    padding-left: 4px;

    line-height: 26px;
    font-weight: bold;

    color: white;
  }
`;

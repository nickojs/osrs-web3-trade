import styled, { createGlobalStyle, css } from 'styled-components';

import Press2P from './assets/fonts/press2p.ttf';

export const disabledArea = css`
  pointer-events: none;
  cursor: not-allowed;
  opacity: .5;
`;

export const resetInput = css` 
  -webkit-box-shadow:  none;
  -moz-box-shadow:  none;
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow:  none;
`;

export const resetButton = css`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;
`;

export const ListView = styled.ul<{ isLoading: boolean }>`
  ${({ isLoading }) => isLoading && disabledArea};
  padding: 0;
`;

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Press Start 2P';
    src: local('Press Start 2P'), 
    url(${Press2P}) format('woff2'),
    url(${Press2P}) format('woff');
    font-weight: 300;
    font-style: normal;
  }
  
  body {
    background: black;
    color: white;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    margin: 0; padding: 0;
  }
  
  * {
    font-family: 'Press Start 2P', cursive;
  }
`;

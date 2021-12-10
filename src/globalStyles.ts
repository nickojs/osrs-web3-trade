import { createGlobalStyle } from 'styled-components';

import Press2P from './assets/fonts/press2p.ttf';

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
  }
  
  p{
    font-family: 'Press Start 2P', cursive;
  }
`;
import { GlobalStyle } from './globalStyles';
import Main from './Containers/Main';
import { PositionProvider } from './context/PositionContext';

export default (): JSX.Element => { 
  return (
    <PositionProvider>
      <GlobalStyle />
      <Main />
    </PositionProvider>
  );
};

import { GlobalStyle } from './globalStyles';
import { PositionProvider } from './context/PositionContext';
import routes from './routes';

export default () => (
  <PositionProvider>
    <GlobalStyle />
    {routes}
  </PositionProvider>
);

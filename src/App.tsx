import { PositionProvider } from './context/PositionContext';
import { ToastProvider } from './context/NotificationContext';
import { GlobalStyle } from './globalStyles';
import Notification from './components/notification/Notification';
import routes from './routes';

export default () => (
  <ToastProvider>
    <PositionProvider>
      <GlobalStyle />
      <Notification />
      {routes}
    </PositionProvider>
  </ToastProvider>
);

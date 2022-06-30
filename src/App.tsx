import { QueryClient, QueryClientProvider } from 'react-query';
import { PositionProvider } from './context/PositionContext';
import { ToastProvider } from './context/NotificationContext';
import { GlobalStyle } from './globalStyles';
import Notification from './components/notification/Notification';
import routes from './routes';

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <PositionProvider>
        <GlobalStyle />
        <Notification />
        {routes}
      </PositionProvider>
    </ToastProvider>
  </QueryClientProvider>
);

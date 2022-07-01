import { QueryClient, QueryClientProvider } from 'react-query';
import { PositionProvider } from './context/PositionContext';
import { ToastProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import Notification from './components/notification/Notification';
import { GlobalStyle } from './globalStyles';
import routes from './routes';

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <PositionProvider>
        <AuthProvider>
          <GlobalStyle />
          <Notification />
          {routes}
        </AuthProvider>
      </PositionProvider>
    </ToastProvider>
  </QueryClientProvider>
);

import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import Notification from './components/notification/Notification';
import { GlobalStyle } from './globalStyles';
import routes from './routes';
import { SocketProvider } from './context/SocketContext';
import { PositionProvider } from './context/PositionContext';

const queryClient = new QueryClient();

export default () => (
  <ToastProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <PositionProvider>
          <SocketProvider>
            <GlobalStyle />
            <Notification />
            {routes}
          </SocketProvider>
        </PositionProvider>
      </QueryClientProvider>
    </AuthProvider>
  </ToastProvider>
);

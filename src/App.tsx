import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import Notification from './components/notification/Notification';
import { GlobalStyle } from './globalStyles';
import routes from './routes';
import { SocketProvider } from './context/SocketContext';

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <SocketProvider>
        <AuthProvider>
          <GlobalStyle />
          <Notification />
          {routes}
        </AuthProvider>
      </SocketProvider>
    </ToastProvider>
  </QueryClientProvider>
);

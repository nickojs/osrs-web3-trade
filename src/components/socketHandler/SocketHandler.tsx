import { useEffect } from 'react';
import useSocket from '../../context/SocketContext';
import useAuth from '../../context/AuthContext';
import useToast, { ToastType } from '../../context/NotificationContext';

interface SocketWrapperProps {
  children: any // fix later
}

export default ({ children }: SocketWrapperProps) => {
  const {
    afterConnect,
    acceptTrade,
    declineTrade,
    declineTradeResponse,
    tradeRequest
  } = useSocket();
  const { user } = useAuth();
  const { setToast } = useToast();

  useEffect(() => {
    if (user) {
      afterConnect({ userId: user.id, username: user.username });
    }
  }, [user]);

  useEffect(() => {
    if (tradeRequest && tradeRequest.message) {
      setToast({
        message: tradeRequest.message,
        type: ToastType.WARNING,
        timeout: 5000,
        actions: {
          accept: acceptTrade,
          reject: declineTrade
      }
      });
    }
  }, [tradeRequest]);

  useEffect(() => {
    if (declineTradeResponse) {
      setToast({ message: declineTradeResponse, type: ToastType.WARNING });
    }
  }, [declineTradeResponse]);

  return children;
};

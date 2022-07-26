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
    requestMsg,
    errorMsg,
    completeTradeMsg,
    targetUser
  } = useSocket();
  const { user } = useAuth();
  const { setToast } = useToast();

  useEffect(() => {
    if (user) {
      afterConnect({ userId: user.id, username: user.username });
    }
  }, [user]);

  useEffect(() => {
    if (completeTradeMsg) {
      setToast({
        message: completeTradeMsg,
        type: ToastType.SUCCESS,
        timeout: 5000
      });
    }
  }, [completeTradeMsg]);

  useEffect(() => {
    if (requestMsg && targetUser) {
      setToast({
        message: requestMsg,
        type: ToastType.SUCCESS,
        timeout: 5000,
        actions: {
          accept: acceptTrade,
          reject: declineTrade
      }
      });
    }
  }, [requestMsg, targetUser]);

  useEffect(() => {
    if (errorMsg) {
      setToast({
        message: errorMsg,
        type: ToastType.ERROR,
        timeout: 5000
      });
    }
  }, [errorMsg]);

  return children;
};

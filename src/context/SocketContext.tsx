import React, {
 useCallback, useContext, useEffect, useMemo, useState
} from 'react';
import { io } from 'socket.io-client';
import { Item } from '../components/inventory/interfaces';
import { baseURL } from '../services/api';

type ConnectedPayload = {
  userId: string;
  username: string;
};

export type TradeUser = {
  userId: string;
  socketId: string;
  username: string;
  trading: {
    isTrading: boolean;
  }
  sendingItems: Item[]
}

export interface SocketProps {
  isConnected: boolean;
  requestMsg: string;
  errorMsg: string;
  targetUser: TradeUser;
  afterConnect: (data: ConnectedPayload) => void;
  requestTrade: (targetId: string) => void;
  declineTrade: () => void;
  acceptTrade: () => void;
  tradeScreen: boolean;
}

const SocketContext = React.createContext<SocketProps>(
  {} as SocketProps
);

export const SocketProvider: React.FC = ({ children }) => {
  const socket = useMemo(() => io(baseURL), []);
  const [isConnected, setConnected] = useState(false);
  const [targetUser, setTargetUser] = useState<TradeUser>({} as TradeUser);
  const [tradeScreen, setTradeScreen] = useState(false);
  const [requestMsg, setRequestMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const resetState = () => {
    setTargetUser({} as TradeUser);
    setTradeScreen(false);
    setRequestMsg('');
  };

  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('error', (err) => {
      const { message, error } = err;
      console.log(error);
      if (message) setErrorMsg(message);
      resetState();
    });

    socket.on('updateUser', (user: TradeUser) => setTargetUser(user));

    socket.on('requestTrade', (data: { message: string }) => {
      const { message } = data;
      if (message) setRequestMsg(message);
    });

    socket.on('declineTrade', (data: { message: string }) => {
      resetState();
      const { message } = data;
      if (message) setErrorMsg(message);
    });

    socket.on('acceptTrade', () => { setTradeScreen(true); });
  }, []);

  const afterConnect = (payload: ConnectedPayload) => socket.emit('afterConnect', payload);

  const requestTrade = (payload: string) => {
    resetState();
    socket.emit('requestTrade', { targetId: payload });
    setTradeScreen(true);
  };

  const declineTrade = useCallback(() => {
    resetState();
    socket.emit('declineTrade', { tradingId: targetUser.userId });
  }, [targetUser]);

  const acceptTrade = useCallback(() => {
    socket.emit('acceptTradeInit', { tradingId: targetUser.userId });
    setTradeScreen(true);
  }, [targetUser]);

  return (
    <SocketContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isConnected,
        targetUser,
        requestMsg,
        errorMsg,
        afterConnect,
        requestTrade,
        acceptTrade,
        declineTrade,
        tradeScreen
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default (): SocketProps => {
  const context = useContext(SocketContext);
  return context;
};

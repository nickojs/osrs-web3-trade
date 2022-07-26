import React, {
 useCallback, useContext, useEffect, useMemo, useState
} from 'react';
import { io } from 'socket.io-client';
import { Item } from '../components/inventory/interfaces';
import { useFetchInventory } from '../hooks/useInventory';
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
  acceptTrade: boolean;
  sendingItems: Item[]
}

interface UpdateUserPayload {
  targetUser: TradeUser,
  currentUser: TradeUser
}

export interface SocketProps {
  isConnected: boolean;
  requestMsg: string;
  errorMsg: string;
  completeTradeMsg: string;
  targetUser: TradeUser;
  currentUser: TradeUser;
  tradeScreen: boolean;
  afterConnect: (data: ConnectedPayload) => void;
  requestTrade: (targetId: string) => void;
  declineTrade: () => void;
  acceptTrade: () => void;
  sendItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  acknowledgeTrade: () => void;
}

const SocketContext = React.createContext<SocketProps>(
  {} as SocketProps
);

export const SocketProvider: React.FC = ({ children }) => {
  const socket = useMemo(() => io(baseURL), []);
  const [isConnected, setConnected] = useState(false);
  const [targetUser, setTargetUser] = useState<TradeUser>({} as TradeUser);
  const [currentUser, setCurrentUser] = useState<TradeUser>({} as TradeUser);
  const [tradeScreen, setTradeScreen] = useState(false);
  const [requestMsg, setRequestMsg] = useState('');
  const [completeTradeMsg, setCompleteTradeMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { refetch } = useFetchInventory();

  const resetState = () => {
    setTargetUser({} as TradeUser);
    setCurrentUser({} as TradeUser);
    setTradeScreen(false);
  };

  const resetMessages = () => {
    setRequestMsg('');
    setErrorMsg('');
  };

  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('error', (err) => {
      const { message, error } = err;
      console.log(error);
      if (message) setErrorMsg(message);
      resetState();
      setTimeout(resetMessages, 5000);
    });

    socket.on('updateUser', (payload: UpdateUserPayload) => {
      const {
        currentUser: currentUserPayload,
        targetUser: targetUserPayload
      } = payload;
      console.log(payload);
      setTargetUser(targetUserPayload);
      setCurrentUser(currentUserPayload);
    });

    socket.on('requestTrade', (data: { message: string }) => {
      resetMessages();
      const { message } = data;
      if (message) setRequestMsg(message);
    });

    socket.on('declineTrade', (data: { message: string }) => {
      resetState();
      const { message } = data;
      if (message) setErrorMsg(message);
    });

    socket.on('acceptTrade', () => {
      resetMessages();
      setTradeScreen(true);
    });

    socket.on('completeTrade', () => {
      refetch();
      setTargetUser({} as TradeUser);
      setCurrentUser({} as TradeUser);
      setTradeScreen(false);
      setCompleteTradeMsg('Trade went successfully!');
    });
  }, []);

  const afterConnect = (payload: ConnectedPayload) => socket.emit('afterConnect', payload);

  const requestTrade = (payload: string) => {
    resetState();
    socket.emit('requestTrade', { targetId: payload });
    setTradeScreen(true);
  };

  const declineTrade = useCallback(() => {
    resetState();
    resetMessages();
    socket.emit('declineTrade', { tradingId: targetUser.userId });
  }, [targetUser]);

  const acceptTrade = useCallback(() => {
    resetMessages();
    socket.emit('acceptTradeInit', { tradingId: targetUser.userId });
    setTradeScreen(true);
  }, [targetUser]);

  const sendItem = useCallback((item: Item) => {
    socket.emit('sendItem', { item, targetId: targetUser.userId });
  }, [targetUser]);

  const removeItem = useCallback((item: Item) => {
    socket.emit('removeItem', { item, targetId: targetUser.userId });
  }, [targetUser]);

  const acknowledgeTrade = useCallback(() => {
    socket.emit('acknowledgeTrade', { targetId: targetUser.userId });
  }, [targetUser]);

  return (
    <SocketContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isConnected,
        targetUser,
        currentUser,
        requestMsg,
        errorMsg,
        completeTradeMsg,
        tradeScreen,
        afterConnect,
        requestTrade,
        acceptTrade,
        declineTrade,
        sendItem,
        removeItem,
        acknowledgeTrade
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

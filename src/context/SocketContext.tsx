/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { baseURL } from '../services/api';

type ConnectedPayload = {
  userId: string;
  username: string;
};

type InitTradeRequest = {
  targetId: string;
}

type InitTradeResponse = {
  message: string;
  data: {
    user: {
      userId: string;
      socketId: string;
    },
  },
}

export interface SocketProps {
  isConnected: boolean;
  tradeRequest: InitTradeResponse;
  afterConnect: (data: ConnectedPayload) => void;
  initTrade: (data: InitTradeRequest) => void;
  declineTrade: () => void;
  declineTradeResponse: string;
  acceptTrade: () => void;
  openTradeScreen: boolean;
}

const SocketContext = React.createContext<SocketProps>(
  {} as SocketProps
);

export const SocketProvider: React.FC = ({ children }) => {
  const [client, setClient] = useState<Socket | null>(null);
  const [isConnected, setConnected] = useState(false);
  const [tradeRequest, setTradeRequest] = useState<InitTradeResponse>({} as InitTradeResponse);
  const [declineTradeResponse, setDeclineTradeResponse] = useState('');
  const [openTradeScreen, setOpenTradeScreen] = useState(false);

  useEffect(() => {
    const socket = io(baseURL);
    socket.on('connect', () => setConnected(true));
    socket.on('error', (error) => console.log('something went wrong, ', error));
    socket.on('initTrade', (data: InitTradeResponse) => { setTradeRequest(data); });
    socket.on('declineTrade', (data: { message: string }) => setDeclineTradeResponse(data.message));
    socket.on('acceptTrade', () => setOpenTradeScreen(true));
    setClient(socket);
  }, []);

  const afterConnect = (data: ConnectedPayload) => client?.emit('afterConnect', { ...data });

  const initTrade = (data: InitTradeRequest) => client?.emit('initTrade', { ...data });

  const declineTrade = () => {
    client?.emit('declineTrade', { tradingId: tradeRequest.data.user.userId });
    setTradeRequest({} as InitTradeResponse);
  };

  const acceptTrade = () => {
    client?.emit('acceptTradeInit', { tradingId: tradeRequest.data.user.userId });
    setOpenTradeScreen(true);
  };

  return (
    <SocketContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isConnected,
        tradeRequest,
        afterConnect,
        initTrade,
        acceptTrade,
        declineTrade,
        declineTradeResponse,
        openTradeScreen
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

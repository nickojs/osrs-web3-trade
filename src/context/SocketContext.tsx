/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { baseURL } from '../services/api';

type ConnectedPayload = {
  userId: string;
  username: string;
};

type InitTrade = {
  targetId: string;
}

export interface SocketProps {
  isConnected: boolean;
  afterConnect: (data: ConnectedPayload) => void;
  initTrade: (data: InitTrade) => void;
}

const SocketContext = React.createContext<SocketProps>(
  {} as SocketProps
);

export const SocketProvider: React.FC = ({ children }) => {
  const [client, setClient] = useState<Socket | null>(null);
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(baseURL);
    socket.on('connect', () => setConnected);
    socket.on('error', (error) => console.log('something went wrong, ', error));
    setClient(socket);
  }, []);

  const afterConnect = (data: ConnectedPayload) => client?.emit('afterConnect', { ...data });

  const initTrade = (data: InitTrade) => client?.emit('initTrade', { ...data });

  return (
    <SocketContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isConnected,
        afterConnect,
        initTrade
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

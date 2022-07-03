import { useEffect } from 'react';
import MakertPlace from '../components/marketplace/MarketPlace';
import Inventory from '../components/inventory/Inventory';
import Draggable from '../components/UI/draggable/Draggable';
import UserList from '../components/userList/UserList';
import { PositionComponents } from '../context/PositionContext';
import useSocket from '../context/SocketContext';
import useAuth from '../context/AuthContext';
import useToast, { ToastType } from '../context/NotificationContext';
import { Container } from './styles';

export default () => {
  const { afterConnect, tradeRequest } = useSocket();
  const { user } = useAuth();
  const { setToast } = useToast();

  useEffect(() => {
    if (user) {
      afterConnect({ userId: user.id, username: user.username });
    }
  }, [user]);

  useEffect(() => {
    if (tradeRequest && tradeRequest.message) {
      setToast({ message: tradeRequest.message, type: ToastType.WARNING });
    }
  }, [tradeRequest]);

  return (
    <Container>
      <Draggable component={PositionComponents.USERLIST}>
        <UserList />
      </Draggable>

      <Draggable component={PositionComponents.MARKETPLACE}>
        <MakertPlace />
      </Draggable>

      <Draggable component={PositionComponents.INVENTORY}>
        <Inventory items={[]} />
      </Draggable>
    </Container>
  );
};

import { useEffect } from 'react';
import MakertPlace from '../components/marketplace/MarketPlace';
import Inventory from '../components/inventory/Inventory';
import Draggable from '../components/UI/draggable/Draggable';
import UserList from '../components/userList/UserList';
import { PositionComponents } from '../context/PositionContext';
import useSocket from '../context/SocketContext';
import useAuth from '../context/AuthContext';
import { Container } from './styles';

export default () => {
  const { afterConnect } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      afterConnect({ userId: user.id, username: user.username });
    }
  }, [user]);

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

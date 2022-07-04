import MakertPlace from '../components/marketplace/MarketPlace';
import Inventory from '../components/inventory/Inventory';
import Draggable from '../components/UI/draggable/Draggable';
import UserList from '../components/userList/UserList';
import { PositionComponents } from '../context/PositionContext';
import SocketHandler from '../components/SocketHandler/SocketHandler';
import { Container } from './styles';

export default () => (
  <SocketHandler>
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
  </SocketHandler>
);

import MakertPlace from '../components/marketplace/MarketPlace';
import Inventory from '../components/inventory/Inventory';
import Draggable from '../components/UI/draggable/Draggable';
import { PositionComponents } from '../context/PositionContext';
import { Container } from './styles';

export default () => (
  <Container>
    <Draggable component={PositionComponents.MARKETPLACE}>
      <MakertPlace />
    </Draggable>

    <Draggable component={PositionComponents.INVENTORY}>
      <Inventory items={[]} />
    </Draggable>
  </Container>
);

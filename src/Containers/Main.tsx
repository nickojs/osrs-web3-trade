import MakertPlace from '../components/marketplace/MarketPlace';
import Inventory from '../components/inventory/Inventory';
import Draggable from '../components/UI/draggable/Draggable';
import { Container } from './styles';
import useResize from '../hooks/useResize';
import positionHandler, { Position } from '../helpers/positionHandler';


export default (): JSX.Element => { 
  const { width, height } = useResize();
  const marketPlacePos = positionHandler(Position.CENTER, { width: 600, height: 400 }, { width, height });
  const inventoryPos = positionHandler(Position.BOTTOMRIGHT, { width: 382, height: 532 }, { width, height });

  return (
    <Container>
      <Draggable startPosition={marketPlacePos}>
        <MakertPlace />
      </Draggable>

      <Draggable startPosition={inventoryPos}>
        <Inventory items={[]}/>
      </Draggable>
    </Container>
  );
};


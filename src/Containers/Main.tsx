import { Rnd } from 'react-rnd';
import MakertPlace from '../components/marketplace/MarketPlace';
import Inventory from '../components/inventory/Inventory';
import { Container } from './styles';

interface DraggableProps {
  children: JSX.Element;
  startPosition?: { 
    x: number;
    y: number;
  }
}

const Draggable = ({ children, startPosition }: DraggableProps ): JSX.Element => (
  <Rnd
    enableResizing={false}
    bounds="parent"
    position={startPosition}
  >
    {children}
  </Rnd>
);

export default (): JSX.Element => { 
  return (
    <Container>
      <Draggable>
        <MakertPlace />
      </Draggable>

      <Draggable>
        <Inventory items={[]}/>
      </Draggable>
    </Container>
  );
};


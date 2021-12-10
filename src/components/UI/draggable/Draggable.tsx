import { Rnd } from 'react-rnd';
import { DraggableProps } from './interfaces';

export default ({ children, startPosition }: DraggableProps ): JSX.Element => (
  <Rnd
    enableResizing={false}
    bounds="parent"
    position={startPosition}
  >
    {children}
  </Rnd>
);

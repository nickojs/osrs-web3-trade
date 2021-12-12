import { Rnd } from 'react-rnd';
import { DraggableProps } from './interfaces';
import { usePosition } from '../../../context/PositionContext';

export default ({ children, component }: DraggableProps ): JSX.Element => {
  const { setX, setY, setTop, components } = usePosition();
  const { onTop, [component]: currentComponent } = components;

  const setPositionHandler = (x: number, y: number) => { 
    setY(y, component);
    setX(x, component);
  };

  return (
    <Rnd
      style={{ zIndex: onTop === component ? 999 : 0 }}
      onDragStart={() => setTop(component)}
      onDragStop={(e, d) => setPositionHandler(d.x, d.y)}
      enableResizing={false}
      bounds="parent"
    >
      {children}
    </Rnd>
  );
};

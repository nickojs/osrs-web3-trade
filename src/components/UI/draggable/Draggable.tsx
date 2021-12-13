import { Rnd } from 'react-rnd';
import { DraggableProps } from './interfaces';
import usePosition from '../../../context/PositionContext';

export default ({ children, component }: DraggableProps ): JSX.Element => {
  const { setX, setY, setTop, onTop, components } = usePosition();
  const { [component]: currentComponent } = components;
  const { xAxis: x, yAxis: y } = currentComponent;

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
      position={{ x, y }}
    >
      {children}
    </Rnd>
  );
};

import { Rnd } from 'react-rnd';
import { DraggableProps } from './interfaces';
import usePosition from '../../../context/PositionContext';

export default ({ children, component }: DraggableProps) => {
  const {
    setX, setY, setTop, onTop, components
  } = usePosition();
  const { [component]: currentComponent } = components;
  const { xAxis: x, yAxis: y, display } = currentComponent;

  const setPositionHandler = (X: number, Y: number) => {
    setY(Y, component);
    setX(X, component);
  };

  return (
    <Rnd
      style={{
        zIndex: onTop === component ? 999 : 0,
        display: display ? 'block' : 'none'
      }}
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

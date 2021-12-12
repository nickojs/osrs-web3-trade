import { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { DraggableProps } from './interfaces';
import { usePosition, PositionComponents } from '../../../context/PositionContext';

export default ({ children, startPosition, component }: DraggableProps ): JSX.Element => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const { setWidth, setHeight, setTop, components } = usePosition();
  
  const currentComponent = components[component];
  const { onTop } = currentComponent; 

  const setTopHandler = () => {
    if (onTop) return;
    
    setTop(component, true);

    for (const comp in PositionComponents) {
      const selectedComponent = PositionComponents[comp as keyof typeof PositionComponents];
      if (selectedComponent !== component) {
        setTop(selectedComponent, false);
      }
    }
  };

  const setPositionHandler = (x: number, y: number) => { 
    setX(x);
    setY(y);
    // setWidth(x, component);
    // setHeight(y, component);
  };

  useEffect(() => { 
    if (startPosition) { 
      const { x, y } = startPosition;
      setPositionHandler(x, y);
    }
  }, [startPosition]);

  return (
    <Rnd
      style={{ zIndex: onTop ? 999 : 0 }}
      onDragStart={setTopHandler}
      onDragStop={(e, d) => setPositionHandler(d.x, d.y)}
      enableResizing={false}
      bounds="parent"
      position={{ x, y }}
    >
      {children}
    </Rnd>
  );
};

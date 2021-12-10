import { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { DraggableProps } from './interfaces';

export default ({ children, startPosition }: DraggableProps ): JSX.Element => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const setPositionHandler = (x: number, y: number) => { 
    setX(x);
    setY(y);
  };

  useEffect(() => { 
    if (startPosition) { 
      const {x, y } = startPosition;
      setX(x);
      setY(y);
    }
  }, [startPosition]);

  return (
    <Rnd
      onDragStop={(e, d) => setPositionHandler(d.x, d.y)}
      enableResizing={false}
      bounds="parent"
      position={{ x, y }}
    >
      {children}
    </Rnd>
  );
};

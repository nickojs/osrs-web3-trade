import { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { DraggableProps } from './interfaces';
import usePosition from '../../../context/PositionContext';
import useResize from '../../../hooks/useResize';
import positionHandler from '../../../helpers/positionHandler';

export default ({ children, component }: DraggableProps) => {
  const [localx, setLocalx] = useState(-1);
  const [localy, setLocaly] = useState(-1);

  const { onTop, components, setTop } = usePosition();
  const { [component]: currentComponent } = components;
  const { display } = currentComponent;
  const windowSize = useResize();

  useEffect(() => {
    const { x, y } = positionHandler(currentComponent, windowSize);
    setLocalx(x);
    setLocaly(y);
  }, [windowSize]);

  return localx >= 0 && localy >= 0 ? (
    <Rnd
      style={{
        zIndex: onTop === component ? 999 : 0,
        display: display ? 'block' : 'none'
      }}
      onDragStart={() => setTop(component)}
      enableResizing={false}
      bounds="parent"
      default={{
        x: localx,
        y: localy,
        height: 'auto',
        width: 'auto'
      }}
    >
      {children}
    </Rnd>
  ) : <p>Loading...</p>;
};

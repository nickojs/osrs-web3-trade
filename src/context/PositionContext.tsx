import React, { useContext, useEffect, useReducer, useState, useCallback } from 'react';
import placementHandler from '../helpers/positionHandler';
import useResize from '../hooks/useResize';

export enum Placement { 
  TOPLEFT,
  TOPRIGHT,
  BOTTOMLEFT,
  BOTTOMRIGHT,
  CENTER
}

export enum PositionComponents {
  INVENTORY = 'inventory',
  MARKETPLACE = 'marketplace'
}

export interface PositionProperties { 
  xAxis: number; 
  yAxis: number; 
  width: number;
  height: number;
  placement: Placement;
}

type PositionReducerState = Record<PositionComponents, PositionProperties> 

interface PositionContextProps{
  components: PositionReducerState;
  onTop: PositionComponents;
  setX: (width: number, component: PositionComponents) => void;
  setY: (height: number, component: PositionComponents) => void;
  setTop: (component: PositionComponents) => void;
}

const PositionContext = React.createContext<PositionContextProps>(
  {} as PositionContextProps
);

enum ActionTypes {
  SETX = 'SET_X_AXIS',
  SETY = 'SET_Y_AXIS',
  SETTOP = 'SETTOP'
}

type Actions =
  | { type: ActionTypes.SETX; data: { component: PositionComponents; xAxis: number; } }
  | { type: ActionTypes.SETY; data: { component: PositionComponents; yAxis: number; } }
  | { type: ActionTypes.SETTOP; component: PositionComponents; }

const initialState: PositionReducerState = { 
  [PositionComponents.INVENTORY]: { 
    xAxis: 0,
    yAxis: 0,
    width: 382,
    height: 532,
    placement: Placement.BOTTOMRIGHT
  },
  [PositionComponents.MARKETPLACE]: {
    xAxis: 0, 
    yAxis: 0,
    width: 600,
    height: 400,
    placement: Placement.CENTER
  }
};

const positionReducer = (state: PositionReducerState = initialState, action: Actions ) => {
  switch (action.type) {
  case ActionTypes.SETX: 
    return { 
      ...state,
      [action.data.component]: { 
        ...state[action.data.component],
        xAxis: action.data.xAxis
      }
    };
  case ActionTypes.SETY: 
    return { 
      ...state,
      [action.data.component]: { 
        ...state[action.data.component],
        yAxis: action.data.yAxis
      }
    };
  default:
    throw new Error("[positionReducer] unidentified action received");
  }
};

export const PositionProvider: React.FC = ({ children }) => {
  const [onTop, setOnTop] = useState<PositionComponents>(PositionComponents.INVENTORY);
  const [components, dispatch] = useReducer(positionReducer, initialState);
  const windowSize = useResize();

  const setX = useCallback((xAxis: number, component: PositionComponents) => {
    dispatch({ type: ActionTypes.SETX, data: { xAxis, component }});
  }, []);

  const setY = useCallback((yAxis: number, component: PositionComponents) => {
    dispatch({ type: ActionTypes.SETY, data: { yAxis, component }});
  }, []);

  const setTop = useCallback((component: PositionComponents) => setOnTop(component), []);

  useEffect(() => { 
    // make sure windowSize was initialized
    if(windowSize.width > 0){ 
      for (const [key, value] of Object.entries(components)) {
        const { x, y } = placementHandler(value, windowSize);
        const component = PositionComponents[key.toUpperCase() as keyof typeof PositionComponents];
        setX(x, component);
        setY(y, component);
      }      
    }
  }, [windowSize.width]);

  return (
    <PositionContext.Provider
      value={{
        components,
        onTop,
        setX,
        setY,
        setTop
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};

export default (): PositionContextProps => {
  const context = useContext(PositionContext);
  return context;
};

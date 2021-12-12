import React, { useContext, useReducer } from 'react';

export enum PositionComponents {
  INVENTORY = 'inventory',
  MARKETPLACE = 'marketplace'
}

type PositionProperties = { xAxis: number; yAxis: number; };

type PositionReducerState = Record<PositionComponents, PositionProperties> & { onTop: PositionComponents };

interface PositionContextProps{
  components: PositionReducerState;
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
  onTop: PositionComponents.INVENTORY,
  inventory: { 
    xAxis: 0,
    yAxis: 0
  },
  marketplace: { 
    xAxis: 0, 
    yAxis: 0
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
  case ActionTypes.SETTOP: 
    return { 
      ...state,
      onTop: action.component
    };
  default:
    throw new Error("[positionReducer] unidentified action received");
  }
};

export const PositionProvider: React.FC = ({ children }) => {
  const [components, dispatch] = useReducer(positionReducer, initialState);

  const setX = (xAxis: number, component: PositionComponents) => {
    dispatch({ type: ActionTypes.SETX, data: { xAxis, component }});
  };
  const setY = (yAxis: number, component: PositionComponents) => {
    dispatch({ type: ActionTypes.SETY, data: { yAxis, component }});
  };
  const setTop = (component: PositionComponents) => {
    dispatch({ type: ActionTypes.SETTOP, component });
  };

  return (
    <PositionContext.Provider
      value={{
        components,
        setX,
        setY,
        setTop
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};

export const usePosition = (): PositionContextProps => {
  const context = useContext(PositionContext);
  return context;
};

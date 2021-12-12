import React, { useContext, useReducer } from 'react';

export enum PositionComponents {
  INVENTORY = 'inventory',
  MARKETPLACE = 'marketplace'
}

type PositionProperties = { width: number; height: number; };

type PositionReducerState = Record<PositionComponents, PositionProperties> & { onTop: PositionComponents };

interface PositionContextProps{
  components: PositionReducerState;
  setWidth: (width: number, component: PositionComponents) => void;
  setHeight: (height: number, component: PositionComponents) => void;
  setTop: (component: PositionComponents) => void;
}

const PositionContext = React.createContext<PositionContextProps>(
  {} as PositionContextProps
);

enum ActionTypes {
  SETWIDTH = 'SET_WIDTH',
  SETHEIGHT = 'SET_HEIGHT',
  SETTOP = 'SETTOP'
}

type Actions =
  | { type: ActionTypes.SETWIDTH; data: { component: PositionComponents; width: number; } }
  | { type: ActionTypes.SETHEIGHT; data: { component: PositionComponents; height: number; } }
  | { type: ActionTypes.SETTOP; component: PositionComponents; }

const initialState: PositionReducerState = { 
  onTop: PositionComponents.INVENTORY,
  inventory: { 
    width: 0,
    height: 0
  },
  marketplace: { 
    width: 0, 
    height: 0 
  }
};

const positionReducer = (state: PositionReducerState = initialState, action: Actions ) => {
  switch (action.type) {
  case ActionTypes.SETWIDTH: 
    return { 
      ...state,
      [action.data.component]: {
        ...state[action.data.component],
        width: action.data.width
      }
    };
  case ActionTypes.SETHEIGHT: 
    return { 
      ...state,
      [action.data.component]: {
        ...state[action.data.component],
        height: action.data.height
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

  const setWidth = (width: number, component: PositionComponents) => {
    dispatch({ type: ActionTypes.SETWIDTH, data: { width, component }});
  };
  const setHeight = (height: number, component: PositionComponents) => {
    dispatch({ type: ActionTypes.SETHEIGHT, data: { height, component }});
  };
  const setTop = (component: PositionComponents) => {
    dispatch({ type: ActionTypes.SETTOP, component });
  };

  return (
    <PositionContext.Provider
      value={{
        components,
        setWidth,
        setHeight,
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

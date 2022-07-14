/* eslint-disable no-use-before-define */
import React, {
 useContext, useReducer, useState, useCallback
} from 'react';

export enum Placement {
  TOPLEFT,
  TOPRIGHT,
  BOTTOMLEFT,
  BOTTOMRIGHT,
  CENTER
}

export enum PositionComponents {
  INVENTORY = 'inventory',
  MARKETPLACE = 'marketplace',
  USERLIST = 'userlist'
}

export interface PositionProperties {
  width: number;
  height: number;
  placement: Placement;
  display: boolean;
}

type PositionReducerState = Record<PositionComponents, PositionProperties>

interface PositionContextProps {
  components: PositionReducerState;
  onTop: PositionComponents;
  setTop: (component: PositionComponents) => void;
  toggle: (component: PositionComponents) => void;
}

const PositionContext = React.createContext<PositionContextProps>(
  {} as PositionContextProps
);

enum ActionTypes {
  TOGGLE = 'TOGGLE',
}

type Actions = { type: ActionTypes.TOGGLE; component: PositionComponents; }

const initialState: PositionReducerState = {
  [PositionComponents.INVENTORY]: {
    width: 382,
    height: 532,
    placement: Placement.BOTTOMRIGHT,
    display: true
  },
  [PositionComponents.MARKETPLACE]: {
    width: 600,
    height: 400,
    placement: Placement.TOPLEFT,
    display: false
  },
  [PositionComponents.USERLIST]: {
    width: 600,
    height: 400,
    placement: Placement.TOPLEFT,
    display: false
  }
};

// eslint-disable-next-line default-param-last
const positionReducer = (state: PositionReducerState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.TOGGLE:
      return {
        ...state,
        [action.component]: {
          ...state[action.component],
          display: !state[action.component].display
        }
      };
    default:
      throw new Error('[positionReducer] unidentified action received');
  }
};

export const PositionProvider: React.FC = ({ children }) => {
  const [onTop, setOnTop] = useState<PositionComponents>(PositionComponents.INVENTORY);
  const [components, dispatch] = useReducer(positionReducer, initialState);

  const setTop = useCallback((component: PositionComponents) => setOnTop(component), []);

  const toggleHandler = useCallback((component: PositionComponents) => {
    setOnTop(component);
    dispatch({ type: ActionTypes.TOGGLE, component });
  }, []);

  return (
    <PositionContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        components,
        onTop,
        setTop,
        toggle: toggleHandler
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

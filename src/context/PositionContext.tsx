/* eslint-disable no-use-before-define */
import React, {
 useContext, useReducer, useCallback, useState
} from 'react';

interface PositionContextProps {
  components: typeof initialState;
  onTop: PositionComponents;
  setTop: (component: PositionComponents) => void;
  setDisplay: (component: PositionComponents) => void;
}

const PositionContext = React.createContext<PositionContextProps>(
  {} as PositionContextProps
);

export enum Placement {
  TOPLEFT,
  TOPRIGHT,
  BOTTOMLEFT,
  BOTTOMRIGHT,
  CENTER,
  UPPERCENTER
}

export enum PositionComponents {
  INVENTORY = 'inventory',
  MARKETPLACE = 'marketplace',
  USERLIST = 'userlist',
  TRADE = 'trade'
}

const initialState = {
  [PositionComponents.INVENTORY]: {
    placement: Placement.BOTTOMRIGHT,
    display: true
  },
  [PositionComponents.MARKETPLACE]: {
    placement: Placement.UPPERCENTER,
    display: false
  },
  [PositionComponents.TRADE]: {
    placement: Placement.UPPERCENTER,
    display: false
  },
  [PositionComponents.USERLIST]: {
    placement: Placement.TOPLEFT,
    display: false
  }
};

enum ActionTypes {
  TOGGLEDISPLAY,
  SETTOP
}

type Actions = { type: ActionTypes.TOGGLEDISPLAY; component: PositionComponents; }

// eslint-disable-next-line default-param-last
const positionReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.TOGGLEDISPLAY:
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
  const [components, dispatch] = useReducer(positionReducer, initialState);
  const [onTop, setOnTop] = useState(PositionComponents.INVENTORY);

  const setTopHandler = useCallback(
    (component: PositionComponents) => setOnTop(component),
    []
  );
  const setDisplayHandler = useCallback(
    (component: PositionComponents) => dispatch({ type: ActionTypes.TOGGLEDISPLAY, component }),
    []
  );

  return (
    <PositionContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        components,
        onTop,
        setTop: setTopHandler,
        setDisplay: setDisplayHandler
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

import MarketPlace from '../components/marketplace/MarketPlace';
import Inventory from '../components/inventory/Inventory';
import UserList from '../components/userList/UserList';
import Trade from './Trade';
import SocketHandler from '../components/socketHandler/SocketHandler';
import PositionWrapper from '../components/UI/positionWrapper/PositionWrapper';
import { Container } from './styles';
import usePosition, { PositionComponents } from '../context/PositionContext';

const mappedComponents = {
  [PositionComponents.INVENTORY]: Inventory,
  [PositionComponents.MARKETPLACE]: MarketPlace,
  [PositionComponents.TRADE]: Trade,
  [PositionComponents.USERLIST]: UserList
};

export default () => {
  const { components, onTop, setTop } = usePosition();

  return (
    <SocketHandler>
      <Container>
        {Object.keys(components).map((comp) => {
            const typedComp = comp as PositionComponents;
            const { display, placement } = components[typedComp];
            const CurrentComponent = mappedComponents[typedComp];
            const setTopHandler = () => setTop(typedComp);

            return (
              <PositionWrapper
                key={typedComp}
                onTop={onTop === typedComp}
                setTop={setTopHandler}
                display={display}
                position={placement}
              >
                <CurrentComponent />
              </PositionWrapper>
            );
          })}
      </Container>
    </SocketHandler>
  );
};

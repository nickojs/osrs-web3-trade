import usePosition, { PositionComponents } from '../../context/PositionContext';
import { InventoryProps } from './interfaces';
import {
 Inventory, InventoryContent, InventoryMenu, InventoryMenuEntry
} from './styles';
import ItemWrapper from './ItemWrapper';

export default ({ items }: InventoryProps) => {
  const { toggle } = usePosition();

  return (
    <Inventory>
      <InventoryMenu>
        <InventoryMenuEntry
          icon="trade"
          onClick={() => toggle(PositionComponents.MARKETPLACE)}
        />
        <div />
        <div />
        <InventoryMenuEntry icon="inventory" />
        <InventoryMenuEntry
          icon="userlist"
          onClick={() => toggle(PositionComponents.USERLIST)}
        />
        <div />
        <div />
        <InventoryMenuEntry
          icon="logout"
        />
      </InventoryMenu>
      <InventoryContent>
        {items.map((item) => (
          <ItemWrapper key={item.id} item={item} />
        ))}
      </InventoryContent>
    </Inventory>
  );
};

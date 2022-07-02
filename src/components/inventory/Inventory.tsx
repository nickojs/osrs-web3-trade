import { InventoryProps } from './interfaces';
import {
 Inventory, InventoryContent, InventoryMenu, InventoryMenuEntry
} from './styles';
import ItemWrapper from './ItemWrapper';

export default ({ items }: InventoryProps) => (
  <Inventory>
    <InventoryMenu>
      <InventoryMenuEntry icon="trade" />
      <div />
      <div />
      <InventoryMenuEntry icon="inventory" />
      <InventoryMenuEntry icon="userlist" />
      <div />
      <div />
      <InventoryMenuEntry icon="logout" />
    </InventoryMenu>
    <InventoryContent>
      {items.map((item) => (
        <ItemWrapper key={item.id} item={item} />
      ))}
    </InventoryContent>
  </Inventory>
);

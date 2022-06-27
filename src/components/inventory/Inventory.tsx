import { InventoryProps } from './interfaces';
import { Inventory, InventoryContent } from './styles';
import ItemWrapper from './ItemWrapper';

export default ({ items }: InventoryProps) => (
  <Inventory>
    <InventoryContent>
      {items.map((item) => (
        <ItemWrapper key={item.id} item={item} />
      ))}
    </InventoryContent>
  </Inventory>
);

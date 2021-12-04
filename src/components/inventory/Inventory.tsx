import { Inventory, InventoryContent, ItemWrapper } from './styles';

export interface Item { 
  id: number,
  name: string,
  examine: string,
  url: string,
  image: string // base64 string
}
export interface InventoryProps {
  items: Item[]
}

export default ({ items }: InventoryProps) => {
  return (
    <Inventory>
      <InventoryContent>
        {items.map(({id, url, examine, image }) => (
          <ItemWrapper key={id} href={url} examine={examine}>
            <img src={`data:image/png;base64, ${image}`} />
          </ItemWrapper>
        ))}
      </InventoryContent>
    </Inventory>
  );
};


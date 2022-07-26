export interface Item {
  id: string,
  icon: string,
  itemId: number,
  description: string,
  name: string,
}
export interface InventoryProps {
  items: Item[]
}

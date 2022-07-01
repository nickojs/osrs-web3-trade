export interface Item {
  id: number,
  icon: string,
  description: string,
  name: string,
}
export interface InventoryProps {
  items: Item[]
}

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
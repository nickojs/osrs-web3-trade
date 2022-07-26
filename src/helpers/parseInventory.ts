import { Item } from '../components/inventory/interfaces';

export default (apiInventory: Record<string, any>) : Item => ({
  id: apiInventory.id,
  itemId: apiInventory.itemId,
  icon: apiInventory.iconUrl,
  description: apiInventory.description,
  name: apiInventory.name
});

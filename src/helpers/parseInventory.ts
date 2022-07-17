export default (apiInventory: Record<string, any>) => ({
  id: apiInventory.itemId,
  icon: apiInventory.iconUrl,
  description: apiInventory.description,
  name: apiInventory.name
});

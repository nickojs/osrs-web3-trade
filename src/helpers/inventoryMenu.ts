import disclaimer from '../assets/menu/disclaimer.png';
import inventory from '../assets/menu/inventory.png';
import logout from '../assets/menu/logout.png';
import trade from '../assets/menu/trade.png';
import userlist from '../assets/menu/userlist.png';

export type InventoryMenuType = 'disclaimer' | 'inventory' | 'logout' | 'trade' | 'userlist'

export default (value: InventoryMenuType) => {
  switch (value) {
    case 'disclaimer':
      return disclaimer;
    case 'inventory':
      return inventory;
    case 'logout':
      return logout;
    case 'trade':
      return trade;
    case 'userlist':
      return userlist;
    default:
      throw new Error('[inventoryMenuHelper]: unknown InventoryMenu type received');
  }
};

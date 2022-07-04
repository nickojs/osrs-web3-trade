import { useEffect } from 'react';
import { useQuery } from 'react-query';
import usePosition, { PositionComponents } from '../../context/PositionContext';
import useToast, { ToastType } from '../../context/NotificationContext';
import ItemWrapper from './ItemWrapper';
import { fetchInventory } from '../../services/endpoints';
import { api } from '../../services/api';
import Loader from '../UI/loader/Loader';
import {
  Inventory, InventoryContent, InventoryMenu, InventoryMenuEntry
} from './styles';
import useAuth from '../../context/AuthContext';
import { Item } from './interfaces';

const parseInventory = (apiInventory: Record<string, any>) => ({
  id: apiInventory.itemId,
  icon: apiInventory.iconUrl,
  description: apiInventory.description,
  name: apiInventory.name
});

export default () => {
  const { user } = useAuth();
  const { toggle } = usePosition();
  const { setToast } = useToast();

  const { data, isLoading, error } = useQuery(['fetchInventory', user], () => {
    const fetchInventoryObj = fetchInventory(user.username);
    return api(fetchInventoryObj);
  });

  useEffect(() => {
    if (error) {
      setToast({ message: 'couldnt fetch items', type: ToastType.ERROR });
    }
  }, [error]);

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
        {isLoading && <Loader />}
        {data && data.data?.inventory && data?.data.inventory.map((item: Item) => (
          <ItemWrapper key={item.id} item={parseInventory(item)} />
        ))}
      </InventoryContent>
    </Inventory>
  );
};

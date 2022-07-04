import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import usePosition, { PositionComponents } from '../../context/PositionContext';
import useToast, { ToastType } from '../../context/NotificationContext';
import ItemWrapper from './ItemWrapper';
import { fetchInventory, removeFromInventory } from '../../services/endpoints';
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
  const { user, clearSession } = useAuth();
  const { toggle } = usePosition();
  const { setToast } = useToast();
  const navigate = useNavigate();

  const logout = () => {
    clearSession();
    setToast({ message: 'logout in progress...', type: ToastType.WARNING });
    setTimeout(() => navigate('/'), 1500);
  };

  const {
  data, isLoading, error, refetch, isRefetching
  } = useQuery(['fetchInventory', user], () => {
    const fetchInventoryObj = fetchInventory(user.username);
    return api(fetchInventoryObj);
  });

  const removeFromInventoryMutation = useMutation(({ item }: { item: Item }) => {
    const removeFromInventoryObj = removeFromInventory(item);
    return api(removeFromInventoryObj);
  }, {
    onSuccess: () => {
      setToast({ message: 'removed from the inventory', type: ToastType.SUCCESS });
      refetch();
    }
  });

  const onRemoveFromInventory = (item: Item) => removeFromInventoryMutation.mutate({ item });

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
          onClick={logout}
        />
      </InventoryMenu>
      <InventoryContent>
        {(isLoading || isRefetching) ? <Loader /> : (
          data && data.data?.inventory && data?.data.inventory.map((item: Item) => (
            <ItemWrapper
              key={item.id}
              item={parseInventory(item)}
              onClick={() => onRemoveFromInventory(item)}
            />
          ))
        )}
      </InventoryContent>
    </Inventory>
  );
};

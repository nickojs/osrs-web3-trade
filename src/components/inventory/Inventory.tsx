import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePosition, { PositionComponents } from '../../context/PositionContext';
import useToast, { ToastType } from '../../context/NotificationContext';
import useAuth from '../../context/AuthContext';
import useSocket from '../../context/SocketContext';
import { useRemoveInventoryItem, useFetchInventory, useRefreshInventory } from '../../hooks/useInventory';
import parseInventory from '../../helpers/parseInventory';
import Loader from '../UI/loader/Loader';
import ItemWrapper from './ItemWrapper';
import { Item } from './interfaces';
import {
  Inventory, InventoryContent, InventoryMenu, InventoryMenuEntry
} from './styles';

export default () => {
  const { clearSession } = useAuth();
  const { toggle } = usePosition();
  const { setToast } = useToast();
  const { currentUser } = useSocket();
  const navigate = useNavigate();

  const { trading } = currentUser;

  const logout = () => {
    clearSession();
    setToast({ message: 'logout in progress...', type: ToastType.WARNING });
    setTimeout(() => navigate('/'), 1500);
  };

  const {
    data, isLoading, error, refetch, isRefetching
  } = useFetchInventory();

  const { refetch: refreshInventory } = useRefreshInventory();

  const { mutate: onRemoveFromInventory, isLoading: removeLoading } = useRemoveInventoryItem(
    () => {
      setToast({ message: 'removed from the inventory', type: ToastType.SUCCESS });
      refetch();
    },
    () => setToast({ message: 'couldnt remove item', type: ToastType.ERROR })
  );

  const refreshInventoryHandler = () => {
    refreshInventory();
    refetch();
  };

  useEffect(() => {
    if (error) {
      setToast({ message: 'couldnt fetch items', type: ToastType.ERROR });
    }
  }, [error]);

  return (
    <Inventory>
      {!trading?.isTrading && (
        <InventoryMenu>
          <InventoryMenuEntry
            icon="trade"
            onClick={() => toggle(PositionComponents.MARKETPLACE)}
          />
          <div />
          <div />
          <InventoryMenuEntry icon="inventory" onClick={() => refreshInventoryHandler()} />
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
      )}
      <InventoryContent isLoading={removeLoading || isRefetching}>
        {(isLoading) ? <Loader /> : (
          data && data.data?.inventory && data?.data.inventory.map((item: Item) => (
            <ItemWrapper
              key={item.id}
              indicator={trading?.isTrading ? 'add' : 'remove'}
              item={parseInventory(item)}
              onClick={() => onRemoveFromInventory(item)}
            />
          ))
        )}
      </InventoryContent>
    </Inventory>
  );
};

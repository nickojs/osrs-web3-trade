import { useEffect } from 'react';
import usePosition, { PositionComponents } from '../../context/PositionContext';
import useToast, { ToastType } from '../../context/NotificationContext';
import useAuth from '../../context/AuthContext';
import useSocket from '../../context/SocketContext';
import { useRemoveInventoryItem, useFetchInventory, useRefreshInventory } from '../../hooks/useInventory';
import parseInventory from '../../helpers/parseInventory';
import Loader from '../UI/loader/Loader';
import ItemWrapper from './ItemWrapper';
import {
  Inventory, InventoryContent, InventoryMenu, InventoryMenuEntry
} from './styles';
import { Item } from './interfaces';

export default () => {
  const { clearSession: logout } = useAuth();
  const { setDisplay } = usePosition();
  const { setToast } = useToast();
  const { currentUser, sendItem } = useSocket();
  const { trading, sendingItems } = currentUser;

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
            onClick={() => setDisplay(PositionComponents.MARKETPLACE)}
          />
          <div />
          <div />
          <InventoryMenuEntry icon="inventory" onClick={() => refreshInventoryHandler()} />
          <InventoryMenuEntry
            icon="userlist"
            onClick={() => setDisplay(PositionComponents.USERLIST)}
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
          data?.data?.inventory.map((item: Item) => {
            const isCurrentTrading = !!sendingItems?.find(
              (sItem) => sItem.id === item.id
            );

            return (
              <ItemWrapper
                key={item.id}
                indicator={trading?.isTrading ? 'add' : 'remove'}
                isTrading={isCurrentTrading}
                item={parseInventory(item)}
                onClick={trading?.isTrading
                  ? () => sendItem(parseInventory(item))
                  : () => onRemoveFromInventory(item)}
              />
            );
          })
        )}
      </InventoryContent>
    </Inventory>
  );
};

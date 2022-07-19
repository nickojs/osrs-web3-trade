import { useMutation, useQuery } from 'react-query';
import useAuth from '../context/AuthContext';
import { api } from '../services/api';
import { fetchInventory, refreshInventory, removeFromInventory } from '../services/endpoints';
import { Item } from '../components/inventory/interfaces';

export const useFetchInventory = () => {
  const { user } = useAuth();

  return useQuery(['fetchInventory', user], () => {
    const fetchInventoryObj = fetchInventory(user.username);
    return api(fetchInventoryObj);
  }, {
    refetchOnWindowFocus: false
  });
};

export const useRemoveInventoryItem = (
  onSuccess: () => void,
  onError: () => void
) => useMutation((item: Item) => {
    const removeFromInventoryObj = removeFromInventory(item);
    return api(removeFromInventoryObj);
  }, {
    mutationKey: 'fetchInventory',
    onSuccess,
    onError
  });

export const useRefreshInventory = () => useQuery(['fetchInventory'], () => {
    const refreshInventoryObj = refreshInventory();
    return api(refreshInventoryObj);
  }, {
    refetchOnWindowFocus: false,
    enabled: false
  });

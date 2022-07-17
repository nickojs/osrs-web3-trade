// import useAuth from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { api } from '../services/api';
import { addToInventory, search as searchEndpoint } from '../services/endpoints';
import { Item } from '../components/inventory/interfaces';

export const useMarketplaceItems = (search: string, category: number) => {
  const [params, setParams] = useState({});

  useEffect(() => {
    if (search.length > 0 && category >= 0) {
      const searchParams = searchEndpoint({ name: search, category });
      setParams(searchParams);
    }
  }, [search, category]);

  return useQuery(['items', params], () => api(params), { enabled: Object.keys(params).length > 0 });
};

export const useAddToInventory = (
  onSuccess: () => void,
  onError: () => void
) => useMutation((item: Item) => {
  const addToInventoryObj = addToInventory(item);
  return api(addToInventoryObj);
}, {
  onSuccess,
  onError
});

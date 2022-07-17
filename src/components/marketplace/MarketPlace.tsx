import { useState, useEffect } from 'react';
import useToast, { ToastType } from '../../context/NotificationContext';
import { useFetchInventory } from '../../hooks/useInventory';
import { useAddToInventory, useMarketplaceItems } from '../../hooks/useMarketplace';
import ItemWrapper from '../inventory/ItemWrapper';
import { Item } from '../inventory/interfaces';
import CategorySelector from '../categorySelector/CategorySelector';
import SearchInput from '../UI/input/SearchInput';
import Loader from '../UI/loader/Loader';
import {
  MarketPlace,
  ListView,
  MakertPlaceTitle,
  SearchContainer
} from './styles';

export default () => {
  const { setToast } = useToast();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(-1);
  const [items, setItems] = useState<Item[]>([]);

  const categorySelectorHandler = (value: number) => setCategory(value);
  const { data, error, isLoading } = useMarketplaceItems(search, category);

  const { refetch } = useFetchInventory();

  const { mutate: addToInventoryMutation, isLoading: addToInventoryLoading } = useAddToInventory(
    () => {
      setToast({ message: 'added item to inventory', type: ToastType.SUCCESS });
      refetch();
    },
    () => setToast({ message: 'couldnt add item', type: ToastType.ERROR })
  );

  useEffect(() => {
    if (data) setItems(data.data);
  }, [data]);

  useEffect(() => {
    if (error) setItems([]);
  }, [error]);

  return (
    <MarketPlace>
      <MakertPlaceTitle>MarketPlace</MakertPlaceTitle>
      <SearchContainer>
        <SearchInput
          onChange={(e) => setSearch(e.target.value)}
          debounceDelay={500}
          placeholder="Search for an item"
          disabled={isLoading}
        />
        <CategorySelector
          onChange={categorySelectorHandler}
          disabled={isLoading}
        />
      </SearchContainer>

      {isLoading && <Loader />}

      <ListView isLoading={addToInventoryLoading}>
        {items.length > 0 && items.map((item) => (
          <ItemWrapper
            key={item.id}
            item={item}
            onClick={() => addToInventoryMutation(item)}
          />
        ))}
      </ListView>

      {error && <p>{JSON.stringify(error)}</p>}
    </MarketPlace>
  );
};

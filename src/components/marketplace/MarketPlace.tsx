import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Item } from '../inventory/interfaces';
import {
  MarketPlace,
  ListView,
  MakertPlaceTitle,
  SearchContainer
} from './styles';
import ItemWrapper from '../inventory/ItemWrapper';
import Loader from '../UI/loader/Loader';
import { search as searchEndpoint } from '../../services/endpoints';
import CategorySelector from '../categorySelector/CategorySelector';
import { api } from '../../services/api';
import SearchInput from '../UI/input/SearchInput';

export default () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(-1);
  const [params, setParams] = useState({});
  const [items, setItems] = useState<Item[]>([]);

  const { data, error, isLoading } = useQuery('items', () => api(params), { enabled: Object.keys(params).length > 0 });
  const categorySelectorHandler = (value: number) => setCategory(value);

  useEffect(() => {
    if (search.length > 0 && category >= 0) {
      const searchParams = searchEndpoint({ name: search, category });
      setParams(searchParams);
    }
  }, [search, category]);

  useEffect(() => {
    if (data) setItems(data.data);
  }, [data]);

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

      <ListView>
        {items.length > 0 && items.map((item) => (
          <ItemWrapper key={item.id} item={item} />
        ))}
      </ListView>

      {error && <p>{JSON.stringify(error)}</p>}
    </MarketPlace>
  );
};

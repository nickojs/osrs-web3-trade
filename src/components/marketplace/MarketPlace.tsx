import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { EndPoints, searchRequest } from '../../services/endpoints';
import { Item } from '../inventory/interfaces';
import useRequest from '../../hooks/useRequest';
import { MarketPlace, ListView, MakertPlaceTitle, Search } from './styles';
import ItemWrapper from '../inventory/ItemWrapper';

export default (): JSX.Element => {
  const [search, setSearch] = useState('');
  const [params, setParams] = useState({});
  const [items, setItems] = useState<Item[]>([]);

  const searchHandler = (value: string) => setSearch(value);
  const debouncedSearchHandler = debounce(searchHandler, 500);

  const { data, loading, error } = useRequest(params, EndPoints.ITEMS);

  useEffect(() => { 
    setParams(searchRequest(search));
  }, [search]);

  useEffect(() => { 
    if (loading || error) setItems([]);
  }, [loading, error]);

  useEffect(() => { 
    if(data){ 
      const { _items } = data as unknown as { _items: Record<string, string>[] };
      const parseItems = _items.map(({ id, name, examine, wiki_url: url, icon: image }) => ({ 
        id,
        name,
        examine,
        url,
        image 
      }) as unknown as Item);

      setItems(parseItems);
    }
  }, [data]);

  useEffect(() => { if(items) console.log(items); }, [items]);

  return (
    <MarketPlace>
      <MakertPlaceTitle>MarketPlace</MakertPlaceTitle>
      <Search 
        type="text" 
        placeholder="Search for an item" 
        onChange={e => debouncedSearchHandler(e.target.value)}
      />

      {loading && <p>loading...</p>}

      {error && <p>{JSON.stringify(error)}</p>}

      <ListView>
        {items.length > 0 && items.map((item) => (
          <ItemWrapper key={item.id} item={item} />
        ))}
      </ListView>
    </MarketPlace>
  );
};

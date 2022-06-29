/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Item } from '../inventory/interfaces';
import {
  MarketPlace,
  ListView,
  MakertPlaceTitle,
  Search
} from './styles';
import ItemWrapper from '../inventory/ItemWrapper';
import Loader from '../UI/loader/Loader';
import useRequest from '../../hooks/useRequest';
import { search as searchEndpoint, SearchParams } from '../../services/endpoints';

export default () => {
  // const [search, setSearch] = useState('');
  // const [params, setParams] = useState<SearchParams>({} as SearchParams);
  // const [items, setItems] = useState<Item[]>([]);

  const searchHandler = (value: string) => console.log(value);
  const debouncedSearchHandler = debounce(searchHandler, 500);

  return (
    <MarketPlace>
      <MakertPlaceTitle>MarketPlace</MakertPlaceTitle>
      <Search
        type="text"
        placeholder="Search for an item"
        onChange={(e) => debouncedSearchHandler(e.target.value)}
      />
      {/*
      {loading && <Loader />}

      {error && <p>{JSON.stringify(error)}</p>}

      <ListView>
        {items.length > 0 && items.map((item) => (
          <ItemWrapper key={item.id} item={item} />
        ))}
      </ListView> */}
    </MarketPlace>
  );
};

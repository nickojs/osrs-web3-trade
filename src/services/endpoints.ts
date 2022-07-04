import { AxiosRequestConfig, Method } from 'axios';
import { Item } from '../components/inventory/interfaces';

export type AuthBody = {
  username: string;
  password: string;
};

export type SearchParams = {
  category: number;
  name: string;
};

enum Endpoints {
  LOGIN = 'auth/login',
  USER = 'user/',
  SEARCH = 'items/search',
  CATEGORIES = 'items/categories',
  SEARCH_USERS = 'user/search',
  ADD_TO_INVENTORY = 'items/inventory/add',
  REMOVE_FROM_INVENTORY = 'items/inventory/remove',
}

const configFactory = (
  method: Method,
  url: string,
  body?: Record<string, unknown> | null,
  params?: Record<string, unknown> | null
): AxiosRequestConfig => ({
  method,
  url,
  data: body,
  params
});

export const login = (
  username: string,
  password: string
): AxiosRequestConfig<AuthBody> => configFactory('POST', Endpoints.LOGIN, { username, password });

export const create = (
  username: string,
  password: string,
  profilePicId: number
): AxiosRequestConfig<AuthBody> => configFactory('POST', Endpoints.USER, { username, password, profilePicId });

export const search = (query: SearchParams): AxiosRequestConfig => configFactory('GET', Endpoints.SEARCH, null, {
  category: query.category,
  name: query.name
});

export const categories = () => configFactory('GET', Endpoints.CATEGORIES, null, null);

export const searchUsers = (query: string) => configFactory('GET', Endpoints.SEARCH_USERS, null, {
  username: query
});

export const addToInventory = (item: Item) => configFactory('POST', Endpoints.ADD_TO_INVENTORY, { item });

export const removeFromInventory = (item: Item) => configFactory('POST', Endpoints.REMOVE_FROM_INVENTORY, { item });

export const fetchInventory = (query: string) => configFactory('GET', Endpoints.USER + query, null, null);

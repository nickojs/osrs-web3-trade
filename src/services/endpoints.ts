import { AxiosRequestConfig, Method } from 'axios';

export type AuthBody = {
  username: string;
  password: string;
}

export type SearchParams = {
  category: number;
  name: string;
}

enum Endpoints {
  LOGIN = 'auth/login',
  SEARCH = 'items/search'
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

export const search = (query: SearchParams): AxiosRequestConfig => configFactory('GET', Endpoints.SEARCH, null, {
  category: query.category,
  name: query.name
});

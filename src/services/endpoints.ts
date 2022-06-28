import { AxiosRequestConfig, Method } from 'axios';

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

export const login = (username: string, password: string) => configFactory('POST', Endpoints.LOGIN, { username, password });

export const search = (query: string) => configFactory('GET', Endpoints.SEARCH, null, {
  category: 24,
  name: query
});

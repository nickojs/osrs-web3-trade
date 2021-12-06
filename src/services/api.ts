import axios, { AxiosPromise } from 'axios';

const baseURL = 'https://api.osrsbox.com/';

const api = axios.create({
  method: 'GET',
  baseURL,
  responseType: 'json'
});

export const searchItems = (value: string): AxiosPromise => {
  return api({
    url: 'items',
    params: {
      where: `{ "$text": { "$search": "${value}" } , "duplicate": false }`
    }
  });
};

export const getSingleItem = (id: number): AxiosPromise => { 
  return api({
    url: 'items',
    params: {
      where: `{ "id": "${id}" , "duplicate": false }`
    }
  });
};

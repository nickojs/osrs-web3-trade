import axios from 'axios';

const baseURL = 'https://api.osrsbox.com/';

export const api = axios.create({
  method: 'GET',
  baseURL,
  responseType: 'json'
});

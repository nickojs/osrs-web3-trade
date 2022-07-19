/* eslint-disable no-param-reassign */
import axios from 'axios';

const determineUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'http://localhost:7000';
    case 'production':
      return 'https://nickojs.herokuapp.com';
    default:
      throw new Error('Unkonwn NODE_ENV value provided');
  }
};

export const baseURL = determineUrl();

export const api = axios.create({
  method: 'GET',
  baseURL,
  responseType: 'json'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    };
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem('auth_token');
    if (error.response.status === 401 && token) {
      localStorage.removeItem('auth_token');
      window.location.reload();
   }
  }
);

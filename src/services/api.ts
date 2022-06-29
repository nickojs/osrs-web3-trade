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

const baseURL = determineUrl();

export const api = axios.create({
  method: 'GET',
  baseURL,
  responseType: 'json'
});

import { AxiosError } from 'axios';

export default (error: AxiosError) => {
  if (error.response) {
    const response = error.response.data.error;
    return typeof response === 'object' ? 'Something went wrong' : response;
  } if (error.request) {
    return 'Server issues';
  }
  return error.message || 'Unknown error';
};

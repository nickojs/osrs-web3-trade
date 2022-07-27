import { AxiosError } from 'axios';

export default (error: AxiosError) => {
  if (error.response !== undefined) {
    const response = error.response.data.error;
    return typeof response === 'object' ? 'Something went wrong' : response;
  } if (error.request !== undefined) {
    return 'Server issues';
  }
  return 'Something went wrong';
};

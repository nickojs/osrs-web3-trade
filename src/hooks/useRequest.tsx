import { AxiosError } from 'axios';
import { useReducer, useEffect, useCallback } from 'react';
import { api } from '../services/api';

enum ActionTypes {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  DATA = 'DATA',
  RESET = 'RESET'
}
type APIError = {
  status: number;
  error: string;
}
type State = {
  loading: boolean;
  error: string | null;
  data: any | null;
}

type Actions =
  | { type: ActionTypes.LOADING; status: boolean; }
  | { type: ActionTypes.ERROR; error: string | null; }
  | { type: ActionTypes.DATA; data: any | null; }
  | { type: ActionTypes.RESET; }

const initialState: State = {
  data: null,
  error: null,
  loading: false
};

// eslint-disable-next-line default-param-last
const requestReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
  case 'LOADING':
    return {
      ...state,
      error: null,
      data: null,
      loading: action.status
    };
  case 'ERROR':
    return {
      ...state,
      data: null,
      loading: false,
      error: action.error
    };
  case 'DATA':
    return {
      ...state,
      loading: false,
      error: null,
      data: action.data
    };
  case 'RESET':
    return {
      ...initialState
    };
  default:
    throw new Error(`[useRequest reducer] unknown action: ${action.type}`);
  }
};

// eslint-disable-next-line no-undef
export default (params: Record<string, unknown>): typeof requestState => {
  const [requestState, dispatch] = useReducer(requestReducer, initialState);
  const fetchData = useCallback(async () => {
    if (Object.keys(params).length > 0) {
      dispatch({ type: ActionTypes.LOADING, status: true });
      try {
        const request = await api(params);
        dispatch({ type: ActionTypes.DATA, data: request.data });
      } catch (err) {
        const typedError = err as AxiosError<APIError>;
        dispatch({ type: ActionTypes.ERROR, error: typedError.response?.data.error || 'unknown error' });
      } finally {
        dispatch({ type: ActionTypes.LOADING, status: false });
      }
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [params, fetchData]);

  const { data, loading, error } = requestState;

  return { data, loading, error };
};

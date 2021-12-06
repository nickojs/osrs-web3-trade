import { useReducer, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { EndPoints } from '../services/endpoints';

enum ActionTypes {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  DATA = 'DATA',
  RESET = 'RESET'
}
type APIError = { 
  _status: 'ERR';
  _error: { 
    code: number;
    message: string;
  }
}
type State = {
  loading: boolean;
  error: string | null;
  data: Record<string, unknown> | null;
}

type Actions =
  | { type: ActionTypes.LOADING; status: boolean; }
  | { type: ActionTypes.ERROR; error: string | null; }
  | { type: ActionTypes.DATA; data: Record<string, unknown> | null; }
  | { type: ActionTypes.RESET; }

const initialState: State = {
  data: null,
  error: null,
  loading: false
};

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

export default (params: Record<string, unknown>, endpoint: EndPoints): typeof requestState => {
  const [requestState, dispatch] = useReducer(requestReducer, initialState);
  const fetchData = useCallback(async () => {
    dispatch({ type: ActionTypes.LOADING, status: true });
    if (Object.keys(params).length > 0) { 
      try {
        const request = await api({ 
          url: endpoint, 
          params: {
            where: { ...params }
          } 
        });
        dispatch({ type: ActionTypes.DATA, data: request.data });
      } catch (err) {
        let errorMsg = 'unknown error';
        if (err instanceof Error) {
          const { _error: apiError } = err as unknown as APIError;
          if (apiError) { 
            errorMsg = apiError.message;
          }
        }
        dispatch({ type: ActionTypes.ERROR, error: errorMsg });
      } finally {
        dispatch({ type: ActionTypes.LOADING, status: false });
      }
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [endpoint, fetchData]);

  const { data, loading, error } = requestState;

  return { data, loading, error };
};

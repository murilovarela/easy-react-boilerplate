import initialState from '../initialState';
import { types } from './exampleActions';
import REQUEST_STATUS from '@Constants/requestStatus';

function exampleReducer(state = initialState.example, { type, payload }) {
  switch (type) {
    case types.FETCH_EXAMPLE_REQUEST: {
      return {
        ...state,
        ...initialState.example,
        requestStatus: REQUEST_STATUS.LOADING,
      };
    }
    case types.FETCH_EXAMPLE_SUCCESS: {
      return {
        ...initialState.example,
        list: payload.example,
        requestStatus: REQUEST_STATUS.DONE,
      };
    }
    case types.FETCH_EXAMPLE_FAILURE: {
      return {
        ...initialState.example,
        error: payload.error,
        requestStatus: REQUEST_STATUS.ERROR,
      };
    }
    default: {
      return state;
    }
  }
}

export default exampleReducer;

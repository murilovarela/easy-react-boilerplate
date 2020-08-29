export const types = {
  FETCH_EXAMPLE_REQUEST: 'FETCH_EXAMPLE_REQUEST',
  FETCH_EXAMPLE_SUCCESS: 'FETCH_EXAMPLE_SUCCESS',
  FETCH_EXAMPLE_FAILURE: 'FETCH_EXAMPLE_FAILURE',
};

export function fetchExampleRequest() {
  return {
    type: types.FETCH_EXAMPLE_REQUEST,
    payload: {},
  };
}

export function fetchExampleSuccess(example) {
  return {
    type: types.FETCH_EXAMPLE_SUCCESS,
    payload: { example },
  };
}

export function fetchExampleFailure(error) {
  return {
    type: types.FETCH_EXAMPLE_FAILURE,
    payload: { error },
  };
}

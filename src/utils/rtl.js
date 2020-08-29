import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import reducer from '@Redux/reducers';
import initialStateOriginal from '@Redux/initialState';

export function renderWithRedux(ui, { initialState = initialStateOriginal } = {}) {
  const actions = [];
  const observerMiddleware = () => next => action => {
    actions.push(action);
    return next(action);
  };
  const store = createStore(reducer, initialState, applyMiddleware(observerMiddleware));
  const utils = {
    dispatch(action) {
      return store.dispatch(action);
    },
    getDispatchedActions() {
      return actions;
    },
    getState() {
      return store.getState();
    },
  };
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    ...utils,
  };
}

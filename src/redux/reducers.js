import { combineReducers } from 'redux';

import exampleReducer from './example/exampleReducer';

export default combineReducers({
  example: exampleReducer,
});

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './reducers';
import saga from './sagas';

const persistConfig = {
  key: 'root',
  storage,
};

const sagaMiddleware = createSagaMiddleware();
let middleware = applyMiddleware(sagaMiddleware);

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(middleware);
}

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);

sagaMiddleware.run(saga);

export default store;

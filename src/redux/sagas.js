import { all } from 'redux-saga/effects';

import exampleSaga from './example/exampleSaga';

export default function* sagas() {
  yield all([exampleSaga()]);
}

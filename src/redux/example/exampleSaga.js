import { all, takeLatest, call, put } from 'redux-saga/effects';

import { getExample } from '@Services/example';
import { types, fetchExampleSuccess, fetchExampleFailure } from './exampleActions';

function* requestExampleWorker() {
  try {
    const examples = yield call(getExample);
    yield put(fetchExampleSuccess(examples));
  } catch (error) {
    yield put(fetchExampleFailure(error));
  }
}
function* requestExampleWatcher() {
  yield takeLatest(types.FETCH_EXAMPLE_REQUEST, requestExampleWorker);
}

function* exampleSaga() {
  yield all([requestExampleWatcher()]);
}

export default exampleSaga;

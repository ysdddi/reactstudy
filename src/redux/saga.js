import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { SAVEUSERID, SAVEUSERIDFAIL, REQ } from "../redux/actionTypes";
import { userSearch } from "../axios/userequest";
import { useSelector } from "react-redux";

const Api = async () => {
  const nickname = useSelector((state) => state.payload);
  const data = await userSearch(nickname);
  return data;
};

function* waitSearch(action) {
  const callUserId = yield call(Api, action.payload);
  try {
    yield put({ type: SAVEUSERID, data: callUserId });
  } catch (err) {
    yield put({ type: SAVEUSERIDFAIL, message: err.message });
  }
}

function* reqSaga() {
  yield takeLatest(REQ, waitSearch);
}
export default function* allSaga() {
  yield all([fork(reqSaga)]);
}

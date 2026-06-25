import { getFilesCommon } from "helpers/backend_helper"
import { takeEvery, put, call } from "redux-saga/effects"
import { getFileCommonFail, getFileCommonSuccess } from "./actions"
import { GET_FILES_COMMON } from "./actionTypes"

function* onGetFilesCommon({ payload: path }) {
  try {
    
    const response = yield call(getFilesCommon,path)
    console.log("🚀 ~ file: saga.js ~ line 9 ~ function*onGetFilesCommon ~ response", path)
    yield put(getFileCommonSuccess(response))
  } catch (error) {
    yield put(getFileCommonFail(error))
  }
}


function* saga(){
    yield takeEvery(GET_FILES_COMMON,onGetFilesCommon)
}

export default saga;
import { takeEvery, put, call } from "redux-saga/effects"
import { postRequestDemo } from "helpers/backend_helper"
import {
  REQUEST_DEMO,
} from "./actionTypes"

const {
  requestDemoSuccess,
  requestDemoFail,
} = require("./actions")

function* onRequestDemo({ payload: data }) {
  try {
    const result = yield call(postRequestDemo, data)
    yield put(requestDemoSuccess(result || "درخواست ارسال شد"))
  } catch (error) {
    yield put(requestDemoFail(error))
  }
}

function* saga() {
  yield takeEvery(REQUEST_DEMO, onRequestDemo)
}

export default saga

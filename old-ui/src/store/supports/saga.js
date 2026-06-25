import {
  closedSupportApi,
  deleteSupportFileApi,
  getListSupportApi,
  getListTicketApi,
  getSupportFilesApi,
  postAddSupportFileApi,
  switchSupportApi,
  upsertSupportApi,
  upsertTicketApi,
} from "helpers/backend_helper"
import {
  ADD_SUPPORT_FILE,
  CLOSED_SUPPORT,
  DELETE_SUPPORT_FILE,
  GET_LIST_SUPPORT,
  GET_LIST_TICKET,
  GET_SUPPORT_FILES,
  UPSERT_SUPPORT,
  UPSERT_TICKET,
} from "./actionTypes"
import { takeEvery, put, call } from "redux-saga/effects"

const {
  getListSupportSuccess,
  getListTicketSuccess,
  getListTicketFail,
  upsertSupportFail,
  upsertTicketSuccess,
  upsertTicketFail,
  getListSupportFail,
  upsertSupportSuccess,
  closedSupportSuccess,
  switchSupportSuccess,
  switchSupportFail,
  closedSupportFail,
  getSupportFilesSuccess,
  getSupportFilesFail,
  addSupportFileFail,
  addSupportFileSuccess,
  deleteSupportFileSuccess,
  deleteSupportFileFail,
} = require("./actions")

function* onGetListSupport({ payload: values }) {
  try {
    const result = yield call(getListSupportApi, values)
    yield put(getListSupportSuccess(result))
  } catch (error) {
    yield put(getListSupportFail(error))
  }
}

function* onUpsertSupport({ payload: data }) {
  const { formData, params } = data

  try {
    yield call(upsertSupportApi, formData)
    yield put(upsertSupportSuccess("تیکت ایجاد شد"))
    const result = yield call(getListSupportApi, params)
    yield put(getListSupportSuccess(result))
  } catch (error) {
    yield put(upsertSupportFail(error))
  }
}

function* onGetListTicket({ payload: values }) {
  try {
    const result = yield call(getListTicketApi, values)
    yield put(getListTicketSuccess(result))
  } catch (error) {
    yield put(getListTicketFail(error))
  }
}

function* onUpsertTicket({ payload: data }) {
  const { updatedData, params } = data
  try {
    yield call(upsertTicketApi, updatedData)
    yield put(upsertTicketSuccess("تیکت ایجاد شد"))
    const result = yield call(getListTicketApi, params)
    yield put(getListTicketSuccess(result))
  } catch (error) {
    yield put(upsertTicketFail(error))
  }
}

function* onClosedSupport({ payload: data }) {
  const { id } = data
  try {
    yield call(closedSupportApi, id)
    yield put(closedSupportSuccess({ id: data.id, inactive: data.closed }))
  } catch (error) {
    yield put(closedSupportFail(error))
  }
}



function* onAddSupportFile({ payload: attachData }) {
  try {
    const supportId = JSON.parse(attachData.get("supportId"))
    const response = yield call(postAddSupportFileApi, attachData)
    yield put(addSupportFileSuccess(response))
    const responseFiles = yield call(getSupportFilesApi, supportId)
    yield put(getSupportFilesSuccess(responseFiles))
  } catch (error) {
    yield put(addSupportFileFail(error))
  }
}

function* onGetSupportFiles({ payload: supportId }) {
  try {
    if (supportId) {
      const response = yield call(getSupportFilesApi, supportId)

      yield put(getSupportFilesSuccess(response))
    }
  } catch (error) {
    yield put(getSupportFilesFail(error))
  }
}

function* onDeleteSupportFiles({ payload: id }) {
  try {
    yield call(deleteSupportFileApi, {id})
    yield put(deleteSupportFileSuccess({id}))
  } catch (error) {
      console.log('error',error);
    yield put(deleteSupportFileFail(error))
  }
}

function* saga() {
  yield takeEvery(DELETE_SUPPORT_FILE, onDeleteSupportFiles)
  yield takeEvery(GET_LIST_SUPPORT, onGetListSupport)
  yield takeEvery(UPSERT_SUPPORT, onUpsertSupport)
  yield takeEvery(GET_LIST_TICKET, onGetListTicket)
  yield takeEvery(UPSERT_TICKET, onUpsertTicket)
  yield takeEvery(CLOSED_SUPPORT, onClosedSupport)
  yield takeEvery(ADD_SUPPORT_FILE, onAddSupportFile)
  yield takeEvery(GET_SUPPORT_FILES, onGetSupportFiles)
}

export default saga

import { CityFromSection } from "hooks/returnCityName"
import * as XLSX from "xlsx"

const {
  getTransactionsApi,
  getInvoicesApi,
  postPaymentCustom,
  getEngInvoicesApi,
  getEngInvoiceReportApi,
  postEngPaymentCustomApi,
  getEngWorkApi,
} = require("helpers/backend_helper")
const { call, put, takeEvery } = require("redux-saga/effects")
const {
  getTransactionSuccess,
  getTransactionsFail,
  getInvoicesSuccess,
  getInvoicesFail,
  postPaymentCustomSuccess,
  postPaymentCustomFail,
  getEngInvoiceReportSuccess,
  getEngInvoiceReportFail,
  getEngWorkSuccess,
  getEngWorksFail,
  getTransactionExcelSuccess,
  getTransactionExcelsFail,
} = require("./actions")
const {
  GET_TRANSACTIONS,
  GET_INVOICES,
  POST_PAYMENT_CUSTOM,
  GET_ENG_INVOICES,
  GET_ENG_INVOICE_REPORT,
  POST_ENG_PAYMENT_CUSTOM,
  GET_ENG_WORK,
  GET_TRANSACTION_EXCEL,
} = require("./actionTypes")

function* onGetTransactions({ payload: data }) {
  try {
    const response = yield call(getTransactionsApi, data)
    yield put(getTransactionSuccess(response))
  } catch (error) {
    yield put(getTransactionsFail(error))
  }
}

function* onGetTransactionExcel({ payload: data }) {
  try {
    const response = yield call(getTransactionsApi, data)
    let i = 1
    const MYdata = response.data.map(x => ({
      ردیف: i++,
      "نوع تراکنش": x.gatewayTypeName,
      شهر: CityFromSection(x.idSection),
      تاریخ: x.solarCreated.substr(0, 10),
      مبلغ: x.amount,
      "نوع پرداختی": x.transactionStatusName,
      "مربوط به پرونده": x.fileNumber,
      توضیحات: x.des,
    }))
    const worksheet = XLSX.utils.json_to_sheet(MYdata)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook, worksheet, "تراکنش ها")
    const today = new Date()
    const date =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    XLSX.writeFile(workbook, `${date}.xlsx`)


    yield put(getTransactionExcelSuccess(response))
  } catch (error) {
    yield put(getTransactionExcelsFail(error))
  }
}

function* onGetInvoices() {
  try {
    const response = yield call(getInvoicesApi)
    yield put(getInvoicesSuccess(response))
  } catch (error) {
    yield put(getInvoicesFail(error))
  }
}

function* onGetEngInvoices({ payload: engId }) {
  try {
    const response = yield call(getEngInvoicesApi, engId)

    yield put(getInvoicesSuccess(response))
  } catch (error) {
    yield put(getInvoicesFail(error))
  }
}

function* onGetEngInvoiceReport({ payload: values }) {
  try {
    const response = yield call(getEngInvoiceReportApi, values)
    yield put(getEngInvoiceReportSuccess(response))
  } catch (error) {
    yield put(getEngInvoiceReportFail(error))
  }
}

function* onPostPaymentCustom({ payload: events }) {
  try {
    const response = yield call(postPaymentCustom, events)
    yield put(postPaymentCustomSuccess("پرداخت انجام شد"))
  } catch (error) {
    yield put(postPaymentCustomFail(error))
  }
}

function* onGetEngWork({ payload: values }) {
  try {
    const response = yield call(getEngWorkApi, values)
    yield put(getEngWorkSuccess(response))
  } catch (error) {
    yield put(getEngWorksFail(error))
  }
}

function* accountingSaga() {
  yield takeEvery(GET_TRANSACTIONS, onGetTransactions)
  yield takeEvery(GET_TRANSACTION_EXCEL, onGetTransactionExcel)
  yield takeEvery(GET_INVOICES, onGetInvoices)
  yield takeEvery(GET_ENG_INVOICES, onGetEngInvoices)
  yield takeEvery(GET_ENG_INVOICE_REPORT, onGetEngInvoiceReport)
  yield takeEvery(POST_PAYMENT_CUSTOM, onPostPaymentCustom)
  yield takeEvery(GET_ENG_WORK, onGetEngWork)
}

export default accountingSaga

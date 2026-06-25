import { GET_ELECTPROJECTS_FAIL } from "store/electProjects/actionTypes"
import {
  GET_ENG_INVOICES,
  GET_ENG_INVOICE_REPORT,
  GET_ENG_INVOICE_REPORT_FAIL,
  GET_ENG_INVOICE_REPORT_SUCCESS,
  GET_ENG_WORK,
  GET_ENG_WORK_FAIL,
  GET_ENG_WORK_SUCCESS,
  GET_INVOICES,
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTION_EXCEL,
  GET_TRANSACTION_EXCEL_FAIL,
  GET_TRANSACTION_EXCEL_SUCCESS,
  POST_PAYMENT_CUSTOM,
  POST_PAYMENT_CUSTOM_FAIL,
  POST_PAYMENT_CUSTOM_SUCCESS,
  RESET_ACCOUNTING_FLAG,
} from "./actionTypes"

//-----------------------------------------------------get transaction
export const getTransaction = (data) => ({
  type: GET_TRANSACTIONS,
  payload: data
})


export const getTransactionSuccess = events => ({
  type: GET_TRANSACTIONS_SUCCESS,
  payload: events,
})

export const getTransactionsFail = error => ({
  type: GET_TRANSACTIONS_FAIL,
  payload: error,
})

//-----------------------------------------------------get transaction excl;
export const getTransactionExcel = (data) => ({
  type: GET_TRANSACTION_EXCEL,
  payload: data
})

export const getTransactionExcelSuccess = events => ({
  type: GET_TRANSACTION_EXCEL_SUCCESS,
  payload: events,
})

export const getTransactionExcelsFail = error => ({
  type: GET_TRANSACTION_EXCEL_FAIL,
  payload: error,
})


//-----------------------------------------------------Post Payment
export const postPaymentCustom = events => ({
  type: POST_PAYMENT_CUSTOM,
  payload: events,
})

export const postPaymentCustomSuccess = events => ({
  type: POST_PAYMENT_CUSTOM_SUCCESS,
  payload: events,
})

export const postPaymentCustomFail = error => ({
  type: POST_PAYMENT_CUSTOM_FAIL,
  payload: error,
})
//-----------------------------------------------------get Invoices
export const getInvoices = () => ({
  type: GET_INVOICES,
})

export const getEngInvoices = engId => ({
  type: GET_ENG_INVOICES,
  payload: engId,
})

export const getInvoicesSuccess = events => ({
  type: GET_INVOICES_SUCCESS,
  payload: events,
})

export const getInvoicesFail = error => ({
  type: GET_INVOICES_FAIL,
  payload: error,
})

//-----------------------------------------------------get eng Invoices Report
export const getEngInvoiceReport = values => ({
  type: GET_ENG_INVOICE_REPORT,
  payload: values,
})

export const getEngInvoiceReportSuccess = events => ({
  type: GET_ENG_INVOICE_REPORT_SUCCESS,
  payload: events,
})

export const getEngInvoiceReportFail = error => ({
  type: GET_ENG_INVOICE_REPORT_FAIL,
  payload: error,
})

//-----------------------------------------------------get EngWork
export const getEngWork = values => ({
  type: GET_ENG_WORK,
  payload: values,
})

export const getEngWorkSuccess = events => ({
  type: GET_ENG_WORK_SUCCESS,
  payload: events,
})

export const getEngWorksFail = error => ({
  type: GET_ENG_WORK_FAIL,
  payload: error,
})


//-----------------------------------------------------Reset
export const resetAccountingFlag = () => ({
  type: RESET_ACCOUNTING_FLAG,
})

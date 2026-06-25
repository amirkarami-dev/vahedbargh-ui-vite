const {
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTIONS,
  GET_INVOICES,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAIL,
  POST_PAYMENT_CUSTOM,
  POST_PAYMENT_CUSTOM_FAIL,
  POST_PAYMENT_CUSTOM_SUCCESS,
  RESET_ACCOUNTING_FLAG,
  GET_ENG_INVOICES,
  GET_ENG_INVOICE_REPORT,
  GET_ENG_INVOICE_REPORT_FAIL,
  GET_ENG_INVOICE_REPORT_SUCCESS,
  GET_ENG_WORK,
  GET_ENG_WORK_FAIL,
  GET_ENG_WORK_SUCCESS,
  GET_TRANSACTION_EXCEL,
  GET_TRANSACTION_EXCEL_SUCCESS,
  GET_TRANSACTION_EXCEL_FAIL,
} = require("./actionTypes")

const INIT_STATE = {
  lstTransactions: [],
  lstTransactionTotal: 0,
  lstInvoices: [],
  lstEngInvoiceReport: [],
  lstEngWork:[],
  lstEngWorkCount:[],
  error: "",
  success: "",
  loading: false,
}

const accounting = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
    case GET_TRANSACTION_EXCEL:
    case GET_INVOICES:
    case GET_ENG_INVOICES:
    case GET_ENG_INVOICE_REPORT:
    case POST_PAYMENT_CUSTOM:
    case GET_ENG_WORK:
      return {
        ...state,
        loading: true,
      }

    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        lstTransactions: action.payload.data,
        lstTransactionTotal: action.payload.totalItems
      }
      
    case GET_TRANSACTION_EXCEL_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        lstInvoices: action.payload,
      }
      case GET_ENG_INVOICE_REPORT_SUCCESS:
        return {
          ...state,
          loading: false,
          lstEngInvoiceReport: action.payload,
        }

    case POST_PAYMENT_CUSTOM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      }
      case GET_ENG_WORK_SUCCESS:
        return {
          ...state,
          loading: false,
          lstEngWork: action.payload,
        }


    case GET_TRANSACTIONS_FAIL:
    case GET_TRANSACTION_EXCEL_FAIL:
    case GET_INVOICES_FAIL:
    case GET_ENG_INVOICE_REPORT_FAIL:
    case POST_PAYMENT_CUSTOM_FAIL:
    case GET_ENG_WORK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload ? action.payload : "خطای پیش بینی نشده",
        success: "",
      }

    case RESET_ACCOUNTING_FLAG:
      return {
        ...state,
        error: null,
        success: null,
      }

    default:
      return state
  }
}

export default accounting

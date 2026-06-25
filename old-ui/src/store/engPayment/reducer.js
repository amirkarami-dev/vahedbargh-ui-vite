const {
  UPSERT_ENG_PAYMENT_LIST,
  GET_ENG_PAYMENT_LIST,
  UPSERT_ENG_PAYMENT_LIST_SUCCESS,
  GET_ENG_PAYMENT_LIST_SUCCESS,
  UPSERT_ENG_PAYMENT_LIST_FAIL,
  GET_ENG_PAYMENT_LIST_FAIL,
  RESET_ENG_PAYMENT_LIST_FLAG,
  UPDATE_ENG_PAYMENT_LIST,
  UPDATE_ENG_PAYMENT_LIST_FAIL,
  UPDATE_ENG_PAYMENT_LIST_SUCCESS,
  GET_ENG_PAYMENT_TASK,
  GET_ENG_PAYMENT_TASK_SUCCESS,
  GET_ENG_PAYMENT_TASK_FAIL,
  ENG_PAYMENT_APPROVED,
  ENG_PAYMENT_APPROVED_FAIL,
  ENG_PAYMENT_APPROVED_SUCCESS,
  FILTER_ENG_PAYMENT_LIST,
} = require("./actionTypes")

const INIT_STATE = {
  lstEngPayment: [],
  lstEngPaymentDefault: [],
  lstEngPaymentTask: [],
  error: null,
  success: null,
  loading: false,
}

const updateEngEngPaymentList = (lstEngPayment, payload) => {
  const findEngIndex = lstEngPayment.findIndex(x => x.id === payload.id)
  if (findEngIndex !== -1) {
    const { 
      amountSystem,
      deduction1,
      deduction2,
      deduction3,
      deduction4,
      addition1,
      addition2,
      sumAmountSystem,
      sumAmountWithFish,
      payByBankReceipt
    } = payload
    lstEngPayment[findEngIndex].amountSystem = amountSystem
    lstEngPayment[findEngIndex].deduction1 = deduction1
    lstEngPayment[findEngIndex].deduction2 = deduction2
    lstEngPayment[findEngIndex].deduction2 = deduction2
    lstEngPayment[findEngIndex].deduction3 = deduction3
    lstEngPayment[findEngIndex].deduction4 = deduction4
    lstEngPayment[findEngIndex].addition1 = addition1
    lstEngPayment[findEngIndex].addition2 = addition2
    lstEngPayment[findEngIndex].sumAmountSystem = sumAmountSystem
    lstEngPayment[findEngIndex].sumAmountWithFish = sumAmountWithFish
    lstEngPayment[findEngIndex].payByBankReceipt = payByBankReceipt
    
  }
  return lstEngPayment
}

const filterEngPaymentList= (lstEngPayment, filters, lstEngPaymentDefault) =>{
  if(!filters.section) return lstEngPaymentDefault
  
  const filteredData = lstEngPayment.filter((item) => {
    if (filters.section) {
      return filters.section.includes(+item.engineer.idSection);
    }
    return true;
  });
  return filteredData
}

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPSERT_ENG_PAYMENT_LIST:
    case GET_ENG_PAYMENT_LIST:
    case GET_ENG_PAYMENT_TASK:
    case UPDATE_ENG_PAYMENT_LIST:
    case ENG_PAYMENT_APPROVED:
      return {
        ...state,
        loading: true,
      }

      case FILTER_ENG_PAYMENT_LIST:
        return {
          ...state,
          lstEngPayment: filterEngPaymentList(  state.lstEngPayment,
            action.payload, state.lstEngPaymentDefault),
        }

    case GET_ENG_PAYMENT_LIST_SUCCESS:
      return {
        ...state,
        lstEngPayment: action.payload,
        lstEngPaymentDefault: action.payload,
        loading: false,
        success: "",
        error: null,
      }



    case GET_ENG_PAYMENT_TASK_SUCCESS:
      return {
        ...state,
        lstEngPaymentTask: action.payload,
        loading: false,
        success: "",
        error: null,
      }

    case UPSERT_ENG_PAYMENT_LIST_SUCCESS:
    case ENG_PAYMENT_APPROVED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      }
    case UPDATE_ENG_PAYMENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        lstEngPayment: updateEngEngPaymentList(
          state.lstEngPayment,
          action.payload
        ),
        success: "به روز رسانی انجام شد",
      }

    case UPSERT_ENG_PAYMENT_LIST_FAIL:
    case GET_ENG_PAYMENT_LIST_FAIL:
    case GET_ENG_PAYMENT_TASK_FAIL:
    case UPDATE_ENG_PAYMENT_LIST_FAIL:
    case ENG_PAYMENT_APPROVED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload ? action.payload : "خطای پیش بینی نشده",
        success: "",
      }

    //#region Reset
    case RESET_ENG_PAYMENT_LIST_FLAG:
      return {
        ...state,
        error: null,
        success: null,
      }
    //#endregion

    default:
      return state
  }
}

export default reducer

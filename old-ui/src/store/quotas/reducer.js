const {
  GET_ENG_QUOTA_BURN_LIST,
  GET_ENG_QUOTA_BURN_LIST_SUCCESS,
  RESET_ENG_QUOTA,
  GET_ENG_QUOTA_BURN_LIST_FAIL,
  ENG_QUOTA_BURN_APPROVED,
  ENG_QUOTA_BURN_APPROVED_SUCCESS,
  ENG_QUOTA_BURN_APPROVED_FAIL,
  ENG_QUOTA_BURN_UPDATE,
  ENG_QUOTA_BURN_UPDATE_SUCCESS,
  ENG_QUOTA_BURN_UPDATE_FAIL,
  RESET_QUOTA,
} = require("./actionTypes")

const INIT_STATE = {
  lstEngQuotaBurn: [],
  error: null,
  success: null,
  loading: false,
}

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ENG_QUOTA_BURN_LIST:
    case ENG_QUOTA_BURN_APPROVED:
    case ENG_QUOTA_BURN_UPDATE:
      return {
        ...state,
        loading: true,
      }

    case GET_ENG_QUOTA_BURN_LIST_SUCCESS:
      return {
        ...state,
        lstEngQuotaBurn: action.payload,
        loading: false,
        success: "",
        error: null,
      }
    case ENG_QUOTA_BURN_APPROVED_SUCCESS:
      return {
        ...state,
        lstEngQuotaBurn: state.lstEngQuotaBurn.map(item =>
          item.id == action.payload
            ? { ...item, approved: !item.approved }
            : item
        ),
        loading: false,
        success: "",
        error: null,
      }
    case ENG_QUOTA_BURN_UPDATE_SUCCESS:
      return {
        ...state,
        ...state,
        lstEngQuotaBurn: action.payload.id
          ? state.lstEngQuotaBurn.map(item =>
              item.id === action.payload.id
                ? { ...item, amountBurning: action.payload.amountBurning, des: action.payload.des }
                : item
            )
          : [...state.lstEngQuotaBurn, { ...action.payload }],
        loading: false,
        success: "با موفقیت ثبت شد",
        error: null,
      }

    case GET_ENG_QUOTA_BURN_LIST_FAIL:
    case ENG_QUOTA_BURN_UPDATE_FAIL:
    case ENG_QUOTA_BURN_APPROVED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload ? action.payload : "خطای پیش بینی نشده",
        success: "",
      }

    //#region Reset
    case RESET_ENG_QUOTA:
      return {
        ...state,
        error: null,
        success: null,
      }
    //#endregion
    //#region Reset
    case RESET_QUOTA:
      return {
        ...state,
        lstEngQuotaBurn: [],
        success: null,
      }
    //#endregion

    default:
      return state
  }
}

export default reducer

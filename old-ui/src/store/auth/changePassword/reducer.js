const {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  RESET_CHANGE_PASSWORD_FLAG,
} = require("./actionTypes")

const INIT_STATE = {
  error: null,
  success: null,
  loading: false,
}

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload,
        error: "",
        loading: false,
      }
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload ? action.payload : "خطای پیش بینی نشده",
        success: "",
      }

    case RESET_CHANGE_PASSWORD_FLAG:
      return {
        ...state,
        error: null,
        success: null,
      }

    default:
      return state
  }
}

export default reducer

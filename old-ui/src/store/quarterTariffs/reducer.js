const { GET_LIST_QUARTERTARIFF, GET_LIST_QUARTERTARIFF_SUCCESS, GET_LIST_QUARTERTARIFF_FAIL } = require("./actionTypes")


const INIT_STATE = {
    lstQuarterTariff: [],
    error: null,
    success: null,
    loading: false,
  }

  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_LIST_QUARTERTARIFF:
        return {
          ...state,
          loading: true,
        }
      case GET_LIST_QUARTERTARIFF_SUCCESS:
        return {
          ...state,
          lstQuarterTariff: action.payload,
          loading: false,
          success: "",
          error: null,
        }
  
      case GET_LIST_QUARTERTARIFF_FAIL:
        return {
          loading: false,
          error: action.payload ? action.payload : "خطای پیش بینی نشده",
          success: "",
        }
      default:
        return state
    }
  }

  export default reducer
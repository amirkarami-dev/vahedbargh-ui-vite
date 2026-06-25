import { UPSERT_CHANNEL_FAIL } from "store/channels/actionTypes"

const {
  GET_LIST_SUPPORT,
  GET_LIST_TICKET,
  UPSERT_SUPPORT,
  UPSERT_TICKET,
  GET_LIST_SUPPORT_SUCCESS,
  UPSERT_SUPPORT_SUCCESS,
  GET_LIST_TICKET_SUCCESS,
  UPSERT_TICKET_SUCCESS,
  GET_LIST_SUPPORT_FAIL,
  GET_LIST_TICKET_FAIL,
  UPSERT_TICKET_FAIL,
  RESET_SUPPORT_FLAG,
  CLOSED_SUPPORT,
  CLOSED_SUPPORT_FAIL,
  CLOSED_SUPPORT_SUCCESS,
  ADD_SUPPORT_FILE,
  ADD_SUPPORT_FILE_SUCCESS,
  ADD_SUPPORT_FILE_FAIL,
  GET_SUPPORT_FILES,
  GET_SUPPORT_FILES_SUCCESS,
  GET_SUPPORT_FILES_FAIL,
  DELETE_SUPPORT_FILE,
  DELETE_SUPPORT_FILE_SUCCESS,
  DELETE_SUPPORT_FILE_FAIL,
  UPSERT_SUPPORT_FAIL,
} = require("./actionTypes")

const INIT_STATE = {
  lstSupport: [],
  lstSupportFiles: [],
  lstTicket: [],
  error: null,
  success: null,
  loading: false,
  triggerReload: 0,
}

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LIST_SUPPORT:
    case GET_LIST_TICKET:
    case UPSERT_SUPPORT:
    case UPSERT_TICKET:
    case CLOSED_SUPPORT:
    case ADD_SUPPORT_FILE:
    case GET_SUPPORT_FILES:
    case DELETE_SUPPORT_FILE:
      return {
        ...state,
        loading: true,
      }

      case DELETE_SUPPORT_FILE_SUCCESS:
        return {
          ...state,
          error: null,
          loading: false,
          success: "فایل با موفقیت حذف شد",
          lstSupportFiles: state.lstSupportFiles.filter(file => file.id !== action.payload.id),
        }

    case GET_LIST_SUPPORT_SUCCESS:
      return {
        ...state,
        lstSupport: action.payload,
        loading: false,
        success: null,
        error: null,
      }

    case UPSERT_SUPPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload
      }
    case CLOSED_SUPPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "انجام شد",
        error: null,
        triggerReload: state.triggerReload + 1,
      }
    case GET_LIST_TICKET_SUCCESS:
      return {
        ...state,
        lstTicket: action.payload,
        loading: false,
        success: null,
        error: null,
      }

    case UPSERT_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      }

      case ADD_SUPPORT_FILE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: "فال با موفقیت بارگذاری شد",
          error: null
        }

        case GET_SUPPORT_FILES_SUCCESS:
          return {
            ...state,
            loading: false,
            lstSupportFiles: action.payload,
            success: "فایلها بارگذاری شدند",
            error: null,
          }

    case GET_LIST_SUPPORT_FAIL:
    case UPSERT_CHANNEL_FAIL:
    case GET_LIST_TICKET_FAIL:
    case UPSERT_TICKET_FAIL:
    case CLOSED_SUPPORT_FAIL:
    case ADD_SUPPORT_FILE_FAIL:
    case GET_SUPPORT_FILES_FAIL:
    case DELETE_SUPPORT_FILE_FAIL:
    case UPSERT_SUPPORT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload ? action.payload : "خطای پیش بینی نشده",
        success: "",
      }

      case RESET_SUPPORT_FLAG:
        return{
          ...state,
          success:null,
          error:null,
          triggerReload:0
        }


    default:
      return state
  }
}

export default reducer

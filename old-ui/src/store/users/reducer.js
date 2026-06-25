import { upsertArray } from "helpers/service_helper"
import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  INSERT_USER,
  INSERT_USER_FAIL,
  INSERT_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  RESET_USER_FLAG,
  GET_USER_BALANCE_FAIL,
  GET_USER_BALANCE_SUCCESS,
  GET_USER_FILES_SUCCESS,
  GET_USER_FILES_FAIL,
  ADD_USER_FILE_SUCCESS,
  ADD_USER_FILE_FAIL,
  DELETE_USER_FILE_FAIL,
  DELETE_USER_FILE,
  DELETE_USER_FILE_SUCCESS,
  GET_USER_INFO_FAIL,
  GET_USER_INFO_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  lstUSERs: [],
  lstUserFiles: [],
  userInfo:null,
  error: "",
  success: "",
  loading: false,
  userBalance: 0,
}

const USERs = (state = INIT_STATE, action) => {
  switch (action.type) {

    //#region get
    case GET_USERS_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        lstUSERs: action.payload,
      }

      case GET_USER_INFO_SUCCESS:
        return {
          ...state,
          error: "",
          loading: false,
          userInfo: action.payload,
        }

    case GET_USERS_FAIL:
    case GET_USER_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    //#endregion

    //#region Insert
    case INSERT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        lstUSERs: upsertArray(state.lstUSERs, action.payload),
        success: "Add USER Success",
      }
   
    //#endregion

    //#region UPDATE
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        success: "Update USER Success",
        loading: false,
        error: "",
        lstUSERs: state.lstUSERs.map(USER =>
          USER.id === action.payload.id ? { ...USER, ...action.payload } : USER
        ),
      }

    //#endregion

    //#region  DELETE
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        success: "Delete USER Success",
        lstUSERs: state.lstUSERs.filter(USER => USER.id !== action.payload.id),
      }

      case DELETE_USER_FILE_SUCCESS:
        return {
          ...state,
          error: null,
          loading: false,
          success: "فایل با موفقیت حذف شد",
          lstUserFiles: state.lstUserFiles.filter(files => files.id !== action.payload.id),
        }
    //#endregion

    //#region get
    case GET_USER_BALANCE_SUCCESS:
      
      return {
        ...state,
        error: "",
        loading: false,
        userBalance: action.payload,
      }

      case ADD_USER_FILE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: "فایل با موفقیت بارگذاری شد",
          error: null,
          addedPlanFile:true
        }

    case GET_USER_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        lstUserFiles: action.payload,
        success: "فایلها بارگذاری شدند",
        error: null,
      }

    case INSERT_USER_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
    case GET_USER_BALANCE_FAIL:
    case GET_USER_FILES_FAIL:
    case ADD_USER_FILE_FAIL:
    case DELETE_USER_FILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload ? action.payload : "خطای پیش بینی نشده",
        success: "",
      }

    //#endregion

        //#region Reset
        case RESET_USER_FLAG:
            return {
              ...state,
              success: null,
              error: null,
            }
          //#endregion
    default:
      return state
  }
}

export default USERs

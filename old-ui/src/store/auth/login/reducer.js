import jwt_decode from "jwt-decode"
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  LOGIN_USER_BY_CODE,
  RESET_ERROR_LOGIN,
  LOGIN_MFA_SUCCESS,
} from "./actionTypes"
const obj = JSON.parse(localStorage.getItem("authUser"))
const userState = obj?.accessToken ? jwt_decode(obj.accessToken) : null
const initialState = {
  error: "",
  loading: false,
  userState: userState && userState,
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_USER_BY_CODE:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        userState: jwt_decode(action.payload.accessToken),
        loading: false,
      }
      break
      case LOGIN_MFA_SUCCESS:
        state = {
          ...state,
          loading: false,
        }
        break
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    default:
      state = { ...state }
      break
    //#region Reset
    case RESET_ERROR_LOGIN:
      return {
        ...state,
        error: null,
      }
    //#endregion
  }
  return state
}

export default login

import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
} from "./actionTypes"

const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  registerSubmited:null,
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        loading: true,
        registrationError: null,
      }
      break
    case REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: true,
        user: action.payload,
        registrationError: null,
        registerSubmited:true
      }
      break
    case REGISTER_USER_FAILED:
      state = {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
        registerSubmited:false,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default account

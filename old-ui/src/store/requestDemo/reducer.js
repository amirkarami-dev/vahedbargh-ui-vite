import {
  REQUEST_DEMO,
  REQUEST_DEMO_SUCCESS,
  REQUEST_DEMO_FAIL,
  RESET_REQUEST_DEMO,
} from "./actionTypes"

const initialState = {
  loading: false,
  error: null,
  message: null,
}

export default function RequestDemo(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DEMO:
      return { ...state, loading: true, error: null, message: null }
    case REQUEST_DEMO_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null }
    case REQUEST_DEMO_FAIL:
      return { ...state, loading: false, error: action.payload }
    case RESET_REQUEST_DEMO:
      return { ...initialState }
    default:
      return state
  }
}

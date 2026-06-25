import {
  REQUEST_DEMO,
  REQUEST_DEMO_SUCCESS,
  REQUEST_DEMO_FAIL,
  RESET_REQUEST_DEMO,
} from "./actionTypes"

export const requestDemo = data => ({
  type: REQUEST_DEMO,
  payload: data,
})

export const requestDemoSuccess = message => ({
  type: REQUEST_DEMO_SUCCESS,
  payload: message,
})

export const requestDemoFail = error => ({
  type: REQUEST_DEMO_FAIL,
  payload: error,
})

export const resetRequestDemo = () => ({
  type: RESET_REQUEST_DEMO,
})

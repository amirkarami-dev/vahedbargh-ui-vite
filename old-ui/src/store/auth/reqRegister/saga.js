import { postSmsRegister, postSmsToSubmit } from "helpers/backend_helper"
import { takeEvery, fork, put, all, call } from "redux-saga/effects"
import {
  reqRegisterUserFailed,
  reqRegisterUserSuccessful,
  submitSmsSuccessful,
  submitSmsFailed,
} from "./actions"
import { REQREGISTER_USER, SUBMIT_SMS } from "./actionTypes"

//is user mobile success send to server
function* reqRegisterUser({ payload: { mobile, history } }) {
  try {
 

    const response = yield call(postSmsRegister,"https://api.gsotp.com/otp/send",mobile)
    console.log("response11", response)
    if (response.status === "error") {
      
      if (response.error.code === 10101) {
        yield put(reqRegisterUserFailed("mobile number is wrong"))
      } else {
        yield put(reqRegisterUserFailed(response.error.message))
      }
    } 
    else if (response.referenceID) {
      
      yield put(reqRegisterUserSuccessful({...mobile,referenceID: response.referenceID}))
   
    } 
    else {
      yield put(reqRegisterUserFailed("problem message center! pleas try again"))
    }

      
    
    
  } catch (error) {
    // yield put(reqRegisterUserSuccessful({...mobile,referenceID:"1234456"}))
    yield put(reqRegisterUserFailed(error))
  }
}
//send code to submit
function* submitSms({ payload: { code, history,mobileNumber } }) {
  try {
    const response = yield call(postSmsToSubmit,"https://api.gsotp.com/otp/verify",code,mobileNumber)
    if (response.status === "error") {
      console.log("response.error.message", response)
      yield put(submitSmsFailed(response.error.message))
    } else {
      yield put(submitSmsSuccessful(response))
      history.push("/register")
    }
  } catch (error) {
    console.log("error", error)
    yield put(submitSmsFailed(error))
    // yield put(reqRegisterUserFailed(error))
  }
}

export function* whatchReqRegisterUser() {
  yield takeEvery(REQREGISTER_USER, reqRegisterUser)
  yield takeEvery(SUBMIT_SMS, submitSms)
}

function* ReqRegisterSaga() {
  yield all([fork(whatchReqRegisterUser)])
}

export default ReqRegisterSaga

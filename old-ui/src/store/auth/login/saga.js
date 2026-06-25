import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGIN_USER_BY_CODE, LOGOUT_USER } from "./actionTypes"
import { apiError, loginMfaSuccess, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  delJwtSession,
  postFakeLogin,
  postJwtLogin,
  postJwtLoginByCode,
  postSocialLogin,
} from "../../../helpers/backend_helper"

const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history } }) {
  try {
    localStorage.removeItem("authUser")
    const response = yield call(postJwtLogin, {
      oneMinute: false,
      userName: user.userName,
      password: user.password,
      deviceToken: "",
      platformType: 2,
    })

    const mapResponse = {
      accessToken: response.token,
      refreshToken: response.refreshToken,
    }

    if (response.urlRedirect === "/submit-sms") {
      history.push(response.urlRedirect + '?username=' + user.userName)
      yield put(loginMfaSuccess())
    } else {
      localStorage.setItem("authUser", JSON.stringify(mapResponse))
      yield put(loginSuccess(mapResponse))
      history.push(response.urlRedirect)
    }

    //history.push("/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}
function* loginUserByCode({ payload: { code, history } }) {
  try {
    const response = yield call(postJwtLoginByCode, {
      code: code.code.toString(),
      userName: code.userName
    })

    const mapResponse = {
      accessToken: response.token,
      refreshToken: response.refreshToken,
    }

    localStorage.setItem("authUser", JSON.stringify(mapResponse))
    yield put(loginSuccess(mapResponse))
    history.push(response.urlRedirect)

    //history.push("/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}
function* logoutUser({ payload: { history } }) {
  try {
    console.log("logoutUserSuccess", "logoutUserSuccess")
    const response = yield call(delJwtSession, "")
    console.log("logoutUserSuccess", response)
    yield put(logoutUserSuccess(response))
    localStorage.removeItem("authUser")
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGIN_USER_BY_CODE, loginUserByCode)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga

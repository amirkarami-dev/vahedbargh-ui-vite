import { changePasswordApi } from "helpers/backend_helper"
import { call, put, takeEvery } from "redux-saga/effects"
import { changePasswordFail, changePasswordSuccess } from "./actions"
import { CHANGE_PASSWORD } from "./actionTypes"


function* onChangePassword({payload:data}){
    try {
        const Response = yield call(changePasswordApi,data)
        console.log("🚀 ~ file: saga.js ~ line 8 ~ function*onChangePassword ~ Response", Response)
        yield put(changePasswordSuccess('کلمه عبور با موفقیت تغییر کرد'))
        
    } catch (error) {

    console.log("🚀 ~ file: saga.js ~ line 13 ~ function*onChangePassword ~ error", error)
        yield put(changePasswordFail(error))
    }
}

function* saga(){
    yield takeEvery(CHANGE_PASSWORD,onChangePassword)
}

export default saga;
import {takeEvery,put,call} from 'redux-saga/effects';

import {
    GET_USERS,
    INSERT_USER,
    UPDATE_USER,
    DELETE_USER,
    GET_USER_BALANCE,
    GET_USER_FILES,
    ADD_USER_FILE,
    DELETE_USER_FILE,
    GET_USER_INFO
} from './actionTypes';

import {
    getUSERsSuccess,getUSERsFail,
    insertUSERSuccess,insertUSERFail, 
    deleteUSERSuccess, deleteUSERFail,
    updateUSERSuccess, updateUSERFail, getUserBalanceSuccess, getUserFilesSuccess, getUserFilesFail, addUserFileSuccess, addUserFileFail, deleteUserFileSuccess, deleteUserFileFail, getUserInfoSuccess

} from './actions'
import {  deleteUSER, deleteUserFile, getUserBalance, getUserFiles, getUserInfoApi, getUSERs, insertUSER, postUserFile, updateUSER } from 'helpers/backend_helper';

function* fetchUSER(){
    try {
        const response = yield call(getUSERs)
        yield put(getUSERsSuccess(response))
    } catch (error) {
        yield put(getUSERsFail(error))
    }
}

function* onInsertUSER({payload:USER}){
    console.log("USER",USER);
    try {
        const response = yield call(insertUSER,USER)
        USER = {...USER,id:response}
        yield put(insertUSERSuccess(USER))
    } catch (error) {
        yield put(insertUSERFail(error))
    }
}

function* onUpdateUSER({payload:USER}){
    try {
       
         const response = yield call(updateUSER,USER)
        // console.log("onUpdateUSER",USER);
         yield put(updateUSERSuccess(USER))
    } catch (error) {
        yield put(updateUSERFail(error))
    }
}

function* onDeleteUSER({payload:id}){
    try {
        const response = yield call(deleteUSER,{id})
   
        yield put(deleteUSERSuccess({id}))
    } catch (error) {
        yield put(deleteUSERFail(error))
    }
}

function* onGetUserBalance(){
    try {
        const response = yield call(getUserBalance)
        yield put(getUserBalanceSuccess(response))
    } catch (error) {
        console.log("error",error);
    }
}

function* onGetUserInfo(){
    try {
        const response = yield call(getUserInfoApi)
        yield put(getUserInfoSuccess(response))
    } catch (error) {
        console.log("error",error);
    }
}

function* onAddUserFiles({ payload: attachData }) {
    try {
        const userId = attachData.get('userId')
       const response = yield call(postUserFile, attachData)
      yield put(addUserFileSuccess(response))
      const responseUserFiles = yield call(getUserFiles,userId || '')
      yield put(getUserFilesSuccess(responseUserFiles))
    } catch (error) {
        console.log('error',error);
      yield put(addUserFileFail(error))
    }
  }

  function* onDeleteUserFiles({ payload: id }) {
    try {
      yield call(deleteUserFile, {id})
      yield put(deleteUserFileSuccess({id}))
    } catch (error) {
        console.log('error',error);
      yield put(deleteUserFileFail(error))
    }
  }

function* onGetUserFiles({ payload: userId }){
    try {
        
        const response = yield call(getUserFiles,userId || '')
        yield put(getUserFilesSuccess(response))

    } catch (error) {
      yield put(getUserFilesFail(error))
    }
  }

function* USERsSaga() {
    yield takeEvery(GET_USERS,fetchUSER);
    yield takeEvery(UPDATE_USER,onUpdateUSER)
    yield takeEvery(DELETE_USER,onDeleteUSER)
    yield takeEvery(INSERT_USER,onInsertUSER)
    yield takeEvery(GET_USER_BALANCE,onGetUserBalance)
    yield takeEvery(GET_USER_INFO,onGetUserInfo)
    yield takeEvery(GET_USER_FILES,onGetUserFiles)
    yield takeEvery(ADD_USER_FILE,onAddUserFiles)
    yield takeEvery(DELETE_USER_FILE,onDeleteUserFiles)

}

export default USERsSaga;
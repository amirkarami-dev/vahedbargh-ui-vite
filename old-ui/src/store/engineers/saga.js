import { getListEngineerApi, postEngPaymentCustomApi, upsertEngHistoryApi, upsertEngineerApi } from 'helpers/backend_helper';
import {takeEvery,put,call} from 'redux-saga/effects';
import { GET_LIST_ENGINEER, POST_ENGINEER_PAYMENT_CUSTOM, UPSERT_ENGINEER, UPSERT_ENG_HISTORY } from './actionTypes';
import { serializeQuery } from 'helpers/service_helper';


const { getListEngineerSuccess,
     getListEngineerFail, 
     postEngineerPaymentCustomSuccess, 
     postEngineerPaymentCustomFail, 
     upsertEngineerSuccess, 
     upsertEngineerFail, 
     upsertEngHistorySuccess, 
     upsertEngHistoryFail, 
     getListEngineer
    } = require("./actions")

function* onGetListEngineer({payload:filter}){
    try
    {
       const result = yield call(getListEngineerApi, filter || '')
       
        yield put (getListEngineerSuccess(result))
       
    } catch (error) {
        yield put(getListEngineerFail(error))
    }
}

function* onPostEngineerPaymentCustom({payload:events}){
    try {
        yield call(postEngPaymentCustomApi,events)
        yield put(postEngineerPaymentCustomSuccess("پرداخت انجام شد"))
    } catch (error) {
        yield put(postEngineerPaymentCustomFail(error))
    }
}

function*  onUpsertEngineer({payload:data}){
    try {
        yield call( upsertEngineerApi,data)
        yield put(upsertEngineerSuccess("کارشناس آپدیت شد"))

        // const result = yield call(getListEngineerApi)
        yield put (getListEngineer(''))
    } catch (error) {
        yield put(upsertEngineerFail(error))
    }
}

function* onUpsertEngHistory({payload:data}){
    try {
        yield call(upsertEngHistoryApi,data)
        yield put(upsertEngHistorySuccess({engId:data.engId,engHistory:data}))
        const result = yield call(getListEngineerApi)
        yield put (getListEngineerSuccess(result))
    } catch (error) {
        yield put(upsertEngHistoryFail(error))
    }
}



function* saga(){
    yield takeEvery(GET_LIST_ENGINEER,onGetListEngineer)
    yield takeEvery(POST_ENGINEER_PAYMENT_CUSTOM,onPostEngineerPaymentCustom)
    yield takeEvery(UPSERT_ENGINEER,onUpsertEngineer)
    yield takeEvery(UPSERT_ENG_HISTORY,onUpsertEngHistory)
}

export default saga;
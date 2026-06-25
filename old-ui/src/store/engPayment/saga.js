import {takeEvery,put,call} from 'redux-saga/effects';
import { ENG_PAYMENT_APPROVED, GET_ENG_PAYMENT_LIST, GET_ENG_PAYMENT_TASK, UPDATE_ENG_PAYMENT_LIST, UPSERT_ENG_PAYMENT_LIST } from './actionTypes';
import { engPaymentApprovedApi, getEngPaymentListApi, getEngPaymentTaskApi, updateEngPaymentListApi, upsertEngPaymentListApi } from 'helpers/backend_helper';
import { engPaymentApprovedSuccess, getEngPaymentList, getEngPaymentListFail, getEngPaymentListSuccess, getEngPaymentTask, getEngPaymentTaskFail, getEngPaymentTaskSuccess, updateEngPaymentListFail, updateEngPaymentListSuccess, upsertEngPaymentListFail, upsertEngPaymentListSuccess } from './actions';
import { serializeQuery } from 'helpers/service_helper';



function*  onUpsertEngPaymentList({payload:data}){
    const {updatedData} = data

    try {
        const engPaymentTaskId = yield call( upsertEngPaymentListApi,updatedData)
        const result = {engPaymentTaskId}

       const params = serializeQuery(result)
        yield put(upsertEngPaymentListSuccess("لیست پرداخت ایجاد شد"))
        yield put (getEngPaymentTask())
        yield put (getEngPaymentList(params))
    } catch (error) {
        yield put(upsertEngPaymentListFail(error))
    }
}

function* onGetEngPaymentList({ payload: values }){
    try
    {
       const result = yield call(getEngPaymentListApi, values)
       yield put (getEngPaymentListSuccess(result))
    } catch (error) {
        yield put(getEngPaymentListFail(error))
    }
}

function* onUpdateEngPaymentList({payload:data}){
    try {
       const result = yield call(updateEngPaymentListApi,data)
        yield put(updateEngPaymentListSuccess(result))
    } catch (error) {
        yield put(updateEngPaymentListFail(error))
    }
}

function* onGetEngPaymentTasks(){
    try
    {
       const result = yield call(getEngPaymentTaskApi)
       yield put (getEngPaymentTaskSuccess(result))
    } catch (error) {
        yield put(getEngPaymentTaskFail(error))
    }
}

function*  onEngPaymentApproved({payload:data}){
    try {
        const engPaymentTaskId =  yield call( engPaymentApprovedApi,data)
        const result = {engPaymentTaskId}

       const params = serializeQuery(result)
        yield put(engPaymentApprovedSuccess("لیست پرداخت بانکی تایید شد"))
        yield put (getEngPaymentTask())
        yield put (getEngPaymentList(params))
    } catch (error) {
        yield put(upsertEngPaymentListFail(error))
    }
}

function* saga(){
    yield takeEvery(UPSERT_ENG_PAYMENT_LIST,onUpsertEngPaymentList)
    yield takeEvery(UPDATE_ENG_PAYMENT_LIST,onUpdateEngPaymentList)
    yield takeEvery(GET_ENG_PAYMENT_LIST,onGetEngPaymentList)
    yield takeEvery(GET_ENG_PAYMENT_TASK,onGetEngPaymentTasks)
    yield takeEvery(ENG_PAYMENT_APPROVED,onEngPaymentApproved)
}

export default saga;
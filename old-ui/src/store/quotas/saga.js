import { engQuotaBurnApprovedApi, engQuotaBurnUpdateApi, getEngQuotaBurnListApi } from "helpers/backend_helper"
import { ENG_QUOTA_BURN_APPROVED, ENG_QUOTA_BURN_UPDATE, GET_ENG_QUOTA_BURN_LIST } from "./actionTypes"
import { takeEvery, put, call } from "redux-saga/effects"
import { engQuotaBurnApprovedFail, engQuotaBurnApprovedSuccess, engQuotaBurnUpdateFail, engQuotaBurnUpdateSuccess, getEngQuotaBurnList, getEngQuotaBurnListFail, getEngQuotaBurnListSuccess, resetEngQuota } from "./actions"
import { serializeQuery } from "helpers/service_helper"


function* onGetEngQuotaBurnList({ payload: values }){
    try
    {
       const result = yield call(getEngQuotaBurnListApi, values)
       yield put (getEngQuotaBurnListSuccess(result))
    } catch (error) {
        yield put(getEngQuotaBurnListFail(error))
    }
}

function* onEngQuotaBurnApproved({ payload: values }){
    try
    {
       const id = yield call(engQuotaBurnApprovedApi, values)
       yield put (engQuotaBurnApprovedSuccess(id))
    } catch (error) {
        yield put(engQuotaBurnApprovedFail(error))
    }
}

function* onEngQuotaBurnUpdate({ payload: values }){
    try
    {
       yield call(engQuotaBurnUpdateApi, values)
       if(values.id){
        yield put (engQuotaBurnUpdateSuccess({...values}))
       }
       else{
        yield put(getEngQuotaBurnList(serializeQuery({qtId:values.qtId,engId:values.engId})))
       }
       yield put(resetEngQuota())
    } catch (error) {
        yield put(engQuotaBurnUpdateFail(error))
    }
}



function* saga(){

    yield takeEvery(GET_ENG_QUOTA_BURN_LIST,onGetEngQuotaBurnList)
    yield takeEvery(ENG_QUOTA_BURN_APPROVED,onEngQuotaBurnApproved)
    yield takeEvery(ENG_QUOTA_BURN_UPDATE,onEngQuotaBurnUpdate)
}

export default saga;
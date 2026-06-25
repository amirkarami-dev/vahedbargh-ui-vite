import { generateTreeChildren } from "helpers/utilities";
import { deleteProjectProcessFail, deleteProjectProcessSuccess, eppAcceptedFail, eppAcceptedSuccess, eppApprovedFail, eppApprovedSuccess, eppUpdateIsMainFail, eppUpdateIsMainSuccess, getEppByGpIdFail, getEppByGpIdSuccess, getListProjectProcessEngFail, getListProjectProcessEngSuccess, projectProcessFail, projectProcessSuccess, upsertCheckListFail, upsertCheckListSuccess, upsertCommentFail, upsertCommentSuccess, upsertErtFormFail, upsertErtFormSuccess } from "./actions";
import { DEL_PROJECT_PROCESS, EPP_ACCEPTED, EPP_APPROVED, EPP_UPDATE_IS_MAIN, GET_EPP_BYGPID, GET_LIST_PROJECT_PROCESS_ENG, GET_LIST_PROJECT_PROCESS_REPORT, PROJECT_PROCESS, UPSERT_CHECKLIST, UPSERT_COMMENT, UPSERT_ERTFORM } from "./actionTypes";

import { deleteProjectProcessApi, eppAcceptedApi, eppApprovedApi, eppUpdateIsMainApi, getEppById, getListProjectProcessEngApi, getListProjectProcessReportApi, projectProcessApi, upsertCheckListApi, upsertCommentApi, upsertErtFormApi } from "helpers/backend_helper";

import { takeEvery, put, call } from "redux-saga/effects"


function* onGetEppByEpId({ payload: epId }){
    try {
        const response = yield call(getEppById, epId)
        yield put(getEppByGpIdSuccess(response))
    } catch (error) {
        yield put(getEppByGpIdFail(error))
    }
}

function* onProjectProcess({ payload: values }){
    try {
        const response = yield call(projectProcessApi, values)
        yield put(projectProcessSuccess())
    } catch (error) {
        yield put(projectProcessFail(error))
    }
}

function* onGetListProjectProcessEng({ payload: values }) {
    try {
      const response = yield call(getListProjectProcessEngApi,values)
      response.data = response.data?.map(res=>{
        return {...res, checkListForms: generateTreeChildren(res.checkListForms)}
      })
      yield put(getListProjectProcessEngSuccess(response))
    } catch (error) {
      yield put(getListProjectProcessEngFail(error))
    }
}

function* onGetListProjectProcessReport({ payload: values }) {
    try {
      const response = yield call(getListProjectProcessReportApi,values)
      
      yield put(getListProjectProcessEngSuccess(response))
    } catch (error) {
      yield put(getListProjectProcessEngFail(error))
    }
}

function* onDeleteProjectProcess({ payload: eppId }){
    try {
        const response = yield call(deleteProjectProcessApi, eppId)
        yield put(deleteProjectProcessSuccess(response))
    } catch (error) {
        yield put(deleteProjectProcessFail(error))
    }
}

function* onUpsertComment({ payload: comment }) {
    try {
      const response = yield call(upsertCommentApi, comment)
      const responseUpsert = {...comment,id:response}
      yield put(upsertCommentSuccess(responseUpsert))
    } catch (error) {
      yield put(upsertCommentFail(error))
    }
  }

  
function* onUpsertCheckList({ payload: checkList }) {
  try {
     yield call(upsertCheckListApi, checkList)

    yield put(upsertCheckListSuccess())
  } catch (error) {
    yield put(upsertCheckListFail(error))
  }
}

function* onUpsertErtForm({ payload: checkList }) {
  try {
     yield call(upsertErtFormApi, checkList)

    yield put(upsertErtFormSuccess())
  } catch (error) {
    yield put(upsertErtFormFail(error))
  }
}


function* onEppApproved({ payload: data }) {
  try {
     yield call(eppApprovedApi, data)

    yield put(eppApprovedSuccess())
  } catch (error) {
    yield put(eppApprovedFail(error))
  }
}

function* onEppAccepted({ payload: data }) {
  try {
     yield call(eppAcceptedApi, data)

    yield put(eppAcceptedSuccess())
  } catch (error) {
    yield put(eppAcceptedFail(error))
  }
}

function* onEppUpdateIsMain({ payload: data }) {
  try {
     yield call(eppUpdateIsMainApi, data)

    yield put(eppUpdateIsMainSuccess())
  } catch (error) {
    yield put(eppUpdateIsMainFail(error))
  }
}


function* electProjectProcessesSaga(){
    yield takeEvery(GET_EPP_BYGPID,onGetEppByEpId)
    yield takeEvery(PROJECT_PROCESS,onProjectProcess)
    yield takeEvery(GET_LIST_PROJECT_PROCESS_ENG,onGetListProjectProcessEng)
    yield takeEvery(GET_LIST_PROJECT_PROCESS_REPORT,onGetListProjectProcessReport)
    yield takeEvery(DEL_PROJECT_PROCESS,onDeleteProjectProcess)
    yield takeEvery(UPSERT_COMMENT,onUpsertComment)
    yield takeEvery(UPSERT_CHECKLIST,onUpsertCheckList)
    yield takeEvery(UPSERT_ERTFORM,onUpsertErtForm)
    yield takeEvery(EPP_APPROVED,onEppApproved)
    yield takeEvery(EPP_ACCEPTED,onEppAccepted)
    yield takeEvery(EPP_UPDATE_IS_MAIN,onEppUpdateIsMain)


}

export default electProjectProcessesSaga
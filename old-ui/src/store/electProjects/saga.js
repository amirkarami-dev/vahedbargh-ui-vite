import { takeEvery, put, call } from "redux-saga/effects"
import {
  ADD_FILE_ELECTPROJECT,
  ADD_FILE_ELECTPROJECT_SINGLE,
  ADD_PANEL_MAKER,
  STOP_ELECTPROJECT,
  DELETE_ELECTPROJECT,
  GET_ELECTPROJECTS,
  GET_ELECTPROJECTS_ENG,
  GET_ELECTPROJECTS_FILTER,
  GET_ELECTPROJECTS_FULL_FILTER,
  GET_ELECTPROJECT_FILES,
  GET_ELECTPROJECT_FREE,
  GET_ELECTPROJECT_REPORT,
  GET_PANEL_MAKER,
  RESET_PACKAGE,
  RESOLVED_DEFECT,
  SEND_ELECTPROJECT_TOELECT,
  SUBMIT_ELECTPROJECT_ADMIN,
  SUBMIT_PACKAGE,
  UPDATE_ELECTPROJECT,
  UPDATE_ELECTPROJECT_DETAILS,
  UPDATE_ELECTPROJECT_DETAILS_NEW,
  UPDATE_ELECTPROJECT_ENG,
  UPDATE_ELECTPROJECT_ENG_NEW,
  UPDATE_PROCESS_DEFECT_STAGE,
  UPDATE_PROCESS_DEFECT_STAGE_NEW,
  UPDATE_PROCESS_EXPERT_STAGE,
  UPDATE_PROCESS_EXPERT_STAGE_NEW,
  UPDATE_PROCESS_MAP_STAGE,
  UPDATE_PROCESS_MAP_STAGE_NEW,
  UPSERT_ElECTROJECT,
  SUBMIT_PANEL,
  AMOUNT_SMS,
  UPDATE_ELECTPROJECT_STATUS,
  UPDATE_ELECTPROJECT_DEFECT_DES,
  UPSERT_CHECKLIST_EDC,
  UPDATE_BY_EDC,
  GET_PROJECT_INFO,
} from "./actionTypes"
import {
  addFileElectProjectFail,
  addFileElectProjectSuccess,
  addPanelMakerFail,
  addPanelMakerSuccess,
  stopElectProjectFail,
  stopElectProjectSuccess,
  deleteElectProjectFail,
  deleteElectProjectSuccess,
  getElectProjectReportFail,
  getElectProjectReportSuccess,
  getElectProjectsEngFail,
  getElectProjectsEngSuccess,
  getElectProjectsFail,
  getElectProjectsFilesFail,
  getElectProjectsFilesSuccess,
  getElectProjectsFilterFail,
  getElectProjectsFilterSuccess,
  getElectProjectsFreeFail,
  getElectProjectsFreeSuccess,
  getElectProjectsFullFilterFail,
  getElectProjectsFullFilterSuccess,
  getElectProjectsSuccess,
  getPanelMakerFail,
  getPanelMakerSuccess,
  resetElectProjectFlag,
  resetPackageFail,
  resetPackageSuccess,
  resolvedDefectFail,
  resolvedDefectSuccess,
  sendElectProjectToElectFail,
  sendElectProjectToElectSuccess,
  submitElectProjectAdminFail,
  submitElectProjectAdminSuccess,
  submitPackageFail,
  submitPackageSuccess,
  updateElectProjectDetailsFail,
  updateElectProjectDetailsNewFail,
  updateElectProjectDetailsNewSuccess,
  updateElectProjectDetailsSuccess,
  updateElectProjectFail,
  updateProcessStageFail,
  updateProcessStageNewFail,
  updateProcessStageNewSuccess,
  updateProcessStageSuccess,
  upsertElectProjectFail,
  upsertElectProjectSuccess,
  submitPanelSuccess,
  submitPanelFail,
  updateElectProjectSuccess,
  amountSmsSuccess,
  amountSmsFail,
  getElectProjectsFullFilterChildrenSuccess,
  updateElectProjectStatusSuccess,
  updateElectProjectStatusFail,
  updateDefectDesSuccess,
  updateDefectDesFail,
  upsertCheckListEdcSuccess,
  upsertCheckListEdcFail,
  updateByEdcSuccess,
  updateByEdcFail,
  getElectProjectInfoSuccess,
  getElectProjectInfoFail,
} from "./actions"
import {
  addPanelMaker,
  stopElectProjectApi,
  deleteElectProject,
  getElectProjectFile,
  getElectProjectFreeApi,
  getElectProjectReport,
  getElectProjects,
  getElectProjectsEng,
  getElectProjectsFilterApi,
  getElectProjectsFullFilterApi,
  getPanelMaker,
  getUserBalance,
  postFileElectProjectApi,
  resetPackageApi,
  resolvedDefectApi,
  sendElectProjectToElect,
  submitElectProjectByAdmin,
  submitPackage,
  updateElectProject,
  updateElectProjectDetails,
  updateElectProjectEngApi,
  updateProcessDefectStage,
  updateProcessDefectStageNew,
  updateProcessExpertStage,
  updateProcessExpertStageNew,
  updateProcessMapStage,
  updateProcessMapStageNew,
  upsertElectProject,
  submitPanel,
  amountSmsApi,
  updateElectProjectStatusApi,
  updateDefectDesApi,
  upsertCheckListEdcApi,
  updateByEdcApi,
  getProjectInfoApi,
} from "helpers/backend_helper"
import { getUserBalanceSuccess } from "store/actions"
import { generateTreeChildren, generateTreeChildrenByGroupBy } from "helpers/utilities"

function* onGetElectProjects({ payload: values }) {
  try {
    const response = yield call(getElectProjects, values)

    yield put(getElectProjectsSuccess(response))
  } catch (error) {
    yield put(getElectProjectsFail(error))
  }
}

function* onGetElectProjectsFilter({ payload: values }) {
  try {
    const response = yield call(getElectProjectsFilterApi, values)

    yield put(getElectProjectsFilterSuccess(response))
  } catch (error) {
    yield put(getElectProjectsFilterFail(error))
  }
}

function* onGetElectProjectsFullFilter({ payload: values }) {
  try {
    const response = yield call(getElectProjectsFullFilterApi, values)
    response.data = response.data?.map(res=>{
      return {...res, checkListEdcs: generateTreeChildrenByGroupBy(res.checkListEdcs,'checkListEdcEnum', 'checkListEdcName')}
    })
    if(values.parentId){
      yield put(getElectProjectsFullFilterChildrenSuccess({children:response, parentId:values.parentId}))
    }else{
      yield put(getElectProjectsFullFilterSuccess(response))
    }
  } catch (error) {
    yield put(getElectProjectsFullFilterFail(error))
  }
}

function* onGetElectProjectReport({ payload: values }) {
  try {
    const response = yield call(getElectProjectReport, values)

    yield put(getElectProjectReportSuccess(response))
  } catch (error) {
    yield put(getElectProjectReportFail(error))
  }
}
function* onGetElectProjectsEng({ payload: queryString }) {
  try {
    const response = yield call(getElectProjectsEng, queryString)
    yield put(getElectProjectsEngSuccess(response))
  } catch (error) {
    yield put(getElectProjectsEngFail(error))
  }
}

function* onUpsertElectProject({ payload: electProject }) {
  try {
    const response = yield call(upsertElectProject, electProject)
    // electProject ={...electProject,id:response,fileNumber:0}
    yield put(upsertElectProjectSuccess(response))
    const balance = yield call(getUserBalance)
    yield put(getUserBalanceSuccess(balance))
  } catch (error) {
    yield put(upsertElectProjectFail(error))
  }
}



function* onAddFileElectProject({ payload: attachData }) {
  try {
    const response = yield call(postFileElectProjectApi, attachData)
    yield put(addFileElectProjectSuccess(response))
  } catch (error) {
    yield put(addFileElectProjectFail(error))
  }
}

function* onAddFileEngProjectSingle({ payload: attachData }) {
  try {
    const electProjectId = JSON.parse(attachData.get("electProjectId"))[0]
    const response = yield call(postFileElectProjectApi, attachData)
    yield put(addFileElectProjectSuccess(response))
    const responseFiles = yield call(getElectProjectFile, electProjectId)
    yield put(getElectProjectsFilesSuccess(responseFiles))
  } catch (error) {
    yield put(addFileElectProjectFail(error))
  }
}

function* onUpdateProcessExpertStage({ payload: { process, queryString } }) {
  try {
    const response = yield call(updateProcessExpertStage, process)
    yield put(updateProcessStageSuccess(response))
    const electProjects = yield call(getElectProjectsEng, queryString)
    yield put(getElectProjectsEngSuccess(electProjects))
  } catch (error) {
    console.log("error", error)
    yield put(updateProcessStageFail(error))
  }
}
function* onUpdateProcessExpertStageNew({ payload: { process, queryString } }) {
  try {
    const response = yield call(updateProcessExpertStageNew, process)
    yield put(updateProcessStageNewSuccess(response))
    // const electProjects = yield call(getElectProjectsFullFilterApi, queryString)
    // yield put(getElectProjectsFullFilterSuccess(electProjects))
  } catch (error) {
    console.log("error", error)
    yield put(updateProcessStageNewFail(error))
  }
}

function* onUpdateProcessMapStage({ payload: { process, queryString } }) {
  try {
    const response = yield call(updateProcessMapStage, process)
    yield put(updateProcessStageSuccess(response))
    const electProjects = yield call(getElectProjectsEng, queryString)
    yield put(getElectProjectsEngSuccess(electProjects))
  } catch (error) {
    console.log("error", error)
    yield put(updateProcessStageFail(error))
  }
}

function* onUpdateProcessMapStageNew({ payload: { process, queryString } }) {
  try {
    const response = yield call(updateProcessMapStageNew, process)
    yield put(updateProcessStageNewSuccess(response))
  } catch (error) {
    console.log("error", error)
    yield put(updateProcessStageNewFail(error))
  }
}

function* onUpdateProcessDefectStage({ payload: { process, queryString } }) {
  try {
    const response = yield call(updateProcessDefectStage, process)
    yield put(updateProcessStageSuccess(response))
    const electProjects = yield call(getElectProjectsEng, queryString)
    yield put(getElectProjectsEngSuccess(electProjects))
  } catch (error) {
    console.log("error", error)
    yield put(updateProcessStageFail(error))
  }
}

function* onUpdateProcessDefectStageNew({ payload: { process, queryString } }) {
  try {
    const response = yield call(updateProcessDefectStageNew, process)
    yield put(updateProcessStageNewSuccess(response))
  } catch (error) {
    console.log("error", error)
    yield put(updateProcessStageNewFail(error))
  }
}

function* onGetElectProjectFiles({ payload: electProjectId }) {
  try {
    if (electProjectId) {
      const response = yield call(getElectProjectFile, electProjectId)

      yield put(getElectProjectsFilesSuccess(response))
    }
  } catch (error) {
    yield put(getElectProjectsFilesFail(error))
  }
}

function* onGetElectProjectFree({ payload: fileNumber }) {
  try {
    if (fileNumber) {
      const response = yield call(getElectProjectFreeApi, fileNumber)
      yield put(getElectProjectsFreeSuccess(response))
    }
  } catch (error) {
    yield put(getElectProjectsFreeFail(error))
  }
}

function* onGetPanelMaker({ payload: company }) {
  try {
    const response = yield call(getPanelMaker)
    // const result = response.filter(x => x.companyName === company)
    yield put(getPanelMakerSuccess(response))
  } catch (error) {
    yield put(getPanelMakerFail(error))
  }
}

function* onSendElectProjectToElect({ payload: fileNumber }) {
  try {
    const response = yield call(sendElectProjectToElect, fileNumber)
    yield put(sendElectProjectToElectSuccess(response))
  } catch (error) {
    yield put(sendElectProjectToElectFail(error))
  }
}

function* onSubmitElectProjectAdmin({ payload: electProjectId }) {
  try {
    const response = yield call(submitElectProjectByAdmin, electProjectId)
    yield put(submitElectProjectAdminSuccess(response))
  } catch (error) {
    yield put(submitElectProjectAdminFail(error))
  }
}

function* onAddPanelMaker({ payload: data }) {
  try {
    const response = yield call(addPanelMaker, data)
    yield put(addPanelMakerSuccess(response))
  } catch (error) {
    yield put(addPanelMakerFail(error))
  }
}
function* onSubmitPackage({ payload: dataSubmit }) {
  try {
    const response = yield call(submitPackage, dataSubmit)
    yield put(submitPackageSuccess(response))
  } catch (error) {
    yield put(submitPackageFail(error))
  }
}
function* onResetPackage({ payload: GpId }) {
  try {
    const response = yield call(resetPackageApi, GpId)
    yield put(resetPackageSuccess(response))
  } catch (error) {
    yield put(resetPackageFail(error))
  }
}

function* onResolvedDefect({ payload: data }) {
  try {
    yield call(resolvedDefectApi, data.gpId)
    yield put(resolvedDefectSuccess({ id: data.gpId, resolved: data.resolved }))
  } catch (error) {
    yield put(resolvedDefectFail(error))
  }
}

function* onStopElectProject({ payload: data }) {
  try {
    yield call(stopElectProjectApi, data)
    yield put(
      stopElectProjectSuccess({
        id: data.gpId,
        isStop: data.isStop,
        stopDes: data.stopDes,
      })
    )
  } catch (error) {
    yield put(stopElectProjectFail(error))
  }
}

function* onUpdateElectProjectDetails({ payload: { process, queryString } }) {
  try {
    const response = yield call(updateElectProjectDetails, process)
    const responseUpdate = { ...process, id: response }
    yield put(updateElectProjectDetailsSuccess(responseUpdate))
    const responseProject = yield call(getElectProjectsEng, queryString)
    yield put(getElectProjectsEngSuccess(responseProject))
  } catch (error) {
    yield put(updateElectProjectDetailsFail(error))
  }
}

function* onUpdateElectProjectDetailsNew({
  payload: { process, queryString },
}) {
  try {
    const response = yield call(updateElectProjectDetails, process)
    const responseUpdate = { ...process, id: response }
    yield put(updateElectProjectDetailsNewSuccess(responseUpdate))
  } catch (error) {
    yield put(updateElectProjectDetailsNewFail(error))
  }
}

function* onDeleteElectProject({ payload: data }) {
  const {id, searchQuery} = data
  try {
    const response = yield call(deleteElectProject, { id })
    if (response === "success") {
      yield put(deleteElectProjectSuccess())


      const electProjectsResponse = yield call(getElectProjectsFullFilterApi, searchQuery)
      yield put(getElectProjectsFullFilterSuccess(electProjectsResponse))

      const balance = yield call(getUserBalance)
      yield put(getUserBalanceSuccess(balance))
    }
  } catch (error) {
    yield put(deleteElectProjectFail(error))
  }
}

function* onUpdateElectProject({ payload: electProject }) {
  try {
      yield call(updateElectProject, electProject)
      yield put(updateElectProjectSuccess())
    
  } catch (error) {
    yield put(updateElectProjectFail(error))
  }
}

function* onUpdateElectProjectEng({ payload: { process, queryString } }) {
  try {
    const response = yield call(updateElectProjectEngApi, process)
    if (response === "success") {
      const response = yield call(getElectProjectsEng, queryString)
      yield put(getElectProjectsEngSuccess(response))
    }
  } catch (error) {
    yield put(updateElectProjectFail(error))
  }
}

function* onUpdateElectProjectEngNew({ payload: { process, queryString } }) {
  try {
    const response = yield call(updateElectProjectEngApi, process)
    if (response === "success") {
      yield put(getElectProjectsEngSuccess(response))
    }
  } catch (error) {
    yield put(updateElectProjectFail(error))
  }
}

function* onSubmitPanel({ payload: data }) {
  try {
    const response = yield call(submitPanel, data)
    yield put(submitPanelSuccess(response))
  } catch (error) {
    yield put(submitPanelFail(error))
  }
}

function* onAmountSms({ payload: data }) {
  try {
    const response = yield call(amountSmsApi, data)
    yield put(amountSmsSuccess(response))
  } catch (error) {
    yield put(amountSmsFail(error))
  }
}

function* onUpdateElectProjectStatus({ payload: data }) {
  try {
    const response = yield call(updateElectProjectStatusApi, data)
    yield put(updateElectProjectStatusSuccess(response))
  } catch (error) {
    yield put(updateElectProjectStatusFail(error))
  }
}


function* onUpdateDefectDes({ payload: data }) {
  try {
    const response = yield call(updateDefectDesApi, data)
    yield put(updateDefectDesSuccess(response))
  } catch (error) {
    yield put(updateDefectDesFail(error))
  }
}

function* onUpsertCheckListEdc({ payload: checkList }) {
  try {
     yield call(upsertCheckListEdcApi, checkList)

    yield put(upsertCheckListEdcSuccess())
  } catch (error) {
    yield put(upsertCheckListEdcFail(error))
  }
}

function* onUpdateByEdc({ payload: data }) {
  try {
     yield call(updateByEdcApi, data)

    yield put(updateByEdcSuccess())
  } catch (error) {
    yield put(updateByEdcFail(error))
  }
}

function* onGetProjectInfo({ payload: projectId }) {
  try {
    if (projectId) {
      const response = yield call(getProjectInfoApi, projectId)
      yield put(getElectProjectInfoSuccess(response))
    }
  } catch (error) {
    yield put(getElectProjectInfoFail(error))
  }
}

function* electProjectsSaga() {
  yield takeEvery(UPSERT_ElECTROJECT, onUpsertElectProject)
  yield takeEvery(GET_ELECTPROJECTS, onGetElectProjects)
  yield takeEvery(GET_ELECTPROJECTS_FILTER, onGetElectProjectsFilter)
  yield takeEvery(GET_ELECTPROJECTS_FULL_FILTER, onGetElectProjectsFullFilter)
  yield takeEvery(GET_ELECTPROJECT_REPORT, onGetElectProjectReport)
  yield takeEvery(GET_ELECTPROJECTS_ENG, onGetElectProjectsEng)
  yield takeEvery(ADD_FILE_ELECTPROJECT, onAddFileElectProject)
  yield takeEvery(ADD_FILE_ELECTPROJECT_SINGLE, onAddFileEngProjectSingle)

  yield takeEvery(UPDATE_PROCESS_EXPERT_STAGE, onUpdateProcessExpertStage)
  yield takeEvery(UPDATE_PROCESS_MAP_STAGE, onUpdateProcessMapStage)
  yield takeEvery(UPDATE_PROCESS_DEFECT_STAGE, onUpdateProcessDefectStage)

  yield takeEvery(UPDATE_PROCESS_EXPERT_STAGE_NEW,onUpdateProcessExpertStageNew)
  yield takeEvery(UPDATE_PROCESS_MAP_STAGE_NEW, onUpdateProcessMapStageNew)
  yield takeEvery(UPDATE_PROCESS_DEFECT_STAGE_NEW,onUpdateProcessDefectStageNew)

  yield takeEvery(GET_ELECTPROJECT_FILES, onGetElectProjectFiles)
  yield takeEvery(GET_ELECTPROJECT_FREE, onGetElectProjectFree)
  yield takeEvery(GET_PANEL_MAKER, onGetPanelMaker)
  yield takeEvery(SEND_ELECTPROJECT_TOELECT, onSendElectProjectToElect)
  yield takeEvery(SUBMIT_ELECTPROJECT_ADMIN, onSubmitElectProjectAdmin)
  yield takeEvery(ADD_PANEL_MAKER, onAddPanelMaker)
  yield takeEvery(SUBMIT_PACKAGE, onSubmitPackage)
  yield takeEvery(RESET_PACKAGE, onResetPackage)
  yield takeEvery(UPDATE_ELECTPROJECT_DETAILS, onUpdateElectProjectDetails)
  yield takeEvery(UPDATE_ELECTPROJECT_DETAILS_NEW,onUpdateElectProjectDetailsNew)
  yield takeEvery(UPDATE_ELECTPROJECT, onUpdateElectProject)
  yield takeEvery(UPDATE_ELECTPROJECT_ENG, onUpdateElectProjectEng)
  yield takeEvery(UPDATE_ELECTPROJECT_ENG_NEW, onUpdateElectProjectEngNew)
  yield takeEvery(DELETE_ELECTPROJECT, onDeleteElectProject)
  yield takeEvery(RESOLVED_DEFECT, onResolvedDefect)
  yield takeEvery(STOP_ELECTPROJECT, onStopElectProject)
  yield takeEvery(SUBMIT_PANEL, onSubmitPanel)
  yield takeEvery(AMOUNT_SMS, onAmountSms)
  yield takeEvery(UPDATE_ELECTPROJECT_STATUS, onUpdateElectProjectStatus)
  yield takeEvery(UPDATE_ELECTPROJECT_DEFECT_DES, onUpdateDefectDes)
  yield takeEvery(UPSERT_CHECKLIST_EDC, onUpsertCheckListEdc)
  yield takeEvery(UPDATE_BY_EDC, onUpdateByEdc)
  yield takeEvery(GET_PROJECT_INFO, onGetProjectInfo)
}

export default electProjectsSaga

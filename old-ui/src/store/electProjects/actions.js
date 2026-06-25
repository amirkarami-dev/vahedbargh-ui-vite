import {
  GET_ELECTPROJECTS,
  GET_ELECTPROJECTS_FAIL,
  GET_ELECTPROJECTS_SUCCESS,
  RESET_ELECTPROJECT_FLAG,
  UPSERT_ElECTROJECT,
  UPSERT_ElECTROJECT_FAIL,
  UPSERT_ElECTROJECT_SUCCESS,
  ADD_FILE_ELECTPROJECT,
  ADD_FILE_ELECTPROJECT_FAIL,
  ADD_FILE_ELECTPROJECT_SUCCESS,
  GET_ELECTPROJECTS_ENG,
  GET_ELECTPROJECTS_ENG_SUCCESS,
  GET_ELECTPROJECTS_ENG_FAIL,
  GET_PANEL_MAKER,
  GET_PANEL_MAKER_SUCCESS,
  GET_PANEL_MAKER_FAIL,
  UPDATE_PROCESS_EXPERT_STAGE,
  UPDATE_PROCESS_MAP_STAGE,
  UPDATE_PROCESS_STAGE_SUCCESS,
  UPDATE_PROCESS_STAGE_FAIL,
  GET_ELECTPROJECT_FILES,
  GET_ELECTPROJECT_FILES_SUCCESS,
  GET_ELECTPROJECT_FILES_FAIL,
  ADD_FILE_ELECTPROJECT_SINGLE,
  SEND_ELECTPROJECT_TOELECT,
  SEND_ELECTPROJECT_TOELECT_SUCCESS,
  SEND_ELECTPROJECT_TOELECT_FAIL,
  SUBMIT_ELECTPROJECT_ADMIN,
  SUBMIT_ELECTPROJECT_ADMIN_SUCCESS,
  SUBMIT_ELECTPROJECT_ADMIN_FAIL,
  ADD_PANEL_MAKER,
  ADD_PANEL_MAKER_SUCCESS,
  ADD_PANEL_MAKER_FAIL,
  SUBMIT_PACKAGE,
  SUBMIT_PACKAGE_SUCCESS,
  SUBMIT_PACKAGE_FAIL,
  UPDATE_ELECTPROJECT_DETAILS,
  UPDATE_ELECTPROJECT_DETAILS_SUCCESS,
  UPDATE_ELECTPROJECT_DETAILS_FAIL,
  DELETE_ELECTPROJECT,
  DELETE_ELECTPROJECT_SUCCESS,
  DELETE_ELECTPROJECT_FAIL,
  UPDATE_ELECTPROJECT,
  UPDATE_ELECTPROJECT_SUCCESS,
  UPDATE_ELECTPROJECT_FAIL,
  UPDATE_ELECTPROJECT_ENG,
  UPDATE_PROCESS_DEFECT_STAGE,
  GET_ELECTPROJECT_REPORT,
  GET_ELECTPROJECT_REPORT_SUCCESS,
  GET_ELECTPROJECT_REPORT_FAIL,
  GET_ELECTPROJECT_FREE,
  GET_ELECTPROJECT_FREE_SUCCESS,
  GET_ELECTPROJECT_FREE_FAIL,
  GET_ELECTPROJECTS_FILTER,
  GET_ELECTPROJECTS_FILTER_FAIL,
  GET_ELECTPROJECTS_FILTER_SUCCESS,
  GET_ELECTPROJECTS_FULL_FILTER,
  GET_ELECTPROJECTS_FULL_FILTER_SUCCESS,
  GET_ELECTPROJECTS_FULL_FILTER_FAIL,
  UPDATE_PROCESS_EXPERT_STAGE_NEW,
  UPDATE_PROCESS_MAP_STAGE_NEW,
  UPDATE_PROCESS_DEFECT_STAGE_NEW,
  UPDATE_PROCESS_STAGE_NEW_SUCCESS,
  UPDATE_PROCESS_STAGE_NEW_FAIL,
  UPDATE_ELECTPROJECT_DETAILS_NEW,
  UPDATE_ELECTPROJECT_DETAILS_NEW_SUCCESS,
  UPDATE_ELECTPROJECT_DETAILS_NEW_FAIL,
  UPDATE_ELECTPROJECT_ENG_NEW,
  RESET_PACKAGE,
  RESET_PACKAGE_SUCCESS,
  RESET_PACKAGE_FAIL,
  RESOLVED_DEFECT,
  RESOLVED_DEFECT_SUCCESS,
  RESOLVED_DEFECT_FAIL,
  STOP_ELECTPROJECT,
  STOP_ELECTPROJECT_SUCCESS,
  STOP_ELECTPROJECT_FAIL,
  UPSERT_COMMENT,
  UPSERT_COMMENT_SUCCESS,
  UPSERT_COMMENT_FAIL,
  SUBMIT_PANEL,
  SUBMIT_PANEL_SUCCESS,
  SUBMIT_PANEL_FAIL,
  AMOUNT_SMS,
  AMOUNT_SMS_SUCCESS,
  AMOUNT_SMS_FAIL,
  GET_ELECTPROJECTS_FULL_FILTER_CHILDREN_SUCCESS,
  UPDATE_ELECTPROJECT_STATUS,
  UPDATE_ELECTPROJECT_STATUS_SUCCESS,
  UPDATE_ELECTPROJECT_STATUS_FAIL,
  UPDATE_ELECTPROJECT_DEFECT_DES,
  UPDATE_ELECTPROJECT_DEFECT_DES_FAIL,
  UPDATE_ELECTPROJECT_DEFECT_DES_SUCCESS,
  UPSERT_CHECKLIST_EDC,
  UPSERT_CHECKLIST_EDC_SUCCESS,
  UPSERT_CHECKLIST_EDC_FAIL,
  UPDATE_BY_EDC,
  UPDATE_BY_EDC_FAIL,
  UPDATE_BY_EDC_SUCCESS,
  GET_PROJECT_INFO,
  GET_PROJECT_INFO_SUCCESS,
  GET_PROJECT_INFO_FAIL,
} from "./actionTypes"

// --------------------------------------------------Get ElectProject Report
export const getElectProjectReport = values => ({
  type: GET_ELECTPROJECT_REPORT,
  payload: values,
})

export const getElectProjectReportSuccess = events => ({
  type: GET_ELECTPROJECT_REPORT_SUCCESS,
  payload: events,
})

export const getElectProjectReportFail = error => ({
  type: GET_ELECTPROJECT_REPORT_FAIL,
  payload: error,
})
// --------------------------------------------------Get ElectProject
export const getElectProjects = values => ({
  type: GET_ELECTPROJECTS,
  payload: values,
})

export const getElectProjectsSuccess = events => ({
  type: GET_ELECTPROJECTS_SUCCESS,
  payload: events,
})

export const getElectProjectsFail = error => ({
  type: GET_ELECTPROJECTS_FAIL,
  payload: error,
})

// --------------------------------------------------Get ElectProjects Filter
export const getElectProjectsFilter = values => ({
  type: GET_ELECTPROJECTS_FILTER,
  payload: values,
})

export const getElectProjectsFilterSuccess = events => ({
  type: GET_ELECTPROJECTS_FILTER_SUCCESS,
  payload: events,
})

export const getElectProjectsFilterFail = error => ({
  type: GET_ELECTPROJECTS_FILTER_FAIL,
  payload: error,
})
// --------------------------------------------------Get ElectProjects full filter
export const getElectProjectsFullFilter = values => ({
  type: GET_ELECTPROJECTS_FULL_FILTER,
  payload: values,
})

export const getElectProjectsFullFilterSuccess = events => ({
  type: GET_ELECTPROJECTS_FULL_FILTER_SUCCESS,
  payload: events,
})

export const getElectProjectsFullFilterChildrenSuccess = events => ({
  type: GET_ELECTPROJECTS_FULL_FILTER_CHILDREN_SUCCESS,
  payload: events,
})

export const getElectProjectsFullFilterFail = error => ({
  type: GET_ELECTPROJECTS_FULL_FILTER_FAIL,
  payload: error,
})
// --------------------------------------------------Get ElectProject Eng
export const getElectProjectsEng = searchValue => ({
  type: GET_ELECTPROJECTS_ENG,
  payload: searchValue,
})

export const getElectProjectsEngSuccess = events => ({
  type: GET_ELECTPROJECTS_ENG_SUCCESS,
  payload: events,
})

export const getElectProjectsEngFail = error => ({
  type: GET_ELECTPROJECTS_ENG_FAIL,
  payload: error,
})

// --------------------------------------------------Get ElectProject Files
export const getElectProjectFiles = electProjectId => ({
  type: GET_ELECTPROJECT_FILES,
  payload: electProjectId,
})

export const getElectProjectsFilesSuccess = events => ({
  type: GET_ELECTPROJECT_FILES_SUCCESS,
  payload: events,
})

export const getElectProjectsFilesFail = error => ({
  type: GET_ELECTPROJECT_FILES_FAIL,
  payload: error,
})

// --------------------------------------------------Get ElectProject Free
export const getElectProjectFree = fileNumber => ({
  type: GET_ELECTPROJECT_FREE,
  payload: fileNumber,
})

export const getElectProjectsFreeSuccess = events => ({
  type: GET_ELECTPROJECT_FREE_SUCCESS,
  payload: events,
})

export const getElectProjectsFreeFail = error => ({
  type: GET_ELECTPROJECT_FREE_FAIL,
  payload: error,
})
// --------------------------------------------------Get Package Installer
export const getPanelMaker = (company) => ({
  type: GET_PANEL_MAKER,
  payload: company
})

export const getPanelMakerSuccess = events => ({
  type: GET_PANEL_MAKER_SUCCESS,
  payload: events,
})

export const getPanelMakerFail = error => ({
  type: GET_PANEL_MAKER_FAIL,
  payload: error,
})
// --------------------------------------------------Delete
export const deleteElectProject = data => ({
  type: DELETE_ELECTPROJECT,
  payload: data,
})
export const deleteElectProjectSuccess = () => ({
  type: DELETE_ELECTPROJECT_SUCCESS
})
export const deleteElectProjectFail = error => ({
  type: DELETE_ELECTPROJECT_FAIL,
  payload: error,
})

// --------------------------------------------------Upsert
export const upsertElectProject = electProject => ({
  type: UPSERT_ElECTROJECT,
  payload: electProject,
})
export const upsertElectProjectSuccess = electProject => ({
  type: UPSERT_ElECTROJECT_SUCCESS,
  payload: electProject,
})
export const upsertElectProjectFail = error => ({
  type: UPSERT_ElECTROJECT_FAIL,
  payload: error,
})


// --------------------------------------------------Add File
export const addFileElectProject = attachData => ({
  type: ADD_FILE_ELECTPROJECT,
  payload: attachData,
})
export const addFileElectProjectSingle = attachData => ({
  type: ADD_FILE_ELECTPROJECT_SINGLE,
  payload: attachData,
})
export const addFileElectProjectSuccess = attachData => ({
  type: ADD_FILE_ELECTPROJECT_SUCCESS,
  payload: attachData,
})
export const addFileElectProjectFail = error => ({
  type: ADD_FILE_ELECTPROJECT_FAIL,
  payload: error,
})

// --------------------------------------------------Update gas project process expert stage
export const updateProcessExpertStage = electProcess => ({
  type: UPDATE_PROCESS_EXPERT_STAGE,
  payload: electProcess,
})
export const updateProcessMapStage = electProcess => ({
  type: UPDATE_PROCESS_MAP_STAGE,
  payload: electProcess,
})
export const updateProcessDefectStage = electProcess => ({
  type: UPDATE_PROCESS_DEFECT_STAGE,
  payload: electProcess,
})
export const updateProcessStageSuccess = electProcess => ({
  type: UPDATE_PROCESS_STAGE_SUCCESS,
  payload: electProcess,
})
export const updateProcessStageFail = error => ({
  type: UPDATE_PROCESS_STAGE_FAIL,
  payload: error,
})

// --------------------------------------------------Update gas project process expert stage new
export const updateProcessExpertStageNew = electProcess => ({
  type: UPDATE_PROCESS_EXPERT_STAGE_NEW,
  payload: electProcess,
})
export const updateProcessMapStageNew = electProcess => ({
  type: UPDATE_PROCESS_MAP_STAGE_NEW,
  payload: electProcess,
})
export const updateProcessDefectStageNew = electProcess => ({
  type: UPDATE_PROCESS_DEFECT_STAGE_NEW,
  payload: electProcess,
})
export const updateProcessStageNewSuccess = electProcess => ({
  type: UPDATE_PROCESS_STAGE_NEW_SUCCESS,
  payload: electProcess,
})
export const updateProcessStageNewFail = error => ({
  type: UPDATE_PROCESS_STAGE_NEW_FAIL,
  payload: error,
})

// --------------------------------------------------Send to Elect
export const sendElectProjectToElect = fileNumber => ({
  type: SEND_ELECTPROJECT_TOELECT,
  payload: fileNumber,
})
export const sendElectProjectToElectSuccess = fileNumber => ({
  type: SEND_ELECTPROJECT_TOELECT_SUCCESS,
  payload: fileNumber,
})
export const sendElectProjectToElectFail = error => ({
  type: SEND_ELECTPROJECT_TOELECT_FAIL,
  payload: error,
})

// --------------------------------------------------Send to Elect
export const submitElectProjectAdmin = electProjectId => ({
  type: SUBMIT_ELECTPROJECT_ADMIN,
  payload: electProjectId,
})
export const submitElectProjectAdminSuccess = electProjectId => ({
  type: SUBMIT_ELECTPROJECT_ADMIN_SUCCESS,
  payload: electProjectId,
})
export const submitElectProjectAdminFail = error => ({
  type: SUBMIT_ELECTPROJECT_ADMIN_FAIL,
  payload: error,
})

// --------------------------------------------------Add panel maker installer
export const addPanelMaker = data => ({
  type: ADD_PANEL_MAKER,
  payload: data,
})
export const addPanelMakerSuccess = events => ({
  type: ADD_PANEL_MAKER_SUCCESS,
  payload: events,
})
export const addPanelMakerFail = error => ({
  type: ADD_PANEL_MAKER_FAIL,
  payload: error,
})


// --------------------------------------------------submit Package installer
export const submitPackage = dataSubmit => ({
  type: SUBMIT_PACKAGE,
  payload: dataSubmit,
})
export const submitPackageSuccess = events => ({
  type: SUBMIT_PACKAGE_SUCCESS,
  payload: events,
})
export const submitPackageFail = error => ({
  type: SUBMIT_PACKAGE_FAIL,
  payload: error,
})

// --------------------------------------------------reset Package installer
export const resetPackage = GpId => ({
  type: RESET_PACKAGE,
  payload: GpId,
})
export const resetPackageSuccess = events => ({
  type: RESET_PACKAGE_SUCCESS,
  payload: events,
})
export const resetPackageFail = error => ({
  type: RESET_PACKAGE_FAIL,
  payload: error,
})

// --------------------------------------------------Resolved Defect
export const resolvedDefect = gpId => ({
  type: RESOLVED_DEFECT,
  payload: gpId,
})
export const resolvedDefectSuccess = events => ({
  type: RESOLVED_DEFECT_SUCCESS,
  payload: events,
})
export const resolvedDefectFail = error => ({
  type: RESOLVED_DEFECT_FAIL,
  payload: error,
})

// --------------------------------------------------Update electProject Details
export const updateElectProjectDetails = electProjectDetail => ({
  type: UPDATE_ELECTPROJECT_DETAILS,
  payload: electProjectDetail,
})
export const updateElectProjectDetailsSuccess = electProjectDetail => ({
  type: UPDATE_ELECTPROJECT_DETAILS_SUCCESS,
  payload: electProjectDetail,
})
export const updateElectProjectDetailsFail = error => ({
  type: UPDATE_ELECTPROJECT_DETAILS_FAIL,
  payload: error,
})

// --------------------------------------------------Update electProject Details New
export const updateElectProjectDetailsNew = electProjectDetail => ({
  type: UPDATE_ELECTPROJECT_DETAILS_NEW,
  payload: electProjectDetail,
})
export const updateElectProjectDetailsNewSuccess = electProjectDetail => ({
  type: UPDATE_ELECTPROJECT_DETAILS_NEW_SUCCESS,
  payload: electProjectDetail,
})
export const updateElectProjectDetailsNewFail = error => ({
  type: UPDATE_ELECTPROJECT_DETAILS_NEW_FAIL,
  payload: error,
})

// --------------------------------------------------Update electProject
export const updateElectProject = electProject => ({
  type: UPDATE_ELECTPROJECT,
  payload: electProject,
})
export const updateElectProjectSuccess = electProject => ({
  type: UPDATE_ELECTPROJECT_SUCCESS,
  payload: electProject,
})
export const updateElectProjectFail = error => ({
  type: UPDATE_ELECTPROJECT_FAIL,
  payload: error,
})
// --------------------------------------------------Update electProject by Eng
export const updateElectProjectEng = electProject => ({
  type: UPDATE_ELECTPROJECT_ENG,
  payload: electProject,
})
// --------------------------------------------------Update electProject by Eng
export const updateElectProjectEngNew = electProject => ({
  type: UPDATE_ELECTPROJECT_ENG_NEW,
  payload: electProject,
})

// --------------------------------------------------Cancel ElectProject
export const stopElectProject = data => ({
  type: STOP_ELECTPROJECT,
  payload: data,
})
export const stopElectProjectSuccess = data => ({
  type: STOP_ELECTPROJECT_SUCCESS,
  payload: data,
})
export const stopElectProjectFail = error => ({
  type: STOP_ELECTPROJECT_FAIL,
  payload: error,
})


// --------------------------------------------------submit Panel
export const submitPanel = data => ({
  type: SUBMIT_PANEL,
  payload: data,
})
export const submitPanelSuccess = events => ({
  type: SUBMIT_PANEL_SUCCESS,
  payload: events,
})
export const submitPanelFail = error => ({
  type: SUBMIT_PANEL_FAIL,
  payload: error,
})


// --------------------------------------------------amount sms
export const amountSms = data => ({
  type: AMOUNT_SMS,
  payload: data,
})
export const amountSmsSuccess = events => ({
  type: AMOUNT_SMS_SUCCESS,
  payload: events,
})
export const amountSmsFail = error => ({
  type: AMOUNT_SMS_FAIL,
  payload: error,
})


// --------------------------------------------------Update electProject Status
export const updateElectProjectStatus = data => ({
  type: UPDATE_ELECTPROJECT_STATUS,
  payload: data,
})
export const updateElectProjectStatusSuccess = data => ({
  type: UPDATE_ELECTPROJECT_STATUS_SUCCESS,
  payload: data,
})
export const updateElectProjectStatusFail = error => ({
  type: UPDATE_ELECTPROJECT_STATUS_FAIL,
  payload: error,
})


// -------------------------------------------------- updateDefectDes
export const updateDefectDes = data => ({
  type: UPDATE_ELECTPROJECT_DEFECT_DES,
  payload: data,
})
export const updateDefectDesSuccess = data => ({
  type: UPDATE_ELECTPROJECT_DEFECT_DES_FAIL,
  payload: data,
})
export const updateDefectDesFail = error => ({
  type: UPDATE_ELECTPROJECT_DEFECT_DES_SUCCESS,
  payload: error,
})

 //-----------------------------------------------------Upsert CheckListEdc
 export const upsertCheckListEdc = (data) =>({
  type:UPSERT_CHECKLIST_EDC,
  payload: data
})

export const upsertCheckListEdcSuccess = event =>({
  type:UPSERT_CHECKLIST_EDC_SUCCESS,
  payload:event
})
export const upsertCheckListEdcFail = error =>({
  type:UPSERT_CHECKLIST_EDC_FAIL,
  payload:error
})

// -------------------------------------------------- updateByEdc
export const updateByEdc = data => ({
  type: UPDATE_BY_EDC,
  payload: data,
})
export const updateByEdcSuccess = data => ({
  type: UPDATE_BY_EDC_SUCCESS,
  payload: data,
})
export const updateByEdcFail = error => ({
  type: UPDATE_BY_EDC_FAIL,
  payload: error,
})


// --------------------------------------------------Get getElectProjectInfo
export const getElectProjectInfo = gasProjectId => ({
  type: GET_PROJECT_INFO,
  payload: gasProjectId,
})

export const getElectProjectInfoSuccess = events => ({
  type: GET_PROJECT_INFO_SUCCESS,
  payload: events,
})

export const getElectProjectInfoFail = error => ({
  type: GET_PROJECT_INFO_FAIL,
  payload: error,
})



//-----------------------------------------------------Reset
export const resetElectProjectFlag = error => {
  return {
    type: RESET_ELECTPROJECT_FLAG,
  }
}

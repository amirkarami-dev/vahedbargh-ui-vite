import { DEL_PROJECT_PROCESS, DEL_PROJECT_PROCESS_FAIL, DEL_PROJECT_PROCESS_SUCCESS, DESELECT_GP, EPP_ACCEPTED, EPP_ACCEPTED_FAIL, EPP_ACCEPTED_SUCCESS, EPP_APPROVED, EPP_APPROVED_FAIL, EPP_APPROVED_SUCCESS, EPP_UPDATE_IS_MAIN, EPP_UPDATE_IS_MAIN_FAIL, EPP_UPDATE_IS_MAIN_SUCCESS, GET_EPP_BYGPID, GET_EPP_BYGPID_FAIL, GET_EPP_BYGPID_SUCCESS, GET_LIST_PROJECT_PROCESS_ENG, GET_LIST_PROJECT_PROCESS_ENG_FAIL, GET_LIST_PROJECT_PROCESS_ENG_SUCCESS, GET_LIST_PROJECT_PROCESS_REPORT, PROJECT_PROCESS, PROJECT_PROCESS_FAIL, PROJECT_PROCESS_SUCCESS, RESET_ELECT_PROCESS_FLAG, SELECT_GP, UPSERT_CHECKLIST, UPSERT_CHECKLIST_FAIL, UPSERT_CHECKLIST_SUCCESS, UPSERT_COMMENT, UPSERT_COMMENT_FAIL, UPSERT_COMMENT_SUCCESS, UPSERT_ERTFORM, UPSERT_ERTFORM_FAIL, UPSERT_ERTFORM_SUCCESS } from "./actionTypes"

//-----------------------------------------------------get PROJECT PROCESS
export const getEppByEpId = gpId => ({
    type: GET_EPP_BYGPID,
    payload: gpId
  })
  
  export const getEppByGpIdSuccess = events => ({
      type:GET_EPP_BYGPID_SUCCESS,
      payload:events
  })
  
  export const getEppByGpIdFail= error =>({
      type:GET_EPP_BYGPID_FAIL,
      payload:error
  })

  export const selectGp = (page,selectArr) => ({
    type: SELECT_GP,
    payload: {page:page,selectArr:selectArr}
  })
  export const deselectGp = () => ({
    type: DESELECT_GP
  })

//----------------------------------------------------- PROJECT PROCESS
export const projectProcess = values =>({
  type:PROJECT_PROCESS,
  payload: values
})

export const projectProcessSuccess = events =>({
  type: PROJECT_PROCESS_SUCCESS,
  payload: events
})

export const projectProcessFail = error =>({
  type: PROJECT_PROCESS_FAIL,
  payload: error
})

  //-----------------------------------------------------get list PROJECT PROCESS
  export const getListProjectProcessEng = values => ({
    type: GET_LIST_PROJECT_PROCESS_ENG,
    payload: values
  })

  export const getListProjectProcessReport = values => ({
    type: GET_LIST_PROJECT_PROCESS_REPORT,
    payload: values
  })
  
  export const getListProjectProcessEngSuccess = events => ({
      type:GET_LIST_PROJECT_PROCESS_ENG_SUCCESS,
      payload:events
  })
  
  export const getListProjectProcessEngFail= error =>({
      type:GET_LIST_PROJECT_PROCESS_ENG_FAIL,
      payload:error
  })
  
//-----------------------------------------------------delete PROJECT PROCESS
export const deleteProjectProcess = eppId => ({
  type: DEL_PROJECT_PROCESS,
  payload: eppId
})

export const deleteProjectProcessSuccess = events => ({
    type:DEL_PROJECT_PROCESS_SUCCESS,
    payload:events
})

export const deleteProjectProcessFail= error =>({
    type:DEL_PROJECT_PROCESS_FAIL,
    payload:error
})

 //-----------------------------------------------------Upsert Comment
 export const upsertComment = (data) =>({
  type:UPSERT_COMMENT,
  payload: data
})

export const upsertCommentSuccess = event =>({
  type:UPSERT_COMMENT_SUCCESS,
  payload:event
})
export const upsertCommentFail = error =>({
  type:UPSERT_COMMENT_FAIL,
  payload:error
})


 //-----------------------------------------------------Upsert CheckList
 export const upsertCheckList = (data) =>({
  type:UPSERT_CHECKLIST,
  payload: data
})

export const upsertCheckListSuccess = event =>({
  type:UPSERT_CHECKLIST_SUCCESS,
  payload:event
})
export const upsertCheckListFail = error =>({
  type:UPSERT_CHECKLIST_FAIL,
  payload:error
})

 //-----------------------------------------------------Upsert ertForm
 export const upsertErtForm = (data) =>({
  type:UPSERT_ERTFORM,
  payload: data
})

export const upsertErtFormSuccess = event =>({
  type:UPSERT_ERTFORM_SUCCESS,
  payload:event
})
export const upsertErtFormFail = error =>({
  type:UPSERT_ERTFORM_FAIL,
  payload:error
})

 //-----------------------------------------------------Epp Approved
 export const eppApproved = (data) =>({
  type:EPP_APPROVED,
  payload: data
})

export const eppApprovedSuccess = event =>({
  type:EPP_APPROVED_SUCCESS,
  payload:event
})
export const eppApprovedFail = error =>({
  type:EPP_APPROVED_FAIL,
  payload:error
})

 //-----------------------------------------------------Epp Accepted
 export const eppAccepted = (data) =>({
  type:EPP_ACCEPTED,
  payload: data
})

export const eppAcceptedSuccess = event =>({
  type:EPP_ACCEPTED_SUCCESS,
  payload:event
})
export const eppAcceptedFail = error =>({
  type:EPP_ACCEPTED_FAIL,
  payload:error
})

 //-----------------------------------------------------Epp Update IsMain
 export const eppUpdateIsMain = (data) =>({
  type:EPP_UPDATE_IS_MAIN,
  payload: data
})

export const eppUpdateIsMainSuccess = event =>({
  type:EPP_UPDATE_IS_MAIN_SUCCESS,
  payload:event
})
export const eppUpdateIsMainFail = error =>({
  type:EPP_UPDATE_IS_MAIN_FAIL,
  payload:error
})

  //-----------------------------------------------------Reset
export const resetElectProcessFlag = () => {
  return {
    type: RESET_ELECT_PROCESS_FLAG,
  }
}
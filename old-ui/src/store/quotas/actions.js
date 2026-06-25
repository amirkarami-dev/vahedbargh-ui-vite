import { ENG_QUOTA_BURN_APPROVED, ENG_QUOTA_BURN_APPROVED_FAIL, ENG_QUOTA_BURN_APPROVED_SUCCESS, ENG_QUOTA_BURN_UPDATE, ENG_QUOTA_BURN_UPDATE_FAIL, ENG_QUOTA_BURN_UPDATE_SUCCESS, GET_ENG_QUOTA_BURN_LIST, GET_ENG_QUOTA_BURN_LIST_FAIL, GET_ENG_QUOTA_BURN_LIST_SUCCESS, RESET_ENG_QUOTA, RESET_QUOTA } from "./actionTypes"



  //-----------------------------------------------------get eng quota burn list
  export const getEngQuotaBurnList = (values) => ({
    type: GET_ENG_QUOTA_BURN_LIST,
    payload: values
  })
  
  export const getEngQuotaBurnListSuccess = events => ({
    type: GET_ENG_QUOTA_BURN_LIST_SUCCESS,
    payload: events,
  })
  export const getEngQuotaBurnListFail = error => ({
    type: GET_ENG_QUOTA_BURN_LIST_FAIL,
    payload: error,
  })

    //-----------------------------------------------------approved
    export const engQuotaBurnApproved = (values) => ({
      type: ENG_QUOTA_BURN_APPROVED,
      payload: values
    })
    
    export const engQuotaBurnApprovedSuccess = events => ({
      type: ENG_QUOTA_BURN_APPROVED_SUCCESS,
      payload: events,
    })
    export const engQuotaBurnApprovedFail = error => ({
      type: ENG_QUOTA_BURN_APPROVED_FAIL,
      payload: error,
    })

        //-----------------------------------------------------update
        export const engQuotaBurnUpdate = (values) => ({
          type: ENG_QUOTA_BURN_UPDATE,
          payload: values
        })
        
        export const engQuotaBurnUpdateSuccess = events => ({
          type: ENG_QUOTA_BURN_UPDATE_SUCCESS,
          payload: events,
        })
        export const engQuotaBurnUpdateFail = error => ({
          type: ENG_QUOTA_BURN_UPDATE_FAIL,
          payload: error,
        })


    //-----------------------------------------------------Reset
export const resetEngQuota = () => {
    return {
        type:RESET_ENG_QUOTA
    }
  }

      //-----------------------------------------------------Reset
export const resetQuota = () => {
  return {
      type:RESET_QUOTA
  }
}
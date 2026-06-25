import {
    GET_LIST_ENGINEER,
    GET_LIST_ENGINEER_FAIL,
    GET_LIST_ENGINEER_SUCCESS,
    POST_ENGINEER_PAYMENT_CUSTOM,
    POST_ENGINEER_PAYMENT_CUSTOM_FAIL,
    POST_ENGINEER_PAYMENT_CUSTOM_SUCCESS,
    RESET_ENGINEER_FLAG,
    UPSERT_ENGINEER,
    UPSERT_ENGINEER_FAIL,
    UPSERT_ENGINEER_SUCCESS,
    UPSERT_ENG_HISTORY,
    UPSERT_ENG_HISTORY_FAIL,
    UPSERT_ENG_HISTORY_SUCCESS,
    FILTER_ENGINEER,
    FILTER_LOADING
} from "./actionTypes"

//-----------------------------------------------------Upsert Executor
export const upsertEngineer = (data) =>({
    type:UPSERT_ENGINEER,
    payload: data
})

export const upsertEngineerSuccess = event =>({
    type:UPSERT_ENGINEER_SUCCESS,
    payload:event
})
export const upsertEngineerFail = error =>({
    type:UPSERT_ENGINEER_FAIL,
    payload:error
})
//-----------------------------------------------------get List Engineer
export const getListEngineer = filter =>({
    type:GET_LIST_ENGINEER,
    payload:filter
})

export const getListEngineerSuccess = events =>({
    type:GET_LIST_ENGINEER_SUCCESS,
    payload:events
})
export const getListEngineerFail = error =>({
    type:GET_LIST_ENGINEER_FAIL,
    payload:error
})
//-----------------------------------------------------get List Executor
export const postEngineerPaymentCustom = events => ({
    type: POST_ENGINEER_PAYMENT_CUSTOM,
    payload:events
  })

  export const postEngineerPaymentCustomSuccess = events => ({
      type:POST_ENGINEER_PAYMENT_CUSTOM_SUCCESS,
      payload:events
  })

  export const postEngineerPaymentCustomFail= error =>({
      type:POST_ENGINEER_PAYMENT_CUSTOM_FAIL,
      payload:error
  })

  //-----------------------------------------------------Upsert Executor
export const upsertEngHistory = (data) =>({
    type:UPSERT_ENG_HISTORY,
    payload: data
})

export const upsertEngHistorySuccess = event =>({
    type:UPSERT_ENG_HISTORY_SUCCESS,
    payload:event
})
export const upsertEngHistoryFail = error =>({
    type:UPSERT_ENG_HISTORY_FAIL,
    payload:error
})

//------------------------------------------------------Filter

export const filterEngineer = (data) =>({
    type:FILTER_ENGINEER,
    payload: data
})

//------------------------------------------------------Filter loading

export const filterLoading = (data) =>({
    type:FILTER_LOADING,
    payload: data
})
//-----------------------------------------------------Reset
export const resetEngineerFlag = () => {
    return {
        type:RESET_ENGINEER_FLAG
    }
}

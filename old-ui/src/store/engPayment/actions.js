import { ENG_PAYMENT_APPROVED, ENG_PAYMENT_APPROVED_FAIL, ENG_PAYMENT_APPROVED_SUCCESS, FILTER_ENG_PAYMENT_LIST, FILTER_ENG_PAYMENT_LIST_FAIL, FILTER_ENG_PAYMENT_LIST_SUCCESS, GET_ENG_PAYMENT_LIST, GET_ENG_PAYMENT_LIST_FAIL, 
  GET_ENG_PAYMENT_LIST_SUCCESS, 
  GET_ENG_PAYMENT_TASK, 
  GET_ENG_PAYMENT_TASK_FAIL, 
  GET_ENG_PAYMENT_TASK_SUCCESS, 
  RESET_ENG_PAYMENT_LIST_FLAG, 
  UPDATE_ENG_PAYMENT_LIST, 
  UPDATE_ENG_PAYMENT_LIST_FAIL, 
  UPDATE_ENG_PAYMENT_LIST_SUCCESS, 
  UPSERT_ENG_PAYMENT_LIST, 
  UPSERT_ENG_PAYMENT_LIST_FAIL, 
  UPSERT_ENG_PAYMENT_LIST_SUCCESS } from "./actionTypes"




//-----------------------------------------------------Upsert eng payment list
export const upsertEngPaymentList = data => ({
    type: UPSERT_ENG_PAYMENT_LIST,
    payload: data,
  })
  
  export const upsertEngPaymentListSuccess = event => ({
    type: UPSERT_ENG_PAYMENT_LIST_SUCCESS,
    payload: event,
  })
  export const upsertEngPaymentListFail = error => ({
    type: UPSERT_ENG_PAYMENT_LIST_FAIL,
    payload: error,
  })

  //-----------------------------------------------------Update eng payment list
export const updateEngPaymentList = data => ({
  type: UPDATE_ENG_PAYMENT_LIST,
  payload: data,
})

export const updateEngPaymentListSuccess = event => ({
  type: UPDATE_ENG_PAYMENT_LIST_SUCCESS,
  payload: event,
})
export const updateEngPaymentListFail = error => ({
  type: UPDATE_ENG_PAYMENT_LIST_FAIL,
  payload: error,
})
  //-----------------------------------------------------get  eng payment list
export const getEngPaymentList = (values) => ({
    type: GET_ENG_PAYMENT_LIST,
    payload: values
  })
  
  export const getEngPaymentListSuccess = events => ({
    type: GET_ENG_PAYMENT_LIST_SUCCESS,
    payload: events,
  })
  export const getEngPaymentListFail = error => ({
    type: GET_ENG_PAYMENT_LIST_FAIL,
    payload: error,
  })

    //-----------------------------------------------------get  eng payment task
export const getEngPaymentTask = () => ({
  type: GET_ENG_PAYMENT_TASK
})

export const getEngPaymentTaskSuccess = events => ({
  type: GET_ENG_PAYMENT_TASK_SUCCESS,
  payload: events,
})
export const getEngPaymentTaskFail = error => ({
  type: GET_ENG_PAYMENT_TASK_FAIL,
  payload: error,
})

    //-----------------------------------------------------get  eng payment task
    export const engPaymentApproved = (values) => ({
      type: ENG_PAYMENT_APPROVED,
      payload: values
    })
    
    export const engPaymentApprovedSuccess = events => ({
      type: ENG_PAYMENT_APPROVED_SUCCESS,
      payload: events,
    })
    export const engPaymentApprovedFail = error => ({
      type: ENG_PAYMENT_APPROVED_FAIL,
      payload: error,
    })

        //-----------------------------------------------------filter  eng payment List
        export const filterEngPaymentList = (values) => ({
          type: FILTER_ENG_PAYMENT_LIST,
          payload: values
        })
        
        export const filterEngPaymentListSuccess = events => ({
          type: FILTER_ENG_PAYMENT_LIST_SUCCESS,
          payload: events,
        })
        export const filterEngPaymentListFail = error => ({
          type: FILTER_ENG_PAYMENT_LIST_FAIL,
          payload: error,
        })
    

  //-----------------------------------------------------Reset
export const resetEngPaymentListFlag = () => {
  return {
      type:RESET_ENG_PAYMENT_LIST_FLAG
  }
}
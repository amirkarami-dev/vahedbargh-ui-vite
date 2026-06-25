import {
  ADD_SUPPORT_FILE,
  ADD_SUPPORT_FILE_FAIL,
  ADD_SUPPORT_FILE_SUCCESS,
  CLOSED_SUPPORT,
  CLOSED_SUPPORT_FAIL,
  CLOSED_SUPPORT_SUCCESS,
  DELETE_SUPPORT_FILE,
  DELETE_SUPPORT_FILE_FAIL,
  DELETE_SUPPORT_FILE_SUCCESS,
  GET_LIST_SUPPORT,
  GET_LIST_SUPPORT_FAIL,
  GET_LIST_SUPPORT_SUCCESS,
  GET_LIST_TICKET,
  GET_LIST_TICKET_FAIL,
  GET_LIST_TICKET_SUCCESS,
  GET_SUPPORT_FILES,
  GET_SUPPORT_FILES_FAIL,
  GET_SUPPORT_FILES_SUCCESS,
  RESET_SUPPORT_FLAG,
  UPSERT_SUPPORT,
  UPSERT_SUPPORT_FAIL,
  UPSERT_SUPPORT_SUCCESS,
  UPSERT_TICKET,
  UPSERT_TICKET_FAIL,
  UPSERT_TICKET_SUCCESS,
  
} from "./actionTypes"

//-----------------------------------------------------Upsert support
export const upsertSupport = data => ({
  type: UPSERT_SUPPORT,
  payload: data,
})

export const upsertSupportSuccess = event => ({
  type: UPSERT_SUPPORT_SUCCESS,
  payload: event,
})
export const upsertSupportFail = error => ({
  type: UPSERT_SUPPORT_FAIL,
  payload: error,
})

// --------------------------------------------------Add File
export const addSupportFile = attachData => ({
  type: ADD_SUPPORT_FILE,
  payload: attachData,
})

export const addSupportFileSuccess = attachData => ({
  type: ADD_SUPPORT_FILE_SUCCESS,
  payload: attachData,
})
export const addSupportFileFail = error => ({
  type: ADD_SUPPORT_FILE_FAIL,
  payload: error,
})


// --------------------------------------------------Get Support Files
export const getSupportFiles = gasProjectId => ({
  type: GET_SUPPORT_FILES,
  payload: gasProjectId,
})

export const getSupportFilesSuccess = events => ({
  type: GET_SUPPORT_FILES_SUCCESS,
  payload: events,
})

export const getSupportFilesFail = error => ({
  type: GET_SUPPORT_FILES_FAIL,
  payload: error,
})

//-----------------------------------------------------Closed Support
export const closedSupport = data => ({
  type: CLOSED_SUPPORT,
  payload: data,
})

export const closedSupportSuccess = event => ({
  type: CLOSED_SUPPORT_SUCCESS,
  payload: event,
})
export const closedSupportFail = error => ({
  type: CLOSED_SUPPORT_FAIL,
  payload: error,
})


//-----------------------------------------------------get List support
export const getListSupport = (values) => ({
  type: GET_LIST_SUPPORT,
  payload: values
})

export const getListSupportSuccess = events => ({
  type: GET_LIST_SUPPORT_SUCCESS,
  payload: events,
})
export const getListSupportFail = error => ({
  type: GET_LIST_SUPPORT_FAIL,
  payload: error,
})

//-----------------------------------------------------Upsert ticket
export const upsertTicket = data => ({
    type: UPSERT_TICKET,
    payload: data,
  })
  
  export const upsertTicketSuccess = event => ({
    type: UPSERT_TICKET_SUCCESS,
    payload: event,
  })
  export const upsertTicketFail = error => ({
    type: UPSERT_TICKET_FAIL,
    payload: error,
  })
  
  //-----------------------------------------------------get List ticket
  export const getListTicket = (values) => ({
    type: GET_LIST_TICKET,
    payload: values
  })
  
  export const getListTicketSuccess = events => ({
    type: GET_LIST_TICKET_SUCCESS,
    payload: events,
  })
  export const getListTicketFail = error => ({
    type: GET_LIST_TICKET_FAIL,
    payload: error,
  })


// --------------------------------------------------DELETE Support File
export const deleteSupportFile = id => ({
  type: DELETE_SUPPORT_FILE,
  payload: id,
})
export const deleteSupportFileSuccess = id => ({
  type: DELETE_SUPPORT_FILE_SUCCESS,
  payload: id,
})
export const deleteSupportFileFail = error => ({
  type: DELETE_SUPPORT_FILE_FAIL,
  payload: error,
})


    //-----------------------------------------------------Reset
export const resetSupportFlag = () => {
    return {
      type: RESET_SUPPORT_FLAG,
    }
}

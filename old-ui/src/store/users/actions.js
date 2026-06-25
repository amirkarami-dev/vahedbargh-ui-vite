import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  INSERT_USER,
  INSERT_USER_FAIL,
  INSERT_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  RESET_USER_FLAG,
  GET_USER_BALANCE,
  GET_USER_BALANCE_FAIL,
  GET_USER_BALANCE_SUCCESS,
  GET_USER_FILES,
  GET_USER_FILES_SUCCESS,
  GET_USER_FILES_FAIL,
  ADD_USER_FILE,
  ADD_USER_FILE_SUCCESS,
  ADD_USER_FILE_FAIL,
  DELETE_USER_FILE,
  DELETE_USER_FILE_SUCCESS,
  DELETE_USER_FILE_FAIL,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
} from "./actionTypes"

//-------------------------------------------------------Get
export const getUSERs = () => ({
  type: GET_USERS,
})

export const getUSERsSuccess = events => ({
  type: GET_USERS_SUCCESS,
  payload: events,
})

export const getUSERsFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
})
//---------------------------------------------------------Insert
export const insertUSER = USER => ({
  type: INSERT_USER,
  payload: USER,
})

export const insertUSERSuccess = USER => ({
  type: INSERT_USER_SUCCESS,
  payload: USER,
})

export const insertUSERFail = error => ({
  type: INSERT_USER_FAIL,
  payload: error,
})

//---------------------------------------------------------Update
export const updateUSER = USER => ({
  type: UPDATE_USER,
  payload: USER,
})
export const updateUSERSuccess = USER => ({
  type: UPDATE_USER_SUCCESS,
  payload: USER,
})

export const updateUSERFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error,
})
//-------------------------------------------------------Delete
export const deleteUSER = USERId => ({
  type: DELETE_USER,
  payload: USERId,
})

export const deleteUSERSuccess = USERId => ({
  type: DELETE_USER_SUCCESS,
  payload: USERId,
})

export const deleteUSERFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})

//-------------------------------------------------------GetUserBalance
export const getUserBalance = () => ({
  type: GET_USER_BALANCE,
})

export const getUserBalanceSuccess = events => ({
  type: GET_USER_BALANCE_SUCCESS,
  payload: events,
})

export const getUserBalanceFail = error => ({
  type: GET_USER_BALANCE_FAIL,
  payload: error,
})

//-------------------------------------------------------Get User Info
export const getUserInfo = () => ({
  type: GET_USER_INFO,
})

export const getUserInfoSuccess = events => ({
  type: GET_USER_INFO_SUCCESS,
  payload: events,
})

export const getUserInfoFail = error => ({
  type: GET_USER_INFO_FAIL,
  payload: error,
})

// --------------------------------------------------Add User File
export const addUserFile = attachData => ({
  type: ADD_USER_FILE,
  payload: attachData,
})
export const addUserFileSuccess = attachData => ({
  type: ADD_USER_FILE_SUCCESS,
  payload: attachData,
})
export const addUserFileFail = error => ({
  type: ADD_USER_FILE_FAIL,
  payload: error,
})

// --------------------------------------------------DELETE User File
export const deleteUserFile = id => ({
  type: DELETE_USER_FILE,
  payload: id,
})
export const deleteUserFileSuccess = id => ({
  type: DELETE_USER_FILE_SUCCESS,
  payload: id,
})
export const deleteUserFileFail = error => ({
  type: DELETE_USER_FILE_FAIL,
  payload: error,
})

//-------------------------------------------------------GetUserFiles
export const getUserFiles = userId => ({
  type: GET_USER_FILES,
  payload:userId
})

export const getUserFilesSuccess = userFiles => ({
  type: GET_USER_FILES_SUCCESS,
  payload: userFiles,
})

export const getUserFilesFail = error => ({
  type: GET_USER_FILES_FAIL,
  payload: error,
})

//-----------------------------------------------------Reset
export const resetUSERFlag = error => {
  return {
    type: RESET_USER_FLAG,
  }
}

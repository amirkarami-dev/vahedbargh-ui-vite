import { GET_FILES_COMMON, GET_FILES_COMMON_FAIL, GET_FILES_COMMON_RESET, GET_FILES_COMMON_SUCCESS } from "./actionTypes";


export const getFilesCommon = path=>({
    type:GET_FILES_COMMON,
    payload:path
})

export const getFileCommonSuccess = events =>({
    type:GET_FILES_COMMON_SUCCESS,
    payload:events
})
export const getFileCommonReset = () =>({
    type:GET_FILES_COMMON_RESET,
})

export const getFileCommonFail = error =>({
    type:GET_FILES_COMMON_FAIL,
    payload:error
})
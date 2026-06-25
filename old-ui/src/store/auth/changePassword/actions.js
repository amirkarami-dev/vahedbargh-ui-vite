import { CHANGE_PASSWORD, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS, RESET_CHANGE_PASSWORD_FLAG } from "./actionTypes"

export const changePassword = data =>({
    type:CHANGE_PASSWORD,
    payload:data
})

export const changePasswordSuccess = events =>({
    type:CHANGE_PASSWORD_SUCCESS,
    payload:events
})

export const changePasswordFail = error =>({
    type:CHANGE_PASSWORD_FAIL,
    payload:error
})


export const resetChangePasswordFlag = () => ({
    type:RESET_CHANGE_PASSWORD_FLAG,
})
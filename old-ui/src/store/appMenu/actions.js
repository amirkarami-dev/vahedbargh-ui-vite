import { GET_APPMENUS, GET_APPMENUS_SUCCESS } from "./actionTypes";


export const getAppMenus = () => ({
    type:GET_APPMENUS,
})

export const getAppMenusSuccess = events =>({
    type:GET_APPMENUS_SUCCESS,
    payload:events
})
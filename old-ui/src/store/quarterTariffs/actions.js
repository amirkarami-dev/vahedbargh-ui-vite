import { GET_LIST_QUARTERTARIFF, GET_LIST_QUARTERTARIFF_FAIL, GET_LIST_QUARTERTARIFF_SUCCESS } from "./actionTypes"

//-----------------------------------------------------get List Executor
export const getListQuarterTariff = () =>({
    type:GET_LIST_QUARTERTARIFF
})

export const getListQuarterTariffSuccess = events =>({
    type:GET_LIST_QUARTERTARIFF_SUCCESS,
    payload:events
})
export const getListQuarterTariffFail = error =>({
    type:GET_LIST_QUARTERTARIFF_FAIL,
    payload:error
})
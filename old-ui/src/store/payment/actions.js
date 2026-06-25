import { GET_PAYMENT_MELLI, GET_PAYMENT_MELLI_FAIL, GET_PAYMENT_MELLI_PUBLIC, GET_PAYMENT_MELLI_SUCCESS, PAYMENT_MELLI_RESET } from "./actionTypes";


export const getPaymentMelli = amount =>({
    type:GET_PAYMENT_MELLI,
    payload:amount
})

export const getPaymentMelliPublic = values =>({
    type:GET_PAYMENT_MELLI_PUBLIC,
    payload:values
})

export const getPaymentMelliSuccess = redirectUrl =>({
    type:GET_PAYMENT_MELLI_SUCCESS,
    payload:redirectUrl
})

export const getPaymentMelliFail = error =>({
    type:GET_PAYMENT_MELLI_FAIL,
    payload:error
})



export const paymentMelliReset = () =>({
    type:PAYMENT_MELLI_RESET
})
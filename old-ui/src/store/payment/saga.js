

import { getPaymentMelli, getPaymentMelliPublic } from 'helpers/backend_helper';
import {takeEvery,put,call} from 'redux-saga/effects';
import { getPaymentMelliFail, getPaymentMelliSuccess, paymentMelliReset } from './actions';
import { GET_PAYMENT_MELLI, GET_PAYMENT_MELLI_PUBLIC } from './actionTypes';

function* onGetPaymentMelli({payload:amount}){
    try {
        const paymentUrl = yield call(getPaymentMelliPublic,{...values})
        const url = new URL(paymentUrl)
        const token = url.searchParams.get('token');
        yield put (getPaymentMelliSuccess(token))
        yield put (paymentMelliReset())
        
    } catch (error) {

        yield put (getPaymentMelliFail(error))
    }
}

function* onGetPaymentMelliPublic({payload:values}){
    try {
        const paymentUrl = yield call(getPaymentMelliPublic,{...values})
        const url = new URL(paymentUrl)
        const token = url.searchParams.get('token');
        yield put (getPaymentMelliSuccess(token))
        yield put (paymentMelliReset())
        
    } catch (error) {

        yield put (getPaymentMelliFail(error))
    }
}

function* saga(){
    yield takeEvery(GET_PAYMENT_MELLI,onGetPaymentMelli)
    yield takeEvery(GET_PAYMENT_MELLI_PUBLIC,onGetPaymentMelliPublic)
}

export default saga
import { getListQuarterTariffApi } from 'helpers/backend_helper';
import {takeEvery,put,call} from 'redux-saga/effects';
import { getListQuarterTariffFail, getListQuarterTariffSuccess } from './actions';
import { GET_LIST_QUARTERTARIFF } from './actionTypes';



function* onGetListQuarterTariff(){
    try
    {
        
       const result = yield call(getListQuarterTariffApi)
       
        yield put (getListQuarterTariffSuccess(result))
       
    } catch (error) {
        yield put(getListQuarterTariffFail(error))
    }
}

function* saga(){
    yield takeEvery(GET_LIST_QUARTERTARIFF,onGetListQuarterTariff)
}

export default saga;
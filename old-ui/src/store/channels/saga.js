import {takeEvery,put,call} from 'redux-saga/effects';

import {
    GET_CHANNELS,
    INSERT_CHANNEL,
    UPSERT_CHANNEL,
    UPDATE_CHANNEL,
    DELETE_CHANNEL,
    UPDATE_CHANNEL_AUCTION,
    UPDATE_CHANNEL_AUCTION_END
} from './actionTypes';

import {
    getChannelsSuccess,getChannelsFail,
    insertChannelSuccess,insertChannelFail, 
    upsertChannelSuccess,upsertChannelFail,
    deleteChannelSuccess, deleteChannelFail,
    updateChannelSuccess, updateChannelFail,
     updateChannelAuctionSuccess, 
     updateChannelAuctionEndSuccess

} from './actions'
import {  deleteChannel, getChannels, insertChannel, postAuctionResult, updateChannel, updateChannelAuction, upsertChannel } from 'helpers/backend_helper';
import { GET_CHANNEL_BYID } from 'helpers/url_helper';

function* fetchChannel(){
    try {
        const response = yield call(getChannels)
        yield put(getChannelsSuccess(response))
    } catch (error) {
        yield put(getChannelsFail(error))
    }
}
function* getChannelById({payload:channel}){
    try {
        const response = yield call(getChannelById,channel)
      console.log("getChannelById",response);
        //yield put(getChannelsSuccess(response))
    } catch (error) {
        yield put(getChannelsFail(error))
    }
}

function* onUpsertChannel({payload:channel}){
   
    try {
        const response = yield call(upsertChannel,channel)

        channel = {...channel,id:response}
     
        yield put(upsertChannelSuccess(channel))
      
    } catch (error) {
        yield put(upsertChannelFail(error))
    }
}

function* onUpdateChannel({payload:channel}){
    try {
     
        const response = yield call(updateChannel,channel)
     
        yield put(updateChannelSuccess(response))
    } catch (error) {
        yield put(updateChannelFail(error))
    }
}
function* onUpdateChannelAuction({payload:auction}){
    try {
       
        let response = yield call(updateChannelAuction,auction)
        response = {...auction,id:response}

        yield put(updateChannelAuctionSuccess(response))
    } catch (error) {
        yield put(updateChannelFail(error))
    }
}
function* onUpdateChannelAuctionEnd({payload:auctionResult}){
    try {
        console.log("onUpdateChannelAuctionEnd",auctionResult);
        const response = yield call(postAuctionResult,"https://aunow.alpha.auctionow.tech/api/AuctionResult/Import",auctionResult)
        console.log("response",response);
       // yield put(updateChannelAuctionEndSuccess(response))
    } catch (error) {
        console.log("error",error);
        yield put(updateChannelFail(error))
    }
}

function* onDeleteChannel({payload:id}){
    try {
        console.log("iddd",id);
        const response = yield call(deleteChannel,{id})
        
        yield put(deleteChannelSuccess({id}))
    } catch (error) {
        yield put(deleteChannelFail(error))
    }
}

function* channelsSaga() {
    yield takeEvery(GET_CHANNELS,fetchChannel);
    yield takeEvery(GET_CHANNEL_BYID,getChannelById);
    yield takeEvery(UPDATE_CHANNEL,onUpdateChannel);
    yield takeEvery(UPDATE_CHANNEL_AUCTION,onUpdateChannelAuction);
    yield takeEvery(UPDATE_CHANNEL_AUCTION_END,onUpdateChannelAuctionEnd);
    yield takeEvery(DELETE_CHANNEL,onDeleteChannel);
    yield takeEvery(UPSERT_CHANNEL,onUpsertChannel);

}

export default channelsSaga;
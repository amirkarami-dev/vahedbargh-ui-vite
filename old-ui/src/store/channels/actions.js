
import {
  GET_CHANNELS,
  GET_CHANNELS_FAIL,
  GET_CHANNELS_SUCCESS,
  GET_CHANNEL_BYID,

  INSERT_CHANNEL,
  INSERT_CHANNEL_FAIL,
  INSERT_CHANNEL_SUCCESS,
  UPSERT_CHANNEL,
  UPSERT_CHANNEL_FAIL,
  UPSERT_CHANNEL_SUCCESS,
  UPDATE_CHANNEL,
  UPDATE_CHANNEL_FAIL,
  UPDATE_CHANNEL_SUCCESS,
  UPDATE_CHANNEL_AUCTION_SUCCESS,
  UPDATE_CHANNEL_AUCTION,
  DELETE_CHANNEL,
  DELETE_CHANNEL_FAIL,
  DELETE_CHANNEL_SUCCESS,

  RESET_CHANNEL_FLAG,
  UPDATE_CHANNEL_AUCTION_END_SUCCESS,
  UPDATE_CHANNEL_AUCTION_END,
} from "./actionTypes"

//-------------------------------------------------------Get
export const getChannels = () => ({
  type: GET_CHANNELS,
})
export const getChannelById = channel => ({
    type: GET_CHANNEL_BYID,
    payload:channel
  })

export const getChannelsSuccess = events => ({
  type: GET_CHANNELS_SUCCESS,
  payload: events,
})

export const getChannelsFail = error => ({
  type: GET_CHANNELS_FAIL,
  payload: error,
})
//---------------------------------------------------------Upsert
export const upsertChannel = channel =>({
    
    type:UPSERT_CHANNEL,
    payload:channel
})

export const upsertChannelSuccess = channel =>({
    type:UPSERT_CHANNEL_SUCCESS,
    payload:channel
})

export const upsertChannelFail = error =>({
    type:UPSERT_CHANNEL_FAIL,
    payload:error
})
//---------------------------------------------------------Insert
export const insertChannel = channel =>({
    type:INSERT_CHANNEL,
    payload:channel
})

export const insertChannelSuccess = channel =>({
    type:INSERT_CHANNEL_SUCCESS,
    payload:channel
})

export const insertChannelFail = error =>({
    type:INSERT_CHANNEL_FAIL,
    payload:error
})

//---------------------------------------------------------Update
export const updateChannel = channel =>({
    type:UPDATE_CHANNEL,
    payload:channel
})
export const updateChannelSuccess = channel =>({
    type:UPDATE_CHANNEL_SUCCESS,
    payload:channel
})
export const updateChannelAuctionSuccess = channel =>({
    type:UPDATE_CHANNEL_AUCTION_SUCCESS,
    payload:channel
})
export const updateChannelAuctionEndSuccess = channel =>({
    type:UPDATE_CHANNEL_AUCTION_END_SUCCESS,
    payload:channel
})

export const updateChannelFail = error =>({
    type:UPDATE_CHANNEL_FAIL,
    payload:error
})
export const updateChannelAuction = channel =>({
    type:UPDATE_CHANNEL_AUCTION,
    payload:channel
})
export const updateChannelAuctionEnd = auctionResult =>({
    type:UPDATE_CHANNEL_AUCTION_END,
    payload:auctionResult
})
//-------------------------------------------------------Delete
export const deleteChannel = channelId =>({
    type:DELETE_CHANNEL,
    payload:channelId
})

export const deleteChannelSuccess = channelId =>({
    type:DELETE_CHANNEL_SUCCESS,
    payload:channelId
})

export const deleteChannelFail = error =>({
    type:DELETE_CHANNEL_FAIL,
    payload:error
})

//-----------------------------------------------------Reset
export const resetChannelFlag = error=>{
    return {
        type:RESET_CHANNEL_FLAG
    }
}


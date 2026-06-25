import { upsertArray } from "helpers/service_helper"
import {
  GET_CHANNELS,
  GET_CHANNELS_FAIL,
  GET_CHANNELS_SUCCESS,
  INSERT_CHANNEL,
  INSERT_CHANNEL_FAIL,
  INSERT_CHANNEL_SUCCESS,
  UPSERT_CHANNEL,
  UPSERT_CHANNEL_FAIL,
  UPSERT_CHANNEL_SUCCESS,
  UPDATE_CHANNEL,
  UPDATE_CHANNEL_FAIL,
  UPDATE_CHANNEL_SUCCESS,
  UPDATE_CHANNEL_AUCTION,
  UPDATE_CHANNEL_AUCTION_SUCCESS,
  DELETE_CHANNEL,
  DELETE_CHANNEL_FAIL,
  DELETE_CHANNEL_SUCCESS,
  RESET_CHANNEL_FLAG,
  UPDATE_CHANNEL_AUCTION_END,
  UPDATE_CHANNEL_AUCTION_END_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  lstChannels: [],
  error: "",
  success: "",
  loading: false,
  actionName:{}
}

const Channels = (state = INIT_STATE, action) => {
  switch (action.type) {
    //#region Reset
    case RESET_CHANNEL_FLAG:
      return {
        ...state,
        success: null,
      }
    //#endregion

    //#region get
    case GET_CHANNELS_SUCCESS:
      return {
        ...state,
        loading: false,
        lstChannels: action.payload,
      }

    case GET_CHANNELS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    //#endregion

    //#region Upsert
    case UPSERT_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        lstChannels:upsertArray(state.lstChannels,action.payload),
        success: "Add Channel Success",
      }
      
    case UPSERT_CHANNEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: "",
      }
    //#endregion


    //#region Insert
    case INSERT_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        lstChannels: [...state.lstChannels, action.payload],
        success: "Add Channel Success",
      }
    case INSERT_CHANNEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: "",
      }
    //#endregion

    //#region UPDATE
    case UPDATE_CHANNEL_AUCTION:
      return {
        ...state,
        loading: true,
      }
      case UPDATE_CHANNEL_AUCTION_END:
        return {
          ...state,
          loading: true,
        }
    case UPDATE_CHANNEL_AUCTION_SUCCESS:
      console.log("action.payload", state.lstChannels)
      return {
        ...state,
        actionName:{name:'OfferPrice',data:action.payload},
        success: "Update channel Success",
        loading: false,
        lstChannels: state.lstChannels.map((channel,index) =>{
          if(channel.id === action.payload.id)
          {
            let auction = [...channel.userAuctions];
            auction = [...auction,action.payload]
              channel = {...channel,basePriceChange:action.payload.offerPrice,userAuctions:auction}
              console.log("maaaaap",channel);
              return channel;
          }
          else{
            return channel;
          }
        }
          
           
        ),
      }
      case UPDATE_CHANNEL_AUCTION_END_SUCCESS:
        console.log("action.payload", action.payload)
        return {
          ...state,
          actionName:{name:'OfferPrice',data:action.payload},
          success: "Update channel Success",
          loading: false,
          lstChannels: state.lstChannels.map(channel =>
            channel.channelId === action.payload.channelId
              ? { channel, ...action.payload }
              : channel
          ),
        }
    case UPDATE_CHANNEL_SUCCESS:
      console.log("action.payload", action.payload)
      return {
        ...state,
        success: "Update channel Success",
        loading: false,
        lstChannels: state.lstChannels.map(channel =>
          channel.channelId === action.payload.channelId
            ? { channel, ...action.payload }
            : channel
        ),
      }

    case UPDATE_CHANNEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: "",
      }
    //#endregion

    //#region  DELETE
    case DELETE_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "Delete channel Success",
        lstChannels: state.lstChannels.filter(
          channel => channel.id !== action.payload.id
        ),
      }
    case DELETE_CHANNEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: "",
      }
    //#endregion

    default:
      return state
  }
}

export default Channels

import { GetCityIdWithSection, GetCityWithSection } from "hooks/returnCityName";
import {FILTER_ENGINEER, FILTER_LOADING} from "./actionTypes";

const {
  GET_LIST_ENGINEER,
  GET_LIST_ENGINEER_SUCCESS,
  GET_LIST_ENGINEER_FAIL,
  RESET_ENGINEER_FLAG,
  POST_ENGINEER_PAYMENT_CUSTOM,
  POST_ENGINEER_PAYMENT_CUSTOM_FAIL,
  POST_ENGINEER_PAYMENT_CUSTOM_SUCCESS,
  UPSERT_ENGINEER,
  UPSERT_ENGINEER_FAIL,
  UPSERT_ENGINEER_SUCCESS,
  UPSERT_ENG_HISTORY,
  UPSERT_ENG_HISTORY_SUCCESS,
  UPSERT_ENG_HISTORY_FAIL,
} = require("./actionTypes")

const INIT_STATE = {
  lstEngineer: [],
  lstEngineerDefault: [],
  error: null,
  success: null,
  loading: false,
}
const updateEngHistory = (lstEngineer,payload) => {
const findEngIndex = lstEngineer.findIndex(x=>x.id === payload.engId)
if(findEngIndex !== -1){
  if(payload.engHistory.id){
   const fineHistoryIndex =  lstEngineer[findEngIndex].engineerHistoryViewModel.findIndex(x=>x.id=== payload.engHistory.id )
   lstEngineer[findEngIndex].engineerHistoryViewModel[fineHistoryIndex] = {...lstEngineer[findEngIndex].engineerHistoryViewModel[fineHistoryIndex], ...payload.engHistory}
  }
  else{
    lstEngineer[findEngIndex].engineerHistoryViewModel.push(payload.engHistory)
  }
  return lstEngineer
}
}

const filterEngineer = (state,payload) => {
if(state.lstEngineerDefault?.length>0 ){
  let lstEng = JSON.parse(JSON.stringify(state.lstEngineerDefault))
  if(payload.fullName.length>0)
  lstEng = lstEng.filter(f=>f.fullName.includes(payload.fullName))
  
  if(payload.filterAssign){
    lstEng = lstEng.filter(f=> f.engFiles?.findIndex(x=>x.fileName === "F2.jpg")!== -1)
    console.log('lstEnglstEnglstEng', lstEng);
  }
  else if(payload.idSection !== 0){
    if(payload.filterAddress === 1){
      const idCity = GetCityIdWithSection(payload.idSection).Id
      
      lstEng = lstEng.filter(f=>GetCityIdWithSection(+f.idSection).Id === idCity)
    }
    if(payload.filterAddress === 2){
      
      lstEng = lstEng.filter(f=>+f.idSection === +payload.idSection)
    }
    
  }

 
  return lstEng
}
return state.lstEngineer
  
}

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //#region Call Action
    case POST_ENGINEER_PAYMENT_CUSTOM:
    case UPSERT_ENGINEER:
    case UPSERT_ENG_HISTORY:
      return {
        ...state,
        loading: true,
      }

    case GET_LIST_ENGINEER:
      return {
        ...state,
        loading: true,
        lstEngineer: [],
        lstEngineerDefault: [],        
      }
    //#endregion

    //#region SUCCESS
    case GET_LIST_ENGINEER_SUCCESS:
      return {
        ...state,
        lstEngineer: action.payload,
        lstEngineerDefault: action.payload,
        loading: false,
        success: "",
        error: null,
      }

    case POST_ENGINEER_PAYMENT_CUSTOM_SUCCESS:
    case UPSERT_ENGINEER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      }

      case UPSERT_ENG_HISTORY_SUCCESS:
        return {
          ...state,
          loading: false,
          lstEngineer:updateEngHistory(state.lstEngineer, action.payload),
          success: "اطلاعات کارشناسی انجام شد",
        }
    //#endregion


    //#region FAIL
    case GET_LIST_ENGINEER_FAIL:
    case POST_ENGINEER_PAYMENT_CUSTOM_FAIL:
    case UPSERT_ENGINEER_FAIL:
    case UPSERT_ENG_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload ? action.payload : "خطای پیش بینی نشده",
        success: "",
      }
    //#endregion

    case FILTER_ENGINEER:
      return {
        ...state,
        lstEngineer: filterEngineer(state,action.payload),
        loading: false,
        error: null,
        success: null,
      }

      case FILTER_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    //#region Reset
    case RESET_ENGINEER_FLAG:
      return {
        ...state,
        error: null,
        success: null,
      }
    //#endregion
    default:
      return state
  }

}



export default reducer

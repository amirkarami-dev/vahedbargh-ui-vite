import { arrayToTree, getUserMenu, mapArrayOmit } from "helpers/service_helper";
import _ from "lodash";
import { userRoutes } from "routes/allRoutes";

const { GET_APPMENUS_SUCCESS, GET_APPMENUS_FAIL, GET_APPMENUS } = require("./actionTypes");

const INIT_STATE ={
    lstAppMenu:[],
    error:"",
    success:"",
    loading:false,
    actionName:{}
}

const AppMenus =(state=INIT_STATE,action) =>{
switch (action.type) {
    case GET_APPMENUS:
     
        return{
            ...state,
            lstAppMenu:getUserMenu(mapArrayOmit(userRoutes,['component'])) 
        }
    case GET_APPMENUS_SUCCESS:
        return{
            ...state,
            loading:false,
        }
    case GET_APPMENUS_FAIL:
        return{
            ...state,
            loading:false,
            error:action.payload,
            success:"",
        }
        
    default:
        return state;
}

}

export default AppMenus
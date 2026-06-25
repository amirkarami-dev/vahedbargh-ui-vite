import { GET_FILES_COMMON_SUCCESS, GET_FILES_COMMON_FAIL,GET_FILES_COMMON_RESET } from "./actionTypes"


const INIT_STATE ={
    resByte:[],
    fileByte:"",
    error:"",
    success:"",
    loading:false,

}

const reducer =(state=INIT_STATE,action) =>{

    switch (action.type) {
       
        case GET_FILES_COMMON_SUCCESS:
            return{
                ...state,
                loading:false,
                fileByte:action.payload
            }
        case GET_FILES_COMMON_FAIL:
            return{
                ...state,
                error:action.payload
            }
            case GET_FILES_COMMON_RESET:
                return{
                    ...state,
                    fileByte:''
                }
        default:
            return state
    }
}

export default reducer
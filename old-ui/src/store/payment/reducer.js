const { GET_PAYMENT_MELLI_SUCCESS, GET_PAYMENT_MELLI_FAIL, PAYMENT_MELLI_RESET, GET_PAYMENT_MELLI } = require("./actionTypes");

const INIT_STATE ={
    paymentMelliUrl:'',
    error:'',
    success:'',
    loading:false,
    token: null
}


const reducer = (state=INIT_STATE,action)=>{
    switch (action.type) {
        case GET_PAYMENT_MELLI:
            return{
                ...state,
                loading:true,
            }
        case GET_PAYMENT_MELLI_SUCCESS:
            return{
                ...state,
                paymentMelliUrl:action.payload,
                loading:false,
                success:"لینک با موفقیت انجام شد",
                token: action.payload
            }
        case GET_PAYMENT_MELLI_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }



        case PAYMENT_MELLI_RESET:
            return{
                ...state,
                error:null,
                success:null,
                loading:false
            }
        default:
            return state
    
    }
}

export default reducer
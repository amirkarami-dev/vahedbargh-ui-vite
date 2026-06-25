const { REQREGISTER_USER, REQREGISTER_USER_SUCCESSFUL, REQREGISTER_USER_FAILED, SUBMIT_SMS, SUBMIT_SMS_SUCCESSFUL, SUBMIT_SMS_FAILED } = require("./actionTypes");


const initialState = {
    reqRegisterError:null,
    reqRegisterSuccessMsg:null,
    message:null,
    loading:false,
    referenceID:null,
    submitSmsError:null,
    mobileNumber:null,
    submitSmsSuccessMsg:null,
    smsVerified:false,
    submitSmsStatus:null,
}

const reqregister =(state = initialState,action)=>{
    switch (action.type) {
        case REQREGISTER_USER:
            state ={
                ...state,
                loading:true,
                reqRegisterError:null
            }
            break;
        case REQREGISTER_USER_SUCCESSFUL:
            console.log("action.payload.mobileNumber",action.payload);
            state={
                ...state,
                loading:false,
                referenceID:action.payload.referenceID,
                mobileNumber:action.payload.mobile,
                reqRegisterError:null,
                reqRegisterSuccessMsg:'send success'
            }
        
            break;
        case REQREGISTER_USER_FAILED:
            state={
                ...state,
                loading:false,
                reqRegisterError:action.payload,
                mobileNumber:null,
                referenceID:null
            }
            break;
    
        case SUBMIT_SMS:
            state ={
                ...state,
                loading:true,
                submitSmsError:null,
            }
            break;
        case SUBMIT_SMS_SUCCESSFUL:
                state = {
                    ...state,
                    loading:false,
                    submitSmsError:null,
                    smsVerified:true,
                    submitSmsStatus:action.payload
                }
                break;
        case SUBMIT_SMS_FAILED:
                    state = {
                        ...state,
                        loading:false,
                        smsVerified:false,
                        submitSmsError:action.payload
                    }
                    break;

            default:
            state={...state}
            break;
    }
    return state
}

export default reqregister
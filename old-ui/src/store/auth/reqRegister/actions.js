import { REQREGISTER_USER, 
    REQREGISTER_USER_FAILED,
     REQREGISTER_USER_SUCCESSFUL,
     SUBMIT_SMS,
     SUBMIT_SMS_SUCCESSFUL,
     SUBMIT_SMS_FAILED
    
    } from "./actionTypes"


export const reqRegisterUser = (mobile, history) =>{
    return{
        type:REQREGISTER_USER,
        payload:{mobile, history}
    }
}


export const reqRegisterUserSuccessful = event =>{
    return {
        type:REQREGISTER_USER_SUCCESSFUL,
        payload:event,
    }
}

export const reqRegisterUserFailed = error =>{
    return{
        type:REQREGISTER_USER_FAILED,
        payload:error,
    }
}

//---------------------------verify sms
export const submitSms = (code, history,mobileNumber) =>{
    return{
        type:SUBMIT_SMS,
        payload:{code, history,mobileNumber}
    }
}
export const submitSmsSuccessful = result=>{
    
    return{
        type:SUBMIT_SMS_SUCCESSFUL,
        payload:result
    }
}
export const submitSmsFailed = error =>{
    return{
        type:SUBMIT_SMS_FAILED,
        payload:error
    }
}
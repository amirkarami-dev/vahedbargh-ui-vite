export default function authHeader(xaccesstoken) {

  const obj = JSON.parse(localStorage.getItem("authUser"))
 
  if (obj && obj.accessToken) {
    if(xaccesstoken){
     
    const Xtoken = {...obj,accessToken:xaccesstoken}
   
    localStorage.setItem("authUser", JSON.stringify(Xtoken))
    //console.log("xaccesstoken",xaccesstoken,obj);
    return { Authorization: Xtoken.accessToken,RefreshToken:Xtoken.refreshToken }
  
    }
    //console.log("accessToken1122",obj.accessToken,"::::::re token::::",obj.refreshToken);
    return { Authorization: obj.accessToken,RefreshToken:obj.refreshToken }
  } else {
    return {}
  }
}

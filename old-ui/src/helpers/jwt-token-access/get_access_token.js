

export default function getAccessToken(){
    const obj = JSON.parse(localStorage.getItem("authUser"));
    if (obj) {
        return obj.accessToken;
        
    }
}
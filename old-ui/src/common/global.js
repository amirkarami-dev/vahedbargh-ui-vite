export function setInvalidateEmpty(e) {
    if (e.type === 'invalid'){
        e.target.setCustomValidity("خطای فیلد خالی")
    }
    else{
        e.target.setCustomValidity("")
    }

}

export function setInvalidateLength(e,val) {

    if (e.target.value.length !== val){
        e.target.setCustomValidity(`فیلد باید ${val} رقم باشد`)
    }
    else{
        e.target.setCustomValidity("")
    }

}
export function setInvalidateLengthThan(e,val) {

    if (e.target.value.length < val){
        e.target.setCustomValidity(`فیلد باید ${val} رقم باشد`)
    }
    else{
        e.target.setCustomValidity("")
    }

}

export function getApiUrlElectProjectFiles(fileName){
    return process.env.REACT_APP_API_URL + "/Users/GetPhysicalFileS3?path=Upload/ElectProjects/" + fileName
}

export function getUrlElectProjectFiles(fileName){
    return "Upload/ElectProjects/" + fileName
}

export function getApiUrlSupportFiles(fileName) {
    return (
      process.env.REACT_APP_API_URL +
      "/Users/GetPhysicalFileS3?path=Upload/Supports/" +
      fileName
    )
  }

export function getApiUrlElectProjectFilesArray(fileNames){
    return process.env.REACT_APP_API_URL + "/Users/GetPhysicalFileS3?path="+ fileNames.join(',')
}
export function getApiUrlUserFiles(fileName){
    return process.env.REACT_APP_API_URL + "/Users/GetPhysicalFileS3?path=Upload/UserFiles/" + fileName
}
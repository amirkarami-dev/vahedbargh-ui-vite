import React, { useState } from "react"
import { AvField } from "availity-reactstrap-validation"
const SingleFileUpload = ({setHandleFile,label}) => {
 
  const [errorMessage, setErrorMessage] = useState("فایل را انتخاب کنید")
  const [invalidFile, setInvalidFile] = useState(false)
  function handleFileChange({ target: { files } }) {
    const [{ size, name }] = files
  
    const maxSize = 50000
    if (size < maxSize) {
 
      setInvalidFile(false)
   
      setHandleFile(files)
    
    } else {
       
      setInvalidFile(true)
      setErrorMessage("حجم فایل باید کمتر از 500کیلوبایت باشد")
    }
  }
  return (
    <>
      <AvField
        required
        label={label}
        type="file"
        name="fileName"
        className="form-control"
        onChange={handleFileChange}
        
        errorMessage={errorMessage}
      />

    </>
  )
}

export default SingleFileUpload

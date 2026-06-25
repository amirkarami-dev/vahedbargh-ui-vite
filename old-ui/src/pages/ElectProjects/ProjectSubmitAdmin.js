import React, { useState, useReducer, useEffect } from "react"
import {
  Box,
  Button
} from "@mui/material"


const ProjectSubmitAdmin = ({ rowData, mainProps, setErrorMessage }) => {



  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        size="small"
        disabled={rowData.isOk}
        onClick={async () => {
            const { onSubmitElectProjectByAdmin } = mainProps
            if(window.confirm("بعد از تایید مجری میتواند نقشه را برای شرکت برق ارسال نماید مطمن هستید؟")){
                await onSubmitElectProjectByAdmin(rowData.id)
            }
           
        }}
      >
        تایید
      </Button>
    </Box>
  )
}

export default ProjectSubmitAdmin

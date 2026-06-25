import React, { useState, useReducer, useEffect } from "react"
import {
  Box,
  Button
} from "@mui/material"


const ProjectSendToElect = ({ rowData, mainProps, setErrorMessage }) => {



  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{}}
        onClick={async () => {
            const { onSendElectProjectToElect } = mainProps
            if(window.confirm("از ارسال پرونده به شرکت برق  اطمینان دارید؟")){
                await onSendElectProjectToElect(rowData.row.fileNumber)
            }
           
        }}
        disabled={!rowData.row.isOk}
      >
        ارسال به شرکت برق 
      </Button>
    </Box>
  )
}

export default ProjectSendToElect

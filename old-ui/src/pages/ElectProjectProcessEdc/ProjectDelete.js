import React, { useState, useReducer, useEffect } from "react"
import {
  Box,
  Button
} from "@mui/material"


const ProjectDelete = ({ rowData, mainProps }) => {



  return (
    <Box>
      <Button
        variant="contained"
        color="warning"
        size="small"
        onClick={async () => {
            const { onDeleteElectProject } = mainProps
            if(window.confirm("بعد از تایید پرونده حذف و مبلغ ایجاد پرونده به کیف پول برگشت داده میشود!!")){
                await onDeleteElectProject(rowData.row.id)
            }
           
        }}
      >
        حذف
      </Button>
    </Box>
  )
}

export default ProjectDelete

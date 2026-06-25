import React, { useState, useReducer, useEffect } from "react"
import {
  Box,
  Button
} from "@mui/material"
import { Checkbox } from 'antd'

const ResolvedDefect = ({ rowData, mainProps, setErrorMessage }) => {



  return (
    <Box>
      <Checkbox
        disabled={rowData.row.projectLevelEnum !== 3}
        checked={rowData.row.projectLevelEnum !== 3 || rowData.row.isSolvedDefect}
        onChange={async () => {
            const { onResolvedDefect } = mainProps
            if(window.confirm("در صورت تایید واحد برق این نقص را تخصیص میدهد")){
                await onResolvedDefect({gpId:rowData.row.id, resolved:!rowData.row.isSolvedDefect})
            }
           
        }}
      >
      </Checkbox>

    </Box>
  )
}

export default ResolvedDefect

import React, { useState, useEffect } from "react"
import {
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Button,
  Link,
} from "@mui/material"
import { DataGrid, GridToolbar, faIR } from "@mui/x-data-grid"
import { getApiUrlUserFiles } from "common/global"

import { downloadImage } from "helpers/service_helper"
import { DeleteOutline, GetAppOutlined } from "@mui/icons-material"
import { UserFileType } from "models/types/user-file-type"


const GridUserFiles = React.memo(gridProps => {
  const [pageSize, setPageSize] = useState(8)
  const { props } = gridProps
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>فایل</TableCell>
            <TableCell align="right">نوع فایل</TableCell>
            <TableCell align="right">لینک دانلود</TableCell>
            <TableCell align="right">حذف</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gridProps.lstUserFiles.map(row => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  height={100}
                  width={100}
                  src={`${getApiUrlUserFiles(
                    row.folderName + "/" + row.fileName
                  )}`}
                />
              </TableCell>
              <TableCell align="right">{row.fileTypeName}</TableCell>
              <TableCell  align="right">
                <Button             
                  startIcon={<GetAppOutlined />}
                  href={`${getApiUrlUserFiles(
                    row.folderName + "/" + row.fileName
                  )}`}
                  variant="contained"
                  onClick={(e) => downloadImage(e, row.fileName)}
                  download
                >
                  دانلود
                </Button>
              </TableCell>
              <TableCell  align="right">
              <Button             
        startIcon={<DeleteOutline />}
        variant="outlined"
        onClick={() => props.onDeleteUserFile(row.id)}
        download
      >
        حذف
      </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})

export default GridUserFiles

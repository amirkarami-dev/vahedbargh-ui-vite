import React, { useState } from "react"
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material"
import { getApiUrlElectProjectFiles } from "common/global"


export const columnsGridFiles = () => [
  {
    field: "fileName",
    headerName: "نام",
    width: 120,
  },
  {
    field: "id",
    headerName: "نام فایل",
  },
]

const GridFiles = React.memo(gridProps => {
  const { props } = gridProps
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>فایل</TableCell>
            <TableCell align="right">نوع فایل</TableCell>
            <TableCell align="right">لینک دانلود</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gridProps.lstElectProjectFiles.map(row => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {row.fileName.split(".")[1] === "pdf"?"PDF":<img
                  height={100}
                  width={100}
                  src={`${getApiUrlElectProjectFiles(
                    row.folderName + "/" + row.fileName
                  )}`}
                />}
                
              </TableCell>
              <TableCell align="right">{`${props.t(
                "enums." + row.fileTypeName
              )}`}</TableCell>
              <TableCell  align="center">
              <a  target="_blank" download href={`${getApiUrlElectProjectFiles(
                    row.folderName + "/" + row.fileName
                  )}`} > دانلود</a>
                  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})

export default GridFiles

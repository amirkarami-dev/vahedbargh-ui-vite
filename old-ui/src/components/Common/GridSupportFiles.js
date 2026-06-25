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
import { getApiUrlSupportFiles } from "common/global"

import { downloadImage } from "helpers/service_helper"
import { GetAppOutlined } from "@mui/icons-material"
import { FileElectProjectType } from "models/types/file-elect-project-type"
import { Popconfirm } from "antd"
import { DeleteTwoTone } from "@ant-design/icons"

export const renderDeleteButton = (params, props) => {
  return <Popconfirm
  title="حذف تخصیص"
  description="مطمئنی یا نه؟"
  onConfirm={() => props.onDeleteSupportFiles(params.id)}
  okText="Yes"
  cancelText="No"

>  <Button icon={<DeleteTwoTone />} /> </Popconfirm>
 }

export const columnsGridSupportFiles = () => [
  {
    field: "fileName",
    headerName: "نام",
    width: 120,
  },
  {
    field: "id",
    headerName: "نام فایل",
  },
  {
    title: "حذف",
    key: "delete",
    render: params => renderDeleteButton(params, props),
    width: "3rem",
  }
]

const GridSupportFiles = React.memo(gridProps => {
  const [pageSize, setPageSize] = useState(8)
  const { props } = gridProps
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>فایل</TableCell>
            <TableCell align="right">نوع فایل</TableCell>
            <TableCell align="right">نام فایل</TableCell>
            <TableCell align="right">لینک دانلود</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gridProps.lstSupportFiles.map(row => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img
                  height={100}
                  width={100}
                  src={`${getApiUrlSupportFiles(
                    row.folderName + "/" + row.fileName
                  )}`}
                />
              </TableCell>
              <TableCell align="right">{`${props.t(
                "enums." + FileElectProjectType[row.fileTypeEnum]
              )}`}</TableCell>
              <TableCell align="right">{row.fileName.split('-')[1]}</TableCell>
              <TableCell  align="right">
                <Button             
                  startIcon={<GetAppOutlined />}
                  href={`${getApiUrlSupportFiles(
                    row.folderName + "/" + row.fileName
                  )}`}
                  variant="contained"
                  onClick={(e) => downloadImage(e, row.fileName)}
                  download
                >
                  دانلود
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})

export default GridSupportFiles

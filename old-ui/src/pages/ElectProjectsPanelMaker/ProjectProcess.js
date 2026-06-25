import React, { useState, useReducer, useEffect } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  LinearProgress,
  CircularProgress,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material"
import { setInvalidateEmpty } from "common/global"
import GridFiles from "components/Common/GridFilesAnt"
import FilePondUpload from "components/Common/FilePondUpload"
import { getCurrentUser, enumToArray } from "helpers/service_helper"
import { FileElectProjectType } from "models/types/file-elect-project-type"
import { Delete } from "@mui/icons-material"

function createData(
    name,
    calories,
    fat,
    carbs,
    protein
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('fullName', 159, 6.0, 24, 4.0),
    createData('solarRegisterDate', 237, 9.0, 37, 4.3),
    createData('inspectionTypeName', 262, 16.0, 24, 6.0),
    createData('cellPhone', 305, 3.7, 67, 4.3),
    createData('projectLevelName', 305, 3.7, 67, 4.3),
    createData('inspectionStatusName', 305, 3.7, 67, 4.3),
    createData('defect', 305, 3.7, 67, 4.3),
  ];

export const ProjectProcess = ({ rowData, mainProps }) => {
  const [open, setOpen] = useState(false)
  return (
    <Box>
    
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{}}
        onClick={ () => {
          setOpen(!open)
        }}
        disabled= { rowData.electProjectProcessViewModel.length == 0}
      >
        کارشناس
      </Button>

      <Dialog open={open}     
       onClose={() => {
          setOpen(false)
        }}
        sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "900px", // Set your width here
              },
            },
          }}
        >
        <DialogTitle>
          تخصیص مربوط به پرونده: {rowData.fileNumber}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>لیست تخصیص ها</DialogContentText>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">توضیحات کارشناس</TableCell>
                    <TableCell>نام ونام خانوادگی</TableCell>
                    <TableCell align="center">شماره موبایل</TableCell>
                    <TableCell align="center">تاریخ تخصیص</TableCell>
                    <TableCell align="center">تاریخ انجام</TableCell>
                    <TableCell align="center">مرحله پرونده</TableCell>
                    <TableCell align="center">وضعیت</TableCell>
                    <TableCell align="center">نقص دارد</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.electProjectProcessViewModel && rowData.electProjectProcessViewModel.map(row => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center"><Button onClick={()=>{alert(row.description?row.description:'نوشته نشده')}}> نظر کارشناس</Button></TableCell>
                      <TableCell align="center">{row.engName}</TableCell>
                      <TableCell align="center">{row.cellPhone}</TableCell>
                      <TableCell align="center">{row.solarDateDeliverEngineer}</TableCell>
                      <TableCell align="center">{row.solarDateDeliverOffice}</TableCell>
                      <TableCell align="center">{row.projectLevelName}</TableCell>
                      <TableCell align="center">{row.inspectionStatusName}</TableCell>
                      <TableCell align="center">{row.defect?'بله':'خیر'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

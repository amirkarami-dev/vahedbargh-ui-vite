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
  Grid,
  InputLabel,
  CircularProgress,
  MenuItem,
  Select,
  Alert
} from "@mui/material"
import GridFiles from "components/Common/GridFilesAnt"
import FilePondUpload from "components/Common/FilePondUpload"
import { getCurrentUser, enumToArray } from "helpers/service_helper"
import { UserFileType } from "models/types/user-file-type"
import GridUserFiles from "components/Common/GridUserFiles"
import UserFileTypeEnum from "models/types/UserFileTypeEnum"
import { getEnumByValue, getEnums } from "helpers/utilities"

export const UserFiles = ({ rowData, mainProps }) => {
  const { lstUserFiles } = mainProps
  const style = {
    // border: "2px solid #000",
    p: 2,
  }
  const [files, setFiles] = useState([])
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      fileTypeEnum: 0,
      title: getEnumByValue(UserFileTypeEnum, 0).label,
    }
  )
  const [open, setOpen] = useState(false)
  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormInput({ [name]: newValue })
  }
  const saveToDatabase = async values => {
    const { onAddUserFile } = mainProps
    let file = files[0].file
    const fileName = getEnumByValue(UserFileTypeEnum, values.fileTypeEnum).enum
    let formData = new FormData()
    formData.append(
      "file",
      file,
      fileName +
      "-" +
      file.name.substr(0, file.name.lastIndexOf(".")) +
      "." +
      file.name.split(".")[file.name.split(".").length - 1]
    )
    formData.append("name", fileName)
    formData.append("title", values.title)
    formData.append("des", `Upload with-${rowData.userId}`)
    formData.append("userFileTypeEnum", fileName)
    formData.append("FolderName", "UserFiles")
    formData.append(
      "FileName",
      fileName +
        // "-" +
        // file.name.substr(0, file.name.lastIndexOf(".")) +
         "." +
         file.name.split(".")[file.name.split(".").length - 1]
    )
    formData.append("userId", rowData.userId)
    formData.append("toUserId", rowData.userId)
    await onAddUserFile(formData)
  }
  const handleSubmitForm = async (event, values) => {

    if (files[0]) {
    await saveToDatabase(formInput)
    // await onGetUserFiles(formInput.idElectProject)
    }else {
      setErrorMessage("برای ذخیره ابتدا فایل را بارگذاری کنید")
    }
  }
  return (
    <Box>
      <Button
        variant="outlined"
        size="small"
        onClick={async () => {
          const { onGetUserFiles } = mainProps
          await onGetUserFiles(rowData.userId)
          setOpen(!open)
        }}
      >
        فایلها
      </Button>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
    
          <DialogTitle>
            مدیریت فایل ها: {rowData.fullName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>لیست فایلها </DialogContentText>
            <Grid item xs={12}>
                {mainProps.errorUser ? (
                  <Alert severity="error">{mainProps.errorUser}</Alert>
                ) : null}
                {mainProps.successUser ? (
                  <Alert severity="success">{mainProps.successUser}</Alert>
                ) : null}
              </Grid>
            <Box sx={{ ...style }}>
              <GridUserFiles lstUserFiles={lstUserFiles} props={mainProps} />
            </Box>
           <Box>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                <FormControl size="small" fullWidth>
                    <InputLabel id="select-label-fileTypeEnum">
                      نوع فایل
                    </InputLabel>
                    <Select
                      labelId="select-label-fileTypeEnum"
                      name="fileTypeEnum"
                      value={
                        formInput.fileTypeEnum ? formInput.fileTypeEnum : 0
                      }
                      label="نوع فایل"
                      onChange={handleInput}
                    >
                  {lstUserFiles && 
                        getEnums(UserFileTypeEnum).map(e => {
                     
                          if (
                            !lstUserFiles.find(f => f.fileTypeEnum === e.value)
                          ) {
                            return (
                              <MenuItem key={e.value} value={e.value}>
                                {e.label}
                              </MenuItem>
                            )
                          }
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                {formInput.fileTypeEnum !== 0 && (
                <FilePondUpload
                  setFiles={setFiles}
                  maxFileSize="4500KB"
                  allowMultiple={false}
                  maxFiles={1}
                  acceptedFileTypes={["image/png", "image/jpeg", "application/pdf"]}
                  imagePreviewMaxHeight={600}
                  labelText={`${getEnumByValue(UserFileTypeEnum, formInput.fileTypeEnum).label} را اینجا بکشید`}
                  waterMark={false}
                />)}
              </Grid>
                
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions>
            <Box sx={{ display: "flex" }}>
              {mainProps.loading ? (
                <CircularProgress disableShrink />
              ) : (
                <Button    disabled={formInput.fileTypeEnum === 0} 
                onClick={()=>handleSubmitForm()}
                >
                  ذخیره
                </Button>
              )}
            </Box>
          </DialogActions>
      
      </Dialog>
    </Box>
  )
}

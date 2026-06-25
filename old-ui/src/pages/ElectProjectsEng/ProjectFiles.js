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
  Alert,
  IconButton
} from "@mui/material"
import { setInvalidateEmpty } from "common/global"
import GridFiles from "components/Common/GridFilesAnt"
import CloseIcon from "@mui/icons-material/Close"
import FilePondUpload from "components/Common/FilePondUpload"
import { getCurrentUser, enumToArray } from "helpers/service_helper"
import { FileElectProjectType } from "models/types/file-elect-project-type"

export const ProjectFiles = ({ rowData, mainProps }) => {
  const { lstElectProjectFiles } = mainProps
  const style = {
    // border: "2px solid #000",
    p: 2,
  }
  const [files, setFiles] = useState([])
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      idElectProject: rowData.row.idElectProject,
      fileTypeEnum: 2
    }
  )
  const [open, setOpen] = useState(false)
  const [fileElectProjectTypes, setFileElectProjectTypes] = useState([])
  useEffect(() => {
    console.log('rowData.row',rowData.row);
    setFileElectProjectTypes(enumToArray(FileElectProjectType))
  }, [])

  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormInput({ [name]: newValue })
  }
  const saveToDatabase = async (values) => {
    const { onAddFileEngProjectSingle } = mainProps
      let file = files[0].file
     const fileName = FileElectProjectType[values.fileTypeEnum]
      let formData = new FormData()
      formData.append("file", file, fileName + "." + file.name.split('.')[file.name.split('.').length-1])
      formData.append("electProjectId", JSON.stringify([values.idElectProject]))
      formData.append("name","elec-" + fileName)
      formData.append("des", `Upload with-${getCurrentUser().sid}`)
      formData.append("fileTypeEnum",fileName)
      formData.append("FolderName", "ElectProjects")
      formData.append("FileName", fileName + "." + file.name.split('.')[file.name.split('.').length-1])
      formData.append("userId", getCurrentUser().sid)
      formData.append("toUserId", getCurrentUser().sid)
      
     await onAddFileEngProjectSingle(formData)
  }
  const handleSubmitForm = async (event, values) => {
    event.preventDefault()

    if (formInput.idElectProject.length !== 0 && files[0]) {
    await saveToDatabase(formInput)
    // await onGetProjectFiles(formInput.idElectProject)
    }else {
      setErrorMessage("برای ذخیره ابتدا فایل را بارگذاری کنید")
    }
  }
  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{}}
        onClick={async () => {
          const { onGetProjectFiles } = mainProps

          await onGetProjectFiles(rowData.row.idElectProject)

          setOpen(!open)
        }}
      >
        فایل
      </Button>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <form onSubmit={handleSubmitForm}>
          <DialogTitle>
          <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
            مدیریت فایل های پرونده: {rowData.row.fileNumber}
              
              </Box>
              <Box>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>لیست فایلهای پرونده</DialogContentText>
            <Grid item xs={12}>
                {mainProps.error ? (
                  <Alert severity="error">{mainProps.error}</Alert>
                ) : null}
                {mainProps.success ? (
                  <Alert severity="success">{mainProps.success}</Alert>
                ) : null}
              </Grid>
            <Box sx={{ ...style }}>
              <GridFiles lstElectProjectFiles={lstElectProjectFiles} props={mainProps} />
            </Box>
            {(rowData.row.projectLevel !== 2  || getCurrentUser().role ==='Engineer' ) && <Box>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                <p className="text-info">نیازی به آپلود روی نقشه نیست</p>
                  <FormControl size="small" fullWidth>
               
                    <InputLabel id="select-label-fileTypeEnum">
                      نوع فایل
              
                    </InputLabel>
                    <Select
                      labelId="select-label-fileTypeEnum"
                      name="fileTypeEnum"
                      value={
                        formInput.fileTypeEnum ? formInput.fileTypeEnum : 2
                      }
                      label="نوع فایل"
                      onChange={handleInput}
                    >
                      {fileElectProjectTypes &&
                        fileElectProjectTypes.map(row => {
                          if (row.id !== 0 && row.id !== 3  && row.id !==5 && row.id !== 6  ) {
                            return (
                              <MenuItem key={row.id} value={row.id}>
                                {mainProps.t("enums." + row.name)}
                              </MenuItem>
                            )
                          }
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                <FilePondUpload
                  setFiles={setFiles}
                  maxFileSize="4500KB"
                  allowMultiple={false}
                  maxFiles={1}
                  acceptedFileTypes={["image/png", "image/jpeg", "application/pdf"]}
                  imagePreviewMaxHeight={600}
                  labelText={`${mainProps.t("enums." + FileElectProjectType[formInput.fileTypeEnum])} را اینجا بکشید`}
                  waterMark={false}
                />
              </Grid>
                
              </Grid>
            </Box>}
          </DialogContent>

          <DialogActions>
            <Box sx={{ display: "flex" }}>
              {mainProps.loading ? (
                <CircularProgress disableShrink />
              ) : (
            
                <Button disabled={rowData.row.projectLevel === 2 && getCurrentUser().role !=='Engineer'} variant="contained" type="submit">
                  ذخیره
                </Button>
              )}
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

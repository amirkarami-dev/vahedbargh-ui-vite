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
import { FileElectProjectType } from "models/types/file-elect-project-type"
import { Modal } from "antd"

export const ProjectFiles = ({ rowData, mainProps, setErrorMessage }) => {
  const { lstElectProjectFiles } = mainProps
  const style = {
    // border: "2px solid #000",
    p: 2,
  }
  const [files, setFiles] = useState([])
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      idElectProject: rowData.id,
      fileTypeEnum: 2
    }
  )
  const [open, setOpen] = useState(false)
  const [fileElectProjectTypes, setFileElectProjectTypes] = useState([])
  useEffect(() => {
    setFileElectProjectTypes(enumToArray(FileElectProjectType).filter(x => x.id <4))
  }, [])

  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    console.log(name, newValue)
    setFormInput({ [name]: newValue })
  }
  const saveToDatabase = async (values) => {
    const { onAddFileElectProjectSingle } = mainProps
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
     await onAddFileElectProjectSingle(formData)
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
        variant="outlined"
        size="small"
        onClick={async () => {
          const { onGetProjectFiles } = mainProps

          await onGetProjectFiles(rowData.id)

          setOpen(!open)
        }}
      >
        فایلها
      </Button>

      <Modal
        open={open}
        title={"مدیریت فایل های پرونده:" + rowData.fileNumber}
        onCancel={() => setOpen(false)}
        onClose={() => {
          setOpen(false)
        }}
        footer={null}
      >
        <form onSubmit={handleSubmitForm}>
        <DialogTitle>
            مدیریت فایل های پرونده: {rowData.fileNumber}
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
            {(rowData.projectLevelEnum !== 2  || getCurrentUser().role ==='Administrator') && <Box>
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
                            return (
                              <MenuItem key={row.id} value={row.id}>
                                {mainProps.t("enums." + row.name)}
                              </MenuItem>
                            )
                        
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
                <Button variant="contained" type="submit">
                  ذخیره
                </Button>
              )}
            </Box>
          </DialogActions>
        </form>
      </Modal>
    </Box>
  )
}

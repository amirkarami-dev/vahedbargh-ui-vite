import React, { useState, useEffect, useRef, useReducer } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import {
  Box,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  CircularProgress,
  MenuItem,
  Select,
  Alert,
} from "@mui/material"
import Container from "@mui/material/Container"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import { DataGrid, GridToolbar, faIR } from "@mui/x-data-grid"
import {
  addUserFile,
  deleteUserFile,
  getUserFiles,
  resetUSERFlag,
} from "store/actions"
import { columnsGrid } from "./columns"
import { getCurrentUser, enumToArray } from "helpers/service_helper"
import { UserFileType } from "models/types/user-file-type"
import FilePondUpload from "components/Common/FilePondUpload"
import UserFileTypeEnum from "models/types/UserFileTypeEnum"
import { getEnumByValue, getEnums } from "helpers/utilities"

const Index = props => {
  const { lstUserFiles } = props
  const [files, setFiles] = useState([])
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      fileTypeEnum: 0,
      title: getEnumByValue(UserFileTypeEnum, 0).label,
    }
  )

  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    console.log(name, newValue)
    setFormInput({ [name]: newValue })
    if (name === "fileTypeEnum")
      setFormInput({
        ["title"]: getEnumByValue(UserFileTypeEnum, newValue).label,
      })
  }
  const saveToDatabase = async values => {
    const { onAddUserFile } = props
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
    formData.append("des", `Upload with-${getCurrentUser().sid}`)
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
    formData.append("userId", getCurrentUser().sid)
    formData.append("toUserId", getCurrentUser().sid)
    await onAddUserFile(formData)
  }
  const handleSubmitForm = async (event, values) => {
    event.preventDefault()

    if (files[0]) {
      await saveToDatabase(formInput)
    } else {
      setErrorMessage("برای ذخیره ابتدا فایل را بارگذاری کنید")
    }
  }

  const [errorMessage, setErrorMessage] = useState(null)
  const [pageSize, setPageSize] = React.useState(8)
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
      props.onResetUSERFlag()
    }, 3000)
  }, [errorMessage, props.success, props.error])
  useEffect(() => {
    props.onGetUserFiles()
  }, [])

  return (
      <div className="page-content">
        <MetaTags>
          <title>Project | electUnit</title>
        </MetaTags>
        <Container maxWidth="xl">
          {/* Render Breadcrumb */}
          <form onSubmit={handleSubmitForm}>
            <Box
              sx={{
                backgroundColor: "#fff",
                margin: 2,
                paddingInline: 2,
                borderRadius: 2,
                "& .even": {
                  backgroundColor: "rgb(240, 255, 255)",
                },
                "& .super-app.negative": {
                  backgroundColor: "rgba(157, 255, 118, 0.49)",
                  color: "#1a3e72",
                  fontWeight: "600",
                },
                "& .super-app.positive": {
                  backgroundColor: "#d47483",
                  color: "#1a3e72",
                  fontWeight: "600",
                },
              }}
            >
              <Breadcrumb
                title={props.t("MyFiles")}
                breadcrumbItem="فایل های من"
              />
           <Alert color="warning" >توجه فرمایید بعد از آپلود فایل جهت آپلود مجدد در قسمت پشتیبانی درخواست دهید</Alert>
              
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  {errorMessage ? (
                    <Alert severity="info">{errorMessage}</Alert>
                  ) : null}
                  {props.error ? (
                    <Alert severity="error">{props.error}</Alert>
                  ) : null}
                  {props.success ? (
                    <Alert severity="success">{props.success}</Alert>
                  ) : null}
                </Grid>
                <Grid item xs={4}>
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
                              <MenuItem key={e.enum} value={e.value}>
                                {e.label}
                              </MenuItem>
                            )
                          }
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    size="small"
                    required
                    value={formInput.title ? formInput.title : ""}
                    name="title"
                    label="موضوع فایل"
                    type="text"
                    onChange={handleInput}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  {props.loading ? (
                    <CircularProgress disableShrink />
                  ) : (
                    <Button
                      variant="contained"
                      disabled={formInput.fileTypeEnum === 0}
                      type="submit"
                    >
                      ذخیره
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                <Alert type="info">عکس پرسنلی از نوع jpg انتخاب شود</Alert>

                  {formInput.fileTypeEnum !== 0 && (
                    <FilePondUpload
                      setFiles={setFiles}
                      maxFileSize="4500KB"
                      allowMultiple={false}
                      maxFiles={1}
                      acceptedFileTypes={["image/png", "image/jpeg", "application/pdf"]}
                      imagePreviewMaxHeight={600}
                      labelText={`${
                        getEnumByValue(UserFileTypeEnum, formInput.fileTypeEnum).label
                      } را اینجا بکشید`}
                      waterMark={false}
                    />
                  )}
                </Grid>

                <Grid style={{ height: 600, width: "100%" }} item xs={12}>
                  <DataGrid
                    rows={lstUserFiles}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    localeText={
                      faIR.components.MuiDataGrid.defaultProps.localeText
                    }
                    columns={columnsGrid(props)}
                    pageSize={pageSize}
                    onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                    rowsPerPageOptions={[8, 12, 50, 100]}
                    pagination
                    getRowClassName={params =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "even"
                        : "odd"
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </form>
        </Container>
      </div>
  )
}

Index.propTypes = {
  lstUserFiles: PropTypes.any,
  t: PropTypes.any,
  error: PropTypes.any,
  success: PropTypes.any,
  onAddUserFile: PropTypes.func,
  onDeleteUserFile: PropTypes.func,
  onGetUserFiles: PropTypes.func,
  onResetUSERFlag: PropTypes.func,
}

const mapStateToProps = ({ USERs }) => ({
  lstUserFiles: USERs.lstUserFiles,
  error: USERs.error,
  success: USERs.success,
})

const mapDispatchToProps = dispatch => ({
  onGetUserFiles: searchValue => dispatch(getUserFiles(searchValue)),
  onAddUserFile: attachData => dispatch(addUserFile(attachData)),
  onDeleteUserFile: id => dispatch(deleteUserFile(id)),
  onResetUSERFlag: searchValue => dispatch(resetUSERFlag(searchValue)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Index))

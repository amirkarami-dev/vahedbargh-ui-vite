import React, { useState, useEffect, useRef, useReducer } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { Alert, Box, Button, Grid } from "@mui/material"
import Container from "@mui/material/Container"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import { DataGrid, GridToolbar, faIR } from "@mui/x-data-grid"
import {
  addFileElectProject,
  addFileElectProjectSingle,
  getElectProjectFiles,
  getElectProjectsEng,
  getEppByEpId,
  getUserBalance,
  resetElectProjectFlag,
  updateElectProjectDetails,
  updateElectProjectEng,
  updateProcessDefectStage,
  updateProcessExpertStage,
  updateProcessMapStage,
  upsertElectProject,
} from "store/actions"
import "./electProjectEng.scss"
import { mobileColumn } from "./MobileColumns"
import { green, red } from "@mui/material/colors"
import { Col, Divider, Radio, Row, Space } from "antd"
import { serializeQuery } from "helpers/service_helper"
import { ReloadOutlined } from "@ant-design/icons"
const ElectProjectsEng = props => {
  const {
    lstElectProjects,
    currentIdElectProject,
    userBalance,
    t,
    matches_sm,
    loading,
  } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const [pageSize, setPageSize] = React.useState(25)

  const [expanded, setExpanded] = useState("")
  const handleChangeExpand = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      projectLevelEnum: 1,
      inspectionStatusEnum: 0,
    }
  )
  const handleFilterInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value

    setFilterInput({ [name]: newValue })
  }
  const handleSearchFilterInput = async () => {
    let searchQuery = {
      ...filterInput,
    }
    const params = serializeQuery(searchQuery)
    props.onGetElectProjectsEng(params)
  }
  //#region useEffect
  useEffect(() => {
    handleSearchFilterInput()
  }, [filterInput])
  useEffect(() => {
    setTimeout(() => {
      if (props.error) window.alert(props.error)
      if (props.success === "تغییرات با موفقیت انجام شد")
        window.alert(props.success)
      props.onresetElectProjectFlag()
    }, 5000)
  }, [errorMessage, props.success, props.error])

  //#endregion
  return (
      <div className="page-content">
        <MetaTags>
          <title>Project | electUnit</title>
        </MetaTags>
        <Container maxWidth="xl">
          {/* Render Breadcrumb */}
          <Breadcrumb
              title={props.t("electUnit")}
              breadcrumbItem="پرونده های من"
            />
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
                backgroundColor: green[400],
                color: "#1a3e72",
                fontWeight: "600",
              },
              "& .super-app.disapproval": {
                backgroundColor: red[200],
                color: "#1a3e72",
                fontWeight: "600",
              },
              height: "100%",
            }}
          >
            <Row>
              <Col span={24}>
          <li className="text-info pt-1"> الزامات فقط در مرحله ممیزی و کارشناس مربوطه قابل تغییر می باشد.</li>
          <li className="text-info pt-1"> در صورت نیاز به پکیج تا زمانیکه تابلوساز شماره سریال را وارد نکند اعلام نظر نقشه قابل ثبت نیست.</li>
          <li className="text-info pt-1"> لطفا شماره سریال را بررسی فرمایید در صورت نیاز میتوانید آنرا اصلاح کنید.</li>
          <li className="text-danger pt-1"> لطفا قبل از ذخیر اعلام نظر مرحله کارشناسی به مشخصات مالک،طبقه،واحد،برق  مصرفی دقت فرمایید در صورت مغایرت آن را اصلاح کنید.</li>

              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col  className="mt-2">
                <Radio.Group
                  name="projectLevelEnum"
                  onChange={handleFilterInput}
                  value={filterInput.projectLevelEnum}
                  optionType="button"
                  buttonStyle="solid"
                >
                 
                    <Radio.Button value={1}> کارشناسی</Radio.Button>
                    <Radio.Button value={2}> نقشه</Radio.Button>
                    <Radio.Button value={3}> نقص</Radio.Button>
          
                </Radio.Group>
              </Col>

              <Col className="mt-2">
                <Radio.Group
                  name="inspectionStatusEnum"
                  onChange={handleFilterInput}
                  value={filterInput.inspectionStatusEnum}
                  optionType="button"
                  buttonStyle="solid"
                >
         
                    <Radio.Button value={0}> انتظار تایید</Radio.Button>
                    <Radio.Button value={1}> تایید شده</Radio.Button>
                    <Radio.Button value={2}>عدم تعلق انشعاب</Radio.Button>
           
                </Radio.Group>
              </Col>
              <Col className="mt-2">
                <Button variant="contained" size="small" onClick={()=>window.location.reload()} startIcon={<ReloadOutlined />}>رفرش صفحه</Button>
              </Col>
            </Row>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {errorMessage && errorMessage ? (
                  <Alert severity="info">{errorMessage}</Alert>
                ) : null}
                {props.error && props.error ? (
                  <Alert severity="error">{props.error}</Alert>
                ) : null}
                {props.success && props.success ? (
                  <Alert severity="success">{props.success}</Alert>
                ) : null}
              </Grid>
              <Grid className="elec-project-eng-custom" item xs={12}>
                <DataGrid
                  autoHeight={true}
                  rows={lstElectProjects}
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
                  columns={mobileColumn({
                    props,
                    matches_sm,
                    handleChangeExpand,
                    expanded,
                  })}
                  pageSize={pageSize}
                  onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                  rowsPerPageOptions={[25, 50, 100]}
                  pagination
                  getRowClassName={params =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                  }
                  getRowHeight={() => {
                    if (matches_sm) return "auto"
                    return 52
                  }}
                  loading={loading}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>

  )
}

ElectProjectsEng.propTypes = {
  lstElectProjects: PropTypes.any,
  lstElectProjectFiles: PropTypes.any,
  t: PropTypes.any,
  error: PropTypes.any,
  success: PropTypes.any,
  loading: PropTypes.any,
  onUpsertElectProject: PropTypes.func,
  onresetElectProjectFlag: PropTypes.func,
  onGetElectProjectsEng: PropTypes.func,
  onGetUserBalance: PropTypes.func,
  onAddFileElectProject: PropTypes.func,
  onUpdateProcessExpertStage: PropTypes.func,
  onUpdateProcessMapStage: PropTypes.func,
  onUpdateProcessDefectStage: PropTypes.func,
  onGetProjectFiles: PropTypes.func,
  onUpdateElectProjectDetails: PropTypes.func,
  onAddFileEngProjectSingle: PropTypes.func,
}

const mapStateToProps = ({ ElectProjects, USERs, ElectProjectProcesses }) => ({
  lstElectProjects: ElectProjects.lstElectProjects,
  lstElectProjectFiles: ElectProjects.lstElectProjectFiles,
  lstEpp: ElectProjectProcesses.lstEpp,
  currentIdElectProject: ElectProjects.currentIdElectProject,
  error: ElectProjects.error,
  success: ElectProjects.success,
  loading: ElectProjects.loading,
  userBalance: USERs.userBalance,
  onUpdateElectProjectEng: PropTypes.func,
  onGetEppByEpId: PropTypes.func,
})

const mapDispatchToProps = dispatch => ({
  onUpsertElectProject: electProject => dispatch(upsertElectProject(electProject)),
  onGetElectProjectsEng: searchValue => dispatch(getElectProjectsEng(searchValue)),
  onresetElectProjectFlag: () => dispatch(resetElectProjectFlag()),
  onGetUserBalance: () => dispatch(getUserBalance()),
  onAddFileElectProject: attachData => dispatch(addFileElectProject(attachData)),
  onAddFileEngProjectSingle: attachData =>
    dispatch(addFileElectProjectSingle(attachData)),
  onUpdateProcessExpertStage: process =>
    dispatch(updateProcessExpertStage(process)),
  onUpdateProcessMapStage: process => dispatch(updateProcessMapStage(process)),
  onUpdateProcessDefectStage: process =>
    dispatch(updateProcessDefectStage(process)),
  onGetProjectFiles: electProjectId => dispatch(getElectProjectFiles(electProjectId)),
  onUpdateElectProjectDetails: process =>
    dispatch(updateElectProjectDetails(process)),
  onUpdateElectProjectEng: electProject =>
    dispatch(updateElectProjectEng(electProject)),
    onGetEppByEpId: electProjectId => dispatch(getEppByEpId(electProjectId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ElectProjectsEng))

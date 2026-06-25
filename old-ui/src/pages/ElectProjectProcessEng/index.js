import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"
import { Card, Space, Typography, notification } from "antd"
import Breadcrumb from "../../components/Common/Breadcrumb"
import {
  addFileElectProject,
  addFileElectProjectSingle,
  getElectProjectFiles,
  getEppByEpId,
  getUserBalance,
  resetElectProcessFlag,
  resetElectProjectFlag,
  updateElectProjectDetailsNew,
  updateElectProjectEng,
  updateProcessDefectStageNew,
  updateProcessExpertStageNew,
  updateProcessMapStageNew,
  upsertElectProject,
} from "store/actions"
import "./electProjectEng.scss"
import ListElectProjectProcessEng from "./ListElectProjectProcessEng"

notification.config({
  duration: 1,
  rtl: true,
})

const ElectProjectProcessEng = props => {
  const {
    matches_sm,
    onResetElectProjectFlag,
    onResetElectProcessFlag,
    triggerReload,
    success,
    error,
    t,
  } = props

  const [api, contextHolder] = notification.useNotification()
  const [expanded, setExpanded] = useState("")

  const openNotification = (type, placement, message) => {
    api[type]({ message, placement })
  }

  const handleChangeExpand = panel => (_event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  useEffect(() => {
    if (success) openNotification("success", "top", success)
    if (error) openNotification("error", "top", error)
    onResetElectProjectFlag()
    onResetElectProcessFlag()
  }, [success, error])

  return (
    <div className="page-content eng-process-page">
      <MetaTags>
        <title>پرونده | واحد برق</title>
      </MetaTags>

      <Breadcrumb title={t("electUnit")} breadcrumbItem="تخصیص" />
      {contextHolder}

      <Card className="eng-hero-card" bodyStyle={{ padding: matches_sm ? 14 : 18 }}>
        <Space direction="vertical" size={4}>
          <Typography.Title level={5} className="eng-hero-title">
            مدیریت فرآیند پرونده های کارشناسی برق
          </Typography.Title>
          <Typography.Paragraph className="eng-hero-subtitle">
            فایل های جواز و نقشه برق را کنترل کنید، سپس مراحل بررسی، چک لیست و اعلام نظر را تکمیل نمایید.
          </Typography.Paragraph>
        </Space>
      </Card>

      <ListElectProjectProcessEng
        openNotification={openNotification}
        matches_sm={matches_sm}
        expanded={expanded}
        handleChangeExpand={handleChangeExpand}
        reload={triggerReload}
      />
    </div>
  )
}

const mapStateToProps = ({ ElectProjects, USERs, ElectProjectProcesses }) => ({
  lstProjectProcessEng: ElectProjectProcesses.lstProjectProcessEng,
  lstElectProjectFiles: ElectProjects.lstElectProjectFiles,
  currentIdElectProject: ElectProjects.currentIdElectProject,
  error: ElectProjectProcesses.error,
  success: ElectProjectProcesses.success,
  loading: ElectProjectProcesses.loading,
  userBalance: USERs.userBalance,
  triggerReload: ElectProjectProcesses.triggerReload,
})

const mapDispatchToProps = dispatch => ({
  onUpsertElectProject: electProject => dispatch(upsertElectProject(electProject)),
  onResetElectProjectFlag: () => dispatch(resetElectProjectFlag()),
  onGetUserBalance: () => dispatch(getUserBalance()),
  onAddFileElectProject: attachData => dispatch(addFileElectProject(attachData)),
  onAddFileEngProjectSingle: attachData => dispatch(addFileElectProjectSingle(attachData)),
  onUpdateProcessExpertStageNew: process => dispatch(updateProcessExpertStageNew(process)),
  onUpdateProcessMapStageNew: process => dispatch(updateProcessMapStageNew(process)),
  onUpdateProcessDefectStageNew: process => dispatch(updateProcessDefectStageNew(process)),
  onGetProjectFiles: electProjectId => dispatch(getElectProjectFiles(electProjectId)),
  onUpdateElectProjectDetailsNew: process => dispatch(updateElectProjectDetailsNew(process)),
  onUpdateElectProjectEng: electProject => dispatch(updateElectProjectEng(electProject)),
  onGetEppByEpId: electProjectId => dispatch(getEppByEpId(electProjectId)),
  onResetElectProcessFlag: () => dispatch(resetElectProcessFlag()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ElectProjectProcessEng))

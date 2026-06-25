import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"

import Breadcrumb from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import {
  projectProcess,
  resetElectProcessFlag,
} from "store/actions"
import "./electProject.scss"

import {
  Layout,
  notification,
} from "antd"
const { Header, Footer, Sider, Content } = Layout
import ListElectProject from "./ListElectProject"
notification.config({
  duration: 1,
  rtl: true,
})
const Index = props => {
  const {
    matches_sm,
    loading,
    selectedProject,
    countSelectedProject,
    onProjectProcess,
    flatSelectedProject,
    triggerReload,
    onResetElectProcessFlag,
  } = props
  const [api, contextHolder] = notification.useNotification()
  const [errorMessage, setErrorMessage] = useState(null)
  const [idEngineer, setIdEngineer] = useState(null)
  const openNotification = (type, placement, message) => {
    api[type]({
      message,
      placement,
    })
  }
  useEffect(() => {
    if (props.success) openNotification("success", "top", props.success)
    if (props.error) openNotification("error", "top", props.error)
    if (errorMessage) openNotification("warning", "top", props.error)
    onResetElectProcessFlag()
  }, [errorMessage, props.success, props.error])

  const contentStyle = {
    backgroundColor: "#fff",
    margin: 2,
    paddingInline: 2,
    borderRadius: 2,
  }

  const saveProjectProcess = async () => {
    console.log("flatSelectedProject", flatSelectedProject.projectId)
    if (flatSelectedProject.projectId.length > 0 && idEngineer !== null)
      await onProjectProcess({
        IdElectProjects: flatSelectedProject.projectId,
        IdEngineer: idEngineer,
      })
  }

  return (
      <div className="page-content">
        <MetaTags>
          <title>پرونده | واحد برق</title>
        </MetaTags>
        <Layout>
          <Breadcrumb title={props.t("electUnit")} breadcrumbItem="تخصیص" />
          {contextHolder}
          <Content>
              <ListElectProject
                openNotification={openNotification}
                reload={triggerReload}
              />
          </Content>
        </Layout>
      </div>
  )
}

Index.propTypes = {
  loading: PropTypes.any,
  t: PropTypes.any,
  error: PropTypes.any,
  success: PropTypes.any,
  triggerReload: PropTypes.any,
  selectedProject: PropTypes.any,
  countSelectedProject: PropTypes.any,
  onProjectProcess: PropTypes.func,
  onResetElectProcessFlag: PropTypes.func,
}

const mapStateToProps = ({ USERs, ElectProjectProcesses, Engineers, ElectProjects }) => ({
  lstEngineer: Engineers.lstEngineer,
  loading: ElectProjectProcesses.loading,
  lstEpp: ElectProjectProcesses.lstEpp,
  error: ElectProjectProcesses.error,
  success: ElectProjectProcesses.success,
  userBalance: USERs.userBalance,
  selectedProject: ElectProjectProcesses.selectedProject,
  countSelectedProject: ElectProjectProcesses.countSelectedProject,
  flatSelectedProject: ElectProjectProcesses.flatSelectedProject,
  triggerReload: ElectProjects.triggerReload,
})

const mapDispatchToProps = dispatch => ({
  onProjectProcess: data => dispatch(projectProcess(data)),
  onResetElectProcessFlag: () => dispatch(resetElectProcessFlag()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Index))

import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"

import Breadcrumb from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import {
  getEppByEpId,
  getListEngineer,
  projectProcess,
  resetElectProcessFlag
} from "store/actions"
import { getCurrentUser } from "helpers/service_helper"
import "./electProjectProcess.scss"

import {
  Layout,
  Button,
  Row,
  Col,
  notification,
  Radio,
  InputNumber,
  Divider
} from "antd"
import {
  DeliveredProcedureOutlined,
} from "@ant-design/icons"
const { Header, Footer, Sider, Content } = Layout
import { ListEngineer } from "./ListEngineer"
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
    triggerReload‌ByProject,
    triggerReload‌ByProcess,
    onResetElectProcessFlag,
  } = props
  const [api, contextHolder] = notification.useNotification()
  const [errorMessage, setErrorMessage] = useState(null)
  const [idEngineer, setIdEngineer] = useState(null)
  const [projectProcessType, setProjectProcessType] = useState(0)
  const [ertAmount, setErtAmount] = useState(0)
  const [projectLevelEnum, setProjectLevelEnum] = useState(0)
  const [isTestAndDelivery, setIsTestAndDelivery] = useState(false)
  const openNotification = (type, placement, message) => {
    api[type]({
      message,
      placement,
    })
  }


  useEffect(() => {
    if(flatSelectedProject.length>0){
     const testAndDelivery = flatSelectedProject.filter(item=>item.isTestAndDelivery===true)
     if(testAndDelivery && testAndDelivery.length>0){
      setIsTestAndDelivery(true)
     }
    }
  }, [flatSelectedProject])

  useEffect(() => {
    setProjectProcessType(projectLevelEnum <= 1 ? projectLevelEnum : -1)
  }, [projectLevelEnum])
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
        projectProcessTypeEnum: projectProcessType,
        ertAmount: ertAmount || 0,
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
            reload={triggerReload‌ByProject + triggerReload‌ByProcess}
            setProjectLevelEnum={setProjectLevelEnum}
          />
        </Content>
      </Layout>
    </div>
  )
}


const mapStateToProps = ({ USERs, ElectProjectProcesses,ElectProjects, Engineers }) => ({
  lstEngineer: Engineers.lstEngineer,
  loading: ElectProjectProcesses.loading,
  lstEpp: ElectProjectProcesses.lstEpp,
  error: ElectProjectProcesses.error,
  success: ElectProjectProcesses.success,
  userBalance: USERs.userBalance,
  selectedProject: ElectProjectProcesses.selectedProject,
  countSelectedProject: ElectProjectProcesses.countSelectedProject,
  flatSelectedProject: ElectProjectProcesses.flatSelectedProject,
  triggerReload‌ByProcess: ElectProjectProcesses.triggerReload,
  triggerReload‌ByProject:  ElectProjects.triggerReload
})

const mapDispatchToProps = dispatch => ({
  onGetEppByEpId: electProjectId => dispatch(getEppByEpId(electProjectId)),
  onGetListEngineer: filter => dispatch(getListEngineer(filter)),
  onProjectProcess: data => dispatch(projectProcess(data)),
  onResetElectProcessFlag: () => dispatch(resetElectProcessFlag()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Index))

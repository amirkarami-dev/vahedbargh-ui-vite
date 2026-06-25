import React, { useState, useEffect } from "react"
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
const { Content } = Layout
import ListElectProject from "./ListElectProject"
notification.config({
  duration: 1,
  rtl: true,
})
const Index = props => {
  const {
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



  return (
      <div className="page-content">
        <MetaTags>
          <title>پرونده | واحد برق</title>
        </MetaTags>
        <Layout>
          <Breadcrumb title={props.t("electUnit")} breadcrumbItem="لیست پرونده ها" />
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


const mapStateToProps = ({ ElectProjects }) => ({
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

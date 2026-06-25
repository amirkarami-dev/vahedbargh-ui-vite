import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import {
  getListProjectProcessEng,
  resetElectProcessFlag,
} from "store/actions"
import {
  Col,
  Layout,
  Row,
  notification,
} from "antd"
import ListElectProjectProcessEng from "./ListElectProjectProcessEng"
notification.config({
  duration: 1,
  rtl: true,
})
const ElectProjectProcessList = props => {
  const {
    t,
    matches_sm,
    loading,
    triggerReload
  } = props
  const [api, contextHolder] = notification.useNotification()
  const [errorMessage, setErrorMessage] = useState(null)

  const openNotification = (type,placement,message) => {
    api[type]({
      message,
      placement
    });
  };
  const [expanded, setExpanded] = useState("")
  const handleChangeExpand = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  //#region useEffect

  useEffect(() => {
    if(props.success) openNotification('success','top',props.success)
    if(props.error) openNotification('error','top',props.error)
    if(errorMessage) openNotification('warning','top',props.error)

  }, [errorMessage, props.success, props.error])

  //#endregion
  return (
      <div className="page-content">
        <MetaTags>
          <title>پرونده | واحد برق </title>
        </MetaTags>

        <Layout>
          <Breadcrumb title={props.t("electUnit")} breadcrumbItem="لیست تخصیص" />
          {contextHolder}
          <Row>
            <Col span={24}>

    <ListElectProjectProcessEng 
              openNotification={openNotification} 
              matches_sm={matches_sm} 
              expanded={expanded} 
              handleChangeExpand={handleChangeExpand}  
              reload ={triggerReload}
              />
            </Col>
          </Row>
        </Layout>
      </div>
  )
}


const mapStateToProps = ({ ElectProjects, ElectProjectProcesses }) => ({

  triggerReload: ElectProjectProcesses.triggerReload

})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ElectProjectProcessList))

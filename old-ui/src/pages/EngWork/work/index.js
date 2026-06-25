import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import Breadcrumb from "../../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import { getListProjectProcessEng, resetElectProcessFlag } from "store/actions"
import { Col, Layout, Row, notification } from "antd"
import ListEngWork from "./ListEngWork"
notification.config({
  duration: 1,
  rtl: true,
})
const EngWork = props => {
  const { t, matches_sm, loading, triggerReload } = props
  const [api, contextHolder] = notification.useNotification()
  const [errorMessage, setErrorMessage] = useState(null)

  const openNotification = (type, placement, message) => {
    api[type]({
      message,
      placement,
    })
  }
  const [expanded, setExpanded] = useState("")
  const handleChangeExpand = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  //#region useEffect

  useEffect(() => {
    if (props.success) openNotification("success", "top", props.success)
    if (props.error) openNotification("error", "top", props.error)
    if (errorMessage) openNotification("warning", "top", props.error)
  }, [errorMessage, props.success, props.error])

  //#endregion
  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>کارکرد مهندسین | واحد برق </title>
        </MetaTags>

        <Layout>
          <Breadcrumb title="کارکرد" breadcrumbItem="کارکرد مهندسین" />
          {contextHolder}
          <Row>
            <Col span={24}>
              <ListEngWork
                openNotification={openNotification}
                matches_sm={matches_sm}
                expanded={expanded}
                handleChangeExpand={handleChangeExpand}
              />
            </Col>
          </Row>
        </Layout>
      </div>
    </>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EngWork))

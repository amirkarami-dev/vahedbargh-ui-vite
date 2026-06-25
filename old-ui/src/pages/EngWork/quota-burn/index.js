import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"
import { Col, Row, notification } from "antd"
import EngQuotaBurnList from "./EngQuotaBurnList"
notification.config({
  duration: 1,
  rtl: true,
})
const EngQuotaBurn = props => {
  const { t, matches_sm, loading, triggerReload, openNotification } = props
  const [api, contextHolder] = notification.useNotification()
  const [errorMessage, setErrorMessage] = useState(null)


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
          <Row>
            <Col span={24}>
              <EngQuotaBurnList
                openNotification={openNotification}
                matches_sm={matches_sm}
                expanded={expanded}
                handleChangeExpand={handleChangeExpand}
              />
            </Col>
          </Row>

  )
}


const mapStateToProps = ({ Quotas}) => ({
  error: Quotas.error,
  success: Quotas.success,
  loading: Quotas.loading,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EngQuotaBurn))

import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"

import Breadcrumb from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import "./support.scss"

import { Layout, Button, Row, Col, notification, Space, Alert } from "antd"
const { Content } = Layout
import SupportList from "./SupportList"
notification.config({
  duration: 1,
  rtl: true,
})
const Index = props => {
  const { countSelectedProject, triggerReload } = props
  const [api, contextHolder] = notification.useNotification()
  const [errorMessage, setErrorMessage] = useState(null)
  const [idEngineer, setIdEngineer] = useState(null)
  const openNotification = (type, placement, message) => {
    api[type]({
      message,
      placement,
    })
  }

  const contentStyle = {
    backgroundColor: "#fff",
    margin: 2,
    paddingInline: 2,
    borderRadius: 2,
  }

  return (
    <div className="page-content">
      <MetaTags>
        <title>واحد برق | پشتیبانی</title>
      </MetaTags>

      <Layout>
        <Content style={contentStyle}>
          {contextHolder}
          <SupportList
            openNotification={openNotification}
            reload={triggerReload}
          />
        </Content>
      </Layout>
    </div>
  )
}

const mapStateToProps = ({ Supports }) => ({
  triggerReload: Supports.triggerReload,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Index))

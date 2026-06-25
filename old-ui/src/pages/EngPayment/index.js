import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"

import Breadcrumb from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import "./eng-payment.scss"

import { Layout, notification } from "antd"
const { Content } = Layout
import EngPaymentList from "./eng-payment-list"
notification.config({
  duration: 1,
  rtl: true,
})
const Index = props => {
  const {
    countSelectedProject,
    triggerReload,
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



  return (
      <div className="page-content">
        <MetaTags>
          <title>واحد برق | پرداختی</title>
        </MetaTags>

        <Layout>
          <Breadcrumb title="پرداختی" breadcrumbItem="مدیریت پرداختی" />
          {contextHolder}
              <EngPaymentList
                openNotification={openNotification}
                reload={triggerReload}
              />
        </Layout>
      </div>
  )
}

const mapStateToProps = ({ EngPayment }) => ({
  triggerReload: EngPayment.triggerReload,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Index))

import React from "react"
import { Tabs, Layout } from "antd"
import { notification } from "antd"
import Work from "./work"
import QuotaBurn from "./quota-burn"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"
import { getCurrentUser } from "helpers/service_helper"



notification.config({
  duration: 1,
  rtl: true,
})

const Index = props => {
  const { t, openNotification, matches_sm } = props
  return (
    <div className="page-content">
 
      <Layout>
        <Tabs
        type="card"
         destroyInactiveTabPane={true} tabBarGutter={16}>
          <Tabs.TabPane tab="کارکرد مهندسین" key="1">
            <Work openNotification={openNotification} />
          </Tabs.TabPane>
          {getCurrentUser().role === "Administrator" && 
          <Tabs.TabPane tab="مدیریت سوخت سهمیه ها" key="2">
            <QuotaBurn openNotification={openNotification}  />
          </Tabs.TabPane>
          }
        </Tabs>
      </Layout>
    </div>
  )
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Index))

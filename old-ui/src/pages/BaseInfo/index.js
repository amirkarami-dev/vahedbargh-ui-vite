import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import {
  ConfigProvider,
  Card,
  Tabs,
  Alert,
  Space,
  Typography,
  Breadcrumb,
} from "antd"
import { withRouter } from "react-router-dom"
//i18n
import { withTranslation } from "react-i18next"
import Engineers from "./engineers"
import "./engineers/baseInfo.scss"

const { Title } = Typography

const BaseInfo = props => {
  const { t, openNotification } = props
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => setErrorMessage(null), 3000)
    return () => clearTimeout(timeout)
  }, [errorMessage])

  const tabItems = [
    {
      key: "engineers",
      label: "لیست کارشناسان",
      children: <Engineers translate={t} openNotification={openNotification} />,
    },
  ]

  return (
    <div className="page-content base-info-page">
      <MetaTags>
        <title> واحد برق | اطلاعات پایه</title>
      </MetaTags>
      <ConfigProvider
        direction="rtl"
        theme={{ token: { colorPrimary: "#004943", borderRadius: 8 } }}
      >
        <div className="base-info-container">
          <Card className="base-info-header-card" bordered={false}>
            <Space direction="vertical" size={4} style={{ width: "100%" }}>
              <Breadcrumb
                items={[{ title: t("BaseInfo") }, { title: "لیست کارشناسان" }]}
              />
              <Title level={4} style={{ margin: 0 }}>
                اطلاعات پایه
              </Title>
            </Space>
            {errorMessage ? (
              <Alert
                style={{ marginTop: 12 }}
                type="error"
                showIcon
                message={errorMessage}
              />
            ) : null}
            {props.error ? (
              <Alert
                style={{ marginTop: 12 }}
                type="error"
                showIcon
                message={props.error}
              />
            ) : null}
            {props.success ? (
              <Alert
                style={{ marginTop: 12 }}
                type="success"
                showIcon
                message={props.success}
              />
            ) : null}
          </Card>

          <Card
            className="base-info-body-card"
            bordered={false}
            style={{ marginTop: 16 }}
          >
            <Tabs defaultActiveKey="engineers" items={tabItems} />
          </Card>
        </div>
      </ConfigProvider>
    </div>
  )
}

BaseInfo.propTypes = {
  t: PropTypes.any,
  openNotification: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
}

export default withRouter(withTranslation()(BaseInfo))

import React, {  } from "react"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import EngineerList from "./engineer-list"
import {
  notification,
} from "antd"
notification.config({
  duration: 1,
  rtl: true,
})

const Engineers = props => {

    const { t, openNotification, matches_sm } = props
  return (

<EngineerList  translate={t} openNotification={openNotification} />

  )
}

export default withRouter(withTranslation()(Engineers))


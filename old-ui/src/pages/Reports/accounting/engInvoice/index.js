import React, {  } from "react"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import Report from "./report"

const EngInvoices = props => {

    const { t } = props
  return (
    <>
<Report  translate={t}  />
    </>
  )
}

export default withRouter(withTranslation()(EngInvoices))




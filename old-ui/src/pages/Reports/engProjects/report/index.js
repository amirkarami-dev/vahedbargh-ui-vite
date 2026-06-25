import React, {  } from "react"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import Report from "./report"
import { Card, CardContent } from "@mui/material"

const ElectProjects = props => {

    const { t } = props
  return (
    <>

      <Report  translate={t}  />

    </>
  )
}

export default withRouter(withTranslation()(ElectProjects))




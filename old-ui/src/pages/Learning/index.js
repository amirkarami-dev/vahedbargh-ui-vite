import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import {
  Alert,
  Grid,
  Container,
  Box,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { withRouter } from "react-router-dom"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import NumberFormat from "react-number-format"
//i18n
import { withTranslation } from "react-i18next"

import { getCurrentUser } from "helpers/service_helper"

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ height: 600, width: "100%", p: 2 }}>{children}</Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}
function a11yProps(index, tabNames) {
  return {
    id: `simple-tab-${index}`,
    label: tabNames[index],
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const Learning = props => {


// const ExecutorCreateProject = "https://www.kurdnezambargh.ir/files/videos/Executor-Create-Project.mp4"
// const EngineerSubmitExpertStage = "https://www.kurdnezambargh.ir/files/videos/Engineer-submit-expert-stage.mp4"
// const ExecutorSendProject = "https://www.kurdnezambargh.ir/files/videos/Executor-send-project.mp4"
// const EngineerSubmitMapStage = "https://www.kurdnezambargh.ir/files/videos/Engineer-submit-map-stage.mp4"
// const EngineerSubmitMapStagePackage = "https://www.kurdnezambargh.ir/files/videos/Engineer-submit-map-stage-package.mp4"

  const { t } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const [expanded, setExpanded] = useState("")
  const [value, setValue] = useState(0)
  const tabNames = [
    "آموزش مجری",
    "آموزش کارشناسان",
    "آموزش کارمندان",
    "آموزش حسابدار",
  ]
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeExpand = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  //#region useEffect
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }, [errorMessage])

  //#endregion
  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title> واحد برق | آموزش</title>
        </MetaTags>
      </div>
    </>
  )
}

Learning.propTypes = {
  t: PropTypes.any,
}

export default withRouter(withTranslation()(Learning))

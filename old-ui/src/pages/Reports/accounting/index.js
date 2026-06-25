import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { Alert, Grid, Container, Box, Tab, Tabs } from "@mui/material"
import Breadcrumb from "../../../components/Common/Breadcrumb"
import { withRouter } from "react-router-dom"
//i18n
import { withTranslation } from "react-i18next"
import EngInvoice from "./engInvoice"


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
      {value === index && <Box sx={{ height: '100%', width: '100%', p: 2 }}>{children}</Box>}
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

const Reports = props => {
  const { t } = props
  const [errorMessage, setErrorMessage] = useState(null)

  const [value, setValue] = useState(0)
  const tabNames = ["فاکتور مهندسین","فاکتور مجریان"]
  const handleChange = (event, newValue) => {
    setValue(newValue)
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
          <title> واحد برق | گزارشات</title>
        </MetaTags>
        <Container  maxWidth="xl">
          <Box
            sx={{
              backgroundColor: "#fff",
              marginTop: 2,
              paddingInline: 2,
              borderRadius: 2,
              height:'100%'
              
            }}
          >
            <Breadcrumb
              title={t("Reports")}
              breadcrumbItem={tabNames[value]}
            />
            <Grid>
              <Grid item xs={12}>
                {errorMessage && errorMessage ? (
                  <Alert severity="error">{errorMessage}</Alert>
                ) : null}
                {props.error && props.error ? (
                  <Alert severity="error">{props.error}</Alert>
                ) : null}
                {props.success && props.success ? (
                  <Alert severity="success">{props.success}</Alert>
                ) : null}
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              marginTop: 2,
              paddingInline: 2,
              borderRadius: 2,
              height: "1300px"
              
            }}
          >
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab {...a11yProps(0, tabNames)} />
                <Tab {...a11yProps(1, tabNames)} />
  
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <EngInvoice translate={t} />
            </TabPanel>
            <TabPanel value={value} index={1}>
            <EngInvoice translate={t} />
            </TabPanel>
          </Box>
        </Container>
      </div>
    </>
  )
}

Reports.propTypes = {
  t: PropTypes.any,
}

export default withRouter(withTranslation()(Reports))

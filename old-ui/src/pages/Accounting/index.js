import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { Alert, Grid, Container, Box, Tab, Tabs } from "@mui/material"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { withRouter } from "react-router-dom"
import NumberFormat from "react-number-format"
//i18n
import { withTranslation } from "react-i18next"
import TransactionList from "./transactions/transaction-list"
import InvoiceList from "./invoices/invoice-list"
import InvoiceEngList from "./engInvoices/invoice-list"
import Payment from "./payment"
import { getCurrentUser } from "helpers/service_helper"
import EngPayment from "./engPayment"

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

const Accounting = props => {
  const { t } = props
  const [errorMessage, setErrorMessage] = useState(null)

  const [value, setValue] = useState(0)
  const tabNames = ["تراکنش ها", "ثبت فیش","فاکتورها","پرداختی کارشناس"]
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
      <div className="page-content">
        <MetaTags>
          <title> واحد برق | حسابداری</title>
        </MetaTags>
        <Container maxWidth="xl">
          <Box
            sx={{
              backgroundColor: "#fff",
              marginTop: 2,
              paddingInline: 2,
              borderRadius: 2,
              height: "100%"
            }}
          >
            <Breadcrumb
              title={t("Accounting")}
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
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
   
                <Tab {...a11yProps(0, tabNames)} />
                {(getCurrentUser().role === "Administrator" || getCurrentUser().role === "Section" ) && ( <Tab {...a11yProps(1, tabNames)} /> )}
                {getCurrentUser().role === "Accountant" && (<Tab {...a11yProps(2, tabNames)} />)}
                {getCurrentUser().role === "Engineer" && (<Tab {...a11yProps(2, tabNames)} />)}
                {getCurrentUser().role === "Accountant" && (<Tab {...a11yProps(3, tabNames)} />)}

              </Tabs>
            </Box>
         
      
            <TabPanel  value={value} index={0}>
     
                <TransactionList translate={t} />
        
            </TabPanel>
       
            {getCurrentUser().role === "Engineer" && ( <TabPanel value={value} index={1}>
             <InvoiceEngList translate={t} />
            </TabPanel>
            )}

            {(getCurrentUser().role === "Administrator" || getCurrentUser().role === "Section" ) && (
            <TabPanel value={value} index={1}>
            <Payment translate={t} />
            </TabPanel>
            )}

            {getCurrentUser().role === "Accountant" && ( <TabPanel value={value} index={1}>
             <InvoiceList translate={t} />
            </TabPanel>
            )}
            {getCurrentUser().role === "Accountant" && (
            <TabPanel value={value} index={2}>
            <EngPayment translate={t} />
            </TabPanel>
            )}

     
          </Box>
        </Container>
      </div>
  )
}

Accounting.propTypes = {
  t: PropTypes.any,
}

export default withRouter(withTranslation()(Accounting))

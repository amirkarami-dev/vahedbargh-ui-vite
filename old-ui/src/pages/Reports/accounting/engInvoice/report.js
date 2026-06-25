import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material"
import { PersianDatePicker } from "components/Common/PersianDatePicker"
import { getParsedDate, initReport } from "helpers/service_helper"
import { CityFromSection } from "hooks/returnCityName"
import { isNumber } from "lodash"
import moment from "moment"
import React, { useState, useEffect, useReducer } from "react"

import { connect } from "react-redux"
import { getEngInvoiceReport } from "store/actions"

import StiReport from "../../../../assets/reports/accounting/EngInvoiceReport.mrt"
import StiReportMinimal from "../../../../assets/reports/accounting/EngInvoiceReport-minimal.mrt"
import Localizations from "../../../../locales/fa/fa.xml"
const Reports = props => {
  const { lstEngInvoiceReport } = props
  const [errorMessage, setErrorMessage] = useState(null)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      projectLevelEnum: 1,
      selectReport:0,
    }
  )

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }, [errorMessage])
  const handleInput = evt => {
    const name = evt.target.name
    let newValue = evt.target.value
    if (newValue == "on") newValue = evt.target.checked

    if (evt.target.attributes.type?.value === "text") {
      if (newValue === "true" || newValue === "false")
        newValue = newValue === "true"
    }
    if (evt.target.attributes.type?.value === "number") newValue = +newValue
    if (evt.target.attributes.type?.value === "radio") {
      if (newValue === "true" || newValue === "false")
        newValue = newValue === "true"
      if (isNumber(parseInt(newValue))) newValue = +newValue
    }
    setFormInput({ [name]: newValue })
  }

  useEffect(() => {
    if (lstEngInvoiceReport.length > 0) {
      const reportData = lstEngInvoiceReport.map(c => {
        return {
          ...c,
          cityName: CityFromSection(c.engineer.idSection),
          engFullName: c.engineer.fullName,
          idEng: c.engineer.id,
        }
      })
      if(formInput.selectReport === 0)
      initReport(StiReport, reportData, Localizations)
      if(formInput.selectReport === 1)
      initReport(StiReportMinimal, reportData, Localizations)
    }
  }, [lstEngInvoiceReport])

  // create an array of months
  
  const prepareReport = async ()=> {
    let now = moment()
    await props.onGetEngInvoiceReport({
      engId: "ec75cf4c-b612-40fd-885c-f89d2ae2aad8",
      startDate: startDate.gregorian
        ? startDate.gregorian
        : now.format("YYYY-MM-DD"),
      endDate: endDate.gregorian ? endDate.gregorian : now.format("YYYY-MM-DD"),
    })
  }
  return (
    <>
      <Box>
        <Grid item xs={4}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="radio-consent-label"
              name="selectReport"
              value={formInput.selectReport}
              onChange={handleInput}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="گروه بندی پرونده"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="بدون گروه بندی"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <PersianDatePicker setPersianDate={setStartDate} disable={false} />
        </Grid>
        <Grid item xs={6}>
          <PersianDatePicker setPersianDate={setEndDate} disable={false} />
        </Grid>
      </Box>
      <Button
        variant="contained"
        onClick={async () => {
          await prepareReport()
        }}
        type="submit"
      >
        گزارش گیری
      </Button>
      {lstEngInvoiceReport.length > 0 && (
        <div style={{ maxWidth: "822px" }} id="viewer"></div>
      )}
    </>
  )
}

const mapStateToProps = ({ Accounting }) => ({
  lstEngInvoiceReport: Accounting.lstEngInvoiceReport,
  error: Accounting.error,
  success: Accounting.success,
  loading: Accounting.loading,
})

const mapDispatchToProps = dispatch => ({
  onGetEngInvoiceReport: values => dispatch(getEngInvoiceReport(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reports)

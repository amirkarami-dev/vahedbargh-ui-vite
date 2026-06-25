import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material"
import { PersianDatePicker } from "components/Common/PersianDatePicker"
import { initReport, serializeQuery } from "helpers/service_helper"
import { CityFromSection } from "hooks/returnCityName"
import { isNumber } from "lodash"
import React, { useState, useEffect, useReducer } from "react"

import { connect } from "react-redux"
import {
  getElectProjectReport,
} from "store/actions"

import StiReport from "../../../../assets/reports/ElectProjectReport.mrt"
import StiGCityReport from "../../../../assets/reports/ElectProjectGCityReport.mrt"
import Localizations from "../../../../locales/fa/fa.xml"

import Locations from "components/Common/Locations"

import { Checkbox, Col, Row } from "antd"
const ExecutorList = props => {
  const { lstElectProjectReport, translate, loading } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const [pageSize, setPageSize] = useState(1000)
  const [page, setPage] = useState(0);
  const [dateRegister, setDateRegister] = useState("")
  const [filterCity, setFilterCity] = useState(false)
  const [dataAddress, setDataAddress] = useState({
    sectionId: 0,
    fullAddress: {
      pro: "",
      cit: "",
      sec: "",
      lat: 35.311308,
      lng: 46.991271,
      mainAddress: "",
    },
  })
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      projectLevelEnum: 1,
      groupReport:1,
      filterDate:1
    }
  )

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }, [errorMessage])
  const handleInput = async evt => {
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
    // props.onGetListExecutor()
    if (lstElectProjectReport.length > 0) {
      const reportData = lstElectProjectReport.map(c => {
        return {
          ...c,
          exeFullName: c.executor.fullName,
          cityName: CityFromSection(c.idSection),
          address: c.address.split(":")[1],
        }
      })
      
      if(formInput.groupReport === 0)
      initReport(StiReport, reportData, Localizations)
      if(formInput.groupReport === 1)
      initReport(StiGCityReport, reportData, Localizations)
    }
  }, [lstElectProjectReport])

  // useEffect(async () => {

  //   await props.onGetElectProjectReport({
  //     projectLevelEnum: formInput.projectLevelEnum,
  //     registerDate: dateRegister.persian && formInput.filterDate === 0?dateRegister.persian:'',
  //   })
  // }, [formInput, dateRegister])

  const prepareReport = async ()=> {
    let searchQuery = {
      projectLevelEnum: formInput.projectLevelEnum,
      registerDate: dateRegister.persian && formInput.filterDate === 0?dateRegister.persian:'',
      idSection: filterCity ? +dataAddress?.sectionId : 0,
      page,
      pageSize
    }
    const params = serializeQuery(searchQuery)
    await props.onGetElectProjectReport(params)
  }

  return (
    <>
      {props.loading && <CircularProgress disableShrink />}
      <Box>
        <Grid
          container
          justifyContent="center"
          spacing={1}
          alignItems="center"
        ></Grid>
              <Row>
            <Col>
              <Checkbox
                onChange={e => {
                  setFilterCity(e.target.checked)
                }}
              >
                فیلترشهر
              </Checkbox>
            </Col>
            {filterCity && (
              <Col className="gutter-row">
                <Locations
                  setDataAddress={setDataAddress}
                  matches_sm={true}
                  isAccessCity={true}
                />
              </Col>
            )}
            </Row>
        <Grid item xs={12}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="radio-consent-label"
              name="projectLevelEnum"
              value={formInput.projectLevelEnum}
              onChange={handleInput}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="تخصیص کارشناسی"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="تخصیص نقشه"
              />
              <FormControlLabel value={2} control={<Radio />} label="تایید واحد برق " />
              <FormControlLabel value={3} control={<Radio />} label="تخصیص نقشه های رد شده" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="radio-consent-label"
              name="groupReport"
              value={formInput.groupReport}
              onChange={handleInput}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="گروه بندی مجری"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="گروه بندی شهر"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="radio-consent-label"
              name="filterDate"
              value={formInput.filterDate}
              onChange={handleInput}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="با تاریخ"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="بدون تاریخ"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <PersianDatePicker setPersianDate={setDateRegister} disable={false} />
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
      <Button
        variant="contained"
        onClick={async () => {
          await props.onGetElectProjectReport({
            projectLevelEnum: 0,
            registerDate: "",
          })
        }}
        type="submit"
      >
        حذف فیلتر
      </Button>


        {lstElectProjectReport.length > 0 && (
        <div style={{ maxWidth: "822px" }} id="viewer"></div>
      )}
    </>
  )
}

const mapStateToProps = ({ ElectProjects }) => ({
  lstElectProjectReport: ElectProjects.lstElectProjectReport,
  error: ElectProjects.error,
  success: ElectProjects.success,
  loading: ElectProjects.loading,
})

const mapDispatchToProps = dispatch => ({
  onGetElectProjectReport: values => dispatch(getElectProjectReport(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExecutorList)

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
  import StiGCityReport from "../../../../assets/reports/ElectProjectEngGCityReport.mrt"
  
  import Localizations from "../../../../locales/fa/fa.xml"
  import Locations from "components/Common/Locations"
import { Checkbox, Col, Row } from "antd"
  const ExecutorList = props => {
    const { lstElectProjectReport, translate, loading } = props
    const [errorMessage, setErrorMessage] = useState(null)
    const [pageSize, setPageSize] = useState(1000)
    const [page, setPage] = useState(0);
    const [dateRegister, setDateRegister] = useState("")
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
        projectLevelEnum: 0,
        groupReport:1,
        filterDate:0
      }
    )
    const [filterCity, setFilterCity] = useState(false)
  
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
            address: c.address.split(":").length>0? c.address.split(":")[1]:c.address
          }
        })
        if(formInput.groupReport === 0)
        initReport(StiReport, reportData, Localizations)
        if(formInput.groupReport === 1)
        initReport(StiGCityReport, reportData, Localizations)
      }

    }, [lstElectProjectReport])
  
  
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
                  label="بدون فیلتر"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="انتظار تایید کارشناس"
                />

                <FormControlLabel value={2} control={<Radio />} label="انتظار تایید نقشه" />
                <FormControlLabel value={3} control={<Radio />} label="انتظار تایید نقشه با نقص" />
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
                {/* <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="گروه بندی مجری"
                /> */}
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="گروه بندی شهر"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* <Grid item xs={4}>
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
          </Grid> */}

            {/* <PersianDatePicker setPersianDate={setDateRegister} disable={false} /> */}



        </Box>
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
        <br />
        <Button
          variant="contained"
          onClick={async () => {
            await prepareReport()
          }}
          type="submit"
        >
          گزارش گیری
        </Button>

          {lstElectProjectReport.length > 0? (
          <div style={{ maxWidth: "822px" }} id="viewer"></div>
        ):"رکوردی برای نمایش وجود ندارد مجددا گزارش گیری نمایید"}
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
    onGetElectProjectReport: searchValue => dispatch(getElectProjectReport(searchValue)),
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(ExecutorList)
  
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
  import { initReport } from "helpers/service_helper"
  import { CityFromSection } from "hooks/returnCityName"
  import { isNumber } from "lodash"
  import React, { useState, useEffect, useReducer } from "react"
  
  import { connect } from "react-redux"
  import {
    getElectProjects,
  } from "store/actions"
  
  import StiReport from "../../../../assets/reports/ElectProjectGCityReport.mrt"
  
  import Localizations from "../../../../locales/fa/fa.xml"
  const ExecutorList = props => {
    const { lstElectProjects, translate, loading } = props
    const [errorMessage, setErrorMessage] = useState(null)
    const [lstElectProjectsFilters, setLstElectProjectsFilters] = useState([])
  
    const [formInput, setFormInput] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      {
        projectLevelEnum: 1,
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
      if(newValue == "on") newValue = evt.target.checked
      
      if(evt.target.attributes.type?.value === "text")
      {
        if(newValue === "true" || newValue === "false") newValue = newValue === "true"
      
      }
      if(evt.target.attributes.type?.value === "number") newValue = +newValue
      if(evt.target.attributes.type?.value === "radio"){
        if(newValue === "true" || newValue === "false") newValue = newValue === "true"
        if(isNumber(parseInt(newValue))) newValue = +newValue
      }
      
      setFormInput({ [name]: newValue })
      const reportData = lstElectProjects.filter(c=>c[name] === newValue).map(c => {
          return {
            ...c,
            exeFullName: c.executor.fullName,
            cityName: CityFromSection(c.idSection),
            address: c.address.split(':')[1]
          }
        })
      initReport(StiReport, reportData, Localizations)
    }
    useEffect(() => {
      // props.onGetListExecutor()
      if (lstElectProjects.length > 0) {
        const reportData = lstElectProjects.map(c => {
          return {
            ...c,
            exeFullName: c.executor.fullName,
            cityName: CityFromSection(c.idSection),
            address: c.address.split(':')[1]
          }
        })
        initReport(StiReport, reportData, Localizations)
      }
    }, [lstElectProjects])
  
    useEffect(async()=>{
      await props.onGetElectProjects({searchValue:"", page:0,pageSize:10000})
    },[])
  
    return (
      <>
        <Box>
          <Grid
            container
            justifyContent="center"
            spacing={1}
            alignItems="center"
          ></Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="radio-consent-label">
                رضایتنامه محضری جهت عبور لوله رابط بر روی ملک مجاور مور نیاز است؟
              </FormLabel>
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
                  label="قبل تخصیص"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="کارشناسی"
                />
                              <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="نقشه"
                />
                                            <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label="نقص"
                />
                <FormControlLabel
                  value={4}
                  control={<Radio />}
                  label="انتظار تایید کارشناس"
                />
                <FormControlLabel
                  value={5}
                  control={<Radio />}
                  label="انتظار تایید نقشه"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Box>
  
        <Button
        variant="contained" 
          onClick={async () => {
            await props.onGetElectProjects({searchValue:"", page:0,pageSize:10000})
          }}
          type="submit"
        >
          حذف فیلتر
        </Button>
        {lstElectProjects.length > 0 && (
          <div style={{ maxWidth: "822px" }} id="viewer"></div>
        )}
      </>
    )
  }
  
  const mapStateToProps = ({ ElectProjects }) => ({
    lstElectProjects: ElectProjects.lstElectProjects,
    error: ElectProjects.error,
    success: ElectProjects.success,
    loading: ElectProjects.loading,
  })
  
  const mapDispatchToProps = dispatch => ({
    onGetElectProjects: values => dispatch(getElectProjects(values)),
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(ExecutorList)
  
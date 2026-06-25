import React, { useState, useEffect, useReducer } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { PersianDatePicker } from "components/Common/PersianDatePicker"
import { Alert, Row, Col } from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb"
import Locations from "components/Common/Locations"
import MapComp from "components/Common/MapComp"
import { TextMaskPhone } from "../../components/Common/TextMask"
//i18n
import { withTranslation } from "react-i18next"
import "./style.scss"
import {
  addFileElectProject,
  getUserBalance,
  getUserInfo,
  resetElectProjectFlag,
  upsertElectProject,
} from "store/actions"

import MainStep from "./steps/mainStep"
import {
  Button,
  Grid,
  Box,
  Paper,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  FormGroup,
  Checkbox,
  Divider,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import FilePondUpload from "components/Common/FilePondUpload"
import { setInvalidateEmpty, setInvalidateLength } from "common/global"
import ConfirmActions from "components/Common/confirm"
import { getCurrentUser } from "helpers/service_helper"
import { FileElectProjectType } from "models/types/file-elect-project-type"
import BuildingGroupParameterTypeEnum from "models/types/BuildingGroupParameterTypeEnum"
import { GetSectionIdWithCityId } from "hooks/returnCityName"

const Projects = props => {
  const { addedPlanFile, currentIdElectProject, userInfo, matches_sm } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [insertElectProjectConfirm, setInsertElectProjectConfirm] =
    useState(false)
  const [isErrorValid, setIsErrorValid] = useState(false)
  const [files, setFiles] = useState([])
  const [dateCreated, setDateCreated] = useState("")
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
  const [activeStep, setActiveStep] = useState(0)
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      numberOfFloor: "1",
      desNumberOfFloor: "",
      idSection: 0,
      lat: dataAddress.fullAddress.lat,
      lng: dataAddress.fullAddress.lng,
      requesterTypeEnum: 0,
      projectTypeRequestEnum: 0,
      projectCreatedTypeEnum: 0,
      buildingGroupTypeEnum: 1,
      buildingGroupParameterTypeEnum: 1,
      isEarthSystem: true,
      isErtTest: false,
      isBuildingInspection: true,
      isTestAndDelivery: false,
      panelNeed: true,
      ertSystemTypeEnum: 0,
      childInspectionCount: 0,
      childErtCount: 0,
      foundationElectrodeArea: 0,
      isNeedEb: false,
      hasSupervision:false,
      areaAsBuilt:0,

    }
  )
  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    console.log("name", name, newValue)
    if (name === "buildingGroupTypeEnum")
      setFormInput({ ["buildingGroupParameterTypeEnum"]: 0 })
    if (name === "projectTypeRequestEnum") {
      setFormInput({ ["isEarthSystem"]: +newValue === 2 ? false : true })
      setFormInput({ ["panelNeed"]: +newValue === 2 ? false : true })
      setFormInput({ ["isBuildingInspection"]: +newValue === 2 ? false : true })
      setFormInput({ ["isTestAndDelivery"]: +newValue === 2 ? true : false })
      setFormInput({ ["ertSystemTypeEnum"]: 0 })
    }
    setFormInput({ [name]: newValue })
  }
  const saveToDatabase = () => {
    const { onAddFileElectProject } = props
    if (currentIdElectProject !== 0 && files[0]) {
      let file = files[0].file
      let formData = new FormData()
      formData.append(
        "file",
        file,
        "RelatedPermit" +
          "." +
          file.name.split(".")[file.name.split(".").length - 1]
      )
      formData.append("electProjectId", JSON.stringify([currentIdElectProject]))
      formData.append("name", "elec-RelatedPermit")
      formData.append("des", `Upload with-${getCurrentUser().sid}`)
      formData.append("fileTypeEnum", FileElectProjectType.RelatedPermit)
      formData.append("FolderName", "ElectProjects")
      formData.append(
        "FileName",
        "RelatedPermit" +
          "." +
          file.name.split(".")[file.name.split(".").length - 1]
      )
      formData.append("userId", getCurrentUser().sid)
      formData.append("toUserId", getCurrentUser().sid)
      onAddFileElectProject(formData)
    } else {
      setErrorMessage("برای ذخیره ابتدا جواز را بارگذاری کنید")
    }
  }

  const handleValidEventSubmitProject = event => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    data.forEach((value, name) => {
      console.log("name", name, value)

      setFormInput({ [name]: value })
    })
    if (activeStep === 1) {
      if (+formInput.buildingGroupParameterTypeEnum === 0) {
        setErrorMessage("گروه طباقت را انتخاب کنید")
        return
      }
      if (formInput.isEarthSystem && +formInput.ertSystemTypeEnum === 0) {
        setErrorMessage("نوع ارت را مشخص کنید")
        return
      }
      if (
        +formInput.ertSystemTypeEnum === 6 &&
        +formInput.foundationElectrodeArea <= 0
      ) {
        setErrorMessage("مساحت فونداسیون باید بیشتر از صفر باشد")
        return
      }
    }
    if (activeStep === 3) {
      setInsertElectProjectConfirm(true)
    }
    if (activeStep === 4) {
      if (!addedPlanFile) {
        setErrorMessage("ابتدا عکس را ذخیره کنید")
        return
      } else {
        props.history.push("/projects/ElectProjects")
      }
    }
    if (!isErrorValid) handleNext(setActiveStep)
  }
  const handleInsertElectProject = async () => {
    const { onUpsertElectProject } = props
    let electProjectToSave = {
      ...formInput,
      // address:Object.values(dataAddress.fullAddress).join(', '),
      area: +formInput.area,
      numberOfFloor: +formInput.numberOfFloor,
      address: Object.values(dataAddress.fullAddress).join(", "),
      postalCode: formInput.postalCode,
      landlordName: formInput.landlordName,
      landlordNaCode: formInput.landlordNaCode,
      landlordPhoneNumber: formInput.landlordPhoneNumber,
      supervisorName: formInput.supervisorName,
      supervisorPhoneNumber: formInput.supervisorPhoneNumber,
      companyName: formInput.companyName,
      licenseNumber: formInput.licenseNumber,
      description: "",
      idSection: +dataAddress.sectionId,
      idCity: +dataAddress.cityId,
      idProvince: +dataAddress.provinceId,
      lat: dataAddress.fullAddress.lat,
      lng: dataAddress.fullAddress.lng,
      requesterTypeEnum: 0,
      projectTypeRequestEnum: +formInput.projectTypeRequestEnum,
      projectCreatedTypeEnum: 0,
      buildingGroupTypeEnum: +formInput.buildingGroupTypeEnum,
      buildingGroupParameterTypeEnum: +formInput.buildingGroupParameterTypeEnum,
      solarRegisterDate: dateCreated.persian,
      isEarthSystem:
        formInput.isEarthSystem === "true" || formInput.isEarthSystem === true,
      isErtTest: formInput.isErtTest === "true" || formInput.isErtTest === true,
      isBuildingInspection:
        formInput.isBuildingInspection === "true" ||
        formInput.isBuildingInspection === true,
      isTestAndDelivery:
        formInput.isTestAndDelivery === "true" ||
        formInput.isTestAndDelivery === true,
      panelNeed: formInput.panelNeed === "true" || formInput.panelNeed === true,
      ertSystemTypeEnum: +formInput.ertSystemTypeEnum,
      childInspectionCount: +formInput.childInspectionCount,
      childErtCount: +formInput.childErtCount,
      foundationElectrodeArea: +formInput.foundationElectrodeArea,
      areaAsBuilt: formInput.areaAsBuilt ? formInput.areaAsBuilt : 0,
      hasSupervision: formInput.areaAsBuilt>0,
      isNeedEb: formInput.isNeedEb === "true" || formInput.isNeedEb === true,
    }
    await onUpsertElectProject(electProjectToSave)
    setInsertElectProjectConfirm(false)
  }
  //#region useEffect

  useEffect(() => {
    setTimeout(() => {
      props.onresetElectProjectFlag()
    }, 3000)
  }, [props.success])
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }, [errorMessage])
  //#endregion
  const handleNext = setDecrement => {
    setDecrement(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = setIncrement => {
    setIsErrorValid(false)
    setIncrement(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <div className="page-content">
      <MetaTags>
        <title>Project | electUnit</title>
      </MetaTags>

      {/* Render Breadcrumb */}
      <Box
        sx={{
          backgroundColor: "#fff",
          margin: 2,
          paddingInline: 2,
          borderRadius: 2,
          height: "100%",
        }}
      >
        <Breadcrumb
          title={props.t("electUnit")}
          breadcrumbItem="درخواست انشعاب برق دائم/موقت"
        />
        <Row>
          <Col className="col-12">
            {errorMessage && errorMessage ? (
              <Alert color="danger">{errorMessage}</Alert>
            ) : null}
            {props.error && props.error ? (
              <Alert color="danger">{props.error}</Alert>
            ) : null}
            {props.success && props.success ? (
              <Alert color="success">{props.success}</Alert>
            ) : null}
          </Col>
        </Row>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          margin: 2,
          paddingInline: 2,
          borderRadius: 2,
          height: "100%",
        }}
      >
        <Grid container spacing={1} paddingTop={2}>
          <Grid item xs={2}>
            <MainStep activeStep={activeStep} setActiveStep={setActiveStep} />
          </Grid>

          <Grid item xs={10}>
            <form onSubmit={handleValidEventSubmitProject}>
              <Grid container direction="column">
                <Box minHeight={400}>
                  {activeStep === 0 && (
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      direction="column"
                    >
                      {" "}
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="projectTypeRequestEnum"
                        value={
                          formInput.projectTypeRequestEnum
                            ? formInput.projectTypeRequestEnum
                            : 0
                        }
                        onChange={handleInput}
                      >
                        <Paper elevation={3} sx={{ p: 2 }}>
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="انشعاب دائم/موقت"
                          />
                        </Paper>
                        <Paper elevation={3} sx={{ p: 2, marginTop: 2 }}>
                          <FormControlLabel
                            disabled
                            value="1"
                            control={<Radio />}
                            label="فیبر نوری"
                          />
                        </Paper>
                        <Paper elevation={3} sx={{ p: 2, marginTop: 2 }}>
                          <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="تست و تحویل"
                          />
                        </Paper>
                      </RadioGroup>
                    </Grid>
                  )}

                  {activeStep === 1 && (
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container item spacing={6}>
                        <Grid item xs={6} lg={3}>
                          <TextField
                            size="small"
                            required
                            value={formInput.licenseNumber}
                            name="licenseNumber"
                            label="شماره جواز"
                            type="text"
                            helperText=""
                            onChange={handleInput}
                            onInvalid={setInvalidateEmpty}
                            onInput={setInvalidateEmpty}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6} lg={3}>
                          <FormControl size="small" fullWidth>
                            <InputLabel id="select-label-buildingGroupTypeEnum">
                              گروه ساختمانی
                            </InputLabel>
                            <Select
                              labelId="select-label-buildingGroupTypeEnum"
                              name="buildingGroupTypeEnum"
                              value={
                                formInput.buildingGroupTypeEnum
                                  ? formInput.buildingGroupTypeEnum
                                  : 1
                              }
                              label="گروه ساختمانی"
                              onChange={handleInput}
                            >
                              <MenuItem value={1}>گروه الف</MenuItem>
                              <MenuItem value={2}>گروه ب</MenuItem>
                              <MenuItem value={3}>گروه ج</MenuItem>
                              <MenuItem value={4}>گروه د</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} lg={3}>
                          <FormControl size="small" fullWidth>
                            <InputLabel id="select-label-buildingGroupParameterTypeEnum">
                              گروه طبقات
                            </InputLabel>
                            <Select
                              labelId="select-label-buildingGroupParameterTypeEnum"
                              name="buildingGroupParameterTypeEnum"
                              value={
                                formInput.buildingGroupParameterTypeEnum
                                  ? formInput.buildingGroupParameterTypeEnum
                                  : 1
                              }
                              label="گروه طبقات"
                              onChange={handleInput}
                              error={
                                formInput.buildingGroupParameterTypeEnum === 0
                              }
                            >
                              {Object.keys(BuildingGroupParameterTypeEnum)
                                .filter(
                                  f =>
                                    +BuildingGroupParameterTypeEnum[f]
                                      .buildingGroupTypeEnum ===
                                    +formInput.buildingGroupTypeEnum
                                )
                                .map(key => (
                                  <MenuItem
                                    key={
                                      BuildingGroupParameterTypeEnum[key].value
                                    }
                                    value={
                                      BuildingGroupParameterTypeEnum[key].value
                                    }
                                  >
                                    {BuildingGroupParameterTypeEnum[key].label}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} lg={3}>
                          <TextField
                            fullWidth
                            required
                            value={formInput.numberOfFloor}
                            name="numberOfFloor"
                            label="تعداد طبقات"
                            type="number"
                            size="small"
                            onChange={handleInput}
                            inputProps={{
                              style: { textAlign: "center" },
                            }}
                            onInvalid={setInvalidateEmpty}
                            onInput={setInvalidateEmpty}
                            helperText={<span style={{ color: "blue" }}></span>}
                          />
                        </Grid>
                        <Grid item xs={6} lg={3}>
                          <TextField
                            fullWidth
                            required
                            value={formInput.area}
                            name="area"
                            label="مساحت(مترمربع)"
                            type="number"
                            size="small"
                            inputProps={{
                              style: { textAlign: "center" },
                            }}
                            onChange={e => {
                              handleInput(e)
                              e.target.value <= 0
                                ? setIsErrorValid(true)
                                : setIsErrorValid(false)
                            }}
                            onInvalid={setInvalidateEmpty}
                            onInput={setInvalidateEmpty}
                          />
                        </Grid>
                        {formInput.isBuildingInspection &&
                        <Grid item xs={6} lg={3}>
                          <TextField
                            fullWidth
                            value={formInput.areaAsBuilt}
                            name="areaAsBuilt"
                            label="مساحت ازبیلت(مترمربع)"
                            type="number"
                            size="small"
                            inputProps={{
                              style: { textAlign: "center" },
                            }}
                            onChange={handleInput}
                            onInvalid={setInvalidateEmpty}
                            onInput={setInvalidateEmpty}
                          />
                        </Grid>}
                        <Grid item xs={6} lg={3}>
                          <PersianDatePicker
                            setPersianDate={setDateCreated}
                            disable={true}
                          />
                        </Grid>
                        {formInput.isEarthSystem && (
                          <>
                            <Grid item xs={6} lg={3}>
                              <FormControl size="small" fullWidth>
                                <InputLabel id="select-label-ertSystemTypeEnum">
                                  نوع ارت
                                </InputLabel>
                                <Select
                                  labelId="select-label-ertSystemTypeEnum"
                                  name="ertSystemTypeEnum"
                                  value={
                                    formInput.ertSystemTypeEnum
                                      ? formInput.ertSystemTypeEnum
                                      : 0
                                  }
                                  label="نوع ارت"
                                  onChange={handleInput}
                                >
                                  <MenuItem value={0}>ندارد</MenuItem>
                                  <MenuItem value={1}>الکترود ساده1</MenuItem>
                                  <MenuItem value={2}>
                                    الکترود زمین افقی
                                  </MenuItem>
                                  <MenuItem value={3}>
                                    الکترود زمین ساده2
                                  </MenuItem>
                                  <MenuItem value={4}>دو راد</MenuItem>
                                  <MenuItem value={5}>
                                    الکتروداساسی-5حلقه
                                  </MenuItem>
                                  <MenuItem value={6}>
                                    الکترود فونداسیون
                                  </MenuItem>
                                </Select>
                              </FormControl>

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={formInput.isNeedEb}
                                    value={
                                      formInput.isNeedEb === "true" ||
                                      formInput.isNeedEb === true
                                    }
                                    onChange={e =>
                                      handleInput({
                                        target: {
                                          name: "isNeedEb",
                                          value: !!e.target.checked,
                                        },
                                      })
                                    }
                                    name="isNeedEb"
                                  />
                                }
                                label="نیاز به همبندی"
                              />
                            </Grid>
                            {+formInput.ertSystemTypeEnum === 6 && (
                              <Grid item xs={6} lg={3}>
                                <TextField
                                  fullWidth
                                  required
                                  value={formInput.foundationElectrodeArea}
                                  name="foundationElectrodeArea"
                                  label="مساحت فونداسیون الکترود"
                                  type="number"
                                  size="small"
                                  inputProps={{
                                    style: { textAlign: "center" },
                                  }}
                                  onChange={e => {
                                    handleInput(e)
                                    e.target.value <= 0
                                      ? setIsErrorValid(true)
                                      : setIsErrorValid(false)
                                  }}
                                  onInvalid={setInvalidateEmpty}
                                  onInput={setInvalidateEmpty}
                                />
                              </Grid>
                            )}
                          </>
                        )}
                      </Grid>

                      <Grid container className="pt-4" spacing={6}>
                        <Grid item xs={6} lg={3}>
                          <Grid container spacing={1}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    disabled={
                                      +formInput.projectTypeRequestEnum === 2
                                    }
                                    checked={formInput.isEarthSystem}
                                    value={
                                      formInput.isEarthSystem === "true" ||
                                      formInput.isEarthSystem === true
                                    }
                                    onChange={e =>
                                      handleInput({
                                        target: {
                                          name: "isEarthSystem",
                                          value: !!e.target.checked,
                                        },
                                      })
                                    }
                                    name="isEarthSystem"
                                  />
                                }
                                label="اجرای سیستم زمین"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    disabled
                                    checked={formInput.isErtTest}
                                    value={
                                      formInput.isErtTest === "true" ||
                                      formInput.isErtTest === true
                                    }
                                    onChange={e =>
                                      handleInput({
                                        target: {
                                          name: "isErtTest",
                                          value: !!e.target.checked,
                                        },
                                      })
                                    }
                                    name="isErtTest"
                                  />
                                }
                                label="تست و بازرسی ارت"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    disabled={
                                      +formInput.projectTypeRequestEnum === 2
                                    }
                                    checked={formInput.isBuildingInspection}
                                    value={
                                      formInput.isBuildingInspection ===
                                        "true" ||
                                      formInput.isBuildingInspection === true
                                    }
                                    onChange={e =>
                                      handleInput({
                                        target: {
                                          name: "isBuildingInspection",
                                          value: !!e.target.checked,
                                        },
                                      })
                                    }
                                    name="isBuildingInspection"
                                  />
                                }
                                label="بازرسی ساختمان"
                              />
                              {/* نیاز به تابلو ساز */}
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    disabled={
                                      +formInput.projectTypeRequestEnum === 2
                                    }
                                    checked={formInput.panelNeed}
                                    value={
                                      formInput.panelNeed === "true" ||
                                      formInput.panelNeed === true
                                    }
                                    onChange={e =>
                                      handleInput({
                                        target: {
                                          name: "panelNeed",
                                          value: !!e.target.checked,
                                        },
                                      })
                                    }
                                    name="panelNeed"
                                  />
                                }
                                label="نیاز به تابلوساز"
                              />

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    disabled
                                    checked={formInput.isTestAndDelivery}
                                    value={
                                      formInput.isTestAndDelivery === "true" ||
                                      formInput.isTestAndDelivery === true
                                    }
                                    onChange={e =>
                                      handleInput({
                                        target: {
                                          name: "isTestAndDelivery",
                                          value: !!e.target.checked,
                                        },
                                      })
                                    }
                                    name="isBuildingInspection"
                                  />
                                }
                                label="تست و تحویل"
                              />
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </Grid>
                      {!formInput.isTestAndDelivery && (
                        <Grid container className="pt-4" spacing={6}>
                          <Grid item xs={12} lg={12}>
                            <h6 style={{ color: "red" }}>
                              در پارامتر های زیر دقت کنید در صورت وارد کردن هر
                              یک به همان تعداد زیر پرونده ایجاد میگردد و بعدا
                              قابل ویرایش نیست
                            </h6>
                          </Grid>

                          <Grid item xs={6} lg={3}>
                            <TextField
                              fullWidth
                              required
                              value={formInput.childInspectionCount}
                              name="childInspectionCount"
                              label="تعداد زیر پرونده بازرسی"
                              type="number"
                              size="small"
                              onChange={handleInput}
                              inputProps={{
                                style: { textAlign: "center" },
                              }}
                              onInvalid={setInvalidateEmpty}
                              onInput={setInvalidateEmpty}
                              helperText={
                                <span style={{ color: "blue" }}></span>
                              }
                            />
                          </Grid>
                          <Grid item xs={6} lg={3}>
                            <TextField
                              fullWidth
                              required
                              value={formInput.childErtCount}
                              name="childErtCount"
                              label="تعداد زیر پرونده ارت"
                              type="number"
                              size="small"
                              onChange={handleInput}
                              inputProps={{
                                style: { textAlign: "center" },
                              }}
                              onInvalid={setInvalidateEmpty}
                              onInput={setInvalidateEmpty}
                              helperText={
                                <span style={{ color: "blue" }}></span>
                              }
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Box>
                  )}
                  {/* Dialog bank */}

                  {activeStep === 2 && (
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container item spacing={4}>
                        <Grid item xs={12}>
                          <TextField
                            size="small"
                            error={formInput.landlordName?.length < 5}
                            required
                            value={formInput.landlordName}
                            name="landlordName"
                            id="landlordName-input"
                            label="نام کامل مالک"
                            type="text"
                            onChange={e => {
                              handleInput(e)
                              e.target.value.length < 5
                                ? setIsErrorValid(true)
                                : setIsErrorValid(false)
                            }}
                            onInvalid={setInvalidateEmpty}
                            onInput={setInvalidateEmpty}
                            helperText="باید 5-رقم باشد"
                          />
                        </Grid>
                        {formInput.ownershipTypeEnum == 2 && (
                          <Grid item xs={12}>
                            <TextField
                              size="small"
                              required
                              id="companyName-input"
                              value={formInput.companyName}
                              name="companyName"
                              label="نام شرکت"
                              type="text"
                              onChange={handleInput}
                              onInvalid={setInvalidateEmpty}
                              onInput={setInvalidateEmpty}
                            />
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <TextField
                            error={formInput.landlordNaCode?.length !== 10}
                            size="small"
                            required
                            id="landlordNaCode-input"
                            value={formInput.landlordNaCode}
                            name="landlordNaCode"
                            label="کدملی مالک/شرکت"
                            type="number"
                            onChange={e => {
                              handleInput(e)
                              e.target.value.length !== 10
                                ? setIsErrorValid(true)
                                : setIsErrorValid(false)
                            }}
                            helperText="باید 10-رقم باشد"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl dir="ltr">
                            <InputLabel htmlFor="landlordPhoneNumber-input">
                              شماره تماس
                            </InputLabel>

                            <OutlinedInput
                              type="text"
                              required
                              size="small"
                              label="شماره تماس"
                              value={formInput.landlordPhoneNumber}
                              onChange={e => {
                                handleInput(e)
                                e.target.value.length !== 11
                                  ? setIsErrorValid(true)
                                  : setIsErrorValid(false)
                              }}
                              name="landlordPhoneNumber"
                              id="landlordPhoneNumber-input"
                              inputComponent={TextMaskPhone}
                              onInvalid={e => setInvalidateLength(e, 11)}
                              onInput={e => setInvalidateLength(e, 11)}
                            />
                            <FormHelperText>نمونه:1234****09</FormHelperText>
                          </FormControl>
                        </Grid>
                        {+formInput.projectTypeRequestEnum == 2 && (
                          <>
                            <Grid item xs={12}>
                              <TextField
                                size="small"
                                required
                                id="supervisorName-input"
                                value={formInput.supervisorName}
                                name="supervisorName"
                                label="نام ناظر"
                                type="text"
                                onChange={handleInput}
                                onInvalid={setInvalidateEmpty}
                                onInput={setInvalidateEmpty}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl dir="ltr">
                                <InputLabel htmlFor="supervisorPhoneNumber-input">
                                  شماره تماس ناظر
                                </InputLabel>

                                <OutlinedInput
                                  type="text"
                                  required
                                  size="small"
                                  label="شماره تماس ناظر"
                                  value={formInput.supervisorPhoneNumber}
                                  onChange={e => {
                                    handleInput(e)
                                    e.target.value.length !== 11
                                      ? setIsErrorValid(true)
                                      : setIsErrorValid(false)
                                  }}
                                  name="supervisorPhoneNumber"
                                  id="supervisorPhoneNumber-input"
                                  inputComponent={TextMaskPhone}
                                  onInvalid={e => setInvalidateLength(e, 11)}
                                  onInput={e => setInvalidateLength(e, 11)}
                                />
                                <FormHelperText>
                                  نمونه:1234****09
                                </FormHelperText>
                              </FormControl>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Box>
                  )}
                  {activeStep === 3 && (
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container item spacing={4}>
                        <Grid item xs={12}>
                          <Locations
                            setDataAddress={setDataAddress}
                            matches_sm={matches_sm}
                            isAccessCity={userInfo && userInfo.idSection === 0}
                            idSection={
                              userInfo &&
                              GetSectionIdWithCityId(userInfo.idSection)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <MapComp
                            coords={dataAddress}
                            setDataAddress={setDataAddress}
                            mainAddress={formInput.fullAddress}
                          />
                        </Grid>
                        <Grid container item spacing={4}>
                          <Grid item xs={12}>
                            <TextField
                              error={isErrorValid}
                              size="small"
                              required
                              value={formInput.postalCode}
                              name="postalCode"
                              label="کد پستی"
                              type="number"
                              onChange={e => {
                                handleInput(e)
                                e.target.value.length !== 10
                                  ? setIsErrorValid(true)
                                  : setIsErrorValid(false)
                              }}
                              onInvalid={setInvalidateEmpty}
                              onInput={setInvalidateEmpty}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              size="small"
                              required
                              value={dataAddress.fullAddress.lat.toFixed(4)}
                              name="lat"
                              label="عرض جغرافیایی"
                              type="number"
                              inputProps={{ readOnly: true }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              size="small"
                              required
                              value={dataAddress.fullAddress.lng.toFixed(4)}
                              name="long"
                              label="طول جغرافیایی"
                              type="number"
                              inputProps={{ readOnly: true }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  {activeStep === 4 && (
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container item spacing={4}>
                        <Grid item xs={12}>
                          <FilePondUpload
                            setFiles={setFiles}
                            maxFileSize="4500KB"
                            allowMultiple={false}
                            maxFiles={1}
                            acceptedFileTypes={[
                              "image/png",
                              "image/jpeg",
                              "application/pdf",
                            ]}
                            imagePreviewMaxHeight={600}
                            labelText="فایل اسکن جواز را اینجا بکشید"
                          />
                        </Grid>

                        <Grid item xs={6}></Grid>

                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}></Grid>
                      </Grid>
                    </Box>
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                  }}
                >
                  <Button
                    type="submit"
                    endIcon={<ArrowBackIcon fontSize="small" />}
                    size="small"
                    variant="contained"
                    disabled={isErrorValid}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {activeStep === 4 ? "پایان" : "مرحله بعد"}
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    disabled={activeStep === 0 || currentIdElectProject !== 0}
                    onClick={() => handleBack(setActiveStep)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    مرحله قبل
                  </Button>
                  <Button
                    onClick={() => saveToDatabase()}
                    size="small"
                    variant="contained"
                    disabled={currentIdElectProject === 0 || activeStep !== 4}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {!!!isEdit ? "ذخیره جواز" : "update"}
                  </Button>
                </Box>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>

      {insertElectProjectConfirm ? (
        <ConfirmActions
          title="پرونده برای ثبت آماده می باشد آیا مطمن هستید"
          value={insertElectProjectConfirm}
          handleConfirmFn={handleInsertElectProject}
          handleCancelDialog={setInsertElectProjectConfirm}
          handleCancelFn={handleBack}
          handleCancelFnValue={setActiveStep}
        />
      ) : null}
    </div>
  )
}
Projects.propTypes = {
  userInfo: PropTypes.any,
  currentIdElectProject: PropTypes.any,
  t: PropTypes.any,
  error: PropTypes.any,
  success: PropTypes.any,
  addedPlanFile: PropTypes.any,
  onUpsertElectProject: PropTypes.func,
  onresetElectProjectFlag: PropTypes.func,
  onGetUserBalance: PropTypes.func,
  onGetUserInfo: PropTypes.func,
  onAddFileElectProject: PropTypes.func,
}

const mapStateToProps = ({ ElectProjects, USERs }) => ({
  currentIdElectProject: ElectProjects.currentIdElectProject,
  error: ElectProjects.error,
  success: ElectProjects.success,
  addedPlanFile: ElectProjects.addedPlanFile,
  userBalance: USERs.userBalance,
  userInfo: USERs.userInfo,
})

const mapDispatchToProps = dispatch => ({
  onUpsertElectProject: electProject =>
    dispatch(upsertElectProject(electProject)),
  onresetElectProjectFlag: () => dispatch(resetElectProjectFlag()),
  onGetUserBalance: () => dispatch(getUserBalance()),
  onGetUserInfo: () => dispatch(getUserInfo()),
  onAddFileElectProject: attachData =>
    dispatch(addFileElectProject(attachData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Projects))

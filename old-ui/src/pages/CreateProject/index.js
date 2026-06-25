import React, { useState, useEffect, useReducer } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"
import { PersianDatePicker } from "components/Common/PersianDatePicker"
import { Alert, Row, Col } from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb"
import LocationsElect from "components/Common/LocationsElect"
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
  FormControl,
  TextField,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { setInvalidateEmpty, setInvalidateLength } from "common/global"
import ConfirmActions from "components/Common/confirm"
import { RequestNumberMask } from "components/Common/RequestNumberMask"

const Projects = props => {
  const { currentIdElectProject, userInfo, matches_sm } = props
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
      area: 0,
      numberOfFloor: 1,
      desNumberOfFloor: "",
      idSection: 0,
      lat: dataAddress.fullAddress.lat,
      lng: dataAddress.fullAddress.lng,
      requesterTypeEnum: 0,
      projectTypeRequestEnum: 0,
      projectCreatedTypeEnum: 1,
      buildingGroupTypeEnum: 0,
      buildingGroupParameterTypeEnum: 0,
      isEarthSystem: false,
      isErtTest: false,
      isBuildingInspection: false,
      panelNeed: false,
      hasRelatedPermit:"true"
    }
  )
  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    if (name === "buildingGroupTypeEnum")
      setFormInput({ ["buildingGroupParameterTypeEnum"]: 0 })

    setFormInput({ [name]: newValue })
  }

  const handleValidEventSubmitProject = event => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    data.forEach((value, name) => {
      console.log("name", name, value)

      setFormInput({ [name]: value })
    })

    if (activeStep === 0) {
      setInsertElectProjectConfirm(true)
    }
    if (activeStep === 1) {
      props.history.push("/projects/ElectProjects")
      // if (!addedPlanFile) {
      //   setErrorMessage("ابتدا عکس را ذخیره کنید")
      //   return
      // } else {
      //   props.history.push("/projects/ElectProjects")
      // }
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
      address: dataAddress?.fullAddress?.mainAddress,
      postalCode: "1234567890",
      landlordName: formInput.landlordName,
      landlordNaCode: "1234567890",
      landlordPhoneNumber: formInput.landlordPhoneNumber,
      companyName: formInput.companyName,
      electRequestNumber: formInput.electRequestNumber,
      description: "",
      idSection: +dataAddress.sectionId,
      idCity: +dataAddress.cityId,
      idProvince: +dataAddress.provinceId,
      lat: dataAddress.fullAddress.lat,
      lng: dataAddress.fullAddress.lng,
      requesterTypeEnum: 0,
      projectTypeRequestEnum: 0,
      buildingGroupTypeEnum: +formInput.buildingGroupTypeEnum,
      buildingGroupParameterTypeEnum: +formInput.buildingGroupParameterTypeEnum,
      solarRegisterDate: dateCreated.persian,
      hasRelatedPermit:
      formInput.hasRelatedPermit === "true" ||
      formInput.hasRelatedPermit === true,
    }
    debugger
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

  useEffect(() => {
    if (dataAddress.cityId) {
      const getIdSection = dataAddress.sectionId
      const getCodeSection = getIdSection.toString().substring(1, 3)
      const suggest = `403${getCodeSection}`
      //setFormInput({["electRequestNumber"]: suggest})
    }
  }, [dataAddress.cityId])
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
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container item spacing={3}>
                        <Grid style={{ display: "none" }} item xs={12} lg={12}>
                          <PersianDatePicker
                            setPersianDate={setDateCreated}
                            disable={true}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <LocationsElect
                            setDataAddress={setDataAddress}
                            matches_sm={matches_sm}
                            isAccessCity={false}
                            idSection={userInfo && userInfo.idSection}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl>
                            <FormLabel id="radio-hasRelatedPermit-label">
                              وضعیت جواز
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="radio-hasRelatedPermit-label"
                              name="hasRelatedPermit"
                              value={formInput.hasRelatedPermit}
                              onChange={handleInput}
                            >
                              <FormControlLabel
                                value={true}
                                control={<Radio />}
                                label="دارد"
                              />
                              <FormControlLabel
                                value={false}
                                control={<Radio />}
                                label="ندارد"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        {/* شماره تقاضا */}
                        <Grid item xs={4} lg={3}>
                          <FormControl fullWidth dir="ltr">
                            <InputLabel htmlFor="landlordPhoneNumber-input">
                              شماره تقاضا
                            </InputLabel>

                            <OutlinedInput
                              type="text"
                              required
                              size="small"
                              label="شماره تقاضا"
                              value={formInput.electRequestNumber}
                              onChange={e => {
                                handleInput(e)
                                e.target.value.length !== 10
                                  ? setIsErrorValid(true)
                                  : setIsErrorValid(false)
                              }}
                              name="electRequestNumber"
                              id="electRequestNumber-input"
                              inputComponent={RequestNumberMask}
                              onInvalid={e => setInvalidateLength(e, 10)}
                              onInput={e => setInvalidateLength(e, 10)}
                            />
                            <FormHelperText></FormHelperText>
                          </FormControl>
                        </Grid>
                        {/* نام مالک */}
                        <Grid item xs={4} lg={3}>
                          <TextField
                            fullWidth
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
                        {/* شماره تماس */}
                        <Grid item xs={4} lg={3}>
                          <FormControl fullWidth dir="ltr">
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

                        <Grid item xs={12}>
                          <MapComp
                            coords={dataAddress}
                            setDataAddress={setDataAddress}
                            mainAddress={formInput.fullAddress || "آدرس:"}
                          />
                        </Grid>
                        <Grid container item spacing={4}>
                          {/* <Grid item xs={12}>
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
                          </Grid> */}
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
                  {/* {activeStep === 1 && (
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container item spacing={4}>
                        <Grid item xs={12}>
                          <FilePondUpload
                            setFiles={setFiles}
                            maxFileSize="2500KB"
                            allowMultiple={false}
                            maxFiles={1}
                            acceptedFileTypes={["image/png", "image/jpeg", "application/pdf"]}
                            imagePreviewMaxHeight={600}
                            labelText="فایل اسکن جواز را اینجا بکشید"
                          />
                        </Grid>

                        <Grid item xs={6}></Grid>

                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}></Grid>
                      </Grid>
                    </Box>
                  )} */}
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
                    {activeStep === 0 ? "ذخیره" : "پایان"}
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
                  {/* <Button
                    onClick={() => saveToDatabase()}
                    size="small"
                    variant="contained"
                    disabled={currentIdElectProject === 0 || activeStep !== 1}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {!!!isEdit ? "ذخیره جواز" : "update"}
                  </Button> */}
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

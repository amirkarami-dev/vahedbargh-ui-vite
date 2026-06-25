import { ArrowBack, SpaceBar } from "@mui/icons-material"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  LinearProgress,
  CircularProgress,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  FormGroup,
  Checkbox,
  IconButton,
} from "@mui/material"
import { setInvalidateEmpty } from "common/global"
import NumeralButton from "components/Common/NumeralButton"
import CloseIcon from "@mui/icons-material/Close"
import { enumToArray, serializeQuery } from "helpers/service_helper"
import { toNumber } from "lodash"

import React, { useState, useReducer, useEffect } from "react"

export const ProjectRequired = ({ rowData, mainProps }) => {
  const style = {
    // border: "2px solid #000",
    p: 2,
  }
  const [isErrorValid, setIsErrorValid] = useState(false)
  const [hasError, setHasError] = useState(false)

  const [sumTotalCount, dispatchSumTotalCount] = useReducer((state,action)=>{
    return Number(( state + action).toFixed(1))
  },rowData.row.electProjectDetail.totalCount)

  const [sumTotalUsage, dispatchSumTotalUsage] = useReducer((state,action)=>{
    return Number(( state + action).toFixed(1))
  },rowData.row.electProjectDetail.totalUsage)

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: rowData.row.electProjectDetail.id,
      consent: rowData.row.electProjectDetail.consent,
      pipeSize: rowData.row.electProjectDetail.pipeSize
        ? rowData.row.electProjectDetail.pipeSize
        : 1,
        collectorSize: rowData.row.electProjectDetail.collectorSize
        ? rowData.row.electProjectDetail.collectorSize
        : 0,
      locationElectMeter: rowData.row.electProjectDetail.locationElectMeter
        ? rowData.row.electProjectDetail.locationElectMeter
        : "حیاط",
      desLocationElectMeter: rowData.row.electProjectDetail.desLocationElectMeter,
      needSubCutter: rowData.row.electProjectDetail.needSubCutter,
      windowsSealingStatus: rowData.row.electProjectDetail.windowsSealingStatus
        ? rowData.row.electProjectDetail.windowsSealingStatus
        : "هوابند",
      desWindowsSealing: rowData.row.electProjectDetail.desWindowsSealing,
      gOvnCount: rowData.row.electProjectDetail.gOvnCount,
      gOvnUsage: rowData.row.electProjectDetail.gOvnUsage,
      gComCount: rowData.row.electProjectDetail.gComCount,
      gComUsage: rowData.row.electProjectDetail.gComUsage,
      hitterUsage: rowData.row.electProjectDetail.hitterUsage,
      hitterCount: rowData.row.electProjectDetail.hitterCount,
      whWaCount: rowData.row.electProjectDetail.whWaCount,
      whWaUsage: rowData.row.electProjectDetail.whWaUsage,
      whWaFanCount: rowData.row.electProjectDetail.whWaFanCount,
      whWaFanUsage: rowData.row.electProjectDetail.whWaFanUsage,
      whFlCount: rowData.row.electProjectDetail.whFlCount,
      whFlUsage: rowData.row.electProjectDetail.whFlUsage,
      pWaCount: rowData.row.electProjectDetail.pWaCount,
      pWaUsage: rowData.row.electProjectDetail.pWaUsage,
      pFlCount: rowData.row.electProjectDetail.pFlCount,
      pFlUsage: rowData.row.electProjectDetail.pFlUsage,
      pFaCount: rowData.row.electProjectDetail.pFaCount,
      pFaUsage: rowData.row.electProjectDetail.pFaUsage,
      burnerCount: rowData.row.electProjectDetail.burnerCount,
      burnerUsage: rowData.row.electProjectDetail.burnerUsage,
      rComCount: rowData.row.electProjectDetail.rComCount,
      rComUsage: rowData.row.electProjectDetail.rComUsage,
      rNormCount: rowData.row.electProjectDetail.rNormCount,
      totalCount: rowData.row.electProjectDetail.totalCount,
      totalUsage: rowData.row.electProjectDetail.totalUsage,
      rNormUsage: rowData.row.electProjectDetail.rNormUsage,
      autoElectCutOff: rowData.row.electProjectDetail.autoElectCutOff,
      gasLeakWarning: rowData.row.electProjectDetail.gasLeakWarning,
      gasCutOffExt: rowData.row.electProjectDetail.gasCutOffExt,
      whpLocation: rowData.row.electProjectDetail.whpLocation,
      rLocation: rowData.row.electProjectDetail.rLocation,
      chDiameter: rowData.row.electProjectDetail.chDiameter,
      veDimension: rowData.row.electProjectDetail.veDimension,
      description: rowData.row.electProjectDetail.description,
    }
  )
  const [open, setOpen] = useState(false)
  const handleInput = evt => {
    setHasError(false)
    const name = evt.target.name

    if(name.indexOf('Count') !== -1) dispatchSumTotalCount(-formInput[name])
    if(name.indexOf('Count') !== -1) dispatchSumTotalCount(+evt.target.value)

    if(name.indexOf('Usage') !== -1) dispatchSumTotalUsage(-formInput[name])
    if(name.indexOf('Usage') !== -1) dispatchSumTotalUsage(+evt.target.value)

    let newValue = evt.target.value
    if (newValue == "on") newValue = evt.target.checked

    if (evt.target.attributes?.type?.value === "text") {
      if (newValue === "true" || newValue === "false")
        newValue = newValue === "true"
    }
    if (evt.target.attributes?.type?.value === "number") newValue = +newValue
    if (evt.target.attributes?.type?.value === "radio") {
      
      if (newValue === "true" || newValue === "false")
        newValue = newValue === "true"
    }
    setFormInput({ [name]: newValue })
    
  }
  useEffect(() => {

  }, [])
  const handleSubmitForm = async (event) => {
    const { onUpdateElectProjectDetails } = mainProps
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.forEach((value, name) => {
      if (value == "on") {
        value = true
      }
      setFormInput({ [name]: value })
    })
    let mapToSave = {
      ...formInput,
      totalCount: sumTotalCount,
      totalUsage: sumTotalUsage,
      pipeSize : +formInput.pipeSize,
      collectorSize : +formInput.collectorSize,
      consent: formInput.consent === 'true' || formInput.consent === true,
      autoElectCutOff: formInput.autoElectCutOff === 'true' || formInput.autoElectCutOff === true,
      gasCutOffExt: formInput.gasCutOffExt === 'true' || formInput.gasCutOffExt === true,
      gasLeakWarning: formInput.gasLeakWarning === 'true' || formInput.gasLeakWarning === true,
      needSubCutter: formInput.needSubCutter === 'true' || formInput.needSubCutter === true,

    }
const ddd = rowData.row.idFile
    await onUpdateElectProjectDetails({process:mapToSave,queryString:serializeQuery({idFile:rowData.row.idFile})})

    setOpen(false)
  }
  return (
    <div>
      <Box sx={{ display: "flex" }}></Box>

      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{}}
        onClick={() => {
          setOpen(!open)
        }}
      >
        الزامات
      </Button>

      <Dialog
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "800px", // Set your width here
            },
          },
        }}
        onClose={() => {
          setOpen(false)
        }}
      >
        <form  onSubmit={handleSubmitForm}>

          <DialogTitle>
          <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
          مشخص کردن الزامات پرونده: {rowData.row.fileNumber}_تعداد واحد:{rowData.row.unitNumber}_طبقه:{rowData.row.numberOfFloor === 0?rowData.row.unitNumber>1?'چند واحدی':'همکف':rowData.row.numberOfFloor} 
              
              </Box>
              <Box>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>

            <Box sx={{ ...style }}>
              <Grid
                container
                justifyContent="center"
                spacing={1}
                alignItems="center"
              >
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="radio-consent-label">
                      رضایتنامه محضری جهت عبور لوله رابط بر روی ملک مجاور مور
                      نیاز است؟
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="radio-consent-label"
                      name="consent"
                      value={formInput.consent}
                      onChange={handleInput}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="بلی"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="خیر"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl size="small" fullWidth>
                                <InputLabel id="select-label-pipeSize">
                                سایز لوله اصلی-اینچ
                                </InputLabel>
                                <Select
                                  labelId="select-label-pipeSize"
                                  name="pipeSize"
                                  value={formInput.pipeSize}
                                  label="سایز لوله اصلی-اینچ"
                                  onChange={handleInput}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={1.25}>1-1/4</MenuItem>
                                  <MenuItem value={1.5}>1-1/2</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={2.5}>2-1/2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>

                                </Select>
                              </FormControl>

                </Grid>
                <Grid item xs={6}>
                <FormControl size="small" fullWidth>
                                <InputLabel id="select-label-collectorSize">
                                  سایز کلکتور-اینچ
                                </InputLabel>
                                <Select
                                  labelId="select-label-collectorSize"
                                  name="collectorSize"
                                  value={formInput.collectorSize}
                                  label="سایز کلکتور-اینچ"
                                  onChange={handleInput}
                                >
                                  <MenuItem value={0}>ندارد</MenuItem>
                                  <MenuItem value={1.25}>1-1/4</MenuItem>
                                  <MenuItem value={1.5}>1-1/2</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={2.5}>2-1/2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>

                                </Select>
                              </FormControl>

                </Grid>

                <Grid item xs={12}>
                  <Grid container className="pt-3">
                    <Grid item>
                      <span>
                        محل اجرای کنتور-مطابق محل تعیین شده بر روی پلان
                      </span>
                    </Grid>
                    <RadioGroup
                      name="locationElectMeter"
                      value={formInput.locationElectMeter}
                      onChange={handleInput}
                    >
                      <Grid container className="px-2">
                        <Grid item>
                          <FormControlLabel
                            value="حیاط"
                            control={<Radio />}
                            label="حیاط"
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            value="راهرو"
                            control={<Radio />}
                            label="راهرو"
                          />
                        </Grid>

                        <Grid item>
                          <FormControlLabel
                            value="پارکینگ"
                            control={<Radio />}
                            label="پارکینگ"
                          />
                        </Grid>

                        <Grid item>
                          <FormControlLabel
                            value="پاگرد"
                            control={<Radio />}
                            label="پاگرد"
                          />
                        </Grid>

                        <Grid item>
                          <FormControlLabel
                            value="بیرون ملک"
                            control={<Radio />}
                            label="بیرون ملک"
                          />
                        </Grid>

                        <Grid item>
                          <FormControlLabel
                            value="داخل مغازه"
                            control={<Radio />}
                            label="داخل مغازه"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={formInput.desLocationElectMeter ?? ""}
                    name="desLocationElectMeter"
                    label="توضیحات محل کنتور/تهویه کنتور و..."
                    type="text"
                    size="small"
                    onChange={handleInput}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel id="radio-needSubCutter-label">
                      شیر قطع کن فرعی مورد نیاز است؟
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="radio-needSubCutter-label"
                      name="needSubCutter"
                      value={formInput.needSubCutter}
                      onChange={handleInput}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="بلی"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="خیر"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel id="radio-windowsSealingStatus-label">
                      وضعیت درزبندی پنجره ها
                    </FormLabel>
                    <RadioGroup
                      name="windowsSealingStatus"
                      value={formInput.windowsSealingStatus}
                      onChange={handleInput}
                    >
                      <Grid container className="px-2">
                        <Grid item>
                          <FormControlLabel
                            value="هوابند"
                            control={<Radio />}
                            label="هوابند"
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            value="معمولی"
                            control={<Radio />}
                            label="معمولی"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={formInput.desWindowsSealing ?? ""}
                    name="desWindowsSealing"
                    label="توضیحات تعدادومحل نصب دریچه های تامین هوا"
                    type="text"
                    size="small"
                    onChange={handleInput}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DialogContentText>
                    تعداد ،الزامات و مشخصات مصرف کننده ها
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6} lg={3} >
                <NumeralButton lblName="تعداد اجاق برق تجاری"  initValue={formInput.gOvnCount} objName="gOvnCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <NumeralButton lblName="مصرف اجاق برق تجاری"  initValue={formInput.gOvnUsage} objName="gOvnUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="تعداد اجاق برق  فردار"  initValue={formInput.gComCount} objName="gComCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="مصرف اجاق برق  فردار"  initValue={formInput.gComUsage} objName="gComUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="تعداد بخاری"   initValue={formInput.hitterCount} objName="hitterCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="مصرف بخاری"  initValue={formInput.hitterUsage} objName="hitterUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="تعداد آبگرمکن دیواری"  initValue={formInput.whWaCount} objName="whWaCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="مصرف آبگرمکن دیواری"  initValue={formInput.whWaUsage} objName="whWaUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="تعداد آبگرمکن فن دار"  initValue={formInput.whWaFanCount} objName="whWaFanCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="مصرف آبگرمکن فن دار"  initValue={formInput.whWaFanUsage} objName="whWaFanUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="تعداد آبگرمکن زمینی"  initValue={formInput.whFlCount} objName="whFlCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="مصرف آبگرمکن زمینی"  initValue={formInput.whFlUsage} objName="whFlUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="تعداد پکیج دیواری"  initValue={formInput.pWaCount} objName="pWaCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="مصرف پکیج دیواری"  initValue={formInput.pWaUsage} objName="pWaUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="تعداد پکیج زمینی"  initValue={formInput.pFlCount} objName="pFlCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="مصرف پکیج زمینی"  initValue={formInput.pFlUsage} objName="pFlUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="تعداد پکیج فن دار"  initValue={formInput.pFaCount} objName="pFaCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="مصرف پکیج فن دار"  initValue={formInput.pFaUsage} objName="pFaUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="تعداد مشعل"  initValue={formInput.burnerCount} objName="burnerCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="مصرف مشعل"  initValue={formInput.burnerUsage} objName="burnerUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="تعداد کباب پز تجاری"  initValue={formInput.rComCount} objName="rComCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="مصرف کباب پز تجاری"  initValue={formInput.rComUsage} objName="rComUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="تعداد کباب پز معمولی"  initValue={formInput.rNormCount} objName="rNormCount" changeValue={1} changeValueDecimal={0} callBack={handleInput} />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                <NumeralButton lblName="مصرف کباب پز معمولی"  initValue={formInput.rNormUsage} objName="rNormUsage" changeValue={1} changeValueDecimal={0.1} callBack={handleInput} />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    disabled
                    fullWidth
                    value={sumTotalCount}
                    name="totalCount"
                    label="تعداد کل"
                    type="number"
                    size="small"
                    onChange={handleInput}
                    inputProps={{
                      style: { textAlign: "center",color:'blue' },
                    }}
                
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    disabled
                    fullWidth
                    value={sumTotalUsage}
                    name="totalUsage"
                    label="مصرف کل"
                    type="number"
                    size="small"
                    onChange={handleInput}
                    inputProps={{
                      style: { textAlign: "center",color:'blue'  },
                    }}
                
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel>
                      الزامات نصب تجهیزات ایمنی:
                    </FormLabel>
                    <FormGroup>
                      <Grid container className="px-2">
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formInput.autoElectCutOff ?? false}
                                onChange={handleInput}
                                name="autoElectCutOff"
                              />
                            }
                            label="شیرخودکار قطع برق "
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formInput.gasLeakWarning ?? false}
                                onChange={handleInput}
                                name="gasLeakWarning"
                              />
                            }
                            label="دستگاه اعلام خطر "
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formInput.gasCutOffExt ?? false}
                                onChange={handleInput}
                                name="gasCutOffExt"
                              />
                            }
                            label="شیر قطع جریان برق  اضافی"
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6} xl={3}>
                  <TextField
                    required
                    value={formInput.whpLocation ?? ""}
                    name="whpLocation"
                    label="محل آبگرمکن/پکیج"
                    type="text"
                    size="small"
                    onChange={handleInput}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                </Grid>
                <Grid item xs={6} xl={3}>
                  <TextField
                    required
                    value={formInput.rLocation ?? ""}
                    name="rLocation"
                    label="محل کباب پز"
                    type="text"
                    size="small"
                    onChange={handleInput}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                </Grid>
                <Grid item xs={6} xl={3}>
                  <TextField
                    required
                    value={formInput.chDiameter ?? ""}
                    name="chDiameter"
                    label="قطر دودکش"
                    type="text"
                    size="small"
                    onChange={handleInput}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                </Grid>
                <Grid item xs={6} xl={3}>
                  <TextField
                    required
                    value={formInput.veDimension ?? ""}
                    name="veDimension"
                    label="ابعاد هواکش"
                    type="text"
                    size="small"
                    onChange={handleInput}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    margin="dense"
                    autoFocus
                    multiline={true}
                    rows={4}
                    value={formInput.description ?? " "}
                    name="description"
                    label="توضیحات"
                    type="text"
                    onChange={handleInput}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions>
            <Box sx={{ display: "flex" }}>
              {mainProps.loading ? (
                <CircularProgress disableShrink />
              ) : (
                <Button disabled={rowData.row.projectLevel===2 || rowData.row.electProjectDetail.electProject.projectLevelEnum ===2} variant="contained" type="submit">
                  {rowData.row.projectLevel===2?"الزامات در مرحله نقشه قابل ویرایش نیست":rowData.row.electProjectDetail.electProject.projectLevelEnum===2?"نقشه تایید شده":"ذخیره"}
                </Button>
              )}
            </Box>
          </DialogActions>

        </form>
      </Dialog>
    </div>
  )
}

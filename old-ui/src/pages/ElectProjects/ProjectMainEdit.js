import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  OutlinedInput,
  FormHelperText,
  Checkbox,
  Link,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material"
import { setInvalidateEmpty, setInvalidateLength } from "common/global"
import Locations from "components/Common/Locations"
import { TextMaskPhone } from "components/Common/TextMask"
import { getCurrentUser } from "helpers/service_helper"
import BuildingGroupParameterTypeEnum from "models/types/BuildingGroupParameterTypeEnum"

import React, { useState, useReducer, useEffect } from "react"

const ProjectMainEdit = ({ rowData, mainProps }) => {
  const style = {
    // border: "2px solid #000",
    p: 2,
  }
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
  const [isErrorValid, setIsErrorValid] = useState(false)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  const [hasError, setHasError] = useState(false)
  const valueItem = {
    landlordName: rowData.landlordName,
    ownershipTypeEnum: rowData.ownershipTypeEnum,
    companyName: rowData.companyName,
    landlordNaCode: rowData.landlordNaCode,
    landlordPhoneNumber: rowData.landlordPhoneNumber,
    supervisorName: rowData.supervisorName,
    supervisorPhoneNumber: rowData.supervisorPhoneNumber,
    postalCode: rowData.postalCode,
    area: rowData.area,
    address: rowData.address,
    numberOfFloor: rowData.numberOfFloor,
    idSection: rowData.idSection,
    licenseNumber: rowData.licenseNumber,
    buildingGroupTypeEnum: rowData.buildingGroupTypeEnum
      ? rowData.buildingGroupTypeEnum
      : 1,
    buildingGroupParameterTypeEnum: rowData.buildingGroupParameterTypeEnum
      ? rowData.buildingGroupParameterTypeEnum
      : 1,
    isEarthSystem: rowData.isEarthSystem,
    ertSystemTypeEnum: rowData.ertSystemTypeEnum,
    isBuildingInspection: rowData.isBuildingInspection,
    isTestAndDelivery: rowData.isTestAndDelivery,
    panelNeed: rowData.panelNeed,
    foundationElectrodeArea: rowData.foundationElectrodeArea,
    isNeedEb: rowData.isNeedEb,
    hasSupervision: rowData.hasSupervision,
    hasRelatedPermit: rowData.hasRelatedPermit,
    areaAsBuilt: rowData.areaAsBuilt ? rowData.areaAsBuilt : 0,
    childInspectionCount: rowData.childInspectionCount ? rowData.childInspectionCount : 0,
    childErtCount: rowData.childErtCount ? rowData.childErtCount : 0,
  }
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { ...valueItem }
  )
  const [open, setOpen] = useState(false)
  const handleInput = evt => {
    setHasError(false)
    const name = evt.target.name
    const newValue = evt.target.value
    if (name === "buildingGroupTypeEnum") {
      setFormInput({ ["buildingGroupParameterTypeEnum"]: 0 })
      setHasError(true)
    }

    setFormInput({ [name]: newValue })
  }

  const handleSubmitForm = async (event, values) => {
    const { onUpdateElectProject } = mainProps
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.forEach((value, name) => {
      setFormInput({ [name]: value })
    })
    let mapToSave = {
      ...formInput,
      id: rowData.id,
      idSection: +dataAddress.sectionId,
      idCity: +dataAddress.cityId,
      idProvince: +dataAddress.provinceId,
      buildingGroupTypeEnum: +formInput.buildingGroupTypeEnum,
      buildingGroupParameterTypeEnum: +formInput.buildingGroupParameterTypeEnum,
      ertSystemTypeEnum: +formInput.ertSystemTypeEnum,
      isEarthSystem:
        formInput.isEarthSystem === "true" || formInput.isEarthSystem === true,
      isBuildingInspection:
        formInput.isBuildingInspection === "true" ||
        formInput.isBuildingInspection === true,
      isTestAndDelivery:
        formInput.isTestAndDelivery === "true" ||
        formInput.isTestAndDelivery === true,
      panelNeed: formInput.panelNeed === "true" || formInput.panelNeed === true,
      foundationElectrodeArea: +formInput.foundationElectrodeArea,
      isNeedEb: formInput.isNeedEb === "true" || formInput.isNeedEb === true,
      hasRelatedPermit:
        formInput.hasRelatedPermit === "true" ||
        formInput.hasRelatedPermit === true,
      hasSupervision:
        formInput.hasSupervision === "true" ||
        formInput.hasSupervision === true,
      areaAsBuilt: +formInput.areaAsBuilt || 0,
      childInspectionCount: +formInput.childInspectionCount || 0,
      childErtCount: +formInput.childErtCount || 0,
    }
    await onUpdateElectProject(mapToSave)
  }
  useEffect(() => {
    if (
      +dataAddress.sectionId !== 0 &&
      +dataAddress.sectionId !== rowData.idSection
    )
      setFormInput({ address: "" })
  }, [dataAddress.sectionId])

  return (
    <Box sx={{ display: "flex" }}>
      <Link
        variant="contained"
        color="primary"
        size="small"
        style={{}}
        onClick={() => {
          setOpen(!open)
          setFormInput(valueItem)
        }}
      >
        {rowData.fileNumber}
      </Link>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <form onSubmit={handleSubmitForm}>
          <DialogTitle align="center">
            ویرایش پرونده - {rowData.fileNumber}
          </DialogTitle>
          <DialogContent>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={4}>
                <span>تاریخ ثبت:</span> {mainProps.t(rowData.solarRegisterDate)}
              </Grid>
              <Grid item xs={4}>
                <span>ثبت کننده:</span> {rowData.projectCreatedTypeName}
              </Grid>
              <Grid item xs={4}>
                <span>نوع درخواست:</span> {rowData.projectTypeRequestName}
              </Grid>
            </Grid>
            <Box sx={{ ...style }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
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
                  />
                </Grid>
                {(getCurrentUser().role === "Administrator" ||
                  getCurrentUser().role === "Section") && (
                  <Grid item xs={6}>
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
                )}
                {(getCurrentUser().role === "Administrator" ||
                  getCurrentUser().role === "Section") && (
                  <Grid item xs={6}>
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
                            : 0
                        }
                        label="گروه طبقات"
                        onChange={handleInput}
                        error={formInput.buildingGroupParameterTypeEnum === 0}
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
                              key={BuildingGroupParameterTypeEnum[key].value}
                              value={BuildingGroupParameterTypeEnum[key].value}
                            >
                              {BuildingGroupParameterTypeEnum[key].label}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    required
                    value={formInput.landlordName}
                    name="landlordName"
                    label="نام ونام خانوادگی مالک"
                    type="text"
                    onChange={handleInput}
                    title=""
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                </Grid>
                {formInput.ownershipTypeEnum == 2 && (
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      required
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    error={isErrorValid}
                    size="small"
                    required
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
                    onInvalid={e => setInvalidateLength(e, 10)}
                    onInput={e => setInvalidateLength(e, 10)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl dir="ltr" fullWidth>
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
                  </FormControl>
                </Grid>
                {rowData.projectTypeRequestEnum === 2 && (
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
                        <FormHelperText>نمونه:1234****09</FormHelperText>
                      </FormControl>
                    </Grid>
                  </>
                )}

                <Grid item xs={6}>
                  <TextField
                    fullWidth
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
                {(getCurrentUser().role === "Administrator" ||
                  getCurrentUser().role === "Section") && (
                  <>
                    <Grid item xs={6}>
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
                        onChange={handleInput}
                        onInvalid={setInvalidateEmpty}
                        onInput={setInvalidateEmpty}
                      />
                    </Grid>
                    <Grid item xs={6}>
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
                    </Grid>
                  </>
                )}
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    value={formInput.numberOfFloor}
                    name="numberOfFloor"
                    label="تعداد طبقه"
                    type="number"
                    size="small"
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    onChange={handleInput}
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Locations
                    setDataAddress={setDataAddress}
                    matches_sm={true}
                    idSection={rowData.idSection}
                    isAccessCity={false}
                  />
                </Grid>
                <Grid item sx={{ paddingTop: 2 }} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    required
                    multiline={true}
                    row={6}
                    value={formInput.address}
                    name="address"
                    label="آدرس"
                    type="text"
                    onChange={handleInput}
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                </Grid>
                {(getCurrentUser().role === "Administrator" ||
                  getCurrentUser().role === "Section") && (
                  <>
                    <span>
                      توجه داشته باشید فقط یک بار میتوانید اجرای ارت یا بازرسی
                      ساختمان را تغییر دهید
                    </span>
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={
                              rowData.projectTypeRequestEnum === 2 ||
                              rowData.electProjectProcessViewModel.length > 0
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
                        label="اجرای ارت"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={
                              rowData.projectTypeRequestEnum === 2 ||
                              rowData.electProjectProcessViewModel.length > 0
                            }
                            checked={formInput.isBuildingInspection}
                            value={
                              formInput.isBuildingInspection === "true" ||
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
                    </Grid>
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={rowData.projectTypeRequestEnum === 2}
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
                    </Grid>
                    {formInput.isEarthSystem && (
                      <>
                        <Grid item xs={6} lg={6}>
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
                              <MenuItem value={2}>الکترود زمین افقی</MenuItem>
                              <MenuItem value={3}>الکترود زمین ساده2</MenuItem>
                              <MenuItem value={4}>دو راد</MenuItem>
                              <MenuItem value={5}>الکتروداساسی-5حلقه</MenuItem>
                              <MenuItem value={6}>الکترود فونداسیون</MenuItem>
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
                          <Grid item xs={6} lg={6}>
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

                    {formInput.isBuildingInspection && (
                      <Grid item xs={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              disabled={
                                rowData.projectTypeRequestEnum === 2 ||
                                rowData.electProjectProcessViewModel.length > 0
                              }
                              checked={formInput.hasSupervision}
                              value={
                                formInput.hasSupervision === "true" ||
                                formInput.hasSupervision === true
                              }
                              onChange={e =>
                                handleInput({
                                  target: {
                                    name: "hasSupervision",
                                    value: !!e.target.checked,
                                  },
                                })
                              }
                              name="hasSupervision"
                            />
                          }
                          label="نیاز به نظارت/ازبیلت"
                        />
                      </Grid>
                    )}
                    {!formInput.isTestAndDelivery && (
                      <Grid container className="pt-4" spacing={6}>
                        <Grid item xs={12} lg={12}>
                          <h6 style={{ color: "red" }}>
                            در پارامتر های زیر دقت کنید در صورت وارد کردن هر یک
                            به همان تعداد زیر پرونده ایجاد میگردد و بعدا قابل
                            ویرایش نیست
                          </h6>
                        </Grid>

                        <Grid item xs={12} lg={6}>
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
                            helperText={<span style={{ color: "blue" }}></span>}
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
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
                            helperText={<span style={{ color: "blue" }}></span>}
                          />
                        </Grid>
                      </Grid>
                    )}
                    {/* <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                      disabled={rowData.projectTypeRequestEnum === 2  || rowData.electProjectProcessViewModel.length >0}
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
                        name="isTestAndDelivery"
                      />
                    }
                    label="تست و تحویل"
                  />
                </Grid> */}
                  </>
                )}
              </Grid>
            </Box>
          </DialogContent>

          {rowData.projectLevelEnum == 0 ||
          getCurrentUser().role === "Administrator" ||
          getCurrentUser().role === "Section" ? (
            <DialogActions>
              <Box sx={{ display: "flex" }}>
                {mainProps.loading ? (
                  <CircularProgress disableShrink />
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={
                      isErrorValid ||
                      +formInput.buildingGroupParameterTypeEnum === 0
                    }
                  >
                    ذخیره
                  </Button>
                )}
              </Box>
            </DialogActions>
          ) : (
            "جهت نیاز به تغییر مشخصات به واحد برق مراجعه نمایید"
          )}
        </form>
      </Dialog>
    </Box>
  )
}

export default ProjectMainEdit

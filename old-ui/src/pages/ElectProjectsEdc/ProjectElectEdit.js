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
    Link
  } from "@mui/material"
  import { setInvalidateEmpty, setInvalidateLength } from "common/global"
  import Locations from "components/Common/Locations"
  import { TextMaskPhone } from "components/Common/TextMask"
  import { getCurrentUser } from "helpers/service_helper"
  import BuildingGroupParameterTypeEnum from "models/types/BuildingGroupParameterTypeEnum"
  
  import React, { useState, useReducer, useEffect } from "react"
  
  const ProjectElectEdit = ({ rowData, mainProps }) => {
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
      postalCode: rowData.postalCode,
      address: rowData.address,
      numberOfFloor: rowData.numberOfFloor,
      idSection: rowData.idSection,
      electRequestNumber: rowData.electRequestNumber,
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
          {rowData.electRequestNumber}
        </Link>
  
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false)
          }}
        >
          <form onSubmit={handleSubmitForm}>
            <DialogTitle align="center">ویرایش تقاضا - {rowData.electRequestNumber}</DialogTitle>
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
          
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      required
                      value={formInput.electRequestNumber}
                      name="electRequestNumber"
                      label="شماره تقاضا"
                      type="text"
                      helperText=""
                      onChange={handleInput}
                      onInvalid={setInvalidateEmpty}
                      onInput={setInvalidateEmpty}
                    />
                  </Grid>
     
  
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
          
                </Grid>
              </Box>
            </DialogContent>
  
              <DialogActions>
                <Box sx={{ display: "flex" }}>
                  {mainProps.loading ? (
                    <CircularProgress disableShrink />
                  ) : (
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={
                        isErrorValid
                      }
                    >
                      ذخیره
                    </Button>
                  )}
                </Box>
              </DialogActions>
          </form>
        </Dialog>
      </Box>
    )
  }
  
  export default ProjectElectEdit
  
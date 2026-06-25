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
  OutlinedInput,
  FormHelperText,
  Alert,
} from "@mui/material"
import { setInvalidateEmpty, setInvalidateLength } from "common/global"
import Locations from "components/Common/Locations"
import { TextMaskPhone } from "components/Common/TextMask"
import { enumToArray, getCurrentUser } from "helpers/service_helper"

import React, { useState, useReducer, useEffect } from "react"

export const ProjectEdit = ({ rowData, mainProps }) => {
  console.log('rowData',rowData);
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
  const [hasError, setHasError] = useState(false)
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      landlordName: rowData.row.landlordName,
      ownershipTypeEnum: rowData.row.ownershipTypeEnum,
      companyName: rowData.row.companyName,
      landlordNaCode: rowData.row.landlordNaCode,
      landlordPhoneNumber: rowData.row.landlordPhoneNumber,
      postalCode: rowData.row.postalCode,
      area: rowData.row.area,
      address: rowData.row.address,
      numberOfFloor: rowData.row.numberOfFloor,
      buildingTypeEnum: rowData.row.buildingTypeEnum,
      IdSection: rowData.row.idSection,
    }
  )
  const [open, setOpen] = useState(false)
  const handleInput = evt => {
    setHasError(false)
    const name = evt.target.name
    const newValue = evt.target.value

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
      id: rowData.row.id,
      buildingTypeEnum: +formInput.buildingTypeEnum,
      IdSection: +dataAddress.sectionId,
    }
    await onUpdateElectProject(mapToSave)
  }
  useEffect(()=>{
    if(+dataAddress.sectionId !== 0 && +dataAddress.sectionId !== rowData.row.idSection ) setFormInput({address:""})
  },[dataAddress.sectionId])
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{}}
          onClick={() => {
            setOpen(!open)
            
          }}
        >
          {rowData.row.fileNumber}
        </Button>

        <Dialog
          open={open}
          onClose={() => {
            setOpen(false)
          }}
        >
          <form onSubmit={handleSubmitForm}>
            <DialogTitle align="center">ویرایش پرونده</DialogTitle>
            <DialogContent>
            <Grid item xs={12}>

                {mainProps.error ? (
                  <Alert severity="error">{mainProps.error}</Alert>
                ) : null}
                {mainProps.success ? (
                  <Alert severity="success">{mainProps.success} - ذخیره شد</Alert>
                ) : null}
              </Grid>
              <Grid container justifyContent="center" alignItems="center">

                <Grid item xs={4}>
                  <span>تاریخ ثبت:</span> {mainProps.t(rowData.row.solarRegisterDate)}
                </Grid>
              </Grid>
              <Box sx={{ ...style }}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={6}>
                    <TextField
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
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
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
                      required
                      value={formInput.numberOfFloor}
                      name="numberOfFloor"
                      label="طبقه"
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

                  <Grid  item xs={12}>
                              <Locations setDataAddress={setDataAddress} matches_sm={true} idSection={rowData.row.idSection} />
                            </Grid>
                  <Grid item sx={{ paddingTop: 2 }} xs={8}>
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

            {rowData.row.projectLevelEnum == 0 ||
            getCurrentUser().role === "Administrator" ? (
              <DialogActions>
                <Box sx={{ display: "flex" }}>
                  {mainProps.loading ? (
                    <CircularProgress disableShrink />
                  ) : (
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isErrorValid}
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
    </div>
  )
}

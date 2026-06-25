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
  IconButton,
} from "@mui/material"
import { setInvalidateEmpty, setInvalidateLength } from "common/global"
import { TextMaskPhone } from "components/Common/TextMask"
import { enumToArray, getCurrentUser, serializeQuery } from "helpers/service_helper"
import EditIcon from "@mui/icons-material/Edit"
import CloseIcon from "@mui/icons-material/Close"
import React, { useState, useReducer, useEffect, memo } from "react"

const ProjectDetails = ({ rowData, mainProps }) => {
  const style = {
    // border: "2px solid #000",
    p: 2,
  }
  const [isErrorValid, setIsErrorValid] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      landlordName: rowData.row.landLordName,
      ownershipTypeEnum: rowData.row.ownershipTypeEnum,
      companyName: rowData.row.companyName,
      landlordNaCode: rowData.row.landlordNaCode,
      landlordPhoneNumber: rowData.row.landlordPhoneNumber,
      postalCode: rowData.row.postalCode,
      area: rowData.row.area,
      address: rowData.row.address,
      numberOfFloor: rowData.row.numberOfFloor,
      buildingType: rowData.row.buildingType,
      packageNeed: rowData.row.packageNeed,
      pipingTypeEnum: rowData.row.pipingTypeEnum,
      unitNumber: rowData.row.unitNumber,
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
    const { onUpdateElectProjectEng } = mainProps
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.forEach((value, name) => {
      setFormInput({ [name]: value })
    })
    let mapToSave = {
      ...formInput,
      id: rowData.row.idElectProject,
      buildingTypeEnum: +formInput.buildingType,
      packageNeed:
        formInput.packageNeed === "true" || formInput.packageNeed === true,
      pipingTypeEnum: +formInput.pipingTypeEnum,
      unitNumber: +formInput.unitNumber,
    }
    await onUpdateElectProjectEng({process:mapToSave,queryString:serializeQuery({idFile:rowData.row.idFile})})

  }
  return (
    <div>
      <Box sx={{ display: "flex" }}></Box>

      <Button
        startIcon={<EditIcon />}
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
          <DialogTitle>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>ویرایش پرونده</Box>
              <Box>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <h6>توجه فرمایید...</h6>
            <p className="text-danger">
              بعد از ذخیره اعلام نظر نمی توانید تعداد واحد و نوع لوله گذاری را
              تغییر دهید{" "}
            </p>
            <p className="text-danger">
              در صورت تغیر تعداد واحد و نوع لوله گذاری هزینه ممیزی محاسبه و از
              کیف پول مجری کسر میگردد{" "}
            </p>
            <Box sx={{ ...style }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="radio-packageNeed-label">
                      نیاز به پکیج/آبگرمکن دیواری فن دار
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="radio-packageNeed-label"
                      name="packageNeed"
                      value={formInput.packageNeed}
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
                  <FormControl size="small" fullWidth>
                    <InputLabel id="select-label-pipingTypeEnum">
                      نوع لوله گذاری
                    </InputLabel>
                    <Select
                      labelId="select-label-pipingTypeEnum"
                      name="pipingTypeEnum"
                      value={
                        formInput.pipingTypeEnum ? formInput.pipingTypeEnum : 0
                      }
                      label="نوع لوله گذاری"
                      onChange={handleInput}
                    >
                      <MenuItem value={0}>روکار</MenuItem>
                      <MenuItem value={1}>توکار</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="select-label-unitNumber">
                      تعداد واحد
                    </InputLabel>
                    <Select
                      labelId="select-label-unitNumber"
                      name="unitNumber"
                      value={formInput.unitNumber ? formInput.unitNumber : 1}
                      label="تعداد واحد"
                      onChange={handleInput}
                    >
                      <MenuItem value={1}>یک واحدی</MenuItem>
                      <MenuItem value={2}>دو واحدی</MenuItem>
                      <MenuItem value={3}>سه واحدی</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <span>موبایل مجری:</span> {rowData.row.executorCellPhone}
                </Grid>
                <Grid item xs={6}>
                  <span>تاریخ ثبت:</span> {rowData.row.solarRegisterDate}
                </Grid>
                <Grid item xs={6} className="pt-4">
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
                      شماره تماس مالک
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      required
                      size="small"
                      label="شماره تماس مالک"
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
                    value={
                      +formInput.unitNumber === 1 ? formInput.numberOfFloor : "0"
                    }
                    name="numberOfFloor"
                    label="طبقه"
                    type="number"
                    size="small"
                    onChange={handleInput}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    disabled={
                      +formInput.unitNumber > 1 || +formInput.unitNumber <= 0
                    }
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                    helperText={
                      <span style={{ color: "blue" }}>طبقه چندم/0=همکف</span>
                    }
                  />
                </Grid>
                <Grid item sx={{ paddingTop: 2 }} xs={6}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="select-label-buildingType">
                      نوع کاربری
                    </InputLabel>
                    <Select
                      labelId="select-label-buildingType"
                      name="buildingType"
                      value={formInput.buildingType}
                      label="نوع کاربری"
                      onChange={handleInput}
                    >
                      <MenuItem value={1}>مسکونی</MenuItem>
                      <MenuItem value={2}>تجاری</MenuItem>
                      <MenuItem value={3}>اداری</MenuItem>
                      <MenuItem value={4}>صنعتی</MenuItem>
                      <MenuItem value={5}>عمومی</MenuItem>
                      <MenuItem value={6}>سه واحد به بالا</MenuItem>
                      <MenuItem value={7}>مسکن مهر</MenuItem>
                      <MenuItem value={8}>روستایی</MenuItem>
                    </Select>
                  </FormControl>
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

          <DialogActions>
            {mainProps.success && (
              <p className="text-info">اطلاعات با موفقیت ذخیره شد</p>
            )}
            {mainProps.error && (
              <p className="text-danger">{mainProps.error}</p>
            )}
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
        </form>
      </Dialog>
    </div>
  )
}

export default ProjectDetails

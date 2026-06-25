import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
  } from "@mui/material"
  import React, { useEffect, useReducer, useState } from "react"
  import {
    getListEngineer,
    postEngineerPaymentCustom,
    resetAccountingFlag,
    resetEngineerFlag,
  } from "store/actions"
  import PropTypes from "prop-types"
  import { connect } from "react-redux"
  import NumberFormat from "react-number-format"
  import { setInvalidateEmpty } from "common/global"
  import { PersianDatePicker } from "components/Common/PersianDatePicker"
  
  const Index = props => {
    const { lstEngineer, loading } = props
    const [errorMessage, setErrorMessage] = useState(null)

    const [valueEngineer, setValueEngineer] = useState()
  
    const [inputEngValue, setInputEngValue] = useState("")
    const [fishDate, setFishDate] = useState("")
    const [formInput, setFormInput] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      {
        engineerId: "",
        amount: null,
        fishNumber: "",
        btId: "",
        solarFishDate: "",
        des: "توضیحات",
        transactionStatus: "0",
      }
    )
  
    const handleInput = evt => {
      const name = evt.target.name
      const newValue = evt.target.value
      setFormInput({ [name]: newValue })
    }
  
    const handleSubmitForm = async (event, values) => {
      event.preventDefault()
      if (window.confirm("درصورتیکه اطمینان دارید دکمه ثبت را بزنید")) {
        console.log("formInput.transactionStatus",formInput.transactionStatus);
        let engPaymentToSave = {
          ...formInput,
          solarFishDate: fishDate.persian,
          transactionStatus: Number(formInput.transactionStatus),
          fishNumber:
            formInput.transactionStatus === "0" ? formInput.fishNumber : "1001",
          btId:
            formInput.transactionStatus === "0"
              ? formInput.engineerId + "-" +fishDate.persian?.replaceAll('/','')
              : window.Date.now().toString(),
        }
         await saveToDatabase(engPaymentToSave)
      }
    }
    
    const saveToDatabase = async values => {
      const { onPostEngineerPaymentCustom } = props
      await onPostEngineerPaymentCustom(values)
    }
  
    useEffect(() => {
      props.onGetListEngineer()
    }, [])
  
    useEffect(() => {
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }, [errorMessage])
    useEffect(() => {
      setTimeout(() => {
        setErrorMessage(null)
        props.onResetAccountingFlag()
        props.onResetEngineerFlag()
      }, 5000)
    }, [errorMessage, props.success, props.error])
    return (
      <>
        <Grid item xs={12}>
          {props.error ? <Alert severity="error">{props.error}</Alert> : null}
          {props.success ? (
            <Alert severity="success">{props.success}</Alert>
          ) : null}
        </Grid>
        <form onSubmit={handleSubmitForm}>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="radio-transactionStatus-label">
                    ثبت واریزی به حساب بانکی کارشناس
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="radio-transactionStatus-label"
                    name="transactionStatus"
                    value={formInput.transactionStatus}
                    onChange={handleInput}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="واریز"
                    />
                    {/* <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="برداشت"
                    /> */}
                  </RadioGroup>
                </FormControl>
              </Grid>


              <Grid item xs={6}>
                <Autocomplete
                  value={valueEngineer}
                  autoHighlight
                  disablePortal
                  size="small"
                  fullWidth
                  style={{ width: "100%" }}
                  onChange={(e, value) =>
                    handleInput({
                      target: { name: "engineerId", value: value?.id },
                    })
                  }
                  inputValue={inputEngValue}
                  onInputChange={(event, newInputValue) => {
                    setInputEngValue(newInputValue)
                  }}
                  id="engineerId"
                  options={lstEngineer?.map(option => ({
                    id: option.id,
                    label:
                      option.fullName +
                      "/" +
                      option.naCode +
                      "/" +
                      option.cellPhone,
                  }))}
                  sx={{ width: 500 }}
                  renderInput={params => (
                    <TextField {...params} label="انتخاب کارشناس" required />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.label}
                    </Box>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <PersianDatePicker
                  setPersianDate={setFishDate}
                  label={"تاریخ فیش واریزی"}
                />
              </Grid>

              <Divider
                sx={{ mt: 3, pt: 1 }}
                style={{ width: "100%" }}
                variant="middle"
              />
              {/* amount */}
              <Grid item xs={4}>
                <NumberFormat
                  className="MuiOutlinedInput-input MuiInputBase-input MuiInputBase-inputSizeSmall"
                  value={formInput.amount}
                  name="amount"
                  margin="dense"
                  onValueChange={value =>
                    handleInput({
                      target: { name: "amount", value: value.floatValue },
                    })
                  }
                  fullWidth
                  size="small"
                  label="مبلغ فیش"
                  thousandSeparator={true}
                  customInput={TextField}
                  prefix={" ریال "}
                />
              </Grid>
              {/* fishNumber */}
              <Grid item xs={4}>
                {+formInput.transactionStatus === 0 ? (
                  <TextField
                    required
                    fullWidth
                    margin="dense"
                    value={formInput.fishNumber}
                    name="fishNumber"
                    label="شماره فیش"
                    type="text"
                    size="small"
                    onChange={handleInput}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                  />
                ) : (
                  ""
                )}
              </Grid>
  
              <Grid item xs={4}>
                {+formInput.transactionStatus === 0 ? (
                  <TextField
                    required
                    fullWidth
                    margin="dense"
                    value={formInput.engineerId + "-" +fishDate.persian?.replaceAll('/','') }
                    name="btId"
                    label="شماره پیگیری فیش"
                    type="text"
                    size="small"
                    onChange={handleInput}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    onInvalid={setInvalidateEmpty}
                    onInput={setInvalidateEmpty}
                    disabled
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Divider
                sx={{ mt: 3, pt: 1 }}
                style={{ width: "100%" }}
                variant="middle"
              />
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  multiline={true}
                  rows={4}
                  value={formInput.des}
                  name="des"
                  label="توضیحات"
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
    
                <Button disabled={loading} variant="contained" type="submit">
                  ذخیره
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </>
    )
  }
  
  Index.propTypes = {
    lstEngineer: PropTypes.any,
    error: PropTypes.any,
    success: PropTypes.any,
    loading: PropTypes.any,
    onPostEngineerPaymentCustom: PropTypes.func,
    onResetAccountingFlag: PropTypes.func,
    onResetEngineerFlag: PropTypes.func,
  }
  
  const mapStateToProps = ({ Engineers }) => ({
    lstEngineer: Engineers.lstEngineer,
    error: Engineers.error,
    success: Engineers.success,
    loading: Engineers.loading ,
  })
  
  const mapDispatchToProps = dispatch => ({
    onGetListEngineer: () => dispatch(getListEngineer()),
    onPostEngineerPaymentCustom: events => dispatch(postEngineerPaymentCustom(events)),
    onResetAccountingFlag: () => dispatch(resetAccountingFlag()),
    onResetEngineerFlag: () => dispatch(resetEngineerFlag()),
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Index)
  
import {
  Alert,
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
import debounce from 'lodash/debounce';
import {
  getElectProjectsFullFilter,
  postPaymentCustom,
  resetAccountingFlag,
} from "store/actions"
import PropTypes from "prop-types"
import { LinearProgress } from "@mui/material"
import { connect } from "react-redux"
import { DataGrid, GridToolbar, faIR } from "@mui/x-data-grid"
import NumberFormat from "react-number-format"
import { setInvalidateEmpty } from "common/global"
import { PersianDatePicker } from "components/Common/PersianDatePicker"
import { AutoComplete, Input } from "antd"

const Payment = props => {
  const { lstElectProjectsFullFilter, loading, reload, onGetElectProjectsFullFilter} = props
  const [errorMessage, setErrorMessage] = useState(null)

  const [fishDate, setFishDate] = useState("")
  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(1)
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      electProjectId: "",
      amount: null,
      fishNumber: "",
      btId: "",
      solarFishDate: "",
      des: "",
      transactionStatus: "0",
    }
  )

  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    if(name === 'electProjectId'){
      var getElectProject = lstElectProjectsFullFilter?.find(x=>x.id === newValue)
      if(getElectProject.isBigProject){
        setFormInput({ ["amount"]: Math.abs(getElectProject.amountPerArea) })
      }else{
        setFormInput({ ["amount"]: Math.abs(getElectProject.projectBalance) })
      }

    }
    setFormInput({ [name]: newValue })
  }

  const handleSubmitForm = async (event, values) => {
    event.preventDefault()
    if (window.confirm("درصورتیکه اطمینان دارید دکمه ثبت را بزنید")) {
      console.log("formInput.transactionStatus",formInput.transactionStatus);
      let electProjectToSave = {
        ...formInput,
        solarFishDate: fishDate.persian,
        transactionStatus: Number(formInput.transactionStatus),
        fishNumber:
          formInput.transactionStatus === "0" ? formInput.fishNumber : "1001",
        btId:
          formInput.transactionStatus === "0"
            ? formInput.btId
            : window.Date.now().toString(),
      }
      console.log('electProjectToSave', electProjectToSave);
      
       await saveToDatabase(electProjectToSave)
    }
  }
  

  const saveToDatabase = async values => {
    const { onPostPaymentCustom } = props
    await onPostPaymentCustom(values)
  }

  useEffect(async() => {
    await handleSearchElectProject()
   }, [pageIndex, pageSize])

   useEffect(async() => {
    if(reload) {
     await handleSearchElectProject()
    }
  }, [reload])

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }, [errorMessage])
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
      props.onResetAccountingFlag()
    }, 5000)
  }, [errorMessage, props.success, props.error])

  const handleSearchElectProject = async (val = 0) => {
    const searchQuery = {
      searchValue:'',
      page: pageIndex,
      pageSize:pageSize,
      fileNumber: +val,
      solarRegisterDate: '',
      idSection: 0,
      landLordName:'',
      relatedPermitFilter: false,
      filterProjectLevel: false,
      isStop: false,

    }
   await onGetElectProjectsFullFilter(searchQuery)
  }

  const handleSearch = async (value) => {
    await handleSearchElectProject(value)
  }
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
            <Grid item xs={6}>
              <FormControl>
                <FormLabel id="radio-transactionStatus-label">
                ثبت تراکنش برای پرونده
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
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="برداشت"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <PersianDatePicker
                setPersianDate={setFishDate}
                label={"تاریخ فیش واریزی"}
              />
            </Grid>

            {/* executor */}
            <Grid item xs={6}>
           
              <AutoComplete
                style={{ width: "100%" }}
                placeholder="انتخاب پرونده"
                popupMatchSelectWidth={252}
                options={lstElectProjectsFullFilter?.map(option => ({
                  value: 
                    option.fileNumber +
                    "/" +
                    option.landlordName +
                    "/" +
                    option.landlordPhoneNumber,
                  id: option.id,
                  label:
                    option.fileNumber +
                    "/" +
                    option.landlordName +
                    "/" +
                    option.landlordPhoneNumber,
                }))}
                onSelect={(value, item) =>
                  handleInput({
                    target: { name: "electProjectId", value: item?.id },
                  })
                }
                onSearch={debounce(handleSearch, 800)}
                
                size="large"
              >
              </AutoComplete>
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
                  value={formInput.btId}
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

const mapStateToProps = ({ Accounting, ElectProjects }) => ({
  lstElectProjectsFullFilter: ElectProjects.lstElectProjectsFullFilter,
  lstElectProjectsFullFilterTotal: ElectProjects.lstElectProjectsFullFilterTotal,
  error:  Accounting.error,
  success: Accounting.success,
  loading: Accounting.loading,
  reload: ElectProjects.triggerReload,
})

const mapDispatchToProps = dispatch => ({
  onGetElectProjectsFullFilter:(data)=>dispatch(getElectProjectsFullFilter(data)),
  onPostPaymentCustom: events => dispatch(postPaymentCustom(events)),
  onResetAccountingFlag: () => dispatch(resetAccountingFlag()),
})

export default connect( mapStateToProps, mapDispatchToProps)(Payment)

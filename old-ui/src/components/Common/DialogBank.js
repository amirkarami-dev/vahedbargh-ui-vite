import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  LinearProgress,
  Radio,
  RadioGroup,
} from "@mui/material"
import { Send } from "@mui/icons-material"
import React, { useEffect, useState } from "react"
import NumberFormat from "react-number-format"
import { Box } from "@mui/system"
import { getPaymentMelli, paymentMelliReset } from "store/actions"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"
import { Alert } from "reactstrap"
const DialogBank = props => {
  const { loading, payProfit, classSet } = props

  const [openDialog, setOpenDialog] = useState(false)
  const [profit, setProfit] = useState(1000000)
  const [selectBank, setSelectBank] = useState(1)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }
  function sendToBank() {
    const { onGetPaymentMelli } = props
    if (selectBank === 1) {
      onGetPaymentMelli(profit)
    }
  }
  useEffect(() => {
    setProfit(payProfit)
  }, [payProfit])

  return (
    <div className={props.classSet}>
      {/* <Button
      fullWidth
        className="btn pb-0 pt-0 d-flex gap-5 bg-white btn-outline-primary rounded-3"
        onClick={handleClickOpen}
      >
        <span className="fs-5 text-primary">شارژ کیف پول</span>
        <i className="mdi mdi-card-plus-outline text-primary fs-4  info  " />
      </Button> */}

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogContent>
          {loading && <LinearProgress />}
          {props.error && props.error ? (
            <Alert color="danger">{props.error}</Alert>
          ) : null}
          <Box
            sx={{
              backgroundColor: "#fff",
              margin: 2,
              paddingInline: 2,
              borderRadius: 2,
              textAlign:"center",
              height: "100%"
            }}
          >
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Grid item  xs={12}>
                <RadioGroup
                  name="selectBankEnum"
                  defaultValue={selectBank ? selectBank : 1}
                  onChange={e => setSelectBank(e.target.value)}
                >
                  <Grid container className="px-2">
                    <Grid item>
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="بانک ملی"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <Grid item>
                  <NumberFormat
                    className="MuiOutlinedInput-input MuiInputBase-input MuiInputBase-inputSizeSmall"
                    value={payProfit || profit}
                    onValueChange={values => {
                      const { value } = values
                      setProfit(value)
                    }}
                    thousandSeparator={true}
                  />
                  ریال
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Button
            disabled={profit < 1000000}
            fullWidth={true}
            size="small"
            variant="outlined"
            startIcon={<Send />}
            onClick={sendToBank}
          >
            ارسال به بانک
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const mapStateToProps = ({ Payment }) => ({
  paymentMelliUrl: Payment.paymentMelliUrl,
  error: Payment.error,
  success: Payment.success,
  loading: Payment.loading,
})

const mapDispatchToProps = dispatch => ({
  onGetPaymentMelli: amount => dispatch(getPaymentMelli(amount)),
  onPaymentMelliReset: () => dispatch(paymentMelliReset()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(DialogBank))

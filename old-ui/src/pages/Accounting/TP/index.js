import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControlLabel,
  Grid,
  LinearProgress,
  Radio,
  RadioGroup,
} from "@mui/material"
import { Send } from "@mui/icons-material"
import React, { useEffect, useRef, useState } from "react"
import NumberFormat from "react-number-format"
import { getPaymentMelliPublic, paymentMelliReset } from "store/actions"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"
import { Alert } from "reactstrap"
import {  Modal, Row } from "antd"
const PaymentPublic = props => {
  const query = new URLSearchParams(props.location.search)
  const { loading, payProfit, token, onGetPaymentMelliPublic } = props
  const returnFromBank = query.get("result")
  const [profit, setProfit] = useState(0)
  const [selectBank, setSelectBank] = useState(1)
  const [returnMessage, setReturnMessage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [timer, setTimer] = useState(5) // 5 seconds
  const [showCardPay, setShowCardPay] = useState(true)

  // create useRef 
  const isModalOpenRef = useRef(isModalOpen);
  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);


  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  async function sendToBank() {
    const electProjectId = query.get("e")
    const amount = query.get("a")
    if (!electProjectId || !amount) {
      window.alert("مشکل در شماره پارامتر های ارسالی ")
    } else {
      onGetPaymentMelliPublic({ electProjectId, amount: +amount })
    }
  }
  useEffect(() => {
    const query = new URLSearchParams(props.location.search)
    const amount = query.get("a")
    setProfit(amount)
  }, [])

  useEffect(() => {
    let intervalId

    if (token) {
      showModal()
      // Start the timer when the modal is opened
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1)
      }, 1000)
      // Submit the form after 5 seconds
      const timeoutId = setTimeout(() => {
        submitForm()
      }, 5000)

      return () => {
        // Clear the interval and timeout when the component unmounts
        clearInterval(intervalId)
        clearTimeout(timeoutId)
      }
    }
  }, [token])

  const submitForm = () => {
    // Submit the form programmatically
    if (isModalOpenRef.current) document.querySelector("form").submit()
  }

  useEffect(() => {
    if (returnFromBank) {
      if (returnFromBank.indexOf("ok") !== -1){
        setShowCardPay(false)
        setReturnMessage(
          "مبلغ به حساب پرونده شما در واحد برق واریز گردید" +
            "-" +
            "کد رهگیری:" +
            returnFromBank.split("-")[1]
        )
      }
      
      if (returnFromBank.indexOf("error") !== -1)
        setReturnMessage("واریز انجام نشد به دفتر نظارت برق نظام مهندسی مراجعه فرمایید")
    }
  }, [])

  return (
    <div className="page-content">
              {loading && <LinearProgress />}
          {props.error && props.error ? (
            <Alert color="danger">{props.error}</Alert>
          ) : null}
          {returnMessage && returnMessage ? (
            <Alert color="info">{returnMessage}</Alert>
          ) : null}
      <Container
        sx={{ maxWidth: 400, display: "flex", justifyContent: "center" }}
        maxWidth="xl"
      >
         {showCardPay &&
          <Card>
            <CardHeader
              title="صفحه پرداخت  پرونده نظارت برق"
              subheader="بعد از پرداخت پرونده شما در دفتر نظارت برق نظام مهندسی قبل تخصیص می باشد"
            />
            <CardContent>
              <Grid container justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={12}>
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
                          label="ایران کیش"
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
                      disabled={true}
                    />
                    ریال
                  </Grid>

                  <Modal
                    title="در حال انتقال به درگاه ..."
                    open={isModalOpen}
                    footer={
                      
                      <Button type="reset" onClick={handleCancel}>
                        انصراف از پرداخت
                      </Button>
                    }
                  >
                    <form
                      method="post"
                      action="https://ikc.shaparak.ir/iuiv3/IPG/Index/"
                      encType="multipart/form-data"
                    >
                      <input type="hidden" name="tokenIdentity" value={token} />
                    </form>
                    <div className="timer">زمان انتقال: {timer} ثانیه</div>
                  </Modal>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
            <Button
              fullWidth={true}
              size="small"
              variant="outlined"
              startIcon={<Send />}
              onClick={sendToBank}
            >
              ارسال به بانک
            </Button>
          </CardActions>
          </Card>
          } 
       
      </Container>
    </div>
  )
}

const mapStateToProps = ({ Payment }) => ({
  paymentMelliUrl: Payment.paymentMelliUrl,
  token: Payment.token,
  error: Payment.error,
  success: Payment.success,
  loading: Payment.loading,
})

const mapDispatchToProps = dispatch => ({
  onGetPaymentMelliPublic: data => dispatch(getPaymentMelliPublic(data)),
  onPaymentMelliReset: () => dispatch(paymentMelliReset()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PaymentPublic))

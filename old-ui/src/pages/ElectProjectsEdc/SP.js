import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import {
  submitPackage,
  resetElectProjectFlag,
  getElectProjectFree,
} from "../../store/actions"
// users
import auCountry from "../../assets/images/flags/au.jpg"
// import images
import logoSm from "../../assets/images/logo.png"
import { LinearProgress } from "@mui/material"

const SubmitPackage = props => {
  const { electProjectFree } = props
  useEffect(() => {
    setTimeout(() => {
      props.resetElectProjectFlag()
    }, 5000)
  }, [props.error, props.success])

  function handleValidLoginByCode(event, values) {
    const query = new URLSearchParams(props.location.search)
    const smsCode = query.get("c")
    const fileNumber = query.get("f")
    if (!smsCode || !fileNumber) {
      window.alert("مشکل در شماره فایل و کد ")
    } else {
      if (window.confirm("از ارسال شماره سریال اطمینان دارید؟")) {
        props.submitPackage({ ...values, smsCode, fileNumber }, props.history)
      }
    }
  }

  useEffect(() => {
    const query = new URLSearchParams(props.location.search)
    const smsCode = query.get("c")
    const fileNumber = query.get("f")
    if (!smsCode || !fileNumber) {
      window.alert("مشکل در شماره فایل و کد ")
    } else {
      props.getElectProjectFree(fileNumber)
    }
  }, [])

  return (
    <React.Fragment>
      <MetaTags>
        <title>تایید شماره سریال پکیج/آبگرمکن دیواری فن دار</title>
      </MetaTags>

      <div className="account-pages my-3 pt-3">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-14 p-2">
                      مسئولیت نصب بر عهده
                    </h5>
                    <h5 className="text-white font-size-14 ">
                      تابلوساز مجاز شرکت سازنده پکیج/آبگرمکن می باشد
                    </h5>
                    <br />
                    <a href="index.html" className="logo  logo-admin">
                      <img src={logoSm} height="64" alt="logo" />
                    </a>
                  </div>
                </div>
                <CardBody className="p-4 my-4">
                  <div>
                    <AvForm
                      className="form-horizontal mt-3"
                      onValidSubmit={(e, v) => handleValidLoginByCode(e, v)}
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}
                      {props.success && typeof props.success === "string" ? (
                        <Alert color="success">{props.success}</Alert>
                      ) : null}
                      <div className="mb-3">
                        <div>
                          {electProjectFree ? (
                            <div>
                              <Row className="mb-3">
                                <Col xs="4" className="text-start">
                                  شماره پرونده:
                                </Col>
                                <Col xs="8" className="text-start">
                                  {electProjectFree.fileNumber}
                                </Col>
                              </Row>
                              <Row className="mb-3">
                                <Col xs="4" className="text-start">
                                  طبقه:
                                </Col>
                                <Col xs="8" className="text-start">
                                  طبقه:
                                  {electProjectFree.numberOfFloor === 0
                                    ? electProjectFree.unitNumber > 1
                                      ? "چند واحدی"
                                      : "همکف"
                                    : electProjectFree.numberOfFloor}
                                </Col>
                              </Row>
                              <Row className="mb-3">
                                <Col xs="4" className="text-start">
                                  نام مالک:
                                </Col>
                                <Col xs="8" className="text-start">
                                  {electProjectFree.landlordName}
                                </Col>
                              </Row>
                              <Row className="mb-3">
                                <Col xs="4" className="text-start">
                                  آدرس:
                                </Col>
                                <Col xs="8" className="text-start">
                                  {electProjectFree.address}
                                </Col>
                              </Row>
                              <Row className="mb-3">
                                <Col xs="4" className="text-start">
                                  کد پستی:
                                </Col>
                                <Col xs="8" className="text-start">
                                  {electProjectFree.postalCode}
                                </Col>
                              </Row>
                              <Row className="mb-3">
                                <Col xs="4" className="text-start">
                                  شماره مالک:
                                </Col>
                                <Col xs="8" className="text-start">
                                  {electProjectFree.landlordPhoneNumber}
                                </Col>
                              </Row>
                              <Row className="mb-3">
                                <Col xs="4" className="text-start">
                                  شماره مجری:
                                </Col>
                                <Col xs="8" className="text-start">
                                  {electProjectFree.exeCellPhone}
                                </Col>
                              </Row>
                              <Row
                                style={{ fontSize: "1rem" }}
                                className="mb-3   text-primary"
                              >
                                <Col xs="4" className="text-start">
                                  شماره سریال:
                                </Col>
                                <Col xs="8" className="text-start ">
                                  {electProjectFree.packageSerialNumber
                                    ? electProjectFree.packageSerialNumber
                                    : "وارد نشده"}
                                </Col>
                              </Row>
                            </div>
                          ) : (
                            <p className="bg-warning">
                              مشخصات پرونده ثبت نشده است
                            </p>
                          )}
                          <br />
                          <p
                            className="text-center"
                            style={{ fontSize: "0.75rem" }}
                          >
                            <span style={{ fontSize: "0.85rem" }}>
                              شماره سریال پکیج/آبگرمکن دیواری فن دار را با دقت
                              وارد کنید
                            </span>
                            <br />
                            <span style={{ fontSize: "0.85rem" }}>
                              فقط در صورتی که یک طبقه و پیلوت باشد برای هر طبقه
                              شماره سریال را پشت سر هم بنویسید به طور مثال:
                            </span>
                            <br />
                            <span style={{ fontSize: "0.85rem" }}>
                              طبقه اول/دوم:23333-پیلوت:333
                            </span>
                            <span style={{ fontSize: "0.85rem" }}>
                              در غیر این صورت فقط سریال مربوط به واحد مربوطه را
                              وارد کنید
                            </span>
                          </p>
                        </div>
                        <AvField
                          key={1}
                          type="textarea"
                          name="serialNumber"
                          label=""
                          className="form-control"
                          placeholder="شماره سریال"
                          required
                        />
                      </div>
                      <br />
                      <Row className="mb-3">
                        <Col className="text-end">
                          {props.loading ? (
                            <LinearProgress />
                          ) : (
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              ارسال
                            </button>
                          )}
                          {props.error && typeof props.error === "string" ? (
                            <Alert color="danger">{props.error}</Alert>
                          ) : null}
                          {props.success &&
                          typeof props.success === "string" ? (
                            <Alert color="success">{props.success}</Alert>
                          ) : null}
                        </Col>
                      </Row>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-0 text-center">
                <p>Copyright © {new Date().getFullYear()}. واحد برق کردستان.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

SubmitPackage.propTypes = {
  error: PropTypes.any,
  loading: PropTypes.any,
  success: PropTypes.any,
  resetElectProjectFlag: PropTypes.func,
  getElectProjectFree: PropTypes.func,
}

const mapStateToProps = state => {
  const { error, success, loading, electProjectFree } = state.ElectProjects
  return { error, loading, success, electProjectFree }
}

export default withRouter(
  connect(mapStateToProps, {
    submitPackage,
    resetElectProjectFlag,
    getElectProjectFree,
  })(SubmitPackage)
)

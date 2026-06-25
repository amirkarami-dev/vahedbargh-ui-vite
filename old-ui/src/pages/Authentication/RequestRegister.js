import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React,{useState} from "react"
import { Row, Col, Alert, Card, CardBody, Container,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import {
  reqRegisterUser,
  submitSms,
  reqRegisterUserFailed,
} from "../../store/actions"
// users
import auCountry from "../../assets/images/flags/au.jpg"
// import images
import logoSm from "../../assets/images/logo.png";

const RequestRegisterPage = props => {
  const [showMessage, setShowMessage] = useState(false)
  const [event, setEvent] = useState({})
  const [showMessageSubmit, setShowMessageSubmit] = useState(false)
  const [menu, setMenu] = useState(false)
  function handleValidSendRequest(event, values) {
 
    props.reqRegisterUser(values, props.history)
  
    setTimeout(function () {
      setShowMessage(false)
    }, 2000)
  }
  function handleValidSubmitRequest(event, values) {
  
      props.submitSms(values, props.history, props.mobileNumber)
 
  
    
  }


  return (
    <React.Fragment>
      <MetaTags>
        <title>Verify User|electUnit</title>
      </MetaTags>

      <div className="account-pages my-3 pt-3">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20 p-2">
                      Customer Authentication
                    </h5>
                    <a href="index.html" className="logo logo-admin">
                      <img src={logoSm} height="64" alt="logo" />
                    </a>
                  </div>
                </div>
                <CardBody className="p-4 my-4">
                  {props.referenceID ? (
                    <div>
                      <div className="d-flex justify-content-end">
                        <button
                          disabled={props.loading}
                          className="btn btn-primary  w-md waves-effect waves-light"
                          type="button"
                          onClick={() => {
                            window.location.reload()
                          }}
                        >
                          Back
                        </button>
                      </div>

                      <AvForm
                        className="form-horizontal mt-4"
                        onValidSubmit={(e, v) => handleValidSubmitRequest(e, v)}
                      >
                        <div className="mb-3">
                          <AvField
                            key={2}
                            name="smsNumber"
                            label="Enter send your code"
                            className="form-control"
                            placeholder="4-digit..."
                            type="number"
                            required
                            validate={{
                              minLength: {
                                value: 4,
                                errorMessage: "must 4 characters",
                              },
                              maxLength: {
                                value: 4,
                                errorMessage: "must 4 characters",
                              },
                            }}
                          />
                        </div>
                        <Row className="mb-3">
                          <Col className="text-end">
                            <button
                              disabled={props.loading}
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Next
                            </button>
                          </Col>
                        </Row>
                      </AvForm>
                    </div>
                  ) : (
                    <div>
   
                    <AvForm
                      className="form-horizontal mt-3"
                      onValidSubmit={(e, v) => handleValidSendRequest(e, v)}
                    >
                      <div className="mb-3">
                        <div>
                          <p
                            className="text-center"
                            style={{ fontSize: "0.75rem" }}
                          >
                            <span style={{ fontSize: "0.95rem" }}>
                              {" "}
                              Welcome to electUnit{" "}
                            </span>
                          </p>
                          <br />
                        </div>
                        <AvField
                                  type="select"
                                  name="countryCode"
                                  label="Select country"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  value={event ? event.country : "61"}
                                >
                                  <option  value="61">Au:61
                                 
                                  </option>
                                  <option  value="98">Ir:98</option>
                  
                                </AvField>
                                <br />
                        <AvField
                          key={1}
                          name="mobile"
                          label="Mobile Number"
                          className="form-control"
                          placeholder="Enter your mobile"
                          type="number"
                          required
                  
                        />
                      </div>
                      <br />
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            disabled={props.loading}
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Send
                          </button>
                        </Col>
                      </Row>
                    </AvForm>
                    </div>
                  )}
                </CardBody>
              </Card>
              <div>
                {showMessage ? (
                  <div>
                    {props.reqRegisterError && props.reqRegisterError ? (
                      <Alert
                        color="danger"
                        style={{ marginTop: "0px" }}
                        className="mt-0"
                      >
                        {props.reqRegisterError}
                      </Alert>
                    ) : null}
                    {props.reqRegisterSuccessMsg ? (
                      <Alert
                        color="success"
                        style={{ marginTop: "0px" }}
                        className="mt-0"
                      >
                        {props.reqRegisterSuccessMsg}
                      </Alert>
                    ) : null}

                    {props.submitSmsError ? (
                      <Alert
                        color="danger"
                        style={{ marginTop: "0px" }}
                        className="mt-0"
                      >
                        {props.submitSmsError}
                      </Alert>
                    ) : null}
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  {props.submitSmsError ? (
                    <Alert
                      color="danger"
                      style={{ marginTop: "1px" }}
                      className="mt-0"
                    >
                      {props.submitSmsError}
                    </Alert>
                  ) : null}
                </div>
              </div>

              <div className="mt-0 text-center">
                <p>
                  have an account ?{" "}
                  <Link to="login" className="fw-medium text-primary">
                    {" "}
                    Sign In{" "}
                  </Link>{" "}
                </p>
                <p>
                  Copyright © {new Date().getFullYear()}. All rights reserved electUnit.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

RequestRegisterPage.propTypes = {
  loading: PropTypes.any,
  reqRegisterError: PropTypes.any,
  reqRegisterSuccessMsg: PropTypes.any,
  history: PropTypes.any,
  referenceID: PropTypes.any,
  submitSmsStatus: PropTypes.any,
  reqRegisterUser: PropTypes.func,
  submitSmsError: PropTypes.any,
  mobileNumber: PropTypes.any,
  submitSms: PropTypes.func,
  reqRegisterUserFailed: PropTypes.func,
}

const mapStateToProps = state => {
  const {
    loading,
    reqRegisterError,
    reqRegisterSuccessMsg,
    referenceID,
    submitSmsStatus,
    submitSmsError,
    mobileNumber,
  } = state.ReqRegister
  return {
    loading,
    reqRegisterError,
    reqRegisterSuccessMsg,
    referenceID,
    submitSmsStatus,
    submitSmsError,
    mobileNumber,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    reqRegisterUser,
    submitSms,
    reqRegisterUserFailed,
  })(RequestRegisterPage)
)

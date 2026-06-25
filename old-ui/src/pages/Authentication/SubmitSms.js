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
import { loginUserByCode, apiError, resetErrorLogin} from "../../store/actions"
// users
import auCountry from "../../assets/images/flags/au.jpg"
// import images
import logoSm from "../../assets/images/logo.png"
import { LinearProgress } from "@mui/material"

const SubmitSmsPage = props => {
  const [showMessage, setShowMessage] = useState(false)
  const [event, setEvent] = useState({})
  const [showMessageSubmit, setShowMessageSubmit] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      props.resetErrorLogin()
    }, 3000)
  }, [props.error])

  function handleValidLoginByCode(event, values) {
    const query = new URLSearchParams(props.location.search);
    const userName = query.get('username')
    props.loginUserByCode({...values,userName}, props.history)
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>تایید دوعاملی</title>
      </MetaTags>

      <div className="account-pages my-3 pt-3">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20 p-2">
                      تایید رمز دو عاملی
                    </h5>
                    <a href="index.html" className="logo logo-admin">
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
                      <div className="mb-3">
                        <div>
                          <p
                            className="text-center"
                            style={{ fontSize: "0.75rem" }}
                          >
                            <span style={{ fontSize: "0.95rem" }}>
                              {" "}
                    
                              رمز 4 رقمی به موبایل شما ارسال شد{" "}
                            </span>
                          </p>
                          <br />
                        </div>
                        <AvField
                          key={1}
                          name="code"
                          label=""
                          className="form-control"
                          placeholder="رمز 4 رقمی را وارد کنید"
                          type="number"
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
                              تایید
                            </button>
                          )}
                        </Col>
                      </Row>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-0 text-center">
                <p>
                  بازگشت به صفحه{" "}
                  <Link to="login" className="fw-medium text-primary">
                    {" "}
                    ورود{" "}
                  </Link>{" "}
                </p>
                <p>Copyright © {new Date().getFullYear()}. واحد برق کردستان.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

SubmitSmsPage.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUserByCode: PropTypes.func,
  loading: PropTypes.any,
  resetErrorLogin: PropTypes.func
}

const mapStateToProps = state => {
  const { error, loading } = state.Login
  return { error, loading }
}

export default withRouter(
  connect(mapStateToProps, { loginUserByCode, resetErrorLogin,  })(SubmitSmsPage)
)

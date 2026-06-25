import PropTypes from "prop-types"
import React, { useEffect,useState } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { registerUser, apiError, registerUserFailed } from "../../store/actions"

// Redux
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// import images
import logoSm from "../../assets/images/logo.png"

const Register = props => {
  const [isActive, setIsActive] = useState(false);
  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    
    if (values.password === values.passwordConfirmation) {
     // delete values.passwordConfirmation;

     // console.log("values",{...values,mobile:props.mobileNumber});
      props.registerUser({...values,mobile:props.mobileNumber,nickName:'',about:'',gender:0,isPublic:false,
      status:true,expiryDate:null})
    }
   else{
     alert('confirm password is wrong')
   }
    
  }

  useEffect(() => {
    //console.log("props in register",props);
    props.apiError("");
    if(!props.smsVerified || !props.mobileNumber) props.history.push('./request-register')
  }, [])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | electUnit</title>
      </MetaTags>
    
      <div className="account-pages my-0 pt-sm-5">
        <Container>
     
   
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20">
                    <div className="home-btn d-none d-sm-block">
        <a  href="https://ui.alpha.electUnit.tech/" className="text-light">
          <i className="fas fa-home h2"></i>
        </a>
      </div>
                      {" "}
                      electUnit Customer Club
                    </h5>
                    {/* <p className="text-white-50">
                      enter your info to accept registeration
                    </p> */}
                    <a href="https://ui.alpha.electUnit.tech/" className="logo logo-admin">
                      <img src={logoSm} height="64" alt="logo" />
                    </a>
                  </div>
                </div>
                <CardBody className="p-4">
                  <div className="p-3">
                    <AvForm disabled={props.loading}
                      className="mt-4"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {props.user && props.user ? (
                        <Alert color="success">
                          Your Request Send Successfully
                        </Alert>
                      ) : null}

                      {props.registrationError && props.registrationError ? (
                        <Alert color="danger">{props.registrationError}</Alert>
                      ) : null}
                      <div className="mb-3">
                        <AvField
                          id="name"
                          name="name"
                          label="First Name"
                          className="form-control active"
                          placeholder=""
                        type="text"
                          validate={{
                           
                            required: {value: true, errorMessage: 'Please enter a First Name'},
                            maxLength:{value:30,errorMessage:'error count characters'},
                                                     
                          }}
                        />
                      </div>
               
        
                  
                      <div className="mb-3">
                        <AvField
                          id="email"
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder=""
                          type="email"
                          validate={{
                          required: {value: true, errorMessage: 'Please enter a  Email'}
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          id="password"
                          name="password"
                          label="Password"
                          className="form-control"
                          placeholder=""
                          type="password"
                          validate={{
                          required: {value: true, errorMessage: 'Please enter a  password'}
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          id="passwordConfirmation"
                          name="passwordConfirmation"
                          label="Confirm Password"
                          className="form-control"
                          placeholder=""
                          type="password"
                          validate={{
                          required: {value: true, errorMessage: 'Please enter a  Confirm Password'}
                          }}
                        />
                      </div>

                   

                      <div className="mb-3 row">
                        <div className="col-12 text-end">
                          <button disabled={props.loading}
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 mb-0 row">
                        <div className="col-12 mt-4">
                          <p className="mb-0">
                          Back To {" "}
                            <Link to="/login" className="text-primary">
                              electUnit login
                            </Link>
                            
                          </p>
                        </div>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-0 text-center">
                <p>
                Copyright  © {new Date().getFullYear()}. All rights reserved electUnit.
             
                </p>
              </div> 
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
}

const mapStateToProps = state => {
  const { user, registrationError, loading } = state.Account
  const { smsVerified,referenceID,mobileNumber } = state.ReqRegister
  return { user, registrationError, loading,smsVerified,referenceID,mobileNumber }
}

export default connect(mapStateToProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register)

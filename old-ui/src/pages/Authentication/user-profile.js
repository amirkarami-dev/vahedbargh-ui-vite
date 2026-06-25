import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import {
  getRoleUser,
  getValueEnum,
  getCurrentUser,
} from "helpers/service_helper"
import { createImageFromInitials, getRandomColor } from "helpers/create_avatar"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Media,
  Button,
  CardTitle,
  CardFooter,
  Label,
} from "reactstrap"
//i18n
import { withTranslation } from "react-i18next"
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

// actions
import {
  changePassword,
  getFileCommonReset,
  getFilesCommon,
  resetChangePasswordFlag,
} from "../../store/actions"
import { rolesType } from "common/enums/rolesType"

const UserProfile = props => {
  const [errorMessage, setErrorMessage] = useState(null)


  function handleChangePassword(event, values) {
    console.log("get value", values);
    const {onPasswordChange} = props
    onPasswordChange(values);
  }

  //#region useEffect
  useEffect(() => {
    setTimeout(() => {
      props.onResetChangePasswordFlag()
    }, 3000)
  }, [props.success,props.error])

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }, [errorMessage])



  //#endregion
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>پروفایل | واحد برق </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="واحد برق " breadcrumbItem="پروفایل" />
          <Row>
            <Col className="col-12">
              {errorMessage && errorMessage ? (
                <Alert color="danger">{errorMessage}</Alert>
              ) : null}
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success && props.success ? (
                <Alert color="success">{props.success}</Alert>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div className="ms-3">
                    <img
                      src={createImageFromInitials(
                        30,
                        getCurrentUser().name,
                        getRandomColor()
                      )}
                      alt=""
                      className="avatar-md rounded-circle img-thumbnail"
                    />
                  </div>
                  <div className="align-self-center ">
                    <div className="text-muted ms-3 ">
                      <h5>{getCurrentUser().name}</h5>
                      <label>نقش های شما</label>
                      {getRoleUser().map((item, index) => {
                        return (
                          <div className="" key={index}>
                            {getValueEnum(rolesType, item).value}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Row>


          <AvForm onValidSubmit={handleChangePassword}>
          
              <Card>
                <CardBody>
                  <CardTitle>
                    <h4 className="card-title mb-4">تغیر رمز عبور</h4>
                  </CardTitle>

                  <Col className="col-6 mt-3">
                    <AvField
                      name="oldPassword"
                      label="رمز قبلی"
                      errorMessage="*"
                      validate={{
                        required: true,
                      }}
                      type="text"
                    />
                  </Col>
                  <Col className="col-6 mt-3">
                  <h6 className="card-title mb-4">رمز جدید باید حداقل8کاراکترو ترکیبی از حرف،عدد،یک حرف بزرگ باشد مانند:bAbcd123</h6>
                    <AvField
                      name="newPassword"
                      label="رمز جدید"
                      errorMessage="*"
                      validate={{
                        required: true,
                        pattern: {value: '^^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'},
            minLength: {value: 8},
            maxLength: {value: 16}
                      }}
                      type="text"
                      
                    />
                  </Col>
                </CardBody>
                <CardFooter>
                  <Col>
                    <button
                      type="submit"
                      className="btn btn-success save-event"
                    >
                      تغییر رمز عبور
                    </button>
                  </Col>
                </CardFooter>
              </Card>
         
          </AvForm>
        </Container>
      </div>
    </React.Fragment>
  )
}


const mapStateToProps = ({ ChangePassword }) => ({
  error:  ChangePassword.error,
  success:  ChangePassword.success,
})
const mapDispatchToProps = dispatch => ({
  onGetFilesCommon: path => dispatch(getFilesCommon(path)),
  onGetFileCommonReset: () => dispatch(getFileCommonReset()),
  onPasswordChange:(data) =>dispatch(changePassword(data)),
  onResetChangePasswordFlag: () => dispatch(resetChangePasswordFlag())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(UserProfile))

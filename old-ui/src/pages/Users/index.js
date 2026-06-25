import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"

import {
  Alert,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"
import BootstrapTable from "react-bootstrap-table-next"
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"
import {
  deleteUSER,
  getUSERs,
  insertUSER,
  resetUSERFlag,
  updateUSER,
} from "../../store/actions"
//i18n
import { withTranslation } from "react-i18next"
//SweetAlert
import ConfirmActions from "../../components/Common/confirm"

const USERs = props => {
  //#region const&let
  let form1 = useRef(null)
  const { lstUSERs } = props
  const [disableGuestLimit, setDisableGuestLimit] = useState(true)
  const USER = []
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [updateUSERId, setUpdateUSERId] = useState("")
  const [modalUSER, setModalUSER] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editUSER, setEditUSER] = useState("")
  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "email",
      text: "Email",

      headerStyle: () => {
        return { maxWidth: "10%" }
      },
    },
    {
      dataField: "phoneNumber",
      text: "PhoneNumber",
      headerStyle: () => {
        return { maxWidth: "10%" }
      },
    },
    {
      dataField: "role",
      text: "role",
      headerStyle: () => {
        return { maxWidth: "10%" }
      },
      formatter:(cellContent, row)=>props.t(row.role)
    },
    {
      dataField: "active",
      text: "Active",
      headerStyle: () => {
        return { maxWidth: "10%" }
      },
    },
    {
      dataField: "expiryDate",
      text: "Expiry Date",
      headerStyle: () => {
        return { maxWidth: "10%" }
      },
    },

    {
      dataField: "id2",
      text: "Remove",
      editable: false,
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-danger btn-xs"
            onClick={() => setDeleteConfirm(row.id)}
          >
            Delete
          </button>
        )
      },
    },
    {
      dataField: "Edit",
      text: "Edit",
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-info btn-xs"
            onClick={() => handleUpdate(row)}
          >
            Update
          </button>
        )
      },
    },
  ]

  //#endregion

  // functions ..........................................
  useEffect(() => {
    const { onGetUSERs } = props
    onGetUSERs()
  }, [])
  useEffect(() => {
    setTimeout(() => {
      props.onResetUSERFlag()
    }, 3000)
  }, [props.success, props.error])

  const handleNewUSER = () => {
    setIsEdit(false)
    setEditUSER("")
    toggleUSER()
  }

  function handleUpdate(row) {
    setIsEdit(true)
    setUpdateUSERId(row.id)
    setEditUSER(row)
    setModalUSER(true)
  }
  function handleDelete(USERId) {
    const { onDeleteUSER } = props

    onDeleteUSER(USERId)

    setDeleteConfirm(false)
  }

  const toggleUSER = () => {
    setModalUSER(!modalUSER)
  }
  const handleValidEventSubmitUSER = (event, values) => {
    const { onInsertUSER, onUpdateUSER } = props

    let USERToSave = {
      ...values,

      // gender:parseInt(values.gender) || 0,
      // isPublic:!!+values.isPublic,
      // active:!!+values.active,
      expiryDate: values.expiryDate || null,
    }
   
    if (isEdit && updateUSERId !== "") {
      USERToSave = {...USERToSave,id: updateUSERId}
     // console.log("USERToSave", USERToSave)
       onUpdateUSER(USERToSave)
       toggleUSER()
    } else {
      onInsertUSER(USERToSave)
      form1.reset()
    }
  }

  // const USERs = {...lstUSERs,linkUser: window.location.origin.toString() +
  //   "/Users/"+ "lstUSERs.userName" +"/"+ "lstUSERs.name"}
  const USERs = lstUSERs
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>USER | electUnit </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="electUnit" breadcrumbItem="CreateUSER" />
          <Row>
            <Col className="col-12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success ? (
                <Alert color="success">{props.success}</Alert>
              ) : null}
              <Button onClick={handleNewUSER} color="primary" size="sm">
                New USER
              </Button>
            </Col>
          </Row>

          <Row>
            <Col className="col-12">
              <Modal isOpen={modalUSER} toggle={toggleUSER}>
                <ModalHeader toggle={toggleUSER} tag="h4">
                  {!!isEdit?`Edit User:${editUSER.email}`:"Add User"}
                </ModalHeader>
                <ModalBody>
                  <AvForm
                    onValidSubmit={handleValidEventSubmitUSER}
                    ref={c => (form1 = c)}
                  >
                    <Row form>
                      {!!!isEdit?
                       <><Col className="col-12 mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            type="text"
                            errorMessage="Invalid Email"
                            validate={{
                              required: { value: true }
                            }}
                            value={editUSER.email ? editUSER.email : ""} />
                        </Col><Col className="col-12  mb-3">
                            <AvField
                              name="password"
                              label="Password"
                              type="text"
                              errorMessage="Invalid password"
                              validate={{
                                required: { value: true && !isEdit }
                              }}
                              value={editUSER.password ? "" : ""} />
                          </Col></>:null
                      }
                     

                      <Col className="col-12  mb-3">
                        <Row>
                          <Col>
                            <AvField
                              name="firstName"
                              label="firstName"
                              type="text"
                              errorMessage="Invalid FullName"
                              validate={{
                                required: { value: true },
                              }}
                              value={editUSER.firstName ? editUSER.firstName : ""}
                            />
                          </Col>
                          <Col>
                            <AvField
                              name="lastName"
                              label="lastName"
                              type="text"
                              errorMessage="Invalid FullName"
                              validate={{
                                required: { value: true },
                              }}
                              value={editUSER.lastName ? editUSER.lastName : ""}
                            />
                          </Col>
                          <Col>
                            <AvField
                              name="nickName"
                              label="Nick Name"
                              type="text"
                              errorMessage="Invalid Nick Name"
                              validate={{
                                required: { value: true },
                              }}
                              value={editUSER.nickName ? editUSER.nickName : ""}
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col className="col-12  mb-3">
                        <AvField
                          name="phoneNumber"
                          label="PhoneNumber"
                          type="text"
                          errorMessage="Invalid PhoneNumber"
                          validate={{
                            required: { value: false },
                          }}
                          value={
                            editUSER.phoneNumber ? editUSER.phoneNumber : ""
                          }
                        />
                      </Col>

                      <Col className="col-12  mb-3">
                        <AvField
                          name="expiryDate"
                          label="Expiry Date"
                          type="date"
                          errorMessage="Invalid Expiry Date"
                          value={editUSER.expiryDate ? editUSER.expiryDate : ""}
                        />
                      </Col>

                      <Col className="col-12  mb-3">
                        <Row>
                          {/* <Col className="  mb-3">
                            <AvField                          
                              name="gender"
                              label="Gender"
                              type="select"
                          
                              value={editUSER.gender ? editUSER.gender : 0}
                            >
                              <option value={0}></option>
                              <option value={1}>Male</option>
                              <option value={2}>Female</option>
                            </AvField>
                          </Col>
                          <Col className="  mb-3">
                            <AvField                          
                              name="isPublic"
                              label="Is Public"
                              type="select"
                          
                              value={editUSER.isPublic ? editUSER.isPublic : 0}
                            >
                         
                              <option value={0}>No</option>
                              <option value={1}>Yes</option>
                            </AvField>
                          </Col> */}
                          <Col className="  mb-3">
                            <AvField
                              name="role"
                              label="Role"
                              type="select"
                              value={editUSER.role ? editUSER.role : "Employee"}
                            >
                              <option value="Employee">Employee</option>
                              <option value="Engineer">Engineer</option>
                              <option value="Executor">
                              Executor
                              </option> 
                              <option value="Accountant">
                              Accountant
                              </option>
                               <option value="Administrator">
                                Administrator
                              </option>
                            </AvField>
                          </Col>
                          <Col className="mb-3">
                            <AvField
                              name="active"
                              label={!!!isEdit ? "" : "status"}
                              type="select"
                              hidden={!!!isEdit}
                              value={editUSER.status ? editUSER.status : true}
                            >
                              <option value={true}>Active</option>
                              <option value={false}>DeActive</option>
                            </AvField>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-right">
                          <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={toggleUSER}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-success save-event"
                          >
                            {!!!isEdit ? "save" : "update"}
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </AvForm>
                </ModalBody>
              </Modal>
              <Card>
                <CardBody>
                  <CardTitle className="h4">List USERs </CardTitle>

                  <BootstrapTable
                    wrapperClasses="table-responsive"
                    keyField="id"
                    data={USERs}
                    columns={columns}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          {deleteConfirm ? (
            <ConfirmActions
              title="delete USER"
              value={deleteConfirm}
              handleConfirmFn={handleDelete}
              handleCancelDialog={setDeleteConfirm}
            />
          ) : null}
        </Container>
      </div>
    </React.Fragment>
  )
}

USERs.propTypes = {
  t:PropTypes.any,
  lstUSERs: PropTypes.any,
  onGetUSERs: PropTypes.func,
  onInsertUSER: PropTypes.func,
  onUpdateUSER: PropTypes.func,
  onDeleteUSER: PropTypes.func,
  onResetUSERFlag: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
}
const mapStateToProps = ({ USERs }) => ({
  lstUSERs: USERs.lstUSERs,
  error: USERs.error,
  success: USERs.success,
})

const mapDispatchToProps = dispatch => ({
  onGetUSERs: () => dispatch(getUSERs()),
  onDeleteUSER: USER => dispatch(deleteUSER(USER)),
  onUpdateUSER: USER => dispatch(updateUSER(USER)),
  onInsertUSER: USER => dispatch(insertUSER(USER)),
  onResetUSERFlag: () => dispatch(resetUSERFlag()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(USERs))

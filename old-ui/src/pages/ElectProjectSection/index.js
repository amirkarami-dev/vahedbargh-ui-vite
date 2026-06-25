import React, { useState, useEffect, useReducer } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { connect } from "react-redux"

import Breadcrumb from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import {
  getElectProjectFiles,
  getElectProjectsFilter,
  getEppByEpId,
  getListEngineer,
  getPanelMaker,
  resetElectProjectFlag,
} from "store/actions"
import { getCurrentUser, serializeQuery } from "helpers/service_helper"
import "./electProjectProcess.scss"

import {
  Table,
  Layout,
  Pagination,
  Input,
  Button,
  Alert,
  Divider,
  Row,
  Col,
  Checkbox,
} from "antd"
import { SearchOutlined } from "@ant-design/icons"
const { Header, Footer, Sider, Content } = Layout
import { projectColumnsAnt } from "./ProjectColumnsAnt"
import { PersianDatePicker } from "components/Common/PersianDatePicker"
import { NumericInput } from "components/Common/NumericInput"
import Locations from "components/Common/Locations"
const { Search } = Input
const Index = props => {
  const {
    lstElectProjectsFilter,
    lstElectProjectsFilterTotal,
    matches_sm,
    loading,
  } = props

  const [errorMessage, setErrorMessage] = useState(null)

  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(0)
  const [dateCreated, setDateCreated] = useState("")
  const [filterCity, setFilterCity] = useState(false)
  const [dataAddress, setDataAddress] = useState({
    sectionId: 0,
    fullAddress: {
      pro: "",
      cit: "",
      sec: "",
      lat: 35.311308,
      lng: 46.991271,
      mainAddress: "",
    },
  })
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      fileNumber: null,
      searchValue:''
    }
  )
  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value

    setFormInput({ [name]: newValue })
  }
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
      props.onResetElectProjectFlag()
    }, 5000)
  }, [errorMessage, props.success, props.error])

  useEffect(() => {
    handleSearchElectProject()
  }, [pageIndex, pageSize])

  const contentStyle = {
    backgroundColor: "#fff",
    margin: 2,
    paddingInline: 2,
    borderRadius: 2,
    minHeight: 700,
  }



  const handleSearchElectProject = async () => {
    let searchQuery = {
      ...formInput,
      page: pageIndex,
      pageSize,
      fileNumber: formInput.fileNumber ? formInput.fileNumber : 0,
      solarRegisterDate: dateCreated?.persian ? dateCreated.persian : "",
      idSection: filterCity ? +dataAddress?.sectionId : 0,
      
    }
    const params = serializeQuery(searchQuery)
    props.onGetElectProjectsFilter(params)
  }
  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>پرونده | واحد برق </title>
        </MetaTags>

        <Layout>
          <Breadcrumb
            title={props.t("electUnit")}
            breadcrumbItem="گزارش پرونده ها"
          />
          {errorMessage && <Alert type="info" message={errorMessage} />}
          {props.error && <Alert type="error" message={props.error} />}
          {props.success && <Alert type="success" message={props.success} />}
          <Content style={contentStyle}>
            <Row gutter={16}>
            <Col>
              <Checkbox
                onChange={e => {
                  setFilterCity(e.target.checked)
                }}
              >
                فیلترشهر
              </Checkbox>
            </Col>
            {filterCity && (
              <Col className="gutter-row">
                <Locations
                  setDataAddress={setDataAddress}
                  matches_sm={true}
                  isAccessCity={true}
                />
              </Col>
            )}
              <Col className="gutter-row">
                شماره پرونده:
                <NumericInput
                  style={{
                    width: 150,
                  }}
                  value={formInput.fileNumber}
                  name="fileNumber"
                  onChange={handleInput}
                  placeholder="شماره پرونده"
                />
              </Col>
              <Col className="gutter-row">
                <PersianDatePicker
                  setDefault={false}
                  setPersianDate={setDateCreated}
                  onClose={handleSearchElectProject}
                />
              </Col>
              <Col>
                <Input
                  name="searchValue"
                  onChange={handleInput}
                  placeholder="مالک/مجری"
                  allowClear={true}
                />
              </Col>
              <Col className="gutter-row">
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearchElectProject}
                >
                  جستجو
                </Button>
              </Col>
            </Row>
            <Table
              loading={loading}
              size="small"
              pagination={false}
              scroll={{
                y: 670,
                x: 700,
              }}
              sticky
              columns={projectColumnsAnt({
                props,
                setErrorMessage,
                currentUser: getCurrentUser(),
                matches_sm,
              })}
              rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
              rowKey={record => record.id}
              dataSource={lstElectProjectsFilter}
            />
            <Pagination
              current={pageIndex}
              total={lstElectProjectsFilterTotal}
              onChange={(page, size) => {
                console.log("page,size", page, size)
                setPageIndex(page)
                setPageSize(size)
              }}
            />
            تعداد کل : {lstElectProjectsFilterTotal}
            <Divider />
          </Content>
        </Layout>
      </div>
    </>
  )
}

Index.propTypes = {
  lstElectProjectsFilter: PropTypes.any,
  lstElectProjectsFilterTotal: PropTypes.any,
  lstElectProjectFiles: PropTypes.any,
  lstPanelMaker: PropTypes.any,
  loading: PropTypes.any,
  t: PropTypes.any,
  error: PropTypes.any,
  success: PropTypes.any,
  onResetElectProjectFlag: PropTypes.func,
  onGetElectProjectsFilter: PropTypes.func,
  onGetProjectFiles: PropTypes.func,
  onGetEppByEpId: PropTypes.func,
  onGetListEngineer: PropTypes.func,
}

const mapStateToProps = ({
  ElectProjects,
  USERs,
  ElectProjectProcesses,
  Engineers,
}) => ({
  lstElectProjectsFilter: ElectProjects.lstElectProjectsFilter,
  lstElectProjectsFilterTotal: ElectProjects.lstElectProjectsFilterTotal,
  lstElectProjectFiles: ElectProjects.lstElectProjectFiles,
  lstPanelMaker: ElectProjects.lstPanelMaker,
  lstEngineer: Engineers.lstEngineer,
  currentIdElectProject: ElectProjects.currentIdElectProject,
  loading: ElectProjects.loading,
  lstEpp: ElectProjectProcesses.lstEpp,
  error: ElectProjects.error,
  success: ElectProjects.success,
  userBalance: USERs.userBalance,
})

const mapDispatchToProps = dispatch => ({
  onGetElectProjectsFilter: searchValue =>
    dispatch(getElectProjectsFilter(searchValue)),
  onResetElectProjectFlag: () => dispatch(resetElectProjectFlag()),
  onGetProjectFiles: electProjectId => dispatch(getElectProjectFiles(electProjectId)),
  onGetPanelMaker: company => dispatch(getPanelMaker(company)),
  onGetEppByEpId: electProjectId => dispatch(getEppByEpId(electProjectId)),
  onGetListEngineer: () => dispatch(getListEngineer()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Index))

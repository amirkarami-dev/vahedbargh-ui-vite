import React, { useState, useEffect, useReducer } from "react"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"
import {
  addFileElectProject,
  addFileElectProjectSingle,
  addPanelMaker,
  stopElectProject,
  deleteElectProject,
  deselectGp,
  getElectProjectFiles,
  getElectProjectsFullFilter,
  getEppByEpId,
  getListEngineer,
  getPanelMaker,
  resetElectProjectFlag,
  resetPackage,
  selectGp,
  submitElectProjectAdmin,
  updateElectProject,
  amountSms,
} from "store/actions"
import { getCurrentUser } from "helpers/service_helper"
import "./electProject.scss"

import {
  Table,
  Pagination,
  Input,
  Button,
  Divider,
  Row,
  Col,
  Checkbox,
} from "antd"
import { MinusCircleOutlined, PauseCircleOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { projectColumnsAnt } from "./ProjectColumnsAnt"
import { PersianDatePicker } from "components/Common/PersianDatePicker"
import { NumericInput } from "components/Common/NumericInput"
import Locations from "components/Common/Locations"
const { Search } = Input
const ListElectProject = props => {
  const {
    lstElectProjectsFullFilter,
    lstElectProjectsFullFilterTotal,
    matches_sm,
    loading,
    selectedProject,
    onGetElectProjectsFullFilter,
    onSelectElectProject,
    onDeselectElectProject,
    openNotification,
    reload,
  } = props

  const [errorMessage, setErrorMessage] = useState(null)
  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(1)
  const [dateCreated, setDateCreated] = useState("")
  const [filterCity, setFilterCity] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [expandedRowKeys, setExpandedRowKeys] = useState([])

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
      electRequestNumber: null,
      searchValue: "",
      projectLevelEnum: 0,
      isStop: false,
    }
  )
  const handleInput = evt => {
    const name = evt.target.name
    let newValue = evt.target.value
    if (evt.target.type === "checkbox") newValue = evt.target.checked
    setFormInput({ [name]: newValue })
  }

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
    } else {
      handleSearchElectProject("search")
    }
  }, [formInput.isStop, formInput.relatedPermitFilter])

  useEffect(async () => {
    if (props.success) openNotification("success", "top", props.success)
    if (props.error) openNotification("error", "top", props.error)
    if (errorMessage) openNotification("warning", "top", props.error)
  }, [errorMessage, props.success, props.error])

  useEffect(async () => {
    await handleSearchElectProject("pageIndex")
    console.log(getCurrentUser())
  }, [pageIndex, pageSize])

  useEffect(async () => {
    if (reload) {
      await handleSearchElectProject()
    }
  }, [reload])

  const expandTable = record => {
    return <p style={{ margin: 0 }}>{record.description}</p>
  }
  const getSearchQuery = val => {
    const searchQuery = {
      ...formInput,
      page: val === "search" ? 1 : pageIndex,
      pageSize: val === "search" ? 10 : pageSize,
      fileNumber: formInput.fileNumber ? formInput.fileNumber : 0,
      electRequestNumber: formInput.electRequestNumber ? formInput.electRequestNumber : 0,
      solarRegisterDate: dateCreated?.persian ? dateCreated.persian : "",
      idSection: filterCity ? +dataAddress?.sectionId : 0,
      landLordName: formInput?.landLordName ? formInput.landLordName : "",
      relatedPermitFilter: false,
      filterProjectLevel: false,
      isStop: false,
    }
    return searchQuery
  }

  const handleSearchElectProject = async val => {
    const searchQuery = {
      ...formInput,
      page: val === "search" ? 1 : pageIndex,
      pageSize: val === "search" ? 10 : pageSize,
      fileNumber: formInput.fileNumber ? formInput.fileNumber : 0,
      electRequestNumber: formInput.electRequestNumber ? formInput.electRequestNumber : 0,
      solarRegisterDate: dateCreated?.persian ? dateCreated.persian : "",
      idSection: filterCity ? +dataAddress?.sectionId : 0,
      landLordName: formInput?.landLordName ? formInput.landLordName : "",
      relatedPermitFilter: false,
      filterProjectLevel: false,
      isStop: false,
    }
    //const params = serializeQuery(searchQuery)
    onGetElectProjectsFullFilter(searchQuery)
  }

  const handleExpand = (expanded, record) => {
    const keys = expanded ? [record.key] : []
    setExpandedRowKeys(keys)

    const searchQuery = {
      page: 1,
      pageSize: 100,
      fileNumber: 0,
      electRequestNumber: 0,
      solarRegisterDate: "",
      idSection: 0,
      landLordName: "",
      relatedPermitFilter: false,
      isStop: false,
      isBuildingInspection: false,
      isEarthSystem: false,
      isTestAndDelivery: false,
      parentId: record.id,
    }
    //const params = serializeQuery(searchQuery)
    onGetElectProjectsFullFilter(searchQuery)
  }
  const renderParentRow = record => {
    return <div>زیر پرونده ها</div>
  }

  return (
    <>
      <Row gutter={[8, 8]}>
        <Divider />

        <Col>
          <PersianDatePicker
            label="تاریخ ثبت پرونده"
            setDefault={false}
            setPersianDate={setDateCreated}
          />{" "}
        </Col>
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
              matches_sm={matches_sm}
              isAccessCity={true}
            />
          </Col>
        )}
        <Col className="gutter-row">
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
          <NumericInput
            style={{
              width: 150,
            }}
            value={formInput.electRequestNumber}
            name="electRequestNumber"
            onChange={handleInput}
            placeholder="شماره تقاضا"
          />
        </Col>
        <Col>
          <Input
            name="landLordName"
            onChange={handleInput}
            placeholder="مالک"
            allowClear={true}
          />
        </Col>
        <Col className="gutter-row">
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => handleSearchElectProject("search")}
          >
            جستجو
          </Button>
        </Col>
      </Row>
      <Table
        loading={loading}
        size="small"
        pagination={false}
        scroll={{ x: 700 }}
        sticky="true"
        columns={projectColumnsAnt({
          props,
          setErrorMessage,
          currentUser: getCurrentUser(),
          matches_sm,
          searchQuery: getSearchQuery(),
          pageIndex,
          pageSize,
        })}
        expandable={{
          onExpand: handleExpand,
          expandedRowRender: record => renderParentRow(record),
          rowExpandable: record => record.countChildren > 0,
          expandIcon: ({ expanded, onExpand, record }) => {
            if(record.countChildren === 0) return <PauseCircleOutlined />
            return expanded ? (
              <MinusCircleOutlined   onClick={e => onExpand(record, e)} />
            ) : (
              <PlusCircleOutlined   onClick={e => onExpand(record, e)} />
            )
          }
        }}
        rowClassName={(_r, i) => (i % 2 ? "odd" : "even")}
        rowKey={record => record.id}
        dataSource={lstElectProjectsFullFilter}
      />
      <Pagination
        current={pageIndex}
        total={lstElectProjectsFullFilterTotal}
        onChange={(page, size) => {
          console.log("page,size", page, size)
          setPageIndex(page)
          setPageSize(size)
        }}
      />
    </>
  )
}

const mapStateToProps = ({
  ElectProjects,
  USERs,
  ElectProjectProcesses,
  Engineers,
}) => ({
  lstElectProjectsFullFilter: ElectProjects.lstElectProjectsFullFilter,
  lstElectProjectsFullFilterTotal:
    ElectProjects.lstElectProjectsFullFilterTotal,
  lstElectProjectFiles: ElectProjects.lstElectProjectFiles,
  lstPanelMaker: ElectProjects.lstPanelMaker,
  lstEngineer: Engineers.lstEngineer,
  currentIdElectProject: ElectProjects.currentIdElectProject,
  loading: ElectProjects.loading,
  error: ElectProjects.error,
  success: ElectProjects.success,
  userBalance: USERs.userBalance,
  selectedProject: ElectProjectProcesses.selectedProject,
})

const mapDispatchToProps = dispatch => ({
  onGetElectProjectsFullFilter: searchValue =>
    dispatch(getElectProjectsFullFilter(searchValue)),
  onResetElectProjectFlag: () => dispatch(resetElectProjectFlag()),
  onGetProjectFiles: electProjectId =>
    dispatch(getElectProjectFiles(electProjectId)),
  onAddFileElectProject: attachData =>
    dispatch(addFileElectProject(attachData)),
  onAddFileElectProjectSingle: attachData =>
    dispatch(addFileElectProjectSingle(attachData)),
  onGetPanelMaker: company => dispatch(getPanelMaker(company)),
  onAddPanelMaker: data => dispatch(addPanelMaker(data)),
  onGetEppByEpId: electProjectId => dispatch(getEppByEpId(electProjectId)),
  onGetListEngineer: () => dispatch(getListEngineer()),
  onSelectElectProject: (gpId, selectArr) =>
    dispatch(selectGp(gpId, selectArr)),
  onDeselectElectProject: () => dispatch(deselectGp()),
  onSubmitElectProjectByAdmin: electProjectId =>
    dispatch(submitElectProjectAdmin(electProjectId)),
  onResetPackage: gpId => dispatch(resetPackage(gpId)),
  onStopElectProject: data => dispatch(stopElectProject(data)),
  onDeleteElectProject: data => dispatch(deleteElectProject(data)),
  onUpdateElectProject: data => dispatch(updateElectProject(data)),
  onAmountSms: data => dispatch(amountSms(data)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ListElectProject))

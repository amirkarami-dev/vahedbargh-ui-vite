import React, { useState, useEffect, useReducer } from "react"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"
import {
  addFileElectProject,
  addFileElectProjectSingle,
  stopElectProject,
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
  amountSms,
  upsertCheckListEdc,
  updateByEdc,
} from "store/actions"
import { getCurrentUser } from "helpers/service_helper"
import "./electProjectProcess.scss"

import {
  Table,
  Pagination,
  Input,
  Space,
  Button,
  Divider,
  Row,
  Col,
  Radio,
  Checkbox,
  Skeleton,
  Empty,
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
    onGetElectProjectsFullFilter,
    onDeselectElectProject,
    openNotification,
    setProjectLevelEnum,
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
      projectLevelEnum: 8,
      electProjectStatusEnum: 4,
      isStop: false,
      relatedPermitFilter: true,
      filterIsFilter: true,
      isBuildingInspection: false,
      isEarthSystem: false,
      isTestAndDelivery: false,
    }
  )
  const handleInput = evt => {
    const name = evt.target.name
    let newValue = evt.target.value
    if (evt.target.type === "checkbox") newValue = evt.target.checked
    if (name === "projectLevelEnum") {
      formInput.relatedPermitFilter = newValue === 0
      setProjectLevelEnum(newValue)
      onDeselectElectProject()
    }
    setFormInput({ [name]: newValue })
  }

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
    } else {
      handleSearchElectProject("search")
    }
  }, [
    isFirstRender,
    formInput.electProjectStatusEnum,
    formInput.isStop,
    formInput.relatedPermitFilter,
    formInput.isBuildingInspection,
    formInput.isEarthSystem,
    formInput.isTestAndDelivery,
  ])

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


  const handleSearchElectProject = async val => {
    if (val !== "pageIndex") onDeselectElectProject()
    const searchQuery = {
      ...formInput,
      page: val === "search" ? 1 : pageIndex,
      pageSize: val === "search" ? 10 : pageSize,
      fileNumber: formInput.fileNumber ? formInput.fileNumber : 0,
      electRequestNumber: formInput.electRequestNumber ? formInput.electRequestNumber : 0,
      projectLevelEnum: +formInput.electProjectStatusEnum === 0 ? 0 : 8,
      solarRegisterDate: dateCreated?.persian ? dateCreated.persian : "",
      idSection: filterCity ? +dataAddress?.sectionId : 0,
      landLordName: formInput?.landLordName ? formInput.landLordName : "",
      relatedPermitFilter: formInput.relatedPermitFilter,
      isStop: formInput.isStop,
      isBuildingInspection: formInput.isBuildingInspection,
      isEarthSystem: formInput.isEarthSystem,
      isTestAndDelivery: formInput.isTestAndDelivery,
      parentId: null,
    }
    //const params = serializeQuery(searchQuery)
    setExpandedRowKeys([])
    onGetElectProjectsFullFilter(searchQuery)
  }

  const handleExpand = (expanded, record) => {
    const keys = expanded ? [record.id] : []
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

  const renderParentRow = () => {
    return <div>زیر پرونده ها</div>
  }
  return (
    <>
      <Row className="ps-3">
        <Col>
          <Radio.Group
            name="electProjectStatusEnum"
            onChange={handleInput}
            value={formInput.electProjectStatusEnum}
          >
            <Space direction="horizontal">
            <Radio value={0}>  در کارتابل نظام مهندسی </Radio>
              <Radio value={4}> در انتظار بررسی</Radio>
              <Radio value={6}> دارای نقص</Radio>
              <Radio value={8}> تایید شده</Radio>
              <Radio value={10}> بایگانی</Radio>

            </Space>
          </Radio.Group>
        </Col>

        <Divider />
        <Col>
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
            فیلتر شهر
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
  
        <Col span={24} className="gutter-row">
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
        locale={{
          emptyText: loading ? <Skeleton active={true} /> : <Empty />,
        }}
        size="small"
        pagination={false}
        scroll={{ x: 700 }}
        sticky="true"
        columns={projectColumnsAnt({
          props,
          setErrorMessage,
          currentUser: getCurrentUser(),
          matches_sm,
          pageIndex,
          pageSize,
          projectLevel: formInput.projectLevelEnum,
        })}
        // rowSelection={{
        //   type: "radio",
        //   columnTitle: "#",
        //   selectedRowKeys:
        //     selectedProject.findIndex(x => x.page === pageIndex) != -1
        //       ? selectedProject.find(x => x.page === pageIndex).selectArr
        //       : [],
        //   onChange: newSelectProject => {
        //     onSelectElectProject(pageIndex, newSelectProject)
        //   },
        //   getCheckboxProps: record => {
        //     return {
        //       disabled: record.isOldProcess || record.isCancel,
        //     }
        //   },
        // }}
        expandable={{
          expandedRowKeys,
          onExpand: handleExpand,
          expandedRowRender: record => renderParentRow(record),
          expandIcon: ({ expanded, onExpand, record }) => {
            if(record.countChildren === 0) return <PauseCircleOutlined />
            return expanded ? (
              <MinusCircleOutlined   onClick={e => onExpand(record, e)} />
            ) : (
              <PlusCircleOutlined   onClick={e => onExpand(record, e)} />
            )
          }
        }}
        // expandable={{
        //         expandedRowKeys,
        //         onExpand: handleExpand,
        //         //expandedRowRender:record=>renderParentRow(record)
        //         rowExpandable: record => record.countChildren  > 0
        //     }}
 
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
      تعداد کل : {lstElectProjectsFullFilterTotal}
      <Divider />
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
  onGetEppByEpId: electProjectId => dispatch(getEppByEpId(electProjectId)),
  onGetListEngineer: filter => dispatch(getListEngineer(filter)),
  onSelectElectProject: (gpId, selectArr) =>
    dispatch(selectGp(gpId, selectArr)),
  onDeselectElectProject: () => dispatch(deselectGp()),
  onSubmitElectProjectByAdmin: electProjectId =>
    dispatch(submitElectProjectAdmin(electProjectId)),
  onResetPackage: gpId => dispatch(resetPackage(gpId)),
  onStopElectProject: data => dispatch(stopElectProject(data)),
  onAmountSms: data => dispatch(amountSms(data)),
  onUpsertCheckList: data => dispatch(upsertCheckListEdc(data)),
  onUpdateByEdc: data =>dispatch(updateByEdc(data))



})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ListElectProject))

import React, { useEffect, useMemo, useReducer, useState } from "react"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"
import {
  addFileElectProject,
  addFileElectProjectSingle,
  eppAccepted,
  eppApproved,
  getElectProjectFiles,
  getEppByEpId,
  getListProjectProcessEng,
  getUserBalance,
  resetElectProcessFlag,
  updateByEdc,
  updateElectProjectDetailsNew,
  updateElectProjectEngNew,
  updateProcessDefectStageNew,
  updateProcessExpertStageNew,
  updateProcessMapStageNew,
  upsertCheckList,
  upsertCheckListEdc,
  upsertComment,
  upsertErtForm,
} from "store/actions"
import { getCurrentUser } from "helpers/service_helper"
import "./electProjectEng.scss"
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Input,
  Pagination,
  Radio,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd"
import { FilterOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons"
import { projectColumnsAnt } from "./ProjectColumnsAnt"
import { PersianDatePicker } from "components/Common/PersianDatePicker"
import { NumericInput } from "components/Common/NumericInput"
import Locations from "components/Common/Locations"

const FILTER_STORAGE_KEY = "filterColumnEppStorage"

const ListElectProjectProcessEng = props => {
  const {
    lstProjectProcessEng,
    lstProjectProcessEngTotal,
    matches_sm,
    loading,
    onGetListProjectProcessEng,
    openNotification,
    reload,
    onResetElectProcessFlag,
  } = props

  const [errorMessage, setErrorMessage] = useState(null)
  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(1)
  const [deliverEngineer, setDeliverEngineer] = useState("")
  const [filterCity, setFilterCity] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [filterColumn, setFilterColumn] = useState(["وضعیت"])

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
      inspectionStatusEnum: 0,
      fileNumber: "",
      landlordName: "",
    }
  )

  const checkedList = useMemo(
    () => ["تاریخ تخصیص", "فایلها", "طبقه", "مالک", "نوع بازرسی", "مرحله", "تاریخ تایید"],
    []
  )

  const overviewStats = useMemo(() => {
    let waiting = 0
    let approved = 0
    let rejected = 0
    let canceled = 0

    for (const item of lstProjectProcessEng || []) {
      if (item.inspectionStatus === 0) waiting += 1
      if (item.inspectionStatus === 1) approved += 1
      if (item.inspectionStatus === 2) rejected += 1
      if (item.inspectionStatus === 3) canceled += 1
    }

    return { waiting, approved, rejected, canceled }
  }, [lstProjectProcessEng])

  const handleInput = evt => {
    const name = evt?.target?.name
    const newValue = evt?.target?.value
    if (!name) return
    setFormInput({ [name]: newValue })
  }

  const handleSearchElectProjectProcessEng = val => {
    const searchQuery = {
      ...formInput,
      page: val === "search" ? 1 : pageIndex,
      pageSize: val === "search" ? 10 : pageSize,
      fileNumber: formInput.fileNumber ? formInput.fileNumber : 0,
      solarDateDeliverEngineer: deliverEngineer?.persian ? deliverEngineer.persian : "",
      idSection: filterCity ? +dataAddress?.sectionId : 0,
      landlordName: formInput.landlordName ? formInput.landlordName : "",
    }
    onGetListProjectProcessEng(searchQuery)
  }

  const handleResetFilters = () => {
    const resetInput = {
      inspectionStatusEnum: 0,
      fileNumber: "",
      landlordName: "",
    }

    setFormInput(resetInput)
    setDeliverEngineer("")
    setFilterCity(false)
    setDataAddress(prev => ({ ...prev, sectionId: 0 }))
    setPageIndex(1)
    setPageSize(10)

    onGetListProjectProcessEng({
      ...resetInput,
      page: 1,
      pageSize: 10,
      fileNumber: 0,
      solarDateDeliverEngineer: "",
      idSection: 0,
      landlordName: "",
    })
  }

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }
    handleSearchElectProjectProcessEng("search")
  }, [formInput.inspectionStatusEnum])

  useEffect(() => {
    if (props.success) openNotification("success", "top", props.success)
    if (props.error) openNotification("error", "top", props.error)
    if (errorMessage) openNotification("warning", "top", props.error)
    onResetElectProcessFlag()
  }, [errorMessage, props.success, props.error])

  useEffect(() => {
    handleSearchElectProjectProcessEng("pageIndex")
  }, [pageIndex, pageSize])

  useEffect(() => {
    if (reload) handleSearchElectProjectProcessEng("reload")
  }, [reload])

  useEffect(() => {
    if (typeof window === "undefined") return
    const data = localStorage.getItem(FILTER_STORAGE_KEY)
    if (!data || data === "#") return
    try {
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed)) setFilterColumn(parsed)
    } catch (e) {
      console.error(e)
    }
  }, [])

  const onChangeFilterColumn = e => {
    const value = e?.target?.value
    const checked = e?.target?.checked

    setFilterColumn(oldArray => {
      const withoutValue = oldArray.filter(x => x !== value)
      const next = checked ? [...withoutValue, value] : withoutValue
      if (typeof window !== "undefined") {
        localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(next))
      }
      return next
    })
  }

  return (
    <div className="eng-process-page">
      <Card className="eng-filter-card" bodyStyle={{ padding: matches_sm ? 12 : 16 }}>
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <Typography.Title level={5} className="eng-section-title">
            فیلتر پرونده ها
          </Typography.Title>

          <Row gutter={[10, 10]}>
            <Col xs={12} sm={6}>
              <Card size="small" className="eng-stat-card">
                <Statistic title="انتظار تایید" value={overviewStats.waiting} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card size="small" className="eng-stat-card">
                <Statistic title="تایید شده" value={overviewStats.approved} valueStyle={{ color: "#027A48" }} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card size="small" className="eng-stat-card">
                <Statistic title="عدم تایید" value={overviewStats.rejected} valueStyle={{ color: "#B54708" }} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card size="small" className="eng-stat-card">
                <Statistic title="کنسل شده" value={overviewStats.canceled} valueStyle={{ color: "#B42318" }} />
              </Card>
            </Col>
          </Row>

          <Row gutter={[12, 12]} align="middle">
            <Col xs={24} lg={18}>
              <Radio.Group
                name="inspectionStatusEnum"
                onChange={handleInput}
                value={formInput.inspectionStatusEnum}
                optionType="button"
                buttonStyle="solid"
              >
                <Space wrap>
                  <Radio value={0}>انتظار تایید</Radio>
                  <Radio value={1}>تایید شده</Radio>
                  <Radio value={2}>عدم تایید</Radio>
                  <Radio value={3}>کنسل شده</Radio>
                </Space>
              </Radio.Group>
            </Col>
            <Col xs={24} lg={6}>
              <div style={{ display: "flex", justifyContent: matches_sm ? "flex-start" : "flex-end" }}>
                <Tag color="blue">{`کل پرونده ها: ${lstProjectProcessEngTotal}`}</Tag>
              </div>
            </Col>
          </Row>

          <Row gutter={[10, 10]} align="middle">
            <Col xs={24} sm={12} md={8} lg={6}>
              <PersianDatePicker label="تاریخ تخصیص" setDefault={false} setPersianDate={setDeliverEngineer} />
            </Col>

            <Col xs={24} sm={12} md={8} lg={4}>
              <Checkbox checked={filterCity} onChange={e => setFilterCity(e.target.checked)}>
                فیلتر شهر
              </Checkbox>
            </Col>

            {filterCity && (
              <Col xs={24} md={24} lg={14}>
                <Locations setDataAddress={setDataAddress} matches_sm={matches_sm} isAccessCity={true} />
              </Col>
            )}

            <Col xs={24} sm={12} md={8} lg={4}>
              <NumericInput
                style={{ width: "100%" }}
                value={formInput.fileNumber}
                name="fileNumber"
                onChange={handleInput}
                placeholder="شماره پرونده"
              />
            </Col>

            <Col xs={24} sm={12} md={8} lg={4}>
              <Input
                name="landlordName"
                value={formInput.landlordName}
                onChange={handleInput}
                placeholder="نام مالک"
                allowClear
              />
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Space wrap className={matches_sm ? "eng-mobile-action-buttons" : undefined}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={() => handleSearchElectProjectProcessEng("search")}
                  block={matches_sm}
                >
                  جستجو
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleResetFilters} block={matches_sm}>
                  پاکسازی
                </Button>
              </Space>
            </Col>
          </Row>

          {!matches_sm && typeof window !== "undefined" && (
            <Collapse
              ghost
              items={[
                {
                  key: "columns",
                  label: (
                    <Space>
                      <FilterOutlined />
                      مدیریت نمایش ستون ها
                    </Space>
                  ),
                  children: (
                    <Row gutter={[8, 8]}>
                      {checkedList.map(value => (
                        <Col key={value} xs={12} sm={8} md={6} lg={4}>
                          <Checkbox
                            onChange={onChangeFilterColumn}
                            checked={filterColumn.indexOf(value) !== -1}
                            value={value}
                          >
                            {value}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row>
                  ),
                },
              ]}
            />
          )}
        </Space>
      </Card>

      <Card className="eng-table-card" bodyStyle={{ padding: 0, overflow: "hidden" }} style={{ marginTop: 14 }}>
        <Table
          loading={loading}
          size={matches_sm ? "middle" : "small"}
          pagination={false}
          scroll={matches_sm ? undefined : { x: 900 }}
          sticky={!matches_sm}
          locale={{ emptyText: "موردی برای نمایش وجود ندارد" }}
          columns={projectColumnsAnt({
            props,
            setErrorMessage,
            currentUser: getCurrentUser(),
            matches_sm,
            pageIndex,
            pageSize,
            filterColumn,
          })}
          rowClassName={(_r, i) => (i % 2 ? "even" : "odd")}
          rowKey={record => record.id}
          dataSource={lstProjectProcessEng}
        />
      </Card>

      <div className="eng-summary-bar">
        <Typography.Text className="eng-row-number">تعداد کل: {lstProjectProcessEngTotal}</Typography.Text>
        <Pagination
          current={pageIndex}
          total={lstProjectProcessEngTotal}
          pageSize={pageSize}
          showSizeChanger
          showTotal={total => `کل ${total} رکورد`}
          pageSizeOptions={[10, 20, 50, 100]}
          onChange={(page, size) => {
            setPageIndex(page)
            setPageSize(size)
          }}
        />
      </div>

      <Divider />
    </div>
  )
}

const mapStateToProps = ({ ElectProjects, USERs, ElectProjectProcesses }) => ({
  lstProjectProcessEng: ElectProjectProcesses.lstProjectProcessEng,
  lstProjectProcessEngTotal: ElectProjectProcesses.lstProjectProcessEngTotal,
  lstElectProjectFiles: ElectProjects.lstElectProjectFiles,
  lstEpp: ElectProjectProcesses.lstEpp,
  currentIdElectProject: ElectProjects.currentIdElectProject,
  error: ElectProjectProcesses.error,
  success: ElectProjectProcesses.success,
  loading: ElectProjectProcesses.loading,
  userBalance: USERs.userBalance,
  reload: ElectProjectProcesses.triggerReload,
})

const mapDispatchToProps = dispatch => ({
  onGetListProjectProcessEng: searchValue => dispatch(getListProjectProcessEng(searchValue)),
  onResetElectProcessFlag: () => dispatch(resetElectProcessFlag()),
  onGetUserBalance: () => dispatch(getUserBalance()),
  onAddFileElectProject: attachData => dispatch(addFileElectProject(attachData)),
  onAddFileEngProjectSingle: attachData => dispatch(addFileElectProjectSingle(attachData)),
  onUpdateProcessExpertStageNew: process => dispatch(updateProcessExpertStageNew(process)),
  onUpdateProcessMapStageNew: process => dispatch(updateProcessMapStageNew(process)),
  onUpdateProcessDefectStageNew: process => dispatch(updateProcessDefectStageNew(process)),
  onGetProjectFiles: electProjectId => dispatch(getElectProjectFiles(electProjectId)),
  onUpdateElectProjectDetailsNew: process => dispatch(updateElectProjectDetailsNew(process)),
  onUpdateElectProjectEngNew: electProject => dispatch(updateElectProjectEngNew(electProject)),
  onGetEppByEpId: electProjectId => dispatch(getEppByEpId(electProjectId)),
  onUpsertComment: data => dispatch(upsertComment(data)),
  onUpsertCheckList: data => dispatch(upsertCheckList(data)),
  onUpsertErtForm: data => dispatch(upsertErtForm(data)),
  onEppApproved: data => dispatch(eppApproved(data)),
  onEppAccepted: data => dispatch(eppAccepted(data)),
  onUpsertCheckListEdc: data => dispatch(upsertCheckListEdc(data)),
  onUpdateByEdc: data => dispatch(updateByEdc(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ListElectProjectProcessEng))

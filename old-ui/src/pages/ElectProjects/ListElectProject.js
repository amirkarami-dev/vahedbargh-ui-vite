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
  Card,
  Tag,
  Space,
  Typography,
  Descriptions,
  Empty,
} from "antd"
import {
  MinusCircleOutlined,
  PauseCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  FileOutlined,
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  FolderOpenOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons"
import { projectColumnsAnt } from "./ProjectColumnsAnt"
import { PersianDatePicker } from "components/Common/PersianDatePicker"
import { NumericInput } from "components/Common/NumericInput"
import Locations from "components/Common/Locations"
const { Search } = Input
const { Text, Title } = Typography

const ListElectProject = props => {
  const {
    lstElectProjectsFullFilter,
    lstElectProjectsFullFilterTotal,
    matches_sm,
    loading,
    onGetElectProjectsFullFilter,
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

  // Refresh data when fileNumber is cleared
  useEffect(() => {
    if (
      !isFirstRender &&
      (formInput.fileNumber === "" || formInput.fileNumber === null)
    ) {
      handleSearchElectProject("search")
    }
  }, [formInput.fileNumber])

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
    } else {
      handleSearchElectProject("search")
    }
  }, [formInput.isStop, formInput.relatedPermitFilter])

  useEffect(async () => {
    if (props.success) openNotification("success", "topLeft", props.success)
    if (props.error) openNotification("error", "topLeft", props.error)
    if (errorMessage) openNotification("warning", "topLeft", props.error)
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

  const getSearchQuery = val => {
    const searchQuery = {
      ...formInput,
      page: val === "search" ? 1 : pageIndex,
      pageSize: val === "search" ? 10 : pageSize,
      fileNumber: formInput.fileNumber ? formInput.fileNumber : 0,
      electRequestNumber: formInput.electRequestNumber
        ? formInput.electRequestNumber
        : 0,
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
      electRequestNumber: formInput.electRequestNumber
        ? formInput.electRequestNumber
        : 0,
      solarRegisterDate: dateCreated?.persian ? dateCreated.persian : "",
      idSection: filterCity ? +dataAddress?.sectionId : 0,
      landLordName: formInput?.landLordName ? formInput.landLordName : "",
      relatedPermitFilter: false,
      filterProjectLevel: false,
      isBuildingInspection: formInput.isBuildingInspection,
      isEarthSystem: formInput.isEarthSystem,
      isTestAndDelivery: formInput.isTestAndDelivery,
      isStop: false,
      filterIsFilter: true
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
    // Filter children from the list
    const children =
      lstElectProjectsFullFilter?.filter(item => item.parentId === record.id) ||
      []

    if (children.length === 0) {
      return (
        <div style={{ padding: "32px 24px", textAlign: "center" }}>
          <Empty
            description={
              <Text type="secondary" style={{ fontSize: "14px" }}>
                هیچ زیر پرونده‌ای یافت نشد
              </Text>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      )
    }

    return (
      <div
        style={{
          background: "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)",
          padding: "24px",
          borderRadius: "12px",
          margin: "12px 0",
          border: "1px solid #e8e8ff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "2px solid rgba(102, 126, 234, 0.2)",
          }}
        >
          <FolderOpenOutlined style={{ fontSize: "24px", color: "#667eea" }} />
          <div>
            <Text strong style={{ fontSize: "16px", color: "#1f2937" }}>
              زیر پرونده‌های پرونده <Tag color="blue">#{record.fileNumber}</Tag>
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              تعداد: {children.length} مورد
            </Text>
          </div>
        </div>

        <Row gutter={[16, 16]}>
          {children.map((child, index) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={`child-${child.id}`}>
              <Card
                size="small"
                hoverable
                className="modern-child-card"
                style={{
                  borderRadius: "12px",
                  border: "1px solid #e8e8e8",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "100%",
                }}
                bodyStyle={{ padding: "16px", paddingBottom: "12px" }}
                title={
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                    <Text strong style={{ color: "#1f2937", fontSize: "14px" }}>
                      📄 پرونده {child.fileNumber}
                    </Text>
                    <Tag
                      color={child.projectBalance >= 0 ? "green" : "red"}
                      style={{ margin: 0, fontSize: "12px" }}
                    >
                      {child.electProjectStatusName}
                    </Tag>
                  </div>
                }
              >
                <Space
                  direction="vertical"
                  size={8}
                  style={{ width: "100%" }}
                >
                  {/* Landlord */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px",
                      background: "rgba(99, 102, 241, 0.05)",
                      borderRadius: "6px",
                    }}
                  >
                    <UserOutlined style={{ color: "#667eea", fontSize: "14px" }} />
                    <Text ellipsis style={{ flex: 1, fontSize: "13px", color: "#374151" }}>
                      {child.landlordName || "نامشخص"}
                    </Text>
                  </div>

                  {/* Date */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px",
                      background: "rgba(59, 130, 246, 0.05)",
                      borderRadius: "6px",
                    }}
                  >
                    <CalendarOutlined style={{ color: "#3b82f6", fontSize: "14px" }} />
                    <Text type="secondary" style={{ fontSize: "13px" }}>
                      {child.solarRegisterDate || "-"}
                    </Text>
                  </div>

                  {/* Request Number */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px",
                      background: "rgba(16, 185, 129, 0.05)",
                      borderRadius: "6px",
                    }}
                  >
                    <FileOutlined style={{ color: "#10b981", fontSize: "14px" }} />
                    <Text type="secondary" style={{ fontSize: "13px" }}>
                      تقاضا: {child.electRequestNumber || "-"}
                    </Text>
                  </div>

                  {/* Status Tags */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <Tag
                      color={child.isEarthSystem ? "green" : "error"}
                      style={{ fontSize: "11px", margin: 0 }}
                    >
                      ⚡ ارتینگ: {child.isEarthSystem ? "✓" : "✗"}
                    </Tag>
                    <Tag
                      color={child.isBuildingInspection ? "green" : "error"}
                      style={{ fontSize: "11px", margin: 0 }}
                    >
                      🔍 بازرسی: {child.isBuildingInspection ? "✓" : "✗"}
                    </Tag>
                    <Tag
                      color={child.isTestAndDelivery ? "green" : "error"}
                      style={{ fontSize: "11px", margin: 0 }}
                    >
                      ✓ تست: {child.isTestAndDelivery ? "✓" : "✗"}
                    </Tag>
                  </div>

                  <Divider style={{ margin: "8px 0" }} />

                  {/* Balance and Level */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px",
                      background: "rgba(139, 92, 246, 0.05)",
                      borderRadius: "6px",
                    }}
                  >
                    <Tag color="purple" style={{ margin: 0, fontSize: "11px" }}>
                      سطح: {child.projectLevel}
                    </Tag>
                    <Text
                      strong
                      style={{
                        color:
                          child.projectBalance >= 0 ? "#10b981" : "#ef4444",
                        fontSize: "13px",
                      }}
                    >
                      {`${Math.abs(child.projectBalance || 0)}`.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}{" "}
                      ریال
                    </Text>
                  </div>

                  {/* Engineer Info */}
                  {child.engCurrentName && (
                    <div
                      style={{
                        background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        marginTop: "4px",
                        border: "1px solid rgba(102, 126, 234, 0.2)",
                      }}
                    >
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        👨‍💼 کارشناس:{" "}
                        <Text strong style={{ color: "#667eea" }}>
                          {child.engCurrentName}
                        </Text>
                      </Text>
                    </div>
                  )}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    )
  }

  return (
    <>
      {/* Modern Filter Section */}
      <Card
        className="modern-filter-card"
        style={{
          marginBottom: "24px",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          border: "1px solid #f0f0f0",
        }}
        bodyStyle={{ padding: "24px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Title level={5} style={{ margin: 0, color: "#1f2937", fontSize: "16px", fontWeight: "600" }}>
            🔍 فیلتر پرونده‌های الکتریکی
          </Title>
        </div>

        <Row gutter={[16, 16]} className="filter-row">
          {/* Date Filter */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="filter-item">
              <Text type="secondary" style={{ fontSize: "12px", fontWeight: "500", marginBottom: "4px", display: "block" }}>
                📅 تاریخ ثبت پرونده
              </Text>
              <PersianDatePicker
                label=""
                setDefault={false}
                setPersianDate={setDateCreated}
              />
            </div>
          </Col>

          {/* File Number */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="filter-item">
              <Text type="secondary" style={{ fontSize: "12px", fontWeight: "500", marginBottom: "4px", display: "block" }}>
                📄 شماره پرونده
              </Text>
              <NumericInput
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  padding: "8px 12px",
                  fontSize: "14px",
                }}
                value={formInput.fileNumber}
                name="fileNumber"
                onChange={handleInput}
                placeholder="وارد کنید..."
              />
            </div>
          </Col>

          {/* Request Number */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="filter-item">
              <Text type="secondary" style={{ fontSize: "12px", fontWeight: "500", marginBottom: "4px", display: "block" }}>
                🔢 شماره تقاضا
              </Text>
              <NumericInput
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  padding: "8px 12px",
                  fontSize: "14px",
                }}
                value={formInput.electRequestNumber}
                name="electRequestNumber"
                onChange={handleInput}
                placeholder="وارد کنید..."
              />
            </div>
          </Col>

          {/* Owner Name */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="filter-item">
              <Text type="secondary" style={{ fontSize: "12px", fontWeight: "500", marginBottom: "4px", display: "block" }}>
                👤 مالک
              </Text>
              <Input
                name="landLordName"
                onChange={handleInput}
                placeholder="نام مالک..."
                allowClear={true}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  padding: "8px 12px",
                  fontSize: "14px",
                }}
              />
            </div>
          </Col>

          {/* City Filter Checkbox */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="filter-item">
              <Text type="secondary" style={{ fontSize: "12px", fontWeight: "500", marginBottom: "8px", display: "block" }}>
                📍 فیلترشهر
              </Text>
              <Checkbox
                onChange={e => {
                  setFilterCity(e.target.checked)
                }}
                style={{ fontSize: "14px" }}
              >
                فعال کن
              </Checkbox>
            </div>
          </Col>

          {/* Status Filters */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="filter-item">
              <Text type="secondary" style={{ fontSize: "12px", fontWeight: "500", marginBottom: "8px", display: "block" }}>
                ✓ وضعیت پرونده
              </Text>
              <Space direction="vertical" size={4} style={{ fontSize: "13px" }}>
                <Checkbox
                  name="isBuildingInspection"
                  onChange={handleInput}
                  checked={formInput.isBuildingInspection}
                >
                  بازرسی ساختمان
                </Checkbox>
                <Checkbox
                  name="isEarthSystem"
                  onChange={handleInput}
                  checked={formInput.isEarthSystem}
                >
                  سیستم ارتینگ
                </Checkbox>
                <Checkbox
                  name="isTestAndDelivery"
                  onChange={handleInput}
                  checked={formInput.isTestAndDelivery}
                >
                  تست و تحویل
                </Checkbox>
              </Space>
            </div>
          </Col>
        </Row>

        {/* City Location Filter */}
        {filterCity && (
          <Row gutter={[16, 16]} style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #f0f0f0" }}>
            <Col xs={24}>
              <Text type="secondary" style={{ fontSize: "12px", fontWeight: "500", marginBottom: "12px", display: "block" }}>
                📌 انتخاب موقعیت جغرافیایی
              </Text>
              <Locations
                setDataAddress={setDataAddress}
                matches_sm={matches_sm}
                isAccessCity={true}
              />
            </Col>
          </Row>
        )}

        {/* Search Button */}
        <Row gutter={[12, 12]} style={{ marginTop: "16px" }}>
          <Col xs={24} sm={12} md={6}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => handleSearchElectProject("search")}
              size="large"
              style={{
                width: "100%",
                borderRadius: "8px",
                height: "40px",
                fontWeight: "600",
                fontSize: "14px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                transition: "all 0.3s ease",
              }}
            >
              جستجو در پرونده‌ها
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button
              onClick={() => {
                setFormInput({
                  fileNumber: null,
                  electRequestNumber: null,
                  searchValue: "",
                  projectLevelEnum: 0,
                  isStop: false,
                  isBuildingInspection: false,
                  isEarthSystem: false,
                  isTestAndDelivery: false,
                })
                setDateCreated("")
                setFilterCity(false)
              }}
              size="large"
              style={{
                width: "100%",
                borderRadius: "8px",
                height: "40px",
                fontWeight: "600",
                fontSize: "14px",
                border: "1px solid #d1d5db",
              }}
            >
              پاک کردن فیلترها
            </Button>
          </Col>
        </Row>
      </Card>
      {/* Modern Table Section */}
      <Card
        style={{
          marginBottom: "24px",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          border: "1px solid #f0f0f0",
          overflow: "hidden",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", background: "#fafbfc" }}>
          <Title level={5} style={{ margin: 0, color: "#1f2937", fontSize: "16px", fontWeight: "600" }}>
            📋 لیست پرونده‌های الکتریکی
          </Title>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            کل رکوردها: {lstElectProjectsFullFilterTotal}
          </Text>
        </div>

        <div style={{ overflowX: "auto" }}>
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
              childrenColumnName: "notExist",
              onExpand: handleExpand,
              expandedRowRender: record => renderParentRow(record),
              rowExpandable: record => record.countChildren > 0,
              expandIcon: ({ expanded, onExpand, record }) => {
                if (record.countChildren === 0) return <PauseCircleOutlined style={{ color: "#d1d5db" }} />
                return expanded ? (
                  <MinusCircleOutlined
                    onClick={e => onExpand(record, e)}
                    style={{ color: "#667eea", cursor: "pointer", transition: "all 0.3s ease" }}
                  />
                ) : (
                  <PlusCircleOutlined
                    onClick={e => onExpand(record, e)}
                    style={{ color: "#667eea", cursor: "pointer", transition: "all 0.3s ease" }}
                  />
                )
              },
            }}
            rowClassName={(_r, i) => (i % 2 ? "modern-table-row-odd" : "modern-table-row-even")}
            rowKey={record => `parent-${record.id}`}
            dataSource={
              formInput.fileNumber
                ? lstElectProjectsFullFilter
                : lstElectProjectsFullFilter?.filter(item => !item.parentId)
            }
          />
        </div>
      </Card>

      {/* Modern Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
        <Pagination
          current={pageIndex}
          total={lstElectProjectsFullFilterTotal}
          onChange={(page, size) => {
            console.log("page,size", page, size)
            setPageIndex(page)
            setPageSize(size)
          }}
          getPopupContainer={triggerNode => triggerNode.parentNode}
          pageSize={pageSize}
          showTotal={(total) => (
            <Text type="secondary" style={{ fontSize: "12px" }}>
              کل: <Text strong>{total}</Text> پرونده
            </Text>
          )}
          style={{
            background: "#fafbfc",
            padding: "16px 24px",
            borderRadius: "12px",
            border: "1px solid #f0f0f0",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        />
      </div>
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

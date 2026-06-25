import React, { useState, useEffect, useReducer } from "react"
import { connect } from "react-redux"
import {
  Table,
  Input,
  Button,
  Row,
  Col,
  Form,
  Select,
  Radio,
  Space,
  Checkbox,
  message,
  Card,
  Typography,
  Spin,
  FloatButton,
  Badge,
  Divider,
} from "antd"
import { 
  ReloadOutlined, 
  SendOutlined, 
  PlusOutlined,
  FilterOutlined,
  InboxOutlined,
} from "@ant-design/icons"
import { columns } from "./columns"
import CreateTicketModal from "./CreateTicketModal"
import {
  addSupportFile,
  closedSupport,
  deleteSupportFile,
  getListSupport,
  getSupportFiles,
  resetSupportFlag,
  upsertSupport,
  upsertTicket,
} from "store/actions"
import { withTranslation } from "react-i18next"
import {
  enumToArrayWithoutSort,
  getCurrentUser,
  serializeQuery,
} from "helpers/service_helper"
import FilePondUpload from "components/Common/FilePondUpload"
import { persianToEnglishNumbers } from "helpers/utilities"
import useUsersForSupport from "hooks/useUsersForSupport"
import { FileSupportType } from "models/types/file-support-type"

const { Search } = Input

// Inline row reply component for expandable rows
const RowReply = ({ record, onSubmit, disabled }) => {
  const [rowForm] = Form.useForm()
  return (
    <Form
      form={rowForm}
      layout="inline"
      onFinish={vals => onSubmit(vals, rowForm)}
      style={{ padding: 12, display: "flex", gap: 8, alignItems: "flex-start", flexWrap: "wrap" }}
    >
      <Form.Item
        name="message"
        rules={[{ required: true, message: "نباید خالی باشد" }]}
        style={{ flex: 1, minWidth: 260 }}
      >
        <Input.TextArea rows={2} placeholder="پاسخ خود را اینجا بنویسید" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={disabled} icon={<SendOutlined />}>ارسال پاسخ</Button>
      </Form.Item>
      {disabled && (
        <Typography.Text type="secondary">این تیکت بسته است</Typography.Text>
      )}
    </Form>
  )
}
const SupportList = props => {
  const {
    lstSupport,
    loading,
    onGetListSupport,
    onUpsertSupport,
    onUpsertTicket,
    onResetSupportFlag,
    openNotification,
    reload,
  } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      closed: 0,
      userType: 0,
      supportListTypeEnum: 0,
    }
  )

  const [formValues, setFormValues] = useState({})

  const [panelForm] = Form.useForm()
  const [supportFile, setSupportFile] = useState([])
  const {
    users: usersForSupport,
    loading: usersForSupportLoading,
    error: usersForSupportError,
    refresh: refreshUsersForSupport,
  } = useUsersForSupport()

  const [countChangeFormInput, setCountChangeFormInput] = useState(0)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [filterExpanded, setFilterExpanded] = useState(false)

  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormInput({ [name]: newValue })
    setCountChangeFormInput(prev => prev + 1)
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra)
  }
  const [fileTypes, setFileTypes] = useState([])

  useEffect(() => {
    setFileTypes(enumToArrayWithoutSort(FileSupportType))
  }, [])
  // usersForSupport are managed by the custom hook

  useEffect(() => {
    const handleFlags = async () => {
      if (props.success) openNotification("success", "top", props.success)
      if (props.error) openNotification("error", "top", props.error)
      if (errorMessage) openNotification("warning", "top", props.error)
      onResetSupportFlag()
    }
    handleFlags()
  }, [
    errorMessage,
    props.success,
    props.error,
    onResetSupportFlag,
    openNotification,
  ])

  useEffect(() => {
    handleSearchSupports()
  }, [])
  // Fetch data or set initial values if needed
  useEffect(() => {
    if (reload || countChangeFormInput) {
      handleSearchSupports()
    }
  }, [reload, countChangeFormInput])
  // Function to handle form submission
  const handleSubmit = formData => {
    let searchQuery = {
      ...formInput,
      closed: !!formInput.closed,
    }
    const params = serializeQuery(searchQuery)
    onUpsertSupport({ formData, params })
    setCreateModalVisible(false)
  }
  const handleSearchSupports = async param => {
    let searchQuery = {
      ...formInput,
      closed: !!formInput.closed,
    }
    if (param) {
      searchQuery = { ...searchQuery, ...param }
    }
    const params = serializeQuery(searchQuery)
    onGetListSupport(params)
  }

  const onInlineSearch = async value => {
    if (value.ticketNumber !== undefined) {
      if (!value.ticketNumber && value.ticketNumber.trim() === "") {
        message.error("لطفا شماره تیکت را وارد کنید")
        return
      }
    }
    await handleSearchSupports(value ? value : 0)
  }

  const titleValue = Form.useWatch("title", panelForm)

  // Inline reply (per row)
  const handleQuickReply = async (record, values, form) => {
    if (!values || !values.message) {
      message.error("متن پاسخ نمی‌تواند خالی باشد")
      return
    }
    if (record.closed) {
      message.warning("این تیکت بسته است و امکان ارسال پاسخ وجود ندارد")
      return
    }
    const updatedData = { message: values.message, supportId: record.id }
    const params = serializeQuery({ supportId: record.id })
    await onUpsertTicket({ updatedData, params })
    if (form) form.resetFields()
  }

  return (
    <div style={{ 
      padding: '24px',
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <CreateTicketModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={handleSubmit}
        usersForSupport={usersForSupport}
        usersForSupportLoading={usersForSupportLoading}
        loading={loading}
        t={props.t}
      />

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        tooltip="ارسال تیکت جدید"
        onClick={() => setCreateModalVisible(true)}
        style={{ left: 24, bottom: 24 }}
      />

      {/* Header Section */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space direction="vertical" size={0}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              <InboxOutlined style={{ marginLeft: 12 }} />
              مدیریت تیکت‌ها
            </Typography.Title>
          </Space>
        </Col>
        <Col>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            تیکت جدید
          </Button>
        </Col>
      </Row>

      {/* Stats Cards */}
      {getCurrentUser().role === "Administrator" && (
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              hoverable
              style={{ 
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Typography.Text type="secondary">همه تیکت‌ها</Typography.Text>
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {lstSupport.length}
                </Typography.Title>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              hoverable
              style={{ 
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderTop: '3px solid #52c41a'
              }}
            >
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Typography.Text type="secondary">تیکت‌های باز</Typography.Text>
                <Typography.Title level={3} style={{ margin: 0, color: '#52c41a' }}>
                  {lstSupport.filter(t => !t.closed).length}
                </Typography.Title>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              hoverable
              style={{ 
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderTop: '3px solid #ff4d4f'
              }}
            >
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Typography.Text type="secondary">تیکت‌های بسته</Typography.Text>
                <Typography.Title level={3} style={{ margin: 0, color: '#ff4d4f' }}>
                  {lstSupport.filter(t => t.closed).length}
                </Typography.Title>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card 
              hoverable
              style={{ 
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderTop: '3px solid #1890ff'
              }}
            >
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Typography.Text type="secondary">خوانده نشده</Typography.Text>
                <Typography.Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                  {lstSupport.filter(t => !t.isRead).length}
                </Typography.Title>
              </Space>
            </Card>
          </Col>
        </Row>
      )}

      {/* Filters Card */}
      <Card
        style={{ 
          marginBottom: 24,
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}
        bodyStyle={{ padding: 0 }}
      >
        {/* Filter Header - Clickable */}
        <div 
          onClick={() => setFilterExpanded(!filterExpanded)}
          style={{
            background: 'linear-gradient(135deg, #667eea 100%, #e9ecef 100%)',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FilterOutlined style={{ fontSize: 20, color: '#fff' }} />
            </div>
            <Space direction="vertical" size={0}>
              <Typography.Title level={5} style={{ margin: 0, color: '#fff' }}>
                فیلتر و جستجو
              </Typography.Title>
              <Typography.Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>
                {filterExpanded ? 'کلیک کنید تا ببندید' : 'کلیک کنید تا باز شود'}
              </Typography.Text>
            </Space>
          </div>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: filterExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}>
            <span style={{ fontSize: 20, fontWeight: 'bold' }}>
              {filterExpanded ? '−' : '+'}
            </span>
          </div>
        </div>

        {/* Filter Body - Collapsible */}
        {filterExpanded && (
        <div style={{ padding: '24px' }}>
          <Row gutter={[16, 16]}>
            {getCurrentUser().role === "Administrator" && (
              <>
                <Col xs={24} sm={12} lg={8}>
                  <div style={{
                    background: '#f8f9fa',
                    padding: '16px',
                    borderRadius: 8,
                    border: '1px solid #e8e8e8',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#1890ff'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                  >
                    <Space direction="vertical" size={8} style={{ width: '100%' }}>
                      <Typography.Text strong style={{ color: '#262626' }}>
                        📋 نوع تیکت
                      </Typography.Text>
                      <Radio.Group
                        buttonStyle="solid"
                        value={formInput.supportListTypeEnum}
                        onChange={e =>
                          handleInput({
                            target: { name: "supportListTypeEnum", value: e.target.value },
                          })
                        }
                        style={{ width: '100%', display: 'flex' }}
                      >
                        <Radio.Button value={0} style={{ flex: 1, textAlign: 'center' }}>همه</Radio.Button>
                        <Radio.Button value={1} style={{ flex: 1, textAlign: 'center' }}>دریافتی</Radio.Button>
                        <Radio.Button value={2} style={{ flex: 1, textAlign: 'center' }}>ارسالی</Radio.Button>
                      </Radio.Group>
                    </Space>
                  </div>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                  <div style={{
                    background: '#f8f9fa',
                    padding: '16px',
                    borderRadius: 8,
                    border: '1px solid #e8e8e8',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#52c41a'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                  >
                    <Space direction="vertical" size={8} style={{ width: '100%' }}>
                      <Typography.Text strong style={{ color: '#262626' }}>
                        🔖 وضعیت
                      </Typography.Text>
                      <Radio.Group
                        buttonStyle="solid"
                        value={formInput.closed}
                        onChange={e =>
                          handleInput({ target: { name: "closed", value: e.target.value } })
                        }
                        style={{ width: '100%', display: 'flex' }}
                      >
                        <Radio.Button value={0} style={{ flex: 1, textAlign: 'center' }}>
                          <Space size={4}>
                            <span>✓</span>
                            <span>باز</span>
                          </Space>
                        </Radio.Button>
                        <Radio.Button value={1} style={{ flex: 1, textAlign: 'center' }}>
                          <Space size={4}>
                            <span>✕</span>
                            <span>بسته</span>
                          </Space>
                        </Radio.Button>
                      </Radio.Group>
                    </Space>
                  </div>
                </Col>
                
                <Col xs={24} sm={12} lg={8}>
                  <div style={{
                    background: '#f8f9fa',
                    padding: '16px',
                    borderRadius: 8,
                    border: '1px solid #e8e8e8',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#722ed1'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                  >
                    <Space direction="vertical" size={8} style={{ width: '100%' }}>
                      <Typography.Text strong style={{ color: '#262626' }}>
                        👤 کاربر
                      </Typography.Text>
                      <Select
                        showSearch
                        allowClear
                        loading={usersForSupportLoading}
                        placeholder="انتخاب کاربر..."
                        style={{ width: '100%' }}
                        size="large"
                        options={usersForSupport.map(u => ({
                          value: u.id,
                          label: `${u.firstName || ''} ${u.lastName || ''}`.trim() || (u.name || u.toName || 'بدون نام'),
                        }))}
                        optionFilterProp="label"
                        onChange={val => onInlineSearch(val ? { SearchUserId: val } : 0)}
                      />
                    </Space>
                  </div>
                </Col>
              </>
            )}
            
            <Col xs={24} sm={12} lg={getCurrentUser().role === "Administrator" ? 12 : 18}>
              <div style={{
                background: '#f8f9fa',
                padding: '16px',
                borderRadius: 8,
                border: '1px solid #e8e8e8',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#faad14'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e8e8e8'}
              >
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                  <Typography.Text strong style={{ color: '#262626' }}>
                    🔍 جستجوی سریع
                  </Typography.Text>
                  <Input.Search
                    placeholder="شماره تیکت را وارد کنید..."
                    allowClear
                    onSearch={value => onInlineSearch({ ticketNumber: value })}
                    style={{ width: '100%' }}
                    size="large"
                  />
                </Space>
              </div>
            </Col>
            
            <Col xs={24} sm={12} lg={getCurrentUser().role === "Administrator" ? 12 : 6}>
              <div style={{
                padding: '16px',
                borderRadius: 8,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <Typography.Text strong style={{ color: '#fff', marginBottom: 8 }}>
                  🔄 عملیات
                </Typography.Text>
                <Button
                  block
                  size="large"
                  onClick={() => setCountChangeFormInput(prev => prev + 1)}
                  icon={<ReloadOutlined />}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    fontWeight: 600
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                  }}
                >
                  به روز رسانی
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        )}
      </Card>

      {/* Table Card */}
      <Card
        style={{ 
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}
        bodyStyle={{ padding: 0 }}
      >
        {/* Table Header */}
        <div style={{
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <Space align="center">
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <InboxOutlined style={{ fontSize: 20 }} />
            </div>
            <Space direction="vertical" size={0}>
              <Typography.Title level={5} style={{ margin: 0 }}>
                لیست تیکت‌ها
              </Typography.Title>
              <Typography.Text style={{ fontSize: 12 }}>
                مشاهده و مدیریت همه تیکت‌های پشتیبانی
              </Typography.Text>
            </Space>
          </Space>
          <Space>
            <Badge 
              count={lstSupport.length} 
              showZero 
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.3)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                padding: '0 12px',
                height: 28,
                lineHeight: '28px',
                borderRadius: 14
              }}
            />
            {lstSupport.filter(t => !t.isRead).length > 0 && (
              <Badge 
                count={`${lstSupport.filter(t => !t.isRead).length} خوانده نشده`}
                style={{ 
                  backgroundColor: '#ff4d4f',
                  fontWeight: 600,
                  fontSize: 12,
                  padding: '0 10px',
                  height: 24,
                  lineHeight: '24px',
                  borderRadius: 12
                }}
              />
            )}
          </Space>
        </div>

        <Table
          loading={loading}
          size="middle"
          pagination={{ 
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} از ${total} تیکت`,
            pageSizeOptions: ['10', '20', '50', '100'],
            style: { padding: '16px 24px' }
          }}
          scroll={{ y: 670, x: 700 }}
          sticky
          expandable={{
            expandedRowRender: record => (
              <div style={{
                background: '#fafafa',
                padding: '16px',
                borderRadius: 8,
                margin: '8px 0'
              }}>
                <RowReply
                  record={record}
                  disabled={record.closed}
                  onSubmit={(vals, form) => handleQuickReply(record, vals, form)}
                />
              </div>
            ),
            rowExpandable: () => true,
            expandIcon: ({ expanded, onExpand, record }) => (
              <div
                onClick={e => onExpand(record, e)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  background: expanded ? '#1890ff' : '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: expanded ? '#fff' : '#595959'
                }}
                onMouseEnter={e => {
                  if (!expanded) e.currentTarget.style.background = '#e6e6e6'
                }}
                onMouseLeave={e => {
                  if (!expanded) e.currentTarget.style.background = '#f0f0f0'
                }}
              >
                {expanded ? '−' : '+'}
              </div>
            ),
          }}
          columns={columns({
            props,
            currentUser: getCurrentUser(),
            ticketNumberFilter: lstSupport.map(x => ({
              text: x.ticketNumber,
              value: x.ticketNumber,
            })),
          })}
          rowClassName={(record, index) => {
            const classes = []
            if (index % 2) classes.push("odd")
            else classes.push("even")
            if (!record.isRead) classes.push("unread-row")
            if (record.closed) classes.push("closed-row")
            return classes.join(" ")
          }}
          rowKey={record => record.id}
          dataSource={lstSupport}
          onChange={onChange}
          className="modern-table"
        />
      </Card>
      
      <style jsx global>{`
        .modern-table .ant-table {
          font-size: 14px;
        }
        
        .modern-table .ant-table-thead > tr > th {
          background: #fafafa !important;
          font-weight: 600;
          color: #262626;
          padding: 16px;
          border-bottom: 2px solid #f0f0f0;
        }
        
        .modern-table .ant-table-tbody > tr {
          transition: all 0.3s ease;
        }
        
        .modern-table .ant-table-tbody > tr:hover {
          background: #f5f9ff !important;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);
        }
        
        .modern-table .ant-table-tbody > tr.unread-row {
          background: #e6f7ff;
          font-weight: 500;
        }
        
        .modern-table .ant-table-tbody > tr.unread-row:hover {
          background: #bae7ff !important;
        }
        
        .modern-table .ant-table-tbody > tr.closed-row {
          opacity: 0.7;
        }
        
        .modern-table .ant-table-tbody > tr > td {
          padding: 12px 16px;
          border-bottom: 1px solid #f5f5f5;
        }
        
        .modern-table .ant-table-tbody > tr.odd {
          background: #fafafa;
        }
        
        .modern-table .ant-table-tbody > tr.even {
          background: #ffffff;
        }
        
        .modern-table .ant-pagination {
          margin: 0;
        }
        
        .modern-table .ant-table-expanded-row > td {
          padding: 0 !important;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = ({ Supports }) => ({
  lstSupport: Supports.lstSupport,
  lstSupportFiles: Supports.lstSupportFiles,
  loading: Supports.loading,
  error: Supports.error,
  success: Supports.success,
  triggerReload: Supports.triggerReload,
})

const mapDispatchToProps = dispatch => ({
  onGetListSupport: searchValue => dispatch(getListSupport(searchValue)),
  onUpsertSupport: data => dispatch(upsertSupport(data)),
  onUpsertTicket: data => dispatch(upsertTicket(data)),
  onResetSupportFlag: () => dispatch(resetSupportFlag()),
  onClosedSupport: data => dispatch(closedSupport(data)),
  onAddSupportFile: supportId => dispatch(addSupportFile(supportId)),
  onGetSupportFiles: supportId => dispatch(getSupportFiles(supportId)),
  onDeleteSupportFiles: id => dispatch(deleteSupportFile(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SupportList))

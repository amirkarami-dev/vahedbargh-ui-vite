import React, { useState, useEffect, useReducer, useMemo, useRef } from "react"
import { connect } from "react-redux"
import {
  Input,
  Button,
  Form,
  Card,
  Typography,
  Descriptions,
  Space,
  Alert,
  Row,
  Col,
} from "antd"
// import { columns } from "./columns" // no longer used in chat view
import {
  addSupportFile,
  closedSupport,
  deleteSupportFile,
  getListTicket,
  getSupportFiles,
  resetSupportFlag,
  upsertTicket,
} from "store/actions"
import { withTranslation } from "react-i18next"
import { getCurrentUser, serializeQuery } from "helpers/service_helper"
import { useParams, Link } from "react-router-dom"
import { SupportFiles } from "../SupportFiles"
import { ArrowLeftOutlined, ReloadOutlined, SendOutlined, CheckOutlined } from "@ant-design/icons"
import { Avatar, Tooltip } from "antd"

const TicketList = props => {
  const {
    lstTicket,
    loading,
    onGetListTicket,
    onUpsertTicket,
    onResetSupportFlag,
    openNotification,
    reload,
    onClosedSupport,
  } = props
  const supportId = useParams().id
  const [errorMessage, setErrorMessage] = useState(null)
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      supportId,
    }
  )
  const [form] = Form.useForm()

  const [countChangeFormInput, setCountChangeFormInput] = useState(0)

  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormInput({ [name]: newValue })
    setCountChangeFormInput(prev => prev + 1)
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra)
  }

  useEffect(() => {
    if (props.success) openNotification("success", "top", props.success)
    if (props.error) openNotification("error", "top", props.error)
    if (errorMessage) openNotification("warning", "top", props.error)
    onResetSupportFlag()
  }, [errorMessage, props.success, props.error, onResetSupportFlag, openNotification])

  useEffect(() => {
    handleSearchTickets()
  }, [])
  // Fetch data or set initial values if needed
  useEffect(() => {
    if (reload || countChangeFormInput) {
      handleSearchTickets()
    }
  }, [reload, countChangeFormInput])
  // Function to handle form submission
  const handleSubmit = values => {
    let searchQuery = {
      ...formInput,
    }
    const params = serializeQuery(searchQuery)

    let updatedData = values
    updatedData.supportId = supportId
    onUpsertTicket({ updatedData, params })
    form.resetFields()
  }
  const handleSearchTickets = async val => {
    let searchQuery = {
      ...formInput,
    }

    const params = serializeQuery(searchQuery)
    onGetListTicket(params)
  }
  // Function to handle edit button click
  const handleEdit = record => {
    // form.setFieldsValue(record)
    // // setSolarBirthDate(record.solarBirthDate)
    // setEditingId(record.id)
  }

  const layout = {
    labelCol: { span: { sm: 24, md: 8, lg: 6 } },
    wrapperCol: { span: { sm: 24, md: 16, lg: 12 } },
  }
  const currentUserSid = useMemo(() => getCurrentUser().sid, [])
  const currentUserName = useMemo(() => getCurrentUser().fullName || getCurrentUser().name || "من", [])
  const chatRef = useRef(null)

  // Helper: extract Solar day key (e.g., 1404/08/20) from message
  const getSolarDayKey = (m) => {
    const solar = m?.solarCreated || m?.solarCreate || m?.support?.solarCreate
    if (!solar) return 'unknown'
    const str = String(solar)
    // Split by underscore or space, take date part
    const day = str.split(/[_\s]/)[0]
    return day || 'unknown'
  }

  // Group messages by calendar day (YYYY-MM-DD)
  const groupedMessages = useMemo(() => {
    if (!Array.isArray(lstTicket)) return []
    const groups = []
    const map = new Map()
    lstTicket.forEach(m => {
      const key = getSolarDayKey(m)
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(m)
    })
    map.forEach((messages, dayKey) => groups.push({ dayKey, messages }))
    return groups
  }, [lstTicket])

  // Format date separator label in Persian
  const formatDayLabel = dayKey => {
    if (dayKey === 'unknown') return 'نامشخص'
    // For Solar keys like 1404/08/20 just return as-is
    return dayKey
  }

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [lstTicket])

  return (
    <div className="ticket-layout">
      <Row className="ticket-grid" gutter={[16, 16]} align="stretch">
        {/* Messages and details column (should appear left on desktop, first on mobile) */}
        <Col className="msgs-col" xs={24} md={16}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Card
              title={<Typography.Title level={4} style={{ margin: 0 }}>جزئیات تیکت</Typography.Title>}
              extra={
                <Link to="/support">
                  <Button type="link" icon={<ArrowLeftOutlined />}>بازگشت</Button>
                </Link>
              }
            >
              {lstTicket && (
                <>
                  <Descriptions size="small" column={{ xs: 1, md: 2 }}>
                    <Descriptions.Item label="موضوع">{lstTicket[0]?.support.title || "-"}</Descriptions.Item>
                    <Descriptions.Item label="ارسال به">{lstTicket[0]?.toName || "-"}</Descriptions.Item>
                    <Descriptions.Item label="شماره پرونده">{lstTicket[0]?.support.fileNumber || "-"}</Descriptions.Item>
                    <Descriptions.Item label="وضعیت">
                      {lstTicket[0]?.support.closed ? (
                        <Alert className="p-1" type="warning"  showIcon banner={false} />
                      ) : (
                        <Alert className="p-1"   type="success"  showIcon banner={false} />
                      )}
                    </Descriptions.Item>
                  </Descriptions>
                  <div style={{ marginTop: 12 }}>
                    {getCurrentUser().role === "Administrator"  && (
                      <Button
                        type="primary"
                        onClick={async () => await onClosedSupport({ id: supportId })}
                      >
                        {lstTicket[0]?.support.closed ? "باز کردن تیکت" : "بستن تیکت"}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </Card>

            <Card title={<Typography.Title level={5} style={{ margin: 0 }}>پیام‌ها</Typography.Title>} bodyStyle={{ padding: 0 }}>
              <div ref={chatRef} className="chat-container">
                {Array.isArray(lstTicket) && lstTicket.length > 0 ? (
                  groupedMessages.map(group => (
                    <div key={group.dayKey}>
                      <div className="day-separator">{formatDayLabel(group.dayKey)}</div>
                      {group.messages.map(msg => {
                        const isMine = msg.userId === currentUserSid
                        const senderInitial = (msg.name || msg.toName || (isMine ? currentUserName : "?"))[0] || "?"
                        const solarText = (msg.solarCreated || msg.solarCreate || msg.support?.solarCreate || "")
                        const solarDisplay = String(solarText).replace('_', ' ')
                        return (
                          <div key={msg.id} className={`message-row ${isMine ? "right" : "left"}`}>
                          
                            <div className={`bubble ${isMine ? "bubble-right" : "bubble-left"}`}>
                             
                              <div className="message-text">{msg.message}</div>
                              <div className="message-meta">
                                <Tooltip title={solarDisplay}>
                                  <span className="message-time">{solarDisplay}</span>
                                </Tooltip>
                                <span className={`message-status ${msg.isSend ? (msg.support?.isRead ? 'read' : 'sent') : 'pending'}`}>
                                  {!msg.isSend ? (
                                    '…'
                                  ) : msg.support?.isRead ? (
                                    <>
                                      <CheckOutlined /> <CheckOutlined style={{ marginRight: 2 }} />
                                    </>
                                  ) : (
                                    <CheckOutlined />
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))
                ) : (
                  <div style={{ padding: 16 }}>
                    <Alert type="info" message="پیامی وجود ندارد" showIcon />
                  </div>
                )}
              </div>
            </Card>
          </Space>
        </Col>

        {/* Send form column (should appear right on desktop, below messages on mobile) */}
        <Col className="send-col" xs={24} md={8}>
          <Card title={<Typography.Title level={5} style={{ margin: 0 }}>ارسال پیام</Typography.Title>}>
            <Form name="engForm" layout="vertical" form={form} onFinish={handleSubmit}>
              <Form.Item rules={[{ required: true, message: "نباید خالی باشد" }]} label="پیام" name="message">
                <Input.TextArea rows={4} placeholder="پیام خود را در اینجا بنویسید" />
              </Form.Item>
              <Space wrap>
                <Button disabled={loading} type="primary" htmlType="submit" icon={<SendOutlined />}>ارسال پیام</Button>
                <Button onClick={() => setCountChangeFormInput(prev => prev + 1)} icon={<ReloadOutlined />}>به روز رسانی تیکت</Button>
                {lstTicket[0]?.support && (
                  <SupportFiles rowData={lstTicket[0]?.support} mainProps={props} setErrorMessage={setErrorMessage} />
                )}
              </Space>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = ({ Supports }) => ({
  lstTicket: Supports.lstTicket,
  lstSupportFiles: Supports.lstSupportFiles,
  loading: Supports.loading,
  error: Supports.error,
  success: Supports.success,
})

const mapDispatchToProps = dispatch => ({
  onGetListTicket: searchValue => dispatch(getListTicket(searchValue)),
  onUpsertTicket: data => dispatch(upsertTicket(data)),
  onResetSupportFlag: () => dispatch(resetSupportFlag()),
  onClosedSupport: data => dispatch(closedSupport(data)),
  onAddSupportFile: supportId => dispatch(addSupportFile(supportId)),
  onGetSupportFiles: supportId => dispatch(getSupportFiles(supportId)),
  onDeleteSupportFiles: id =>dispatch(deleteSupportFile(id)),
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(TicketList))

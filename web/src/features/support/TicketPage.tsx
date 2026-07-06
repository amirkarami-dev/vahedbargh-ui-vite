import { Alert, Button, Card, Col, Descriptions, Form, Input, Row, Space, Spin, Tag, Typography } from 'antd'
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons'
import { Link, useParams } from 'react-router-dom'
import { getCurrentUser, getRoles } from '@/shared/lib/auth'
import { useCloseSupport, useReplyTicket, useTickets } from '@/features/support/api/useSupport'
import { SupportFilesDialog } from '@/features/support/SupportFilesDialog'

// Ticket thread page (old-ui Support/Ticket). Messages + reply + close (admin).
export function TicketPage() {
  const supportId = useParams().id ?? ''
  const [form] = Form.useForm()
  const { data, isFetching } = useTickets(supportId)
  const reply = useReplyTicket(supportId)
  const close = useCloseSupport()

  const messages = data ?? []
  const head = messages[0]?.support
  const mySid = getCurrentUser()?.sid as string | undefined
  const isAdmin = getRoles().includes('Administrator')

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={16}>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Card
            title={
              <Typography.Title level={4} style={{ margin: 0 }}>
                جزئیات تیکت
              </Typography.Title>
            }
            extra={
              <Link to="/support">
                <Button type="link" icon={<ArrowLeftOutlined />}>
                  بازگشت
                </Button>
              </Link>
            }
          >
            <Descriptions size="small" column={{ xs: 1, md: 2 }}>
              <Descriptions.Item label="موضوع">{head?.title || '-'}</Descriptions.Item>
              <Descriptions.Item label="شماره پرونده">{head?.fileNumber || '-'}</Descriptions.Item>
              <Descriptions.Item label="وضعیت">
                <Tag color={head?.closed ? 'red' : 'green'}>{head?.closed ? 'بسته' : 'باز'}</Tag>
              </Descriptions.Item>
            </Descriptions>
            {isAdmin && (
              <Button
                type="primary"
                style={{ marginTop: 12 }}
                loading={close.isPending}
                onClick={() => close.mutate(supportId)}
              >
                {head?.closed ? 'باز کردن تیکت' : 'بستن تیکت'}
              </Button>
            )}
          </Card>

          <Card title={<Typography.Title level={5} style={{ margin: 0 }}>پیام‌ها</Typography.Title>}>
            {isFetching && messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 24 }}>
                <Spin />
              </div>
            ) : messages.length === 0 ? (
              <Alert type="info" message="پیامی وجود ندارد" showIcon />
            ) : (
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                {messages.map(m => {
                  const mine = m.userId === mySid
                  const when = String(m.solarCreated || m.solarCreate || '').replace('_', ' ')
                  return (
                    <div
                      key={m.id}
                      style={{ display: 'flex', justifyContent: mine ? 'flex-start' : 'flex-end' }}
                    >
                      <div
                        style={{
                          maxWidth: '80%',
                          background: mine ? '#e6f0ef' : '#f5f5f5',
                          borderRadius: 8,
                          padding: '8px 12px',
                        }}
                      >
                        <div>{m.message}</div>
                        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                          {when}
                        </Typography.Text>
                      </div>
                    </div>
                  )
                })}
              </Space>
            )}
          </Card>
        </Space>
      </Col>

      <Col xs={24} md={8}>
        <Card title={<Typography.Title level={5} style={{ margin: 0 }}>ارسال پیام</Typography.Title>}>
          <Form
            form={form}
            layout="vertical"
            onFinish={v => reply.mutate(v.message, { onSuccess: () => form.resetFields() })}
          >
            <Form.Item label="پیام" name="message" rules={[{ required: true, message: 'نباید خالی باشد' }]}>
              <Input.TextArea rows={4} placeholder="پیام خود را در اینجا بنویسید" />
            </Form.Item>
            <Space wrap>
              <Button type="primary" htmlType="submit" loading={reply.isPending} icon={<SendOutlined />}>
                ارسال پیام
              </Button>
              <SupportFilesDialog supportId={supportId} fileNumber={head?.fileNumber} />
            </Space>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

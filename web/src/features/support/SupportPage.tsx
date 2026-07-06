import { useMemo, useState } from 'react'
import { Button, Card, Col, Form, Input, Radio, Row, Select, Space, Table, Typography } from 'antd'
import { PlusOutlined, ReloadOutlined, SendOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { getRoles } from '@/shared/lib/auth'
import {
  useCreateSupport,
  useReplyTicket,
  useSupports,
  useUsersForSupport,
} from '@/features/support/api/useSupport'
import { supportColumns } from '@/features/support/columns'
import { CreateTicketModal } from '@/features/support/CreateTicketModal'
import type { SupportFilter, SupportTicket } from '@/features/support/types'

const defaultFilter: SupportFilter = { closed: false, userType: 0, supportListTypeEnum: 0 }

// Inline quick-reply shown in an expanded row (old-ui RowReply).
function QuickReply({ supportId, closed }: { supportId: string; closed?: boolean }) {
  const [form] = Form.useForm()
  const reply = useReplyTicket(supportId)
  if (closed) return <Typography.Text type="secondary">این تیکت بسته است</Typography.Text>
  return (
    <Form
      form={form}
      layout="inline"
      style={{ gap: 8, flexWrap: 'wrap' }}
      onFinish={v => reply.mutate(v.message, { onSuccess: () => form.resetFields() })}
    >
      <Form.Item name="message" rules={[{ required: true, message: 'نباید خالی باشد' }]} style={{ flex: 1, minWidth: 260 }}>
        <Input.TextArea rows={2} placeholder="پاسخ خود را اینجا بنویسید" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={reply.isPending} icon={<SendOutlined />}>
          ارسال پاسخ
        </Button>
      </Form.Item>
    </Form>
  )
}

// Support tickets list (old-ui SupportList.js).
export function SupportPage() {
  const role = useMemo(() => getRoles()[0] ?? '', [])
  const isAdmin = getRoles().includes('Administrator')
  const [filter, setFilter] = useState<SupportFilter>(defaultFilter)
  const [createOpen, setCreateOpen] = useState(false)
  const { data, isFetching, refetch } = useSupports(filter)
  const { data: users } = useUsersForSupport()
  const create = useCreateSupport()
  const list = data ?? []

  const stats: Array<[string, number, string?]> = [
    ['همه تیکت‌ها', list.length, undefined],
    ['باز', list.filter(t => !t.closed).length, '#52c41a'],
    ['بسته', list.filter(t => t.closed).length, '#ff4d4f'],
    ['خوانده نشده', list.filter(t => !t.isRead).length, '#1890ff'],
  ]

  const onCreate = (fd: FormData) => create.mutate(fd, { onSuccess: () => setCreateOpen(false) })

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          مدیریت تیکت‌ها
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateOpen(true)}>
          تیکت جدید
        </Button>
      </Row>

      {isAdmin && (
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          {stats.map(([label, n, color]) => (
            <Col xs={12} lg={6} key={label}>
              <Card size="small">
                <Typography.Text type="secondary">{label}</Typography.Text>
                <Typography.Title level={3} style={{ margin: 0, color }}>
                  {n}
                </Typography.Title>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Card size="small" style={{ marginBottom: 16 }}>
        <Space wrap>
          {isAdmin && (
            <Radio.Group
              value={filter.supportListTypeEnum}
              onChange={e => setFilter(f => ({ ...f, supportListTypeEnum: e.target.value }))}
            >
              <Radio.Button value={0}>همه</Radio.Button>
              <Radio.Button value={1}>دریافتی</Radio.Button>
              <Radio.Button value={2}>ارسالی</Radio.Button>
            </Radio.Group>
          )}
          <Radio.Group
            value={filter.closed ? 1 : 0}
            onChange={e => setFilter(f => ({ ...f, closed: e.target.value === 1 }))}
          >
            <Radio.Button value={0}>باز</Radio.Button>
            <Radio.Button value={1}>بسته</Radio.Button>
          </Radio.Group>
          {isAdmin && (
            <Select
              showSearch
              allowClear
              placeholder="کاربر"
              style={{ minWidth: 200 }}
              optionFilterProp="label"
              options={(users ?? []).map(u => ({
                value: u.id,
                label: `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() || u.name || 'بدون نام',
              }))}
              onChange={val => setFilter(f => ({ ...f, SearchUserId: val || undefined }))}
            />
          )}
          <Input.Search
            placeholder="شماره تیکت"
            allowClear
            style={{ width: 200 }}
            onSearch={val => setFilter(f => ({ ...f, ticketNumber: val || undefined }))}
          />
          <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
            به‌روزرسانی
          </Button>
        </Space>
      </Card>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<SupportTicket>
          size="middle"
          rowKey="id"
          loading={isFetching}
          columns={supportColumns(role)}
          dataSource={list}
          scroll={{ x: 700 }}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (t, r) => `${r[0]}-${r[1]} از ${t} تیکت`,
          }}
          expandable={{
            rowExpandable: () => true,
            expandedRowRender: r => (
              <div style={{ padding: 12 }}>
                <QuickReply supportId={r.id} closed={r.closed} />
              </div>
            ),
          }}
        />
      </Card>

      <CreateTicketModal
        open={createOpen}
        loading={create.isPending}
        onCancel={() => setCreateOpen(false)}
        onSubmit={onCreate}
      />
    </motion.div>
  )
}

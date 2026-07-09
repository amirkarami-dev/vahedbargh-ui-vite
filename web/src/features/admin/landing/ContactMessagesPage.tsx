import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Empty,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
} from 'antd'
import { CheckOutlined, DeleteOutlined, EyeOutlined, UndoOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import {
  useContactMessages,
  useDeleteContactMessage,
  useMarkContactRead,
} from '@/features/admin/landing/api/useAdminLanding'
import { toPersianNumber } from '@/features/public/landing/lib/persianNumber'
import type { ContactMessage } from '@/features/public/landing/types'

function formatDate(iso: string): string {
  // Show a compact date/time; server stores UTC ISO.
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '-'
  const s = d.toLocaleString('fa-IR', { dateStyle: 'short', timeStyle: 'short' })
  return s
}

export function ContactMessagesPage() {
  const { data, isFetching } = useContactMessages()
  const mark = useMarkContactRead()
  const del = useDeleteContactMessage()
  const [viewing, setViewing] = useState<ContactMessage | null>(null)

  const openView = (m: ContactMessage) => {
    setViewing(m)
    if (!m.isRead) mark.mutate({ id: m.id, isRead: true })
  }

  const columns: TableColumnsType<ContactMessage> = [
    {
      title: '',
      dataIndex: 'isRead',
      key: 'unread',
      width: 36,
      render: (isRead: boolean) => (isRead ? null : <Badge status="processing" />),
    },
    { title: 'فرستنده', dataIndex: 'name', key: 'name', render: (v, r) => (r.isRead ? v : <strong>{v}</strong>) },
    { title: 'موضوع', dataIndex: 'subject', key: 'subject', ellipsis: true, render: v => v || '-' },
    { title: 'تماس', dataIndex: 'mobile', key: 'mobile', width: 140, render: (v, r) => v || r.email || '-' },
    { title: 'تاریخ', dataIndex: 'createdAt', key: 'createdAt', width: 150, render: v => toPersianNumber(formatDate(v)) },
    {
      title: 'عملیات',
      key: 'actions',
      width: 160,
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => openView(r)} />
          <Button
            size="small"
            icon={r.isRead ? <UndoOutlined /> : <CheckOutlined />}
            title={r.isRead ? 'علامت‌گذاری نخوانده' : 'علامت‌گذاری خوانده‌شده'}
            onClick={() => mark.mutate({ id: r.id, isRead: !r.isRead })}
          />
          <Popconfirm
            title="حذف پیام"
            description="آیا مطمئنید؟"
            okText="بله"
            cancelText="خیر"
            onConfirm={() => del.mutate(r.id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />} loading={del.isPending} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const unread = (data ?? []).filter(m => !m.isRead).length

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Space style={{ marginBottom: 16 }} align="center">
        <Typography.Title level={4} style={{ margin: 0 }}>
          پیام‌های تماس
        </Typography.Title>
        {unread > 0 && <Tag color="blue">{toPersianNumber(unread)} خوانده‌نشده</Tag>}
      </Space>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<ContactMessage>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={columns}
          dataSource={data ?? []}
          locale={{ emptyText: <Empty description="پیامی وجود ندارد" /> }}
          pagination={{ pageSize: 20, showTotal: t => `کل: ${t} پیام` }}
        />
      </Card>

      <Modal
        title="پیام تماس"
        open={!!viewing}
        onCancel={() => setViewing(null)}
        footer={<Button onClick={() => setViewing(null)}>بستن</Button>}
        width={640}
      >
        {viewing && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="نام">{viewing.name}</Descriptions.Item>
            <Descriptions.Item label="ایمیل">{viewing.email || '-'}</Descriptions.Item>
            <Descriptions.Item label="موبایل">{viewing.mobile || '-'}</Descriptions.Item>
            <Descriptions.Item label="موضوع">{viewing.subject || '-'}</Descriptions.Item>
            <Descriptions.Item label="تاریخ">{toPersianNumber(formatDate(viewing.createdAt))}</Descriptions.Item>
            <Descriptions.Item label="پیام">
              <div style={{ whiteSpace: 'pre-wrap' }}>{viewing.message}</div>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </motion.div>
  )
}

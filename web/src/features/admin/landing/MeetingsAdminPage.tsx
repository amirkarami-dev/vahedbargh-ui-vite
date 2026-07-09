import { useState } from 'react'
import { Button, Card, Empty, Popconfirm, Space, Table, Tag, Typography, type TableColumnsType } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useAdminMeetings, useDeleteMeeting } from '@/features/admin/landing/api/useAdminLanding'
import { MeetingFormModal } from '@/features/admin/landing/MeetingFormModal'
import { toPersianNumber } from '@/features/public/landing/lib/persianNumber'
import type { Meeting } from '@/features/public/landing/types'

export function MeetingsAdminPage() {
  const { data, isFetching } = useAdminMeetings()
  const del = useDeleteMeeting()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Meeting | null>(null)

  const columns: TableColumnsType<Meeting> = [
    { title: 'شماره', dataIndex: 'sessionNumber', key: 'sessionNumber', width: 90, render: v => toPersianNumber(v) },
    { title: 'موضوع', dataIndex: 'subject', key: 'subject', ellipsis: true },
    { title: 'تاریخ', dataIndex: 'jalaliDate', key: 'jalaliDate', width: 120, render: v => v || '-' },
    { title: 'وضعیت', dataIndex: 'status', key: 'status', width: 140, render: v => (v ? <Tag>{v}</Tag> : '-') },
    {
      title: 'مصوبات',
      key: 'resolutions',
      width: 90,
      render: (_, r) => toPersianNumber(r.resolutions?.length ?? 0),
    },
    {
      title: 'عملیات',
      key: 'actions',
      width: 120,
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setEditing(r); setOpen(true) }} />
          <Popconfirm
            title="حذف جلسه"
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

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          مدیریت جلسات
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); setOpen(true) }}>
          جلسه جدید
        </Button>
      </Space>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<Meeting>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={columns}
          dataSource={data ?? []}
          locale={{ emptyText: <Empty description="جلسه‌ای یافت نشد" /> }}
          pagination={{ pageSize: 20, showTotal: t => `کل: ${t} جلسه` }}
        />
      </Card>

      <MeetingFormModal open={open} editing={editing} onClose={() => setOpen(false)} />
    </motion.div>
  )
}

import { useState } from 'react'
import { Button, Card, Empty, Popconfirm, Space, Table, Tag, Typography, type TableColumnsType } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useAdminAnnouncements, useDeleteAnnouncement } from '@/features/admin/landing/api/useAdminLanding'
import { AnnouncementFormModal } from '@/features/admin/landing/AnnouncementFormModal'
import { PRIORITY_LABELS } from '@/features/public/landing/lib/constants'
import type { Announcement } from '@/features/public/landing/types'

const priorityColor: Record<string, string> = { urgent: 'red', important: 'gold', info: 'blue', news: 'default' }

export function AnnouncementsAdminPage() {
  const { data, isFetching } = useAdminAnnouncements()
  const del = useDeleteAnnouncement()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Announcement | null>(null)

  const columns: TableColumnsType<Announcement> = [
    { title: 'عنوان', dataIndex: 'title', key: 'title', ellipsis: true },
    { title: 'دسته', dataIndex: 'category', key: 'category', render: v => v || '-' },
    {
      title: 'اولویت',
      dataIndex: 'priority',
      key: 'priority',
      width: 110,
      render: (p: string) => <Tag color={priorityColor[p] ?? 'default'}>{PRIORITY_LABELS[p] ?? p}</Tag>,
    },
    { title: 'تاریخ', dataIndex: 'jalaliDate', key: 'jalaliDate', width: 120, render: v => v || '-' },
    {
      title: 'ویژه',
      dataIndex: 'featured',
      key: 'featured',
      width: 80,
      render: (f: boolean) => (f ? <Tag color="green">ویژه</Tag> : '-'),
    },
    {
      title: 'عملیات',
      key: 'actions',
      width: 120,
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setEditing(r); setOpen(true) }} />
          <Popconfirm
            title="حذف اطلاعیه"
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
          مدیریت اطلاعیه‌ها
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); setOpen(true) }}>
          اطلاعیه جدید
        </Button>
      </Space>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<Announcement>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={columns}
          dataSource={data ?? []}
          locale={{ emptyText: <Empty description="اطلاعیه‌ای یافت نشد" /> }}
          pagination={{ pageSize: 20, showTotal: t => `کل: ${t} اطلاعیه` }}
        />
      </Card>

      <AnnouncementFormModal open={open} editing={editing} onClose={() => setOpen(false)} />
    </motion.div>
  )
}

import { useState } from 'react'
import { Button, Card, Empty, Popconfirm, Space, Table, Tag, Typography, type TableColumnsType } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useAdminStats, useDeleteStat } from '@/features/admin/landing/api/useAdminLanding'
import { StatFormModal } from '@/features/admin/landing/StatFormModal'
import { toPersianNumber } from '@/features/public/landing/lib/persianNumber'
import type { StatItem } from '@/features/public/landing/types'

export function StatsAdminPage() {
  const { data, isFetching } = useAdminStats()
  const del = useDeleteStat()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<StatItem | null>(null)

  const rows = [...(data ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  const columns: TableColumnsType<StatItem> = [
    { title: 'ترتیب', dataIndex: 'sortOrder', key: 'sortOrder', width: 80, render: v => toPersianNumber(v ?? 0) },
    { title: 'عنوان', dataIndex: 'label', key: 'label' },
    {
      title: 'مقدار',
      key: 'value',
      width: 140,
      render: (_, r) => `${toPersianNumber((r.value ?? 0).toLocaleString('en-US'))}${r.suffix ?? ''}`,
    },
    { title: 'آیکون', dataIndex: 'iconName', key: 'iconName', width: 140, render: v => <Tag>{v || '-'}</Tag> },
    {
      title: 'عملیات',
      key: 'actions',
      width: 120,
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setEditing(r); setOpen(true) }} />
          <Popconfirm
            title="حذف آمار"
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
          مدیریت آمار صفحه اصلی
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); setOpen(true) }}>
          آمار جدید
        </Button>
      </Space>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<StatItem>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={columns}
          dataSource={rows}
          locale={{ emptyText: <Empty description="آماری یافت نشد" /> }}
          pagination={false}
        />
      </Card>

      <StatFormModal open={open} editing={editing} onClose={() => setOpen(false)} />
    </motion.div>
  )
}

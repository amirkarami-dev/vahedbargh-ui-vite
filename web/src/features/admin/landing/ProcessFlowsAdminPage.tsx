import { useState } from 'react'
import { Button, Card, Empty, Popconfirm, Space, Table, Tag, Typography, type TableColumnsType } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useAdminProcessFlows, useDeleteProcessFlow } from '@/features/admin/landing/api/useAdminLanding'
import { ProcessFlowFormModal } from '@/features/admin/landing/ProcessFlowFormModal'
import { toPersianNumber } from '@/features/public/landing/lib/persianNumber'
import type { AdminProcessFlow } from '@/features/admin/landing/api/adminLandingApi'

export function ProcessFlowsAdminPage() {
  const { data, isFetching } = useAdminProcessFlows()
  const del = useDeleteProcessFlow()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<AdminProcessFlow | null>(null)

  const rows = [...(data ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  const columns: TableColumnsType<AdminProcessFlow> = [
    { title: 'ترتیب', dataIndex: 'sortOrder', key: 'sortOrder', width: 80, render: v => toPersianNumber(v ?? 0) },
    {
      title: 'عنوان',
      key: 'title',
      render: (_, r) => (
        <Space>
          <span style={{ fontSize: 18 }}>{r.icon}</span>
          <span style={{ fontWeight: 600 }}>{r.title}</span>
        </Space>
      ),
    },
    { title: 'کلید', dataIndex: 'key', key: 'key', width: 140, render: v => <Tag>{v}</Tag> },
    { title: 'زیرعنوان', dataIndex: 'subtitle', key: 'subtitle', ellipsis: true, render: v => v || '-' },
    {
      title: 'مراحل',
      key: 'steps',
      width: 90,
      render: (_, r) => toPersianNumber(r.steps?.length ?? 0),
    },
    {
      title: 'عملیات',
      key: 'actions',
      width: 120,
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setEditing(r); setOpen(true) }} />
          <Popconfirm
            title="حذف فرآیند"
            description="این فرآیند و همهٔ مراحلش حذف می‌شود. مطمئنید؟"
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
          مدیریت فرآیندها
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); setOpen(true) }}>
          فرآیند جدید
        </Button>
      </Space>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<AdminProcessFlow>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={columns}
          dataSource={rows}
          locale={{ emptyText: <Empty description="فرآیندی یافت نشد" /> }}
          pagination={false}
        />
      </Card>

      <ProcessFlowFormModal open={open} editing={editing} onClose={() => setOpen(false)} />
    </motion.div>
  )
}

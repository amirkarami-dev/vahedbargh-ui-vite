import { useState } from 'react'
import { Button, Card, Empty, Popconfirm, Space, Table, Tag, Typography, type TableColumnsType } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useAdminDocuments, useDeleteDocument } from '@/features/admin/landing/api/useAdminLanding'
import { DocumentFormModal } from '@/features/admin/landing/DocumentFormModal'
import { toPersianNumber } from '@/features/public/landing/lib/persianNumber'
import type { DocumentItem } from '@/features/public/landing/types'

export function DocumentsAdminPage() {
  const { data, isFetching } = useAdminDocuments()
  const del = useDeleteDocument()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<DocumentItem | null>(null)

  const columns: TableColumnsType<DocumentItem> = [
    { title: 'عنوان', dataIndex: 'title', key: 'title', ellipsis: true },
    { title: 'دسته', dataIndex: 'category', key: 'category', width: 140, render: v => <Tag>{v}</Tag> },
    { title: 'نسخه', dataIndex: 'version', key: 'version', width: 90, render: v => v || '-' },
    { title: 'تاریخ', dataIndex: 'jalaliDate', key: 'jalaliDate', width: 120, render: v => v || '-' },
    {
      title: 'دانلود',
      dataIndex: 'downloadCount',
      key: 'downloadCount',
      width: 90,
      render: (v: number) => toPersianNumber(v ?? 0),
    },
    {
      title: 'عملیات',
      key: 'actions',
      width: 120,
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => { setEditing(r); setOpen(true) }} />
          <Popconfirm
            title="حذف سند"
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
          مدیریت آرشیو اسناد
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); setOpen(true) }}>
          سند جدید
        </Button>
      </Space>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<DocumentItem>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={columns}
          dataSource={data ?? []}
          locale={{ emptyText: <Empty description="سندی یافت نشد" /> }}
          pagination={{ pageSize: 20, showTotal: t => `کل: ${t} سند` }}
        />
      </Card>

      <DocumentFormModal open={open} editing={editing} onClose={() => setOpen(false)} />
    </motion.div>
  )
}

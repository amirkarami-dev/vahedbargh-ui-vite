import { useMemo, useState } from 'react'
import {
  Button,
  Card,
  Empty,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  type TableColumnsType,
} from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useDeleteUser, useUsers } from '@/features/users/api/useUsers'
import { UserFormModal } from '@/features/users/UserFormModal'
import type { ClientUser } from '@/features/users/types'

// Admin user management (old-ui Users). List + add/edit/delete.
export function UsersPage() {
  const { data, isFetching } = useUsers()
  const del = useDeleteUser()
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<ClientUser | null>(null)

  const rows = useMemo(() => {
    const list = data ?? []
    const q = search.trim().toLowerCase()
    if (!q) return list
    return list.filter(u =>
      [u.email, u.phoneNumber, u.firstName, u.lastName, u.nickName, u.role]
        .some(v => (v ?? '').toLowerCase().includes(q)),
    )
  }, [data, search])

  const openAdd = () => {
    setEditing(null)
    setOpen(true)
  }
  const openEdit = (u: ClientUser) => {
    setEditing(u)
    setOpen(true)
  }

  const columns: TableColumnsType<ClientUser> = [
    { title: 'ایمیل', dataIndex: 'email', key: 'email' },
    {
      title: 'نام',
      key: 'name',
      render: (_, u) => [u.firstName, u.lastName].filter(Boolean).join(' ') || '-',
    },
    { title: 'شماره تماس', dataIndex: 'phoneNumber', key: 'phoneNumber', render: v => v || '-' },
    { title: 'نقش', dataIndex: 'role', key: 'role', render: v => <Tag>{v || '-'}</Tag> },
    {
      title: 'وضعیت',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => <Tag color={active ? 'green' : 'red'}>{active ? 'فعال' : 'غیرفعال'}</Tag>,
    },
    {
      title: 'عملیات',
      key: 'actions',
      width: 140,
      render: (_, u) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(u)} />
          <Popconfirm
            title="حذف کاربر"
            description="آیا مطمئنید؟"
            okText="بله"
            cancelText="خیر"
            onConfirm={() => del.mutate(u.id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />} loading={del.isPending} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>مدیریت کاربران</Typography.Title>

      <Card size="small" styles={{ body: { padding: 12 } }} style={{ marginBottom: 16 }}>
        <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
          <Input.Search
            allowClear
            placeholder="جستجوی ایمیل / نام / نقش..."
            style={{ maxWidth: 320 }}
            onChange={e => setSearch(e.target.value)}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
            کاربر جدید
          </Button>
        </Space>
      </Card>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<ClientUser>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={columns}
          dataSource={rows}
          locale={{ emptyText: <Empty description="کاربری یافت نشد" /> }}
          pagination={{ pageSize: 20, showSizeChanger: true, showTotal: t => `کل: ${t} کاربر` }}
        />
      </Card>

      <UserFormModal open={open} editing={editing} onClose={() => setOpen(false)} />
    </motion.div>
  )
}

import { Button, Popconfirm, Switch } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDeleteEpp, useEppUpdateIsMain } from '@/features/electProjectProcess/api/useElectProjectProcess'
import type { EppRow } from '@/features/electProjectProcess/types'

// Delete an assignment (old-ui renderDeleteButton). Level-4 rows can't be deleted.
export function DeleteEppButton({ row }: { row: EppRow }) {
  const del = useDeleteEpp()
  if (row.projectLevel === 4) return <span>-</span>
  return (
    <Popconfirm title="حذف تخصیص" description="مطمئنید؟" okText="بله" cancelText="خیر" onConfirm={() => del.mutate(row.id)}>
      <Button size="small" danger icon={<DeleteOutlined />} loading={del.isPending} />
    </Popconfirm>
  )
}

// Main/sub toggle (old-ui renderIsMainSwitch). Enabled only for sub-projects.
export function MainSwitch({ row }: { row: EppRow }) {
  const update = useEppUpdateIsMain()
  return (
    <Switch
      checked={row.isMain}
      disabled={!row.electProject?.parentProject || update.isPending}
      checkedChildren="اصلی"
      unCheckedChildren="فرعی"
      onChange={checked => update.mutate({ id: row.id, isMain: checked })}
    />
  )
}

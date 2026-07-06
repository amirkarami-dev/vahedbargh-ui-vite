import { useState } from 'react'
import { Button, Modal, Table, Tag, type TableColumnsType } from 'antd'
import type { ElectProject, PanelChecklistRow } from '@/features/electProjects/types'

type Row = PanelChecklistRow & { key: string | number }

const columns: TableColumnsType<Row> = [
  {
    title: 'شرح بازرسی',
    key: 'inspectionDesEnum',
    width: '15rem',
    render: (_, r) => (r.children ? <div dir="rtl">{r.inspectionDesEnum}</div> : ''),
  },
  { title: 'تاریخ بازدید', dataIndex: 'solarChecked', key: 'solarChecked', width: '7rem' },
  { title: 'شرح بازدید', dataIndex: 'resultDes', key: 'resultDes' },
  {
    title: 'وضعیت تایید',
    key: 'isComplete',
    width: '7rem',
    render: (_, r) => {
      const complete = r.children
        ? r.children.some(c => c.isComplete === true)
        : !!r.isComplete
      return <Tag color={complete ? 'green' : 'red'}>{complete ? 'کامل شده' : 'نقص دارد'}</Tag>
    },
  },
]

// old-ui CheckListEdit — read-only checklist view for the panel maker (no upsert
// action exists in this role, so edit/delete are omitted). Supports nested rows.
export function ChecklistModal({ project }: { project: ElectProject }) {
  const [open, setOpen] = useState(false)
  const rows = project.checkListForms ?? []

  const data: Row[] = rows.map((r, i) => ({
    ...r,
    key: r.key ?? r.id ?? i,
    children: r.children?.map((c, j) => ({ ...c, key: c.key ?? c.id ?? `${i}-${j}` })),
  }))

  return (
    <>
      <Button type="primary" size="small" onClick={() => setOpen(true)}>
        نمایش
      </Button>
      <Modal
        title={`چک لیست بازدید: ${project.landlordName ?? ''}`}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width="80%"
        footer={null}
      >
        <Table<Row>
          size="small"
          columns={columns}
          dataSource={data}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          scroll={{ y: 370, x: 350 }}
          locale={{ emptyText: <Tag>چک لیستی ثبت نشده</Tag> }}
        />
      </Modal>
    </>
  )
}

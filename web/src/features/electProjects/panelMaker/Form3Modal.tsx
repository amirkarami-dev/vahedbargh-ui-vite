import { useState } from 'react'
import { Button, Modal, Table, Tag, type TableColumnsType } from 'antd'
import type { ElectProject, PanelCommentRow } from '@/features/electProjects/types'

// old-ui BranchingTypeEnum / FazNumberEnum.
const BRANCHING = ['خانگی', 'عمومی', 'صنعتی', 'سایر مصارف', 'انشعاب موجود در محل']
const FAZ = ['تک فاز', 'سه فاز', 'انشعاب دائم', 'انشعاب موقت']

type Row = PanelCommentRow & { key?: string | number; isTotal?: boolean }

const columns: TableColumnsType<Row> = [
  { title: 'نوع انشعاب', key: 'branching', render: (_, r) => (r.isTotal ? <b>مجموع کل</b> : BRANCHING[r.branchingTypeEnum ?? -1] ?? '') },
  { title: 'نوع کنتور', key: 'faz', render: (_, r) => (r.isTotal ? '' : FAZ[r.fazNumberEnum ?? -1] ?? '') },
  { title: 'تعداد انشعاب', dataIndex: 'branchingCount', key: 'branchingCount' },
  { title: 'جریان مورد نیاز', dataIndex: 'ampere', key: 'ampere' },
  { title: 'توان مورد نیاز', dataIndex: 'power', key: 'power' },
  { title: 'مجموع توان مورد نیاز', dataIndex: 'powerSum', key: 'powerSum' },
  { title: 'توضیحات', dataIndex: 'des', key: 'des' },
]

// old-ui CommentEdit — read-only view of form#3 with a column-totals row.
export function Form3Modal({ project }: { project: ElectProject }) {
  const [open, setOpen] = useState(false)
  const rows = project.commentEngForms ?? []

  const total = rows.reduce(
    (acc: { branchingCount: number; ampere: number; power: number; powerSum: number }, r) => ({
      branchingCount: acc.branchingCount + (r.branchingCount ?? 0),
      ampere: acc.ampere + (r.ampere ?? 0),
      power: acc.power + (r.power ?? 0),
      powerSum: acc.powerSum + (r.powerSum ?? 0),
    }),
    { branchingCount: 0, ampere: 0, power: 0, powerSum: 0 },
  )

  const data: Row[] = [
    ...rows.map((r, i) => ({ ...r, key: r.id ?? i })),
    { key: 'total', isTotal: true, ...total },
  ]

  return (
    <>
      <Button type="primary" size="small" onClick={() => setOpen(true)}>
        نمایش
      </Button>
      <Modal title="فرم شماره 3" centered open={open} onCancel={() => setOpen(false)} width="70%" footer={null}>
        <Table<Row>
          size="small"
          columns={columns}
          dataSource={data}
          rowKey="key"
          pagination={false}
          scroll={{ y: 480, x: 700 }}
          locale={{ emptyText: <Tag>اطلاعاتی ثبت نشده</Tag> }}
        />
      </Modal>
    </>
  )
}

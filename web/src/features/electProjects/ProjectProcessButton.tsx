import { useState } from 'react'
import { Button, Card, Modal, Popover, Table, Typography, type TableColumnsType } from 'antd'
import type { ElectProject, ProjectProcessRow } from '@/features/electProjects/types'

const columns: TableColumnsType<ProjectProcessRow> = [
  {
    title: 'توضیحات کارشناس',
    key: 'description',
    align: 'center',
    render: (_, r) => (
      <Popover
        trigger="click"
        content={<div style={{ maxWidth: 300 }}>{r.description || 'نوشته نشده'}</div>}
      >
        <Button size="small">نظر کارشناس</Button>
      </Popover>
    ),
  },
  { title: 'نام و نام خانوادگی', dataIndex: 'engName', key: 'engName', align: 'center' },
  { title: 'شماره موبایل', dataIndex: 'cellPhone', key: 'cellPhone', align: 'center' },
  { title: 'تاریخ تخصیص', dataIndex: 'solarDateDeliverEngineer', key: 'deliver', align: 'center' },
  { title: 'تاریخ انجام', dataIndex: 'solarDateDeliverOffice', key: 'office', align: 'center' },
  { title: 'مرحله پرونده', dataIndex: 'projectLevelName', key: 'level', align: 'center' },
  { title: 'وضعیت', dataIndex: 'inspectionStatusName', key: 'status', align: 'center' },
  {
    title: 'نقص دارد',
    dataIndex: 'defect',
    key: 'defect',
    align: 'center',
    render: (d: boolean) => (d ? 'بله' : 'خیر'),
  },
]

// Read-only viewer of a project's engineer assignments (old-ui ProjectProcess.js).
export function ProjectProcessButton({ project }: { project: ElectProject }) {
  const [open, setOpen] = useState(false)
  const rows = project.electProjectProcessViewModel ?? []

  return (
    <>
      <Button
        type="primary"
        size="small"
        disabled={rows.length === 0}
        onClick={() => setOpen(true)}
      >
        کارشناس
      </Button>
      <Modal
        title={`تخصیص مربوط به پرونده: ${project.fileNumber}`}
        open={open}
        onCancel={() => setOpen(false)}
        width={900}
        footer={null}
        destroyOnClose
      >
        <Typography.Paragraph>لیست تخصیص‌ها</Typography.Paragraph>
        <Card>
          <Table<ProjectProcessRow>
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={rows}
            pagination={false}
          />
        </Card>
      </Modal>
    </>
  )
}

import { Space, Tag, type TableColumnsType } from 'antd'
import { AcceptButton } from '@/features/electProjectProcess/AcceptButton'
import { EngChangeDialog } from '@/features/electProjectProcess/EngChangeDialog'
import { DeleteEppButton, MainSwitch } from '@/features/electProjectProcess/processListActions'
import type { EppRow } from '@/features/electProjectProcess/types'

// Admin/Section assignment-management columns (old-ui ElectProjectProcessList).
export function processListColumns(page: number, pageSize: number, isAdmin: boolean): TableColumnsType<EppRow> {
  const cols: TableColumnsType<EppRow> = [
    { title: '#', key: 'index', width: 50, render: (_, __, i) => (page - 1) * pageSize + i + 1 },
    { title: 'حذف', key: 'delete', width: 70, render: (_, r) => <DeleteEppButton row={r} /> },
    {
      title: 'قبول/تغییر کارشناس',
      key: 'accept',
      width: 230,
      render: (_, r) => (
        <Space wrap size={4}>
          <AcceptButton row={r} />
          <EngChangeDialog row={r} />
        </Space>
      ),
    },
    { title: 'شماره پرونده', key: 'fileNumber', width: 120, dataIndex: 'fileNumber' },
    { title: 'تاریخ تخصیص', key: 'deliver', width: 120, dataIndex: 'solarDateDeliverEngineer' },
    { title: 'طبقه', key: 'floor', width: 60, dataIndex: 'numberOfFloor' },
    { title: 'کارشناس', key: 'enName', width: 120, dataIndex: 'enName' },
    { title: 'مالک', key: 'owner', width: 120, dataIndex: 'landLordName' },
    { title: 'مرحله', key: 'level', width: 130, dataIndex: 'projectLevelName' },
  ]

  if (isAdmin) {
    cols.push({ title: 'اصلی/فرعی', key: 'isMain', width: 110, render: (_, r) => <MainSwitch row={r} /> })
  }

  cols.push(
    {
      title: 'نیاز به تابلو',
      key: 'panelNeed',
      width: 130,
      render: (_, r) =>
        r.electProject?.panelNeed
          ? `دارد - ${r.electProject?.panelMakerSubmit ? 'تایید شده' : 'تایید نشده'}`
          : 'ندارد',
    },
    { title: 'تاریخ تایید', key: 'office', width: 110, dataIndex: 'solarDateDeliverOffice' },
    {
      title: 'وضعیت',
      key: 'status',
      width: 100,
      render: (_, r) => <Tag color={r.inspectionStatus === 1 ? 'green' : 'red'}>{r.inspectionStatusName}</Tag>,
    },
  )

  return cols
}

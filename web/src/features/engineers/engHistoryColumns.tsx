import { Button, Tag, type TableColumnsType } from 'antd'
import { EditFilled } from '@ant-design/icons'
import type { EngHistory } from '@/features/engineers/types'

// Ported from old-ui eng-history-columns.js.
export function engHistoryColumns(onEdit: (r: EngHistory) => void): TableColumnsType<EngHistory> {
  return [
    {
      title: 'ویرایش',
      key: 'edit',
      render: (_, r) => (
        <Button type="link" icon={<EditFilled />} onClick={() => onEdit(r)}>
          ویرایش
        </Button>
      ),
    },
    { title: 'شماره پروانه', key: 'workPermitNum', dataIndex: 'workPermitNum' },
    { title: 'نوع مجوز', key: 'workPermitTypeName', dataIndex: 'workPermitTypeName' },
    { title: 'تاریخ اخذ', key: 'solarIssueDate', dataIndex: 'solarIssueDate' },
    { title: 'تاریخ اعتبار', key: 'solarValidityDate', dataIndex: 'solarValidityDate' },
    {
      title: 'اجازه کار',
      key: 'workPermission',
      width: '6rem',
      render: (_, r) => (
        <Tag color={r.workPermission ? 'green' : 'red'}>{r.workPermission ? 'دارد' : 'ندارد'}</Tag>
      ),
    },
    { title: 'پایه', key: 'engineerGradeTypeName', dataIndex: 'engineerGradeTypeName' },
    {
      title: 'نظارت',
      key: 'is2p',
      width: '6rem',
      render: (_, r) => <Tag color={r.is2p ? 'green' : 'red'}>{r.is2p ? 'دارد' : 'ندارد'}</Tag>,
    },
  ]
}

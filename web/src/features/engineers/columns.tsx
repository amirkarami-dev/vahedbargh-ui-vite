import { Space, Tag, Tooltip, type TableColumnsType } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import type { Engineer } from '@/features/engineers/types'

// Boolean status tag: green+check when true, red+cross when false (icon + label,
// never color alone — accessibility). Ported from old-ui columns.js.
const boolTag = (cond: boolean | string | null | undefined, label: string, key?: string) => (
  <Tag
    key={key}
    color={cond ? 'green' : 'red'}
    icon={cond ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
  >
    {label}
  </Tag>
)

const hasFile = (row: Engineer, code: string) => (row.engFiles ?? []).some(x => x.name === code)

// Column titles kept identical to old-ui. Action column (edit/history/files) and
// the city sub-label (returnCityName) are deferred — see EngineersPage TODO.
export function engineerColumns(): TableColumnsType<Engineer> {
  return [
    {
      title: 'نام و نام خانوادگی',
      key: 'fullName',
      width: 160,
      render: (_, row) => row.fullName,
    },
    {
      title: <Tooltip title="مدارک آپلود شده">مدارک پایه</Tooltip>,
      key: 'docsLicense',
      width: 130,
      render: (_, row) => (
        <Space size={4} wrap>
          {boolTag(hasFile(row, 'F3'), 'پروانه', 'f3')}
          {boolTag(hasFile(row, 'F2'), 'امضاء', 'f2')}
        </Space>
      ),
    },
    {
      title: 'مدارک مجوز',
      key: 'docsCerts',
      width: 170,
      render: (_, row) => (
        <Space size={4} wrap>
          {boolTag(hasFile(row, 'F7'), 'بازرسی', 'f7')}
          {boolTag(hasFile(row, 'F5'), 'ارت', 'f5')}
          {boolTag(hasFile(row, 'F4'), 'تست', 'f4')}
          {boolTag(hasFile(row, 'F6'), 'فیبر', 'f6')}
        </Space>
      ),
    },
    {
      title: 'مجوزها',
      key: 'permits',
      width: 170,
      render: (_, row) => (
        <Space size={4} wrap>
          {boolTag(row.certOfInspection, 'بازرسی', 'ci')}
          {boolTag(row.certOfEarth, 'ارت', 'ce')}
          {boolTag(row.certOfTest, 'تست', 'ct')}
          {boolTag(row.certOfFiber, 'فیبر', 'cf')}
        </Space>
      ),
    },
    {
      title: 'کاربری / پایه / موبایل',
      key: 'userInfo',
      width: 200,
      render: (_, row) => (
        <Space size={4} wrap>
          <Tag>{row.userName}</Tag>
          <Tag color="blue">{row.engineerGradeTypeName}</Tag>
          <Tag>{row.cellPhone}</Tag>
        </Space>
      ),
    },
    {
      title: 'تیک ۱ درصد',
      key: 'has1Percent',
      width: 110,
      render: (_, row) => boolTag(row.has1Percent, row.has1Percent ? 'دارد' : 'ندارد'),
    },
    {
      title: 'افزایش درصدی',
      key: 'hasQuarterIncrease',
      width: 120,
      render: (_, row) =>
        boolTag(row.hasQuarterIncrease, row.hasQuarterIncrease ? 'دارد' : 'ندارد'),
    },
    {
      title: 'عضویت / اعتبار',
      key: 'membership',
      width: 220,
      render: (_, row) => (
        <Space size={4} wrap>
          <Tag color={row.solarMembershipDate ? 'green' : 'red'}>
            {row.solarMembershipDate ? row.solarMembershipDate : 'عضویت ندارد'}
          </Tag>
          <Tag color={row.expiredDateWork ? 'red' : 'green'}>{row.solarValidityDate}</Tag>
          {boolTag(!row.inactive, 'وضعیت فعال', 'active')}
          {boolTag(!row.bankAccountBlocked, 'وضعیت حساب', 'bank')}
        </Space>
      ),
    },
  ]
}

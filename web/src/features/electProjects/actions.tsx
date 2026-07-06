import { Button, Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import {
  useAmountSms,
  useDeleteElectProject,
  useSubmitByAdmin,
} from '@/features/electProjects/api/useElectProjectActions'
import type { ElectProject } from '@/features/electProjects/types'

const rial = (n?: number) => `${Math.abs(Math.round(Number(n ?? 0))).toLocaleString('en-US')}`

// Balance tag; if negative, click → SMS the landlord to pay (smsTypeEnum 0).
export function AmountSmsTag({ project }: { project: ElectProject }) {
  const sms = useAmountSms()
  const balance = Number(project.projectBalance ?? 0)
  const label = rial(project.projectBalance)
  if (balance < 0) {
    return (
      <Popconfirm
        title={`ارسال پیامک واریز به مبلغ ${label} ریال`}
        okText="بله"
        cancelText="خیر"
        onConfirm={() =>
          sms.mutate({ electProjectId: project.id, amount: Math.abs(balance), smsTypeEnum: 0 })
        }
      >
        <Tag color="red" style={{ cursor: 'pointer' }}>
          {label}
        </Tag>
      </Popconfirm>
    )
  }
  return <Tag color="green">{label}</Tag>
}

// SMS the landlord to upload documents (smsTypeEnum 1).
export function DocsSmsButton({ project }: { project: ElectProject }) {
  const sms = useAmountSms()
  return (
    <Popconfirm
      title="ارسال پیامک جهت آپلود مدارک توسط مالک"
      okText="بله"
      cancelText="خیر"
      onConfirm={() => sms.mutate({ electProjectId: project.id, amount: 0, smsTypeEnum: 1 })}
    >
      <Tag style={{ cursor: 'pointer' }}>sms مدارک</Tag>
    </Popconfirm>
  )
}

export function SubmitToElectButton({ project }: { project: ElectProject }) {
  const submit = useSubmitByAdmin()
  const can = project.projectLevelEnum === 4 || project.electProjectStatusEnum === 6
  if (!can) return <span>تایید نشده</span>
  return (
    <Popconfirm
      title="ارسال پرونده"
      description="بعد از تایید، پرونده برای شرکت برق ارسال می‌شود. مطمئنید؟"
      okText="بله"
      cancelText="خیر"
      disabled={project.parentId !== null}
      onConfirm={() => submit.mutate(project.id)}
    >
      <Button size="small" loading={submit.isPending}>
        ارسال
      </Button>
    </Popconfirm>
  )
}

export function DeleteProjectButton({ project }: { project: ElectProject }) {
  const del = useDeleteElectProject()
  if (project.isBigProject) {
    return (
      <Space size={4} wrap>
        <Tag color="red">پروژه بزرگ</Tag>
        <Tag color="blue">{project.amountPerArea?.toLocaleString()}</Tag>
      </Space>
    )
  }
  const payType = project.invoice?.invoicePayType
  const canDelete = project.invoice == null || payType === 0 || payType === 4 || payType === 6
  if (!canDelete) return <span>فاکتور شده</span>
  return (
    <Popconfirm
      title="حذف پرونده"
      description="آیا مطمئنید؟"
      okText="بله"
      cancelText="خیر"
      onConfirm={() => del.mutate(project.id)}
    >
      <Button danger size="small" icon={<DeleteOutlined />} loading={del.isPending} />
    </Popconfirm>
  )
}

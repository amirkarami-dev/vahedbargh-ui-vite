import { Button, Popconfirm, Tag } from 'antd'
import { useEppAccept } from '@/features/electProjectProcess/api/useElectProjectProcess'
import type { EppRow } from '@/features/electProjectProcess/types'

// old-ui renderAcceptedButton — accept the assigned project (irreversible: invoice issued).
export function AcceptButton({ row }: { row: EppRow }) {
  const accept = useEppAccept()
  if (row.accepted) {
    return <Tag color="success">{`تاریخ: ${row.solarDateAccepted || '-'}`}</Tag>
  }
  return (
    <Popconfirm
      title="قبول کردن پرونده"
      description="بعد از تایید، فاکتور این پرونده برای شما صادر می‌شود و قابل برگشت نیست."
      okText="بله"
      cancelText="خیر"
      onConfirm={() => accept.mutate({ eppId: row.id })}
    >
      <Button type="primary" size="small" disabled={row.inspectionStatus !== 0} loading={accept.isPending}>
        قبول پرونده
      </Button>
    </Popconfirm>
  )
}

import { Checkbox, Input, InputNumber, Popconfirm, type TableColumnsType } from 'antd'
import type { EngQuotaBurn, QuotaBurnUpdate } from '@/features/engWork/types'

const fmt = (v?: string | number) => `${v ?? ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

type Handlers = {
  onUpdate: (p: QuotaBurnUpdate) => void
  onApprove: (id: string) => void
}

// Build the full update payload for one inline field change (old-ui UpdateInline).
const payloadFor = (
  row: EngQuotaBurn,
  field: keyof QuotaBurnUpdate,
  value: number | string,
): QuotaBurnUpdate => ({
  id: row.id,
  des: field === 'des' ? String(value) : row.des,
  amountBurning: field === 'amountBurning' ? Number(value) : (row.amountBurning ?? 0),
  ertCountBurning: field === 'ertCountBurning' ? Number(value) : (row.ertCountBurning ?? 0),
  inspectionDelayFactor:
    field === 'inspectionDelayFactor' ? Number(value) : (row.inspectionDelayFactor ?? 0),
  ertDelayFactor: field === 'ertDelayFactor' ? Number(value) : (row.ertDelayFactor ?? 0),
})

// Ported from old-ui EngQuotaBurnColumnsAnt.js — inline-editable cells (commit on blur).
export function quotaBurnColumns({ onUpdate, onApprove }: Handlers): TableColumnsType<EngQuotaBurn> {
  const numCell =
    (field: keyof QuotaBurnUpdate, get: (r: EngQuotaBurn) => number | undefined) =>
    (_: unknown, row: EngQuotaBurn) => (
      <InputNumber
        style={{ width: '100%' }}
        formatter={fmt}
        defaultValue={Number(get(row) ?? 0)}
        onBlur={e => {
          const val = Number(String(e.target.value).replace(/,/g, '')) || 0
          if (val !== (get(row) ?? 0)) onUpdate(payloadFor(row, field, val))
        }}
      />
    )

  return [
    { title: 'سال', key: 'year', width: 60, render: (_, r) => r.quarterTariff?.year },
    { title: 'دوره', key: 'period', width: 60, render: (_, r) => r.quarterTariff?.period },
    {
      title: 'فصل',
      key: 'season',
      width: 120,
      render: (_, r) => `${r.quarterTypeName ?? ''}-${r.allotmentRoundTypeName ?? ''}`,
    },
    { title: 'مشخصات کارشناس', key: 'quotaDes', width: 180, dataIndex: 'quotaDes' },
    {
      title: 'مبلغ سوخت بازرسی',
      key: 'amountBurning',
      width: 140,
      render: numCell('amountBurning', r => r.amountBurning),
    },
    {
      title: 'ضریب تاخیر بازرسی',
      key: 'inspectionDelayFactor',
      width: 140,
      render: numCell('inspectionDelayFactor', r => r.inspectionDelayFactor),
    },
    {
      title: 'تعداد سوخت ارت',
      key: 'ertCountBurning',
      width: 140,
      render: numCell('ertCountBurning', r => r.ertCountBurning),
    },
    {
      title: 'ضریب تاخیر ارت',
      key: 'ertDelayFactor',
      width: 140,
      render: numCell('ertDelayFactor', r => r.ertDelayFactor),
    },
    {
      title: 'توضیحات',
      key: 'des',
      width: 180,
      render: (_, row) => (
        <Input.TextArea
          rows={1}
          defaultValue={row.des}
          onBlur={e => {
            if (e.target.value !== (row.des ?? '')) onUpdate(payloadFor(row, 'des', e.target.value))
          }}
        />
      ),
    },
    {
      title: 'تایید',
      key: 'approved',
      width: 70,
      render: (_, row) => (
        <Popconfirm
          title="در صورت تایید این مبلغ از کارکرد کارشناس کم میشود"
          description="آیا مطمئن هستید؟"
          okText="بله"
          cancelText="خیر"
          onConfirm={() => onApprove(row.id)}
        >
          <Checkbox checked={row.approved} />
        </Popconfirm>
      ),
    },
  ]
}

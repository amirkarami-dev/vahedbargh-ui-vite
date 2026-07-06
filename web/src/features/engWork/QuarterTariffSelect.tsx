import { Select } from 'antd'
import { useQuarterTariffs } from '@/features/engWork/api/useEngWork'

const money = (n?: number) => Number(n ?? 0).toLocaleString('en-US')

// Quarter/allotment period picker (old-ui ListQuarterTariff).
export function QuarterTariffSelect({
  value,
  onChange,
}: {
  value?: string
  onChange: (v: string) => void
}) {
  const { data } = useQuarterTariffs()
  const options = (data ?? []).map(qt => ({
    value: qt.id,
    label: `${qt.quarterTypeName ?? ''}-${qt.allotmentRoundTypeName ?? ''}_${qt.year ?? ''} مبلغ تخصیص:${money(qt.fee)}`,
  }))
  return (
    <Select
      style={{ width: '100%' }}
      showSearch
      optionFilterProp="label"
      placeholder="انتخاب دوره تخصیص"
      value={value}
      onChange={onChange}
      options={options}
    />
  )
}

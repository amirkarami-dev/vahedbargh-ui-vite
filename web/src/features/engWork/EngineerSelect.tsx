import { Select } from 'antd'
import { useEngineers } from '@/features/engineers/api/useEngineers'

// Engineer picker (old-ui ListEngineer) — reuses the engineers list query.
export function EngineerSelect({
  value,
  onChange,
}: {
  value?: string
  onChange: (v?: string) => void
}) {
  const { data } = useEngineers()
  const options = (data ?? []).map(e => ({ value: String(e.id), label: e.fullName ?? '' }))
  return (
    <Select
      style={{ width: '100%' }}
      showSearch
      allowClear
      optionFilterProp="label"
      placeholder="انتخاب کارشناس"
      value={value}
      onChange={onChange}
      options={options}
    />
  )
}

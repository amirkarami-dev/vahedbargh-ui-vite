import { useEffect, useMemo, useState } from 'react'
import { Checkbox, Radio, Select, Space, Typography } from 'antd'
import { GetCityWithSection } from '@/shared/geo/cityName'
import { useAssignEngineers } from '@/features/electProjectProcess/api/useElectProjectProcess'

// old-ui ListEngineer — grade + certification filters feeding an engineer select.
export function EngineerPicker({
  projectLevelEnum,
  onSelect,
}: {
  projectLevelEnum: number
  onSelect: (id: number | string | null) => void
}) {
  const [grade, setGrade] = useState(4)
  const [filterCert, setFilterCert] = useState(0)
  const [showCert, setShowCert] = useState(true)

  // Level-1 (ERT) assignment forces "all grades".
  const effectiveGrade = projectLevelEnum === 1 ? 4 : grade
  const { data, isFetching } = useAssignEngineers(effectiveGrade, showCert ? filterCert : 0)

  const options = useMemo(
    () =>
      (data ?? [])
        .filter(e => !e.inactive && (effectiveGrade === 4 || e.engineerGradeTypeEnum === effectiveGrade))
        .map(e => ({
          value: e.id,
          label: `${e.fullDescription ?? e.fullName ?? ''} ${e.idSection > 0 ? GetCityWithSection(e.idSection) : ''}`,
          danger: (e.totalQuotaBalance ?? 0) < 0 || (e.fullDescription ?? '').includes('ندارد'),
        })),
    [data, effectiveGrade],
  )

  // Reset the picked engineer whenever the candidate set changes.
  useEffect(() => {
    onSelect(null)
  }, [effectiveGrade, filterCert, showCert]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Space direction="vertical" size={8} style={{ width: '100%' }}>
      <Space wrap>
        <Radio.Group
          value={effectiveGrade}
          onChange={e => setGrade(e.target.value)}
          disabled={projectLevelEnum === 1 || isFetching}
          optionType="button"
        >
          <Radio.Button value={4}>همه</Radio.Button>
          <Radio.Button value={0}>ارشد</Radio.Button>
          <Radio.Button value={1}>پایه ۱</Radio.Button>
          <Radio.Button value={2}>پایه ۲</Radio.Button>
          <Radio.Button value={3}>پایه ۳</Radio.Button>
        </Radio.Group>
        <Checkbox checked={showCert} onChange={e => setShowCert(e.target.checked)} disabled={isFetching}>
          فیلتر صلاحیت
        </Checkbox>
        {showCert && (
          <Radio.Group value={filterCert} onChange={e => setFilterCert(e.target.value)} disabled={isFetching}>
            <Radio value={0}>همه</Radio>
            <Radio value={1}>بازرسی</Radio>
            <Radio value={2}>ارت</Radio>
            <Radio value={3}>تست و تحویل</Radio>
          </Radio.Group>
        )}
        <Typography.Text type="secondary">{`تعداد: ${options.length}`}</Typography.Text>
      </Space>

      <Select
        style={{ width: '100%' }}
        showSearch
        allowClear
        loading={isFetching}
        placeholder="انتخاب کارشناس"
        optionFilterProp="label"
        options={options.map(o => ({ value: o.value, label: o.label }))}
        optionRender={opt => {
          const o = options.find(x => x.value === opt.value)
          return <span style={{ color: o?.danger ? '#cf1322' : '#027A48' }}>{opt.label}</span>
        }}
        onChange={v => onSelect(v ?? null)}
      />
    </Space>
  )
}

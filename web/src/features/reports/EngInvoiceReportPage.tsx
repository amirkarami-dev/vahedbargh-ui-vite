import { useState } from 'react'
import { App, Button, Card, Col, Radio, Row, Select, Space, Typography } from 'antd'
import { motion } from 'motion/react'
import { PersianDatePicker, type PersianDateValue } from '@/shared/components'
import { CityFromSection } from '@/shared/geo/cityName'
import { renderReport } from '@/shared/lib/stimulsoft'
import { reportAssets } from '@/features/reports/assets'
import { ReportViewer } from '@/features/reports/ReportViewer'
import { useEngInvoiceReportData } from '@/features/reports/api/useReports'
import { useEngineers } from '@/features/engineers/api/useEngineers'

const today = () => new Date().toISOString().slice(0, 10)

// Engineer invoice report (old-ui Reports/accounting). Pick an engineer + date range.
export function EngInvoiceReportPage() {
  const { message } = App.useApp()
  const [selectReport, setSelectReport] = useState(0)
  const [engId, setEngId] = useState<string>()
  const [startDate, setStartDate] = useState<PersianDateValue | null>(null)
  const [endDate, setEndDate] = useState<PersianDateValue | null>(null)
  const [rendering, setRendering] = useState(false)
  const report = useEngInvoiceReportData()
  const { data: engineers } = useEngineers()

  const engOptions = (engineers ?? [])
    .filter(e => e.userId)
    .map(e => ({ value: e.userId as string, label: e.fullName ?? '' }))

  const run = async () => {
    if (!engId) {
      message.warning('کارشناس را انتخاب کنید')
      return
    }
    const res = await report.mutateAsync({
      engId,
      startDate: startDate?.gregorian ?? today(),
      endDate: endDate?.gregorian ?? today(),
    })
    const rows = res.map(c => {
      const engineer = c.engineer as { idSection?: number; fullName?: string; id?: string } | undefined
      return {
        ...c,
        cityName: CityFromSection(Number(engineer?.idSection ?? 0)),
        engFullName: engineer?.fullName,
        idEng: engineer?.id,
      }
    })
    if (rows.length === 0) {
      message.warning('رکوردی یافت نشد')
      return
    }
    setRendering(true)
    try {
      await renderReport(
        selectReport === 0 ? reportAssets.engInvoiceReport : reportAssets.engInvoiceMinimal,
        rows,
        reportAssets.faLocalization,
      )
    } catch (e) {
      message.error(String(e))
    } finally {
      setRendering(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>گزارش فاکتور کارشناس</Typography.Title>
      <Card size="small" style={{ marginBottom: 16 }}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Radio.Group
            value={selectReport}
            onChange={e => setSelectReport(e.target.value)}
            options={[
              { value: 0, label: 'گروه بندی پرونده' },
              { value: 1, label: 'بدون گروه بندی' },
            ]}
            optionType="button"
          />
          <Row gutter={[12, 12]}>
            <Col xs={24} md={8}>
              <Select
                showSearch
                optionFilterProp="label"
                placeholder="انتخاب کارشناس"
                style={{ width: '100%' }}
                value={engId}
                onChange={setEngId}
                options={engOptions}
              />
            </Col>
            <Col xs={24} md={8}>
              <PersianDatePicker setDefault={false} setPersianDate={setStartDate} />
            </Col>
            <Col xs={24} md={8}>
              <PersianDatePicker setDefault={false} setPersianDate={setEndDate} />
            </Col>
          </Row>
          <Button type="primary" loading={report.isPending || rendering} onClick={run}>
            گزارش گیری
          </Button>
        </Space>
      </Card>
      <ReportViewer rendering={rendering} />
    </motion.div>
  )
}

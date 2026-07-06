import { useState } from 'react'
import { App, Button, Card, Checkbox, Col, Radio, Row, Space, Typography } from 'antd'
import { motion } from 'motion/react'
import { Locations, type DataAddress } from '@/shared/components'
import { renderReport } from '@/shared/lib/stimulsoft'
import { reportAssets } from '@/features/reports/assets'
import { ReportViewer } from '@/features/reports/ReportViewer'
import { PROJECT_REPORT_LEVELS, mapProjectReportRows } from '@/features/reports/projectReport'
import { useElectProjectReportData } from '@/features/reports/api/useReports'

// Engineer project report (old-ui Reports/engineers). Dedicated report endpoint +
// the engineer city-grouped template.
export function EngineersReportPage() {
  const { message } = App.useApp()
  const [level, setLevel] = useState(0)
  const [filterCity, setFilterCity] = useState(false)
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: 0 })
  const [rendering, setRendering] = useState(false)
  const report = useElectProjectReportData()

  const run = async () => {
    const res = await report.mutateAsync({
      projectLevelEnum: level,
      registerDate: '',
      idSection: filterCity ? Number(dataAddress.sectionId) : 0,
      page: 0,
      pageSize: 1000,
    })
    const rows = mapProjectReportRows(res)
    if (rows.length === 0) {
      message.warning('رکوردی برای نمایش وجود ندارد')
      return
    }
    setRendering(true)
    try {
      await renderReport(reportAssets.electProjectEngGCity, rows, reportAssets.faLocalization)
    } catch (e) {
      message.error(String(e))
    } finally {
      setRendering(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>گزارش کارشناسان</Typography.Title>
      <Card size="small" style={{ marginBottom: 16 }}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Radio.Group
            value={level}
            onChange={e => setLevel(e.target.value)}
            options={PROJECT_REPORT_LEVELS}
            optionType="button"
          />
          <Row gutter={[12, 12]} align="middle">
            <Col>
              <Checkbox checked={filterCity} onChange={e => setFilterCity(e.target.checked)}>
                فیلتر شهر
              </Checkbox>
            </Col>
            {filterCity && (
              <Col xs={24} lg={12}>
                <Locations setDataAddress={setDataAddress} isAccessCity />
              </Col>
            )}
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

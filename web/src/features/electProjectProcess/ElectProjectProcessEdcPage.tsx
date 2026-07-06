import { useState } from 'react'
import { Button, Card, Checkbox, Col, Empty, Input, Row, Table, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useElectProjects } from '@/features/electProjects/api/useElectProjects'
import { edcColumns } from '@/features/electProjectProcess/edcColumns'
import {
  Locations,
  PersianDatePicker,
  type DataAddress,
  type PersianDateValue,
} from '@/shared/components'
import type { ElectProject, ElectProjectFilter } from '@/features/electProjects/types'

type Draft = { fileNumber: string; landLordName: string }
const emptyDraft: Draft = { fileNumber: '', landLordName: '' }

function buildFilter(
  draft: Draft,
  date: PersianDateValue | null,
  filterCity: boolean,
  dataAddress: DataAddress,
  page: number,
  pageSize: number,
): ElectProjectFilter {
  return {
    page,
    pageSize,
    searchValue: '',
    projectLevelEnum: 0,
    fileNumber: draft.fileNumber ? Number(draft.fileNumber) : 0,
    electRequestNumber: 0,
    landLordName: draft.landLordName || '',
    solarRegisterDate: date?.persian ?? '',
    idSection: filterCity ? +dataAddress.sectionId : 0,
    relatedPermitFilter: false,
    filterProjectLevel: false,
    isBuildingInspection: false,
    isEarthSystem: false,
    isTestAndDelivery: false,
    isStop: false,
    filterIsFilter: true,
  }
}

// ElectAdmin EDC-review list (old-ui ElectProjectProcessEdc): project list with
// the EDC checklist editor, file-number edit, and status/defect actions.
export function ElectProjectProcessEdcPage() {
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [date, setDate] = useState<PersianDateValue | null>(null)
  const [filterCity, setFilterCity] = useState(false)
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: 0 })
  const [applied, setApplied] = useState<ElectProjectFilter>(() =>
    buildFilter(emptyDraft, null, false, { sectionId: 0 }, 1, 10),
  )

  const { data, isFetching } = useElectProjects(applied)
  const rows = (data?.data ?? []).filter(r => !r.parentId)
  const total = data?.totalItems ?? 0

  const set = (patch: Partial<Draft>) => setDraft(d => ({ ...d, ...patch }))
  const onSearch = () => setApplied(buildFilter(draft, date, filterCity, dataAddress, 1, applied.pageSize))

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>بازرسی پرونده‌های توزیع</Typography.Title>

      <Card size="small" styles={{ body: { padding: 16 } }} style={{ marginBottom: 16 }}>
        <Row gutter={[12, 12]} align="bottom">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Typography.Text type="secondary">تاریخ ثبت پرونده</Typography.Text>
            <PersianDatePicker setDefault={false} setPersianDate={setDate} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Typography.Text type="secondary">شماره پرونده</Typography.Text>
            <Input
              inputMode="numeric"
              allowClear
              placeholder="وارد کنید..."
              value={draft.fileNumber}
              onChange={e => set({ fileNumber: e.target.value })}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Typography.Text type="secondary">مالک</Typography.Text>
            <Input
              allowClear
              placeholder="نام مالک..."
              value={draft.landLordName}
              onChange={e => set({ landLordName: e.target.value })}
            />
          </Col>
          <Col xs={24} lg={6}>
            <Checkbox checked={filterCity} onChange={e => setFilterCity(e.target.checked)}>
              فیلتر شهر
            </Checkbox>
          </Col>
          {filterCity && (
            <Col xs={24}>
              <Locations setDataAddress={setDataAddress} isAccessCity />
            </Col>
          )}
          <Col xs={24}>
            <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
              جستجو در پرونده‌ها
            </Button>
          </Col>
        </Row>
      </Card>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<ElectProject>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={edcColumns()}
          dataSource={rows}
          locale={{ emptyText: <Empty description="پرونده‌ای یافت نشد" /> }}
          scroll={{ x: 1200 }}
          pagination={{
            current: applied.page,
            pageSize: applied.pageSize,
            total,
            showSizeChanger: true,
            showTotal: t => `کل: ${t} پرونده`,
            onChange: (page, pageSize) => setApplied(prev => ({ ...prev, page, pageSize })),
          }}
        />
      </Card>
    </motion.div>
  )
}

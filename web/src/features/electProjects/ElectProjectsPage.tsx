import { useMemo, useState } from 'react'
import { Button, Card, Checkbox, Col, Empty, Input, Row, Space, Table, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useElectProjects } from '@/features/electProjects/api/useElectProjects'
import { electProjectColumns } from '@/features/electProjects/columns'
import { ProjectChildren } from '@/features/electProjects/ProjectChildren'
import {
  Locations,
  PersianDatePicker,
  type DataAddress,
  type PersianDateValue,
} from '@/shared/components'
import { getRoles } from '@/shared/lib/auth'
import type { ElectProject, ElectProjectFilter } from '@/features/electProjects/types'

type Draft = {
  fileNumber: string
  electRequestNumber: string
  landLordName: string
  isBuildingInspection: boolean
  isEarthSystem: boolean
  isTestAndDelivery: boolean
}

const emptyDraft: Draft = {
  fileNumber: '',
  electRequestNumber: '',
  landLordName: '',
  isBuildingInspection: false,
  isEarthSystem: false,
  isTestAndDelivery: false,
}

// Builds the POST body, mirroring old-ui handleSearchElectProject.
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
    electRequestNumber: draft.electRequestNumber ? Number(draft.electRequestNumber) : 0,
    landLordName: draft.landLordName || '',
    solarRegisterDate: date?.persian ?? '',
    idSection: filterCity ? +dataAddress.sectionId : 0,
    relatedPermitFilter: false,
    filterProjectLevel: false,
    isBuildingInspection: draft.isBuildingInspection,
    isEarthSystem: draft.isEarthSystem,
    isTestAndDelivery: draft.isTestAndDelivery,
    isStop: false,
    filterIsFilter: true,
  }
}

// ElectProjects list (old-ui ListElectProject.js). Server-side filter + pagination.
export function ElectProjectsPage() {
  const roles = useMemo(() => getRoles(), [])
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [date, setDate] = useState<PersianDateValue | null>(null)
  const [filterCity, setFilterCity] = useState(false)
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: 0 })
  const [applied, setApplied] = useState<ElectProjectFilter>(() =>
    buildFilter(emptyDraft, null, false, { sectionId: 0 }, 1, 10),
  )
  const [expandedKey, setExpandedKey] = useState<string | null>(null)

  const { data, isFetching } = useElectProjects(applied)
  const rows = (data?.data ?? []).filter(r => !r.parentId)
  const total = data?.totalItems ?? 0

  const set = (patch: Partial<Draft>) => setDraft(d => ({ ...d, ...patch }))
  const onSearch = () =>
    setApplied(buildFilter(draft, date, filterCity, dataAddress, 1, applied.pageSize))
  const onReset = () => {
    setDraft(emptyDraft)
    setDate(null)
    setFilterCity(false)
    setDataAddress({ sectionId: 0 })
    setApplied(buildFilter(emptyDraft, null, false, { sectionId: 0 }, 1, 10))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>لیست پرونده‌های الکتریکی</Typography.Title>

      <Card size="small" styles={{ body: { padding: 16 } }} style={{ marginBottom: 16 }}>
        <Row gutter={[12, 12]}>
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
            <Typography.Text type="secondary">شماره تقاضا</Typography.Text>
            <Input
              inputMode="numeric"
              allowClear
              placeholder="وارد کنید..."
              value={draft.electRequestNumber}
              onChange={e => set({ electRequestNumber: e.target.value })}
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
          <Col xs={24} lg={16}>
            <Space wrap>
              <Checkbox
                checked={draft.isBuildingInspection}
                onChange={e => set({ isBuildingInspection: e.target.checked })}
              >
                بازرسی ساختمان
              </Checkbox>
              <Checkbox
                checked={draft.isEarthSystem}
                onChange={e => set({ isEarthSystem: e.target.checked })}
              >
                سیستم ارتینگ
              </Checkbox>
              <Checkbox
                checked={draft.isTestAndDelivery}
                onChange={e => set({ isTestAndDelivery: e.target.checked })}
              >
                تست و تحویل
              </Checkbox>
              <Checkbox checked={filterCity} onChange={e => setFilterCity(e.target.checked)}>
                فیلتر شهر
              </Checkbox>
            </Space>
          </Col>
          {filterCity && (
            <Col xs={24}>
              <Locations setDataAddress={setDataAddress} isAccessCity />
            </Col>
          )}
          <Col xs={24}>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                جستجو در پرونده‌ها
              </Button>
              <Button onClick={onReset}>پاک کردن فیلترها</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<ElectProject>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={electProjectColumns(roles)}
          dataSource={rows}
          locale={{ emptyText: <Empty description="پرونده‌ای یافت نشد" /> }}
          scroll={{ x: 1100 }}
          expandable={{
            expandedRowKeys: expandedKey ? [expandedKey] : [],
            onExpand: (expanded, record) => setExpandedKey(expanded ? record.id : null),
            rowExpandable: record => (record.countChildren ?? 0) > 0,
            expandedRowRender: record => <ProjectChildren parent={record} />,
          }}
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

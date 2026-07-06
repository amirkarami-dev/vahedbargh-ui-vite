import { useMemo, useState } from 'react'
import {
  Button,
  Card,
  Checkbox,
  Col,
  Empty,
  Input,
  Radio,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useProjectProcessEng } from '@/features/electProjectProcess/api/useElectProjectProcess'
import { eppColumns } from '@/features/electProjectProcess/columns'
import {
  Locations,
  PersianDatePicker,
  type DataAddress,
  type PersianDateValue,
} from '@/shared/components'
import type { EppFilter, EppRow } from '@/features/electProjectProcess/types'

type Draft = { fileNumber: string; landlordName: string; inspectionStatusEnum: number }
const emptyDraft: Draft = { fileNumber: '', landlordName: '', inspectionStatusEnum: 0 }

function buildFilter(
  draft: Draft,
  date: PersianDateValue | null,
  filterCity: boolean,
  dataAddress: DataAddress,
  page: number,
  pageSize: number,
): EppFilter {
  return {
    page,
    pageSize,
    inspectionStatusEnum: draft.inspectionStatusEnum,
    fileNumber: draft.fileNumber ? Number(draft.fileNumber) : 0,
    landlordName: draft.landlordName || '',
    solarDateDeliverEngineer: date?.persian ?? '',
    idSection: filterCity ? +dataAddress.sectionId : 0,
  }
}

function countBy(rows: EppRow[], status: number) {
  return rows.filter(r => r.inspectionStatus === status).length
}

// Engineer process list (old-ui ElectProjectProcessEng). Status filter + stats +
// accept/files/defect/approve actions. Form#3 / checklist / ERT editors are next.
export function ElectProjectProcessEngPage() {
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [date, setDate] = useState<PersianDateValue | null>(null)
  const [filterCity, setFilterCity] = useState(false)
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: 0 })
  const [applied, setApplied] = useState<EppFilter>(() =>
    buildFilter(emptyDraft, null, false, { sectionId: 0 }, 1, 10),
  )

  const { data, isFetching } = useProjectProcessEng(applied)
  const rows = useMemo(() => data?.data ?? [], [data])
  const total = data?.totalItems ?? 0

  const set = (patch: Partial<Draft>) => setDraft(d => ({ ...d, ...patch }))
  const applyWith = (patch: Partial<Draft>) => {
    const next = { ...draft, ...patch }
    setDraft(next)
    setApplied(buildFilter(next, date, filterCity, dataAddress, 1, applied.pageSize))
  }
  const onSearch = () => setApplied(buildFilter(draft, date, filterCity, dataAddress, 1, applied.pageSize))
  const onReset = () => {
    setDraft(emptyDraft)
    setDate(null)
    setFilterCity(false)
    setDataAddress({ sectionId: 0 })
    setApplied(buildFilter(emptyDraft, null, false, { sectionId: 0 }, 1, 10))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>مدیریت فرآیند پرونده‌های کارشناسی برق</Typography.Title>

      <Row gutter={[10, 10]} style={{ marginBottom: 12 }}>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="انتظار تایید" value={countBy(rows, 0)} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="تایید شده" value={countBy(rows, 1)} valueStyle={{ color: '#027A48' }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="عدم تایید" value={countBy(rows, 2)} valueStyle={{ color: '#B54708' }} /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small"><Statistic title="کنسل شده" value={countBy(rows, 3)} valueStyle={{ color: '#B42318' }} /></Card>
        </Col>
      </Row>

      <Card size="small" styles={{ body: { padding: 16 } }} style={{ marginBottom: 16 }}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Row justify="space-between" align="middle" gutter={[12, 12]}>
            <Col>
              <Radio.Group
                optionType="button"
                buttonStyle="solid"
                value={draft.inspectionStatusEnum}
                onChange={e => applyWith({ inspectionStatusEnum: e.target.value })}
              >
                <Radio value={0}>انتظار تایید</Radio>
                <Radio value={1}>تایید شده</Radio>
                <Radio value={2}>عدم تایید</Radio>
                <Radio value={3}>کنسل شده</Radio>
              </Radio.Group>
            </Col>
            <Col>
              <Tag color="blue">{`کل پرونده‌ها: ${total}`}</Tag>
            </Col>
          </Row>

          <Row gutter={[12, 12]} align="bottom">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Typography.Text type="secondary">تاریخ تخصیص</Typography.Text>
              <PersianDatePicker setDefault={false} setPersianDate={setDate} />
            </Col>
            <Col xs={24} sm={12} md={8} lg={5}>
              <Typography.Text type="secondary">شماره پرونده</Typography.Text>
              <Input
                inputMode="numeric"
                allowClear
                placeholder="وارد کنید..."
                value={draft.fileNumber}
                onChange={e => set({ fileNumber: e.target.value })}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={5}>
              <Typography.Text type="secondary">نام مالک</Typography.Text>
              <Input
                allowClear
                placeholder="نام مالک..."
                value={draft.landlordName}
                onChange={e => set({ landlordName: e.target.value })}
              />
            </Col>
            <Col xs={24} lg={8}>
              <Space wrap>
                <Checkbox checked={filterCity} onChange={e => setFilterCity(e.target.checked)}>
                  فیلتر شهر
                </Checkbox>
                <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                  جستجو
                </Button>
                <Button icon={<ReloadOutlined />} onClick={onReset}>
                  پاکسازی
                </Button>
              </Space>
            </Col>
            {filterCity && (
              <Col xs={24}>
                <Locations setDataAddress={setDataAddress} isAccessCity />
              </Col>
            )}
          </Row>
        </Space>
      </Card>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<EppRow>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={eppColumns(applied.page, applied.pageSize)}
          dataSource={rows}
          locale={{ emptyText: <Empty description="موردی برای نمایش وجود ندارد" /> }}
          scroll={{ x: 1300 }}
          pagination={{
            current: applied.page,
            pageSize: applied.pageSize,
            total,
            showSizeChanger: true,
            showTotal: t => `کل ${t} رکورد`,
            pageSizeOptions: [10, 20, 50, 100],
            onChange: (page, pageSize) => setApplied(prev => ({ ...prev, page, pageSize })),
          }}
        />
      </Card>
    </motion.div>
  )
}

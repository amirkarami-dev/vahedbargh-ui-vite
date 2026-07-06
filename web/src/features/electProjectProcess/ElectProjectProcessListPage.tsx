import { useMemo, useState } from 'react'
import { Button, Card, Col, Empty, Input, Radio, Row, Space, Table, Tag, Typography } from 'antd'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useProjectProcessEng } from '@/features/electProjectProcess/api/useElectProjectProcess'
import { processListColumns } from '@/features/electProjectProcess/processListColumns'
import { PersianDatePicker, type PersianDateValue } from '@/shared/components'
import { getRoles } from '@/shared/lib/auth'
import type { EppFilter, EppRow } from '@/features/electProjectProcess/types'

type Draft = { fileNumber: string; landlordName: string; inspectionStatusEnum: number }
const emptyDraft: Draft = { fileNumber: '', landlordName: '', inspectionStatusEnum: 0 }

function buildFilter(draft: Draft, date: PersianDateValue | null, page: number, pageSize: number): EppFilter {
  return {
    page,
    pageSize,
    inspectionStatusEnum: draft.inspectionStatusEnum,
    fileNumber: draft.fileNumber ? Number(draft.fileNumber) : 0,
    landlordName: draft.landlordName || '',
    solarDateDeliverEngineer: date?.persian ?? '',
    idSection: 0,
  }
}

// Admin/Section assignment-management list (old-ui ElectProjectProcessList):
// view assignments, delete, accept, change engineer, toggle main/sub.
export function ElectProjectProcessListPage() {
  const isAdmin = useMemo(() => getRoles().includes('Administrator'), [])
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [date, setDate] = useState<PersianDateValue | null>(null)
  const [applied, setApplied] = useState<EppFilter>(() => buildFilter(emptyDraft, null, 1, 10))

  const { data, isFetching } = useProjectProcessEng(applied)
  const rows = useMemo(() => data?.data ?? [], [data])
  const total = data?.totalItems ?? 0

  const set = (patch: Partial<Draft>) => setDraft(d => ({ ...d, ...patch }))
  const applyWith = (patch: Partial<Draft>) => {
    const next = { ...draft, ...patch }
    setDraft(next)
    setApplied(buildFilter(next, date, 1, applied.pageSize))
  }
  const onSearch = () => setApplied(buildFilter(draft, date, 1, applied.pageSize))
  const onReset = () => {
    setDraft(emptyDraft)
    setDate(null)
    setApplied(buildFilter(emptyDraft, null, 1, 10))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>لیست تخصیص پرونده‌ها</Typography.Title>

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
              <Tag color="blue">{`کل: ${total}`}</Tag>
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
                <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                  جستجو
                </Button>
                <Button icon={<ReloadOutlined />} onClick={onReset}>
                  پاکسازی
                </Button>
              </Space>
            </Col>
          </Row>
        </Space>
      </Card>

      <Card size="small" styles={{ body: { padding: 8 } }}>
        <Table<EppRow>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={processListColumns(applied.page, applied.pageSize, isAdmin)}
          dataSource={rows}
          locale={{ emptyText: <Empty description="موردی برای نمایش وجود ندارد" /> }}
          scroll={{ x: 1300 }}
          pagination={{
            current: applied.page,
            pageSize: applied.pageSize,
            total,
            showSizeChanger: true,
            showTotal: t => `کل ${t} رکورد`,
            onChange: (page, pageSize) => setApplied(prev => ({ ...prev, page, pageSize })),
          }}
        />
      </Card>
    </motion.div>
  )
}

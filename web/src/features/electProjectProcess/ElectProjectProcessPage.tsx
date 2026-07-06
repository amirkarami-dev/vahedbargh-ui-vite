import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Empty, Input, Radio, Row, Space, Table, Tag, Typography } from 'antd'
import { DeliveredProcedureOutlined, SearchOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useElectProjects } from '@/features/electProjects/api/useElectProjects'
import { electProjectColumns } from '@/features/electProjects/columns'
import { EngineerPicker } from '@/features/electProjectProcess/EngineerPicker'
import { useProjectProcess } from '@/features/electProjectProcess/api/useElectProjectProcess'
import { PersianDatePicker, type PersianDateValue } from '@/shared/components'
import { getRoles } from '@/shared/lib/auth'
import type { ElectProject, ElectProjectFilter } from '@/features/electProjects/types'

type Draft = { fileNumber: string; landLordName: string }
const emptyDraft: Draft = { fileNumber: '', landLordName: '' }

function buildFilter(draft: Draft, date: PersianDateValue | null, page: number, pageSize: number): ElectProjectFilter {
  return {
    page,
    pageSize,
    searchValue: '',
    projectLevelEnum: 0,
    fileNumber: draft.fileNumber ? Number(draft.fileNumber) : 0,
    electRequestNumber: 0,
    landLordName: draft.landLordName || '',
    solarRegisterDate: date?.persian ?? '',
    idSection: 0,
    relatedPermitFilter: false,
    filterProjectLevel: false,
    isBuildingInspection: false,
    isEarthSystem: false,
    isTestAndDelivery: false,
    isStop: false,
    filterIsFilter: true,
  }
}

// Admin/Section assign-and-process screen (old-ui ElectProjectProcess): pick an
// engineer, select projects, choose the assignment type, and save.
export function ElectProjectProcessPage() {
  const roles = useMemo(() => getRoles(), [])
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [date, setDate] = useState<PersianDateValue | null>(null)
  const [applied, setApplied] = useState<ElectProjectFilter>(() => buildFilter(emptyDraft, null, 1, 10))
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [selectedRows, setSelectedRows] = useState<ElectProject[]>([])
  const [idEngineer, setIdEngineer] = useState<number | string | null>(null)
  const [processType, setProcessType] = useState(0)

  const { data, isFetching } = useElectProjects(applied)
  const assign = useProjectProcess()
  const rows = (data?.data ?? []).filter(r => !r.parentId)
  const total = data?.totalItems ?? 0

  // Assignment constraints derive from the selected projects (old-ui).
  const level = selectedRows[0]?.projectLevelEnum ?? 0
  const isTestAndDelivery = selectedRows.some(r => r.isTestAndDelivery)

  useEffect(() => {
    setProcessType(level <= 1 ? level : -1)
  }, [level])

  const set = (patch: Partial<Draft>) => setDraft(d => ({ ...d, ...patch }))
  const onSearch = () => setApplied(buildFilter(draft, date, 1, applied.pageSize))

  const onSave = () => {
    if (!idEngineer || selectedRows.length === 0) return
    assign.mutate(
      {
        IdElectProjects: selectedRows.map(r => r.id),
        IdEngineer: idEngineer,
        projectProcessTypeEnum: processType,
        ertAmount: 0,
      },
      {
        onSuccess: () => {
          setSelectedKeys([])
          setSelectedRows([])
        },
      },
    )
  }

  const canSave = !!idEngineer && selectedRows.length > 0 && level <= 1 && !assign.isPending

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>تخصیص پرونده به کارشناس</Typography.Title>

      <Card size="small" styles={{ body: { padding: 16 } }} style={{ marginBottom: 16 }}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <EngineerPicker projectLevelEnum={level} onSelect={setIdEngineer} />
          <Space wrap align="center">
            <Radio.Group
              value={processType}
              onChange={e => setProcessType(e.target.value)}
              optionType="button"
              buttonStyle="solid"
            >
              <Radio.Button value={0} disabled={level !== 0}>
                تخصیص به کارشناس
              </Radio.Button>
              <Radio.Button value={1} disabled={(level !== 0 && level !== 1) || isTestAndDelivery}>
                تخصیص به مجری ارت
              </Radio.Button>
            </Radio.Group>
            <Tag color="blue">{`انتخاب شده: ${selectedRows.length}`}</Tag>
            <Button
              type="primary"
              icon={<DeliveredProcedureOutlined />}
              disabled={!canSave}
              loading={assign.isPending}
              onClick={onSave}
            >
              ذخیره تخصیص
            </Button>
          </Space>
        </Space>
      </Card>

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
          columns={electProjectColumns(roles)}
          dataSource={rows}
          locale={{ emptyText: <Empty description="پرونده‌ای یافت نشد" /> }}
          scroll={{ x: 1100 }}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys, selected) => {
              setSelectedKeys(keys)
              setSelectedRows(selected)
            },
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

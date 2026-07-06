import { useMemo, useState } from 'react'
import { Button, Card, Checkbox, Col, Empty, Input, Radio, Row, Space, Table } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { motion } from 'motion/react'
import { useEngineers } from '@/features/engineers/api/useEngineers'
import { useUpsertEngineer } from '@/features/engineers/api/useEngineerMutations'
import { engineerColumns } from '@/features/engineers/columns'
import { EngineerFormDrawer } from '@/features/engineers/EngineerFormDrawer'
import { Locations, type DataAddress } from '@/shared/components'
import { GetCityIdWithSection } from '@/shared/geo/cityName'
import type { Engineer } from '@/features/engineers/types'

// Engineers screen orchestrator (old-ui engineer-list.js): filters + table + drawer.
// Fetch-all-once + filter in memory, same as the legacy reducer.
export function EngineersPage() {
  const { data, isLoading } = useEngineers()
  const upsert = useUpsertEngineer()
  const [search, setSearch] = useState('')
  const [filterAssign, setFilterAssign] = useState(false)
  const [filterAddress, setFilterAddress] = useState(0)
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: 0 })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Engineer | null>(null)

  const rows = useMemo<Engineer[]>(() => {
    let list = data ?? []
    if (search.length > 0) list = list.filter(f => (f.fullName ?? '').includes(search))
    if (filterAssign) {
      list = list.filter(f => (f.engFiles ?? []).some(x => x.fileName === 'F2.jpg'))
    } else if (dataAddress.sectionId !== 0) {
      if (filterAddress === 1) {
        const idCity = GetCityIdWithSection(dataAddress.sectionId)?.Id
        list = list.filter(f => GetCityIdWithSection(+f.idSection)?.Id === idCity)
      }
      if (filterAddress === 2) {
        list = list.filter(f => +f.idSection === +dataAddress.sectionId)
      }
    }
    return list
  }, [data, search, filterAssign, filterAddress, dataAddress])

  const openAdd = () => {
    setEditing(null)
    setDrawerOpen(true)
  }
  const openEdit = (r: Engineer) => {
    setEditing(r)
    setDrawerOpen(true)
  }
  const handleSave = (payload: Record<string, unknown>) => {
    upsert.mutate(payload, { onSuccess: () => setDrawerOpen(false) })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card size="small" styles={{ body: { padding: 12 } }}>
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              allowClear
              prefix={<SearchOutlined />}
              placeholder="جستجوی نام کارشناس"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Col>
          <Col xs={24} md={16} lg={10}>
            <Locations setDataAddress={setDataAddress} />
          </Col>
          <Col xs={24} lg={8}>
            <Space wrap size="middle">
              <Radio.Group value={filterAddress} onChange={e => setFilterAddress(e.target.value)}>
                <Radio value={0}>استان</Radio>
                <Radio value={1}>شهرستان</Radio>
                <Radio value={2}>بخش</Radio>
              </Radio.Group>
              <Checkbox checked={filterAssign} onChange={e => setFilterAssign(e.target.checked)}>
                فیلتر تایید امضا
              </Checkbox>
            </Space>
          </Col>
          <Col xs={24}>
            <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
              افزودن کارشناس
            </Button>
          </Col>
        </Row>
      </Card>

      <Card size="small" styles={{ body: { padding: 8 } }} style={{ marginTop: 12 }}>
        <Table<Engineer>
          size="small"
          rowKey="id"
          loading={isLoading}
          columns={engineerColumns({ onEdit: openEdit })}
          dataSource={rows}
          locale={{ emptyText: <Empty description="کارشناسی یافت نشد" /> }}
          pagination={{ showSizeChanger: true, defaultPageSize: 10 }}
          scroll={{ x: 1400 }}
        />
      </Card>

      <EngineerFormDrawer
        open={drawerOpen}
        editingRecord={editing}
        loading={upsert.isPending}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
      />
    </motion.div>
  )
}

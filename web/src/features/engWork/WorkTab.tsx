import { useState } from 'react'
import { Col, ConfigProvider, Row, Table } from 'antd'
import { QuarterTariffSelect } from '@/features/engWork/QuarterTariffSelect'
import { EngineerSelect } from '@/features/engWork/EngineerSelect'
import { useEngWork, useQuarterTariffs } from '@/features/engWork/api/useEngWork'
import { workColumns } from '@/features/engWork/workColumns'
import type { EngWorkRow } from '@/features/engWork/types'

// Engineer work figures per quarter (old-ui EngWork/work). LTR table for numbers.
export function WorkTab() {
  const [qtId, setQtId] = useState<string>()
  const [engId, setEngId] = useState<string>()
  const { data: tariffs } = useQuarterTariffs()
  const { data, isFetching } = useEngWork(qtId ?? null, engId ?? null)
  const period = tariffs?.find(t => t.id === qtId)?.period

  return (
    <>
      <Row gutter={[16, 12]} style={{ marginBottom: 12 }}>
        <Col xs={24} md={12}>
          <QuarterTariffSelect value={qtId} onChange={setQtId} />
        </Col>
        <Col xs={24} md={12}>
          <EngineerSelect value={engId} onChange={setEngId} />
        </Col>
      </Row>
      <ConfigProvider direction="ltr">
        <Table<EngWorkRow>
          size="small"
          rowKey="id"
          loading={isFetching}
          columns={workColumns(period)}
          dataSource={data ?? []}
          scroll={{ x: 900, y: 450 }}
          pagination={{ pageSize: 20 }}
        />
      </ConfigProvider>
    </>
  )
}

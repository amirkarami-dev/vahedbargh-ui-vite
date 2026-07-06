import { useState } from 'react'
import { Button, Col, Divider, Input, InputNumber, Row, Table, Tag } from 'antd'
import { QuarterTariffSelect } from '@/features/engWork/QuarterTariffSelect'
import { EngineerSelect } from '@/features/engWork/EngineerSelect'
import {
  useApproveQuotaBurn,
  useQuotaBurnList,
  useUpdateQuotaBurn,
} from '@/features/engWork/api/useEngWork'
import { quotaBurnColumns } from '@/features/engWork/quotaBurnColumns'
import type { EngQuotaBurn } from '@/features/engWork/types'

const fmt = (v?: string | number) => `${v ?? ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// Quota burn management (old-ui EngWork/quota-burn) — Admin only. Insert form +
// inline-editable table with approve.
export function QuotaBurnTab() {
  const [qtId, setQtId] = useState<string>()
  const [engId, setEngId] = useState<string>()
  const [amountBurning, setAmountBurning] = useState(0)
  const [ertCountBurning, setErtCountBurning] = useState(0)
  const [des, setDes] = useState('')

  const { data, isFetching } = useQuotaBurnList(qtId ?? null, engId ?? null)
  const update = useUpdateQuotaBurn()
  const approve = useApproveQuotaBurn()

  const insert = () =>
    update.mutate({ id: null, qtId, engId, des, amountBurning, ertCountBurning })

  return (
    <>
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <QuarterTariffSelect value={qtId} onChange={setQtId} />
        </Col>
        <Col span={24}>
          <EngineerSelect value={engId} onChange={setEngId} />
        </Col>
        <Col xs={24} md={12}>
          <label style={{ fontWeight: 500 }}>مبلغ سوخت/افزایش سهمیه بازرسی</label>
          <InputNumber
            style={{ width: '100%', direction: 'ltr' }}
            formatter={fmt}
            value={amountBurning}
            onChange={v => setAmountBurning(Number(v) || 0)}
          />
        </Col>
        <Col xs={24} md={12}>
          <label style={{ fontWeight: 500 }}>تعداد کاهش یا افزایش سهمیه ارت</label>
          <InputNumber
            style={{ width: '100%', direction: 'ltr' }}
            formatter={fmt}
            value={ertCountBurning}
            onChange={v => setErtCountBurning(Number(v) || 0)}
          />
        </Col>
        <Col span={24}>
          <Tag color="blue">
            در اینجا اگر مثبت وارد شود از سهمیه ها کسر میگردد و اگر منفی باشد به سهمیه اضافه میشود
          </Tag>
        </Col>
        <Col span={24}>
          <label style={{ fontWeight: 500 }}>توضیحات</label>
          <Input.TextArea
            rows={2}
            value={des}
            onChange={e => setDes(e.target.value)}
            placeholder="توضیحات"
          />
        </Col>
        <Col span={24}>
          <Button type="primary" disabled={!qtId} loading={update.isPending} onClick={insert}>
            ذخیره
          </Button>
        </Col>
      </Row>
      <Divider />
      <Table<EngQuotaBurn>
        size="small"
        rowKey="id"
        loading={isFetching}
        columns={quotaBurnColumns({ onUpdate: update.mutate, onApprove: approve.mutate })}
        dataSource={data ?? []}
        scroll={{ x: 1200, y: 450 }}
        sticky
        pagination={{ pageSize: 20 }}
      />
    </>
  )
}

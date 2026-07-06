import { useState } from 'react'
import { App, Button, Col, Divider, Form, Input, InputNumber, Row, Select, Typography } from 'antd'
import { PersianDatePicker, type PersianDateValue } from '@/shared/components'
import { useEngineers } from '@/features/engineers/api/useEngineers'
import { useEngPaymentCustom } from '@/features/accounting/api/useAccounting'

const moneyFmt = (v?: string | number) => `${v ?? ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// Register an engineer bank payment (old-ui Accounting/engPayment). transactionStatus
// is always 0 (deposit); btId is engineerId-date, like the original.
export function EngPaymentTab() {
  const { modal } = App.useApp()
  const [form] = Form.useForm()
  const [fishDate, setFishDate] = useState<PersianDateValue | null>(null)
  const { data: engineers } = useEngineers()
  const pay = useEngPaymentCustom()

  const options = (engineers ?? []).map(e => ({
    value: e.id,
    label: `${e.fullName}/${e.naCode ?? ''}/${e.cellPhone ?? ''}`,
  }))

  const onFinish = (v: { engineerId: string; amount: number; fishNumber: string; des: string }) => {
    modal.confirm({
      title: 'درصورتیکه اطمینان دارید دکمه ثبت را بزنید',
      okText: 'ثبت',
      cancelText: 'انصراف',
      onOk: () => {
        const date = (fishDate?.persian ?? '').replaceAll('/', '')
        const payload = {
          engineerId: v.engineerId,
          amount: v.amount,
          fishNumber: v.fishNumber,
          des: v.des,
          solarFishDate: fishDate?.persian ?? '',
          transactionStatus: 0,
          btId: `${v.engineerId}-${date}`,
        }
        pay.mutate(payload, { onSuccess: () => form.resetFields() })
      },
    })
  }

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Typography.Text>ثبت واریزی به حساب بانکی کارشناس</Typography.Text>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col xs={24} md={12}>
          <Form.Item
            label="انتخاب کارشناس"
            name="engineerId"
            rules={[{ required: true, message: 'کارشناس را انتخاب کنید' }]}
          >
            <Select showSearch optionFilterProp="label" placeholder="جستجو" options={options} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="تاریخ فیش واریزی">
            <PersianDatePicker setDefault={false} setPersianDate={setFishDate} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="مبلغ فیش (ریال)" name="amount" rules={[{ required: true, message: 'الزامی' }]}>
            <InputNumber style={{ width: '100%' }} formatter={moneyFmt} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="شماره فیش" name="fishNumber" rules={[{ required: true, message: 'الزامی' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="توضیحات" name="des" rules={[{ required: true, message: 'الزامی' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button type="primary" htmlType="submit" loading={pay.isPending}>
            ذخیره
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

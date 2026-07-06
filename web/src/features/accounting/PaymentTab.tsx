import { useMemo, useState } from 'react'
import { App, Button, Col, Divider, Form, Input, InputNumber, Radio, Row, Select } from 'antd'
import { PersianDatePicker, type PersianDateValue } from '@/shared/components'
import { useElectProjects } from '@/features/electProjects/api/useElectProjects'
import { usePaymentCustom } from '@/features/accounting/api/useAccounting'
import type { ElectProjectFilter } from '@/features/electProjects/types'

const baseProjFilter: ElectProjectFilter = {
  page: 1,
  pageSize: 20,
  searchValue: '',
  projectLevelEnum: 0,
  fileNumber: 0,
  electRequestNumber: 0,
  landLordName: '',
  solarRegisterDate: '',
  idSection: 0,
  relatedPermitFilter: false,
  filterProjectLevel: false,
  isBuildingInspection: false,
  isEarthSystem: false,
  isTestAndDelivery: false,
  isStop: false,
  filterIsFilter: true,
}

const moneyFmt = (v?: string | number) => `${v ?? ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// Register a project payment receipt (old-ui Accounting/payment). Search a project
// by file number, auto-fill its balance, then post to PaymentCustom.
export function PaymentTab() {
  const { modal } = App.useApp()
  const [form] = Form.useForm()
  const [search, setSearch] = useState('')
  const [fishDate, setFishDate] = useState<PersianDateValue | null>(null)
  const [status, setStatus] = useState(0)
  const pay = usePaymentCustom()

  const projFilter = useMemo<ElectProjectFilter>(
    () => ({ ...baseProjFilter, fileNumber: search ? Number(search) : 0 }),
    [search],
  )
  const { data } = useElectProjects(projFilter)
  const projects = data?.data ?? []
  const options = projects.map(p => ({
    value: p.id,
    label: `${p.fileNumber}/${p.landlordName ?? ''}/${p.landlordPhoneNumber ?? ''}`,
  }))

  const autofillAmount = (id: string) => {
    const p = projects.find(x => x.id === id)
    if (!p) return
    const amount = Math.abs(Number(p.isBigProject ? p.amountPerArea : p.projectBalance) || 0)
    form.setFieldsValue({ amount })
  }

  const onFinish = (v: Record<string, unknown>) => {
    modal.confirm({
      title: 'درصورتیکه اطمینان دارید دکمه ثبت را بزنید',
      okText: 'ثبت',
      cancelText: 'انصراف',
      onOk: () => {
        const payload = {
          ...v,
          solarFishDate: fishDate?.persian ?? '',
          transactionStatus: status,
          fishNumber: status === 0 ? v.fishNumber : '1001',
          btId: status === 0 ? v.btId : String(Date.now()),
        }
        pay.mutate(payload, { onSuccess: () => form.resetFields() })
      },
    })
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={changed => {
        if ('electProjectId' in changed) autofillAmount(changed.electProjectId)
      }}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item label="ثبت تراکنش برای پرونده">
            <Radio.Group value={status} onChange={e => setStatus(e.target.value)}>
              <Radio value={0}>واریز</Radio>
              <Radio value={1}>برداشت</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="تاریخ فیش واریزی">
            <PersianDatePicker setDefault={false} setPersianDate={setFishDate} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="انتخاب پرونده"
            name="electProjectId"
            rules={[{ required: true, message: 'پرونده را انتخاب کنید' }]}
          >
            <Select
              showSearch
              filterOption={false}
              onSearch={setSearch}
              options={options}
              placeholder="جستجو با شماره پرونده"
            />
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
        {status === 0 && (
          <>
            <Col xs={24} md={8}>
              <Form.Item label="شماره فیش" name="fishNumber" rules={[{ required: true, message: 'الزامی' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="شماره پیگیری فیش" name="btId" rules={[{ required: true, message: 'الزامی' }]}>
                <Input />
              </Form.Item>
            </Col>
          </>
        )}
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

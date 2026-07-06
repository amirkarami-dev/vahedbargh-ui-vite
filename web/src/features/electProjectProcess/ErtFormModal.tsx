import { useState } from 'react'
import { Button, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Space } from 'antd'
import {
  BuildingTypes,
  ElectrodeExecuteTypes,
  ElectrodeMaterialTypes,
  ElectrodeTypes,
  ElectrodeUsageTypes,
} from '@/shared/enums/electProcess'
import { useUpsertErtForm } from '@/features/electProjectProcess/api/useElectProjectProcess'
import type { EppRow } from '@/features/electProjectProcess/types'

// old-ui ErtformEditNew — the electrode (ارت) identity form (projectLevel 2).
export function ErtFormModal({ row }: { row: EppRow }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const upsert = useUpsertErtForm()

  const usage = Form.useWatch('electrodeUsageTypeEnum', form)
  const execute = Form.useWatch('electrodeExecuteTypeEnum', form)
  const type = Form.useWatch('electrodeTypeEnum', form)
  const material = Form.useWatch('electrodeMaterialTypeEnum', form)

  const onOpen = () => {
    const ert = row.electProjectErtForm ?? {}
    form.setFieldsValue({ ...ert, buildingTypeEnum: row.electProject.buildingTypeEnum })
    setOpen(true)
  }

  const onFinish = (values: Record<string, unknown>) => {
    upsert.mutate(
      { ...values, id: row.electProjectErtForm?.id, eppId: row.id },
      { onSuccess: () => setOpen(false) },
    )
  }

  return (
    <>
      <Button type="primary" size="small" onClick={onOpen}>
        ارت
      </Button>
      <Modal
        title={`شناسنامه سیستم ارت: ${row.landLordName ?? ''}`}
        open={open}
        onCancel={() => setOpen(false)}
        width="80%"
        footer={null}
        destroyOnClose
        styles={{ body: { maxHeight: '76vh', overflowY: 'auto' } }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Divider>مشخصات کلی الکترود</Divider>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="buildingTypeEnum"
                label="کاربری ساختمان"
                rules={[
                  { required: true, message: 'الزامی می‌باشد' },
                  { validator: (_, v) => (!v ? Promise.reject(new Error('لطفا نوع ساختمان را انتخاب کنید')) : Promise.resolve()) },
                ]}
              >
                <Select options={BuildingTypes} />
              </Form.Item>
            </Col>
            <Col xs={24} md={16}>
              <Form.Item name="electrodeAddress" label="آدرس محل قرارگیری الکترود" rules={[{ required: true }]}>
                <Input.TextArea rows={1} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="utmX" label="مختصات X" rules={[{ required: true, message: 'مختصات x را وارد کنید' }]}>
                <InputNumber dir="ltr" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="utmY" label="مختصات Y" rules={[{ required: true, message: 'مختصات y را وارد کنید' }]}>
                <InputNumber dir="ltr" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="constructionDate" label="تاریخ احداث الکترود" rules={[{ required: true }]}>
                <Input dir="ltr" placeholder="1403/12/12" maxLength={10} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="electrodeUsageTypeEnum"
                label="نوع کاربری الکترود"
                rules={[{ required: true, validator: (_, v) => (!v ? Promise.reject(new Error('نوع کاربری را وارد کنید')) : Promise.resolve()) }]}
              >
                <Select placeholder="انتخاب کنید" options={ElectrodeUsageTypes} />
              </Form.Item>
            </Col>
            {usage === 4 && (
              <Col xs={24} md={12}>
                <Form.Item name="electrodeUsageTypeOther" label="سایر نوع کاربری" rules={[{ required: true }]}>
                  <Input.TextArea rows={1} />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} md={12}>
              <Form.Item name="electrodeExecuteTypeEnum" label="روش اجرای الکترود" rules={[{ required: true }]}>
                <Select placeholder="انتخاب کنید" options={ElectrodeExecuteTypes} />
              </Form.Item>
            </Col>
            {execute === 5 && (
              <Col xs={24} md={12}>
                <Form.Item name="electrodeExecuteTypeOther" label="سایر روش اجرایی" rules={[{ required: true }]}>
                  <Input.TextArea rows={1} />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} md={12}>
              <Form.Item
                name="electrodeTypeEnum"
                label="نوع الکترود"
                rules={[{ required: true, validator: (_, v) => (!v ? Promise.reject(new Error('نوع الکترود را وارد کنید')) : Promise.resolve()) }]}
              >
                <Select placeholder="انتخاب کنید" options={ElectrodeTypes} />
              </Form.Item>
            </Col>
            {type === 6 && (
              <Col xs={24} md={12}>
                <Form.Item name="electrodeTypeOther" label="سایر نوع الکترود" rules={[{ required: true }]}>
                  <Input.TextArea rows={1} />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} md={12}>
              <Form.Item name="electrodeMaterialTypeEnum" label="جنس الکترود" rules={[{ required: true }]}>
                <Select placeholder="انتخاب کنید" options={ElectrodeMaterialTypes} />
              </Form.Item>
            </Col>
            {material === 4 && (
              <Col xs={24} md={12}>
                <Form.Item name="electrodeMaterialTypeOther" label="سایر جنس الکترود" rules={[{ required: true }]}>
                  <Input.TextArea rows={1} />
                </Form.Item>
              </Col>
            )}
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item name="electrodeLength" label="طول الکترود">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item name="electrodeDiameter" label="قطر الکترود">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="otherElectrodeMeasure" label="سایر اندازه‌گیری‌ها">
                <Input.TextArea rows={1} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="des" label="سایر توضیحات لازم">
            <Input.TextArea rows={1} />
          </Form.Item>
          <Form.Item name="ertBrand" label="برند اقلام ارتینگ">
            <Input.TextArea rows={1} />
          </Form.Item>
          <Form.Item name="ertTesterBrand" label="برند و مدل ارت تستر">
            <Input.TextArea rows={1} />
          </Form.Item>

          <Divider>اولین سابقه اندازه‌گیری مقاومت الکترود</Divider>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="measurementDate" label="تاریخ" rules={[{ required: true }]}>
                <Input dir="ltr" placeholder="1403/12/12" maxLength={10} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="measurementHour" label="ساعت" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="temperature" label="دمای هوا" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="rainfallAmount" label="مقدار بارندگی ۴۸ ساعت اخیر" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="electrodeResistanceValue" label="مقاومت الکترود (اهم)" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="measurementMethod" label="روش اندازه‌گیری مقاومت" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Space>
            <Button type="primary" htmlType="submit" loading={upsert.isPending}>
              ذخیره
            </Button>
            <Button onClick={() => form.resetFields()}>ریست فرم</Button>
          </Space>
        </Form>
      </Modal>
    </>
  )
}

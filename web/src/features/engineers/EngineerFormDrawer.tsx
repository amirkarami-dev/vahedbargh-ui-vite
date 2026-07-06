import { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
} from 'antd'
import {
  Locations,
  PersianDatePicker,
  type DataAddress,
  type PersianDateValue,
} from '@/shared/components'
import type { Engineer } from '@/features/engineers/types'

const { Title } = Typography

type Props = {
  open: boolean
  editingRecord: Engineer | null
  loading: boolean
  onClose: () => void
  onSave: (payload: Record<string, unknown>) => void
}

// Add / edit engineer (old-ui EngineerFormDrawer.js). Same fields + same submit
// transform; idSection comes from the Locations cascade.
export function EngineerFormDrawer({ open, editingRecord, loading, onClose, onSave }: Props) {
  const [form] = Form.useForm()
  const [solarMembershipDate, setSolarMembershipDate] = useState<PersianDateValue | null>(null)
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: 0 })
  const isEdit = Boolean(editingRecord)

  useEffect(() => {
    if (!open) return
    if (editingRecord) form.setFieldsValue(editingRecord)
    else form.resetFields()
  }, [open, editingRecord, form])

  const handleFinish = (values: Record<string, unknown>) => {
    const updated: Record<string, unknown> = {
      ...values,
      solarMembershipDate: solarMembershipDate?.persian,
      idSection: +dataAddress.sectionId,
      id: editingRecord?.id,
    }
    delete updated.julianBirthDate
    delete updated.julianMembershipDate
    onSave(updated)
  }

  return (
    <Drawer
      title={isEdit ? 'ویرایش کارشناس' : 'افزودن کارشناس'}
      width={560}
      open={open}
      onClose={onClose}
      destroyOnClose
      footer={
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>انصراف</Button>
          <Button type="primary" loading={loading} onClick={() => form.submit()}>
            {isEdit ? 'آپدیت' : 'ذخیره'}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" name="engForm" onFinish={handleFinish}>
        <Title level={5}>اطلاعات فردی</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item required tooltip="نام اجباریست" label="نام کامل" name="fullName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item required label="کد ملی" name="naCode">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item required label="موبایل" name="cellPhone">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item required label="تاریخ عضویت" name="julianMembershipDate">
              <PersianDatePicker
                defaultDate={editingRecord?.julianMembershipDate?.toString().substring(0, 10)}
                setPersianDate={setSolarMembershipDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="اعتبار اولیه" name="defaultQuota">
              <InputNumber
                style={{ width: '100%' }}
                formatter={v => `ریال ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        <Title level={5}>محل خدمت</Title>
        <Locations setDataAddress={setDataAddress} idSection={editingRecord?.idSection} />

        <Divider />
        <Title level={5}>مجوزها</Title>
        <Space size="large" wrap>
          <Form.Item label="بازرسی" name="certOfInspection" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="ارت" name="certOfEarth" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="تست و تحویل" name="certOfTest" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="فیبر" name="certOfFiber" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Space>

        <Divider />
        <Title level={5}>وضعیت مالی و حساب</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item required tooltip="شماره حساب اجباریست" label="شماره حساب" name="bankAccountNumber">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Space size="large" wrap>
          <Form.Item label="مسدودی حساب" name="bankAccountBlocked" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="غیر فعال" name="inactive" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="تیک ۱ درصد" name="has1Percent" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="افزایش سهمیه" name="hasQuarterIncrease" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Space>
      </Form>
    </Drawer>
  )
}

import React, { useEffect, useState } from "react"
import {
  Drawer,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Row,
  Col,
  Space,
  Divider,
  Typography,
} from "antd"
import { PersianDatePickerInline } from "components/Common/PersianDatePickerInline"
import Locations from "components/Common/Locations"

const { Title } = Typography

// Add / edit engineer form, presented in a side drawer. Keeps the same fields,
// the same `handleSubmit` transform, and the same Redux save flow as before —
// only the container changed (was an inline mega-form sharing state with filters).
const EngineerFormDrawer = ({ open, editingRecord, loading, onClose, onSave }) => {
  const [form] = Form.useForm()
  // Birth date isn't captured by this form (parity with the original) — kept so
  // the saved payload keeps the same shape (`solarBirthDate` stays undefined).
  const [solarBirthDate] = useState("")
  const [solarMembershipDate, setSolarMembershipDate] = useState("")
  const [dataAddress, setDataAddress] = useState({
    sectionId: 0,
    fullAddress: {
      pro: "",
      cit: "",
      sec: "",
      lat: 35.311308,
      lng: 46.991271,
      mainAddress: "",
    },
  })

  const isEdit = Boolean(editingRecord)

  useEffect(() => {
    if (!open) return
    if (editingRecord) form.setFieldsValue(editingRecord)
    else form.resetFields()
  }, [open, editingRecord])

  const handleFinish = values => {
    const updatedData = {
      ...values,
      solarBirthDate: solarBirthDate.persian,
      solarMembershipDate: solarMembershipDate.persian,
      idSection: +dataAddress.sectionId,
      id: editingRecord?.id,
    }
    delete updatedData.julianBirthDate
    delete updatedData.julianMembershipDate
    onSave(updatedData)
  }

  return (
    <Drawer
      title={isEdit ? "ویرایش کارشناس" : "افزودن کارشناس"}
      width={560}
      open={open}
      onClose={onClose}
      destroyOnClose
      footer={
        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button onClick={onClose}>انصراف</Button>
          <Button type="primary" loading={loading} onClick={() => form.submit()}>
            {isEdit ? "آپدیت" : "ذخیره"}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" name="engForm" onFinish={handleFinish}>
        <Title level={5}>اطلاعات فردی</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              required
              tooltip="نام اجباریست"
              label="نام کامل"
              name="fullName"
            >
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
              <PersianDatePickerInline
                defaultDate={form
                  .getFieldValue("julianMembershipDate")
                  ?.toString()
                  ?.substring(0, 10)}
                setPersianDate={setSolarMembershipDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="اعتبار اولیه" name="defaultQuota">
              <InputNumber
                style={{ width: "100%" }}
                formatter={value =>
                  `ریال ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        <Title level={5}>محل خدمت</Title>
        <Locations
          setDataAddress={setDataAddress}
          matches_sm={true}
          idSection={editingRecord?.idSection}
        />

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
            <Form.Item
              required
              tooltip="شماره حساب اجباریست"
              label="شماره حساب"
              name="bankAccountNumber"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Space size="large" wrap>
          <Form.Item
            label="مسدودی حساب"
            name="bankAccountBlocked"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item label="غیر فعال" name="inactive" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="تیک ۱ درصد" name="has1Percent" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="افزایش سهمیه"
            name="hasQuarterIncrease"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Space>
      </Form>
    </Drawer>
  )
}

export default EngineerFormDrawer

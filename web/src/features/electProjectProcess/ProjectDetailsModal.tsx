import { useState } from 'react'
import { Button, Col, Form, Input, InputNumber, Modal, Row, Space, Tag } from 'antd'
import { useUpdateProjectDetails } from '@/features/electProjectProcess/api/useElectProjectProcess'
import type { EppRow } from '@/features/electProjectProcess/types'

// old-ui ElectProjectProcessEng/ProjectDetails — engineer edits owner/address.
export function ProjectDetailsModal({ row }: { row: EppRow }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const update = useUpdateProjectDetails()
  const unitNumber = Form.useWatch('unitNumber', form)

  const onOpen = () => {
    form.setFieldsValue({
      landlordName: row.landLordName,
      companyName: row.companyName,
      landlordNaCode: row.landlordNaCode,
      landlordPhoneNumber: row.landlordPhoneNumber,
      postalCode: row.postalCode,
      area: row.area,
      unitNumber: row.unitNumber,
      numberOfFloor: row.numberOfFloor,
      address: row.address,
    })
    setOpen(true)
  }

  const onFinish = (values: Record<string, unknown>) => {
    update.mutate(
      {
        ...values,
        id: row.idElectProject ?? row.electProjectId,
        ownershipTypeEnum: row.ownershipTypeEnum,
        buildingTypeEnum: Number(row.buildingType ?? 0),
        packageNeed: !!row.packageNeed,
        pipingTypeEnum: Number(row.pipingTypeEnum ?? 0),
        unitNumber: Number(values.unitNumber ?? 0),
        area: Number(values.area ?? 0),
        numberOfFloor: Number(values.numberOfFloor ?? 0),
      },
      { onSuccess: () => setOpen(false) },
    )
  }

  return (
    <>
      <Button type="link" style={{ padding: 0 }} onClick={onOpen}>
        #{row.fileNumber}
      </Button>
      <Modal
        title="اطلاعات پرونده"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="ذخیره تغییرات"
        cancelText="انصراف"
        confirmLoading={update.isPending}
        width={760}
        destroyOnClose
      >
        <Space wrap style={{ marginBottom: 12 }}>
          <Tag color="blue">{`پرونده: ${row.fileNumber || '-'}`}</Tag>
          <Tag color="purple">{`تاریخ ثبت: ${row.solarRegisterDate || '-'}`}</Tag>
        </Space>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[12, 8]}>
            <Col xs={24} md={12}>
              <Form.Item name="landlordName" label="نام و نام خانوادگی مالک" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            {row.ownershipTypeEnum === 2 && (
              <Col xs={24} md={12}>
                <Form.Item name="companyName" label="نام شرکت" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} md={12}>
              <Form.Item name="landlordNaCode" label="کد ملی مالک/شرکت" rules={[{ required: true }, { len: 10, message: 'باید ۱۰ رقم باشد' }]}>
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="landlordPhoneNumber" label="شماره تماس مالک" rules={[{ required: true }, { len: 11, message: 'باید ۱۱ رقم باشد' }]}>
                <Input maxLength={11} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="postalCode" label="کد پستی" rules={[{ required: true }, { len: 10, message: 'باید ۱۰ رقم باشد' }]}>
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="area" label="مساحت (مترمربع)" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="unitNumber" label="تعداد واحد" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={1} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="numberOfFloor" label="تعداد طبقات" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={0} disabled={Number(unitNumber) > 1 || Number(unitNumber) <= 0} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="address" label="آدرس" rules={[{ required: true }]}>
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

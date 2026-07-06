import { useState } from 'react'
import { Col, Form, Input, Modal, Row, Space, Tag, Typography } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Locations, type DataAddress } from '@/shared/components'
import { useUpdateElectProject } from '@/features/electProjects/api/useElectProjectActions'
import type { ElectProject } from '@/features/electProjects/types'

const { Text } = Typography

// Initial request fields (old-ui ProjectElectEdit valueItem).
function requestValues(p: ElectProject) {
  return {
    electRequestNumber: p.electRequestNumber,
    landlordName: p.landlordName,
    companyName: p.companyName,
    landlordNaCode: p.landlordNaCode,
    landlordPhoneNumber: p.landlordPhoneNumber,
    postalCode: p.postalCode,
    address: p.address,
    numberOfFloor: p.numberOfFloor,
  }
}

// ElectAdmin request edit (old-ui ElectProjectsEdc/ProjectElectEdit.js) as an antd
// modal. Triggered by the request-number tag. Saves via the shared update endpoint.
export function ProjectElectEditModal({ project }: { project: ElectProject }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: project.idSection })
  const update = useUpdateElectProject()

  const onFinish = (values: Record<string, unknown>) => {
    const data = {
      ...requestValues(project),
      ...values,
      id: project.id,
      idSection: +dataAddress.sectionId,
      idCity: +(dataAddress.cityId ?? 0),
      idProvince: +(dataAddress.provinceId ?? 0),
    }
    update.mutate(data, { onSuccess: () => setOpen(false) })
  }

  return (
    <>
      <Tag color="blue" style={{ cursor: 'pointer' }} icon={<EditOutlined />} onClick={() => setOpen(true)}>
        {project.electRequestNumber}
      </Tag>
      <Modal
        title={`ویرایش تقاضا - ${project.electRequestNumber}`}
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose
        okText="ذخیره"
        cancelText="انصراف"
        confirmLoading={update.isPending}
        onOk={() => form.submit()}
        width={620}
      >
        <Space size={16} wrap style={{ marginBottom: 12 }}>
          <Text type="secondary">تاریخ ثبت: {project.solarRegisterDate}</Text>
          <Text type="secondary">ثبت‌کننده: {project.projectCreatedTypeName}</Text>
          <Text type="secondary">نوع درخواست: {project.projectTypeRequestName}</Text>
        </Space>

        <Form form={form} layout="vertical" initialValues={requestValues(project)} onFinish={onFinish}>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="electRequestNumber" label="شماره تقاضا" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="landlordName" label="نام و نام خانوادگی مالک" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            {project.ownershipTypeEnum === 2 && (
              <Col span={12}>
                <Form.Item name="companyName" label="نام شرکت" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
            )}
            <Col span={12}>
              <Form.Item name="landlordNaCode" label="کدملی مالک/شرکت" rules={[{ required: true }]}>
                <Input maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="landlordPhoneNumber" label="شماره تماس" rules={[{ required: true }]}>
                <Input maxLength={11} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="postalCode" label="کد پستی" rules={[{ required: true }]}>
                <Input maxLength={10} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="محل خدمت">
            <Locations setDataAddress={setDataAddress} idSection={project.idSection} isAccessCity={false} />
          </Form.Item>
          <Form.Item name="address" label="آدرس" rules={[{ required: true }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

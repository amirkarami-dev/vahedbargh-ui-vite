import { useState } from 'react'
import { Button, Col, Form, Input, InputNumber, Modal, Row, Typography } from 'antd'
import { Locations, type DataAddress } from '@/shared/components'
import { getRoles } from '@/shared/lib/auth'
import { useUpdateElectProject } from '@/features/electProjects/api/useElectProjectActions'
import type { ElectProject } from '@/features/electProjects/types'

const { Text } = Typography

// old-ui ProjectFileNumber valueItem.
function editValues(p: ElectProject) {
  return {
    landlordName: p.landlordName,
    companyName: p.companyName,
    landlordNaCode: p.landlordNaCode,
    landlordPhoneNumber: p.landlordPhoneNumber,
    postalCode: p.postalCode,
    area: p.area,
    address: p.address,
    numberOfFloor: p.numberOfFloor,
    buildingTypeEnum: p.buildingTypeEnum,
  }
}

// old-ui ElectProjectsPanelMaker/ProjectFileNumber — edit basic project info from
// the file-number cell. Save allowed only at projectLevel 0 (or Administrator).
export function PanelEditModal({ project }: { project: ElectProject }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [dataAddress, setDataAddress] = useState<DataAddress>({ sectionId: project.idSection })
  const update = useUpdateElectProject()

  const canSave = project.projectLevelEnum === 0 || getRoles().includes('Administrator')

  const onFinish = (values: Record<string, unknown>) => {
    const data = {
      ...editValues(project),
      ...values,
      id: project.id,
      buildingTypeEnum: Number(values.buildingTypeEnum ?? project.buildingTypeEnum ?? 0),
      area: Number(values.area ?? 0),
      numberOfFloor: Number(values.numberOfFloor ?? 0),
      IdSection: +dataAddress.sectionId,
      idCity: +(dataAddress.cityId ?? 0),
      idProvince: +(dataAddress.provinceId ?? 0),
    }
    update.mutate(data, { onSuccess: () => setOpen(false) })
  }

  return (
    <>
      <Button size="small" type="primary" onClick={() => setOpen(true)}>
        {project.fileNumber}
      </Button>
      <Modal
        title="ویرایش پرونده"
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose
        width={620}
        footer={
          canSave
            ? undefined
            : <Text type="secondary">جهت تغییر مشخصات به واحد برق مراجعه نمایید</Text>
        }
        okText="ذخیره"
        cancelText="انصراف"
        confirmLoading={update.isPending}
        onOk={canSave ? () => form.submit() : undefined}
        okButtonProps={{ style: canSave ? undefined : { display: 'none' } }}
      >
        <Text type="secondary">تاریخ ثبت: {project.solarRegisterDate}</Text>
        <Form
          form={form}
          layout="vertical"
          initialValues={editValues(project)}
          onFinish={onFinish}
          style={{ marginTop: 12 }}
        >
          <Row gutter={12}>
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
            <Col span={6}>
              <Form.Item name="area" label="مساحت" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="numberOfFloor" label="طبقه" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} />
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

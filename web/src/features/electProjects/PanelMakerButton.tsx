import { useState } from 'react'
import { Button, Col, Divider, Form, Modal, Row, Select } from 'antd'
import { GetCityWithSection } from '@/shared/geo/cityName'
import { useAddPanelMaker, usePanelMakers } from '@/features/electProjects/api/useElectProjectActions'
import type { ElectProject } from '@/features/electProjects/types'

// Assign a panel maker to a project (old-ui ListPanelMaker.js).
export function PanelMakerButton({ project }: { project: ElectProject }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const { data: panelMakers } = usePanelMakers(open)
  const add = useAddPanelMaker()
  const assigned = !!project.panelMaker?.id

  const onFinish = (values: { panelMakerId: string }) => {
    add.mutate(
      { panelMakerId: values.panelMakerId, electProjectId: project.id },
      { onSuccess: () => setOpen(false) },
    )
  }

  const options = (panelMakers ?? []).map(pm => ({
    value: pm.id,
    label: `${pm.companyName} - موبایل:${pm.mobileNumber} - شهر:${GetCityWithSection(pm.idSection)}`,
  }))

  return (
    <>
      <Button
        size="small"
        disabled={project.isTestAndDelivery}
        type={assigned ? 'dashed' : 'primary'}
        onClick={() => setOpen(true)}
      >
        {assigned ? 'انتخاب شده' : 'تابلوساز'}
      </Button>
      <Modal
        title={`انتخاب تابلوساز: ${project.fileNumber}`}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={760}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ panelMakerId: project.panelMaker?.id }}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="panelMakerId"
                label="تابلوساز"
                rules={[{ required: true, message: 'تابلوساز را انتخاب کنید' }]}
              >
                <Select
                  showSearch
                  options={options}
                  filterOption={(input, option) =>
                    String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          {project.panelMaker?.companyName && (
            <div style={{ marginBottom: 12 }}>
              تابلوساز انتخاب شده: {project.panelMaker.companyName}
            </div>
          )}
          <Divider />
          <Row justify="space-between">
            <Button type="primary" htmlType="submit" loading={add.isPending}>
              ذخیره
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              ریست فرم
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

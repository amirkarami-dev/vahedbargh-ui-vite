import { useState } from 'react'
import { Alert, Button, Col, Form, Input, Modal, Radio, Row, Space } from 'antd'
import { useEdcDefect } from '@/features/electProjectProcess/api/useElectProjectProcess'
import type { ElectProject } from '@/features/electProjects/types'

// old-ui ElectProjectProcessEdc/UpdateByEdc — EDC sets the project status
// (approve / defect / archive). Enabled only when the project is at level 8.
export function EdcDefectModal({ project }: { project: ElectProject }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const update = useEdcDefect()
  const status = Form.useWatch('electProjectStatusEnum', form)
  const needNetwork = Form.useWatch('needElectNetwork', form)

  const onOpen = () => {
    form.setFieldsValue({
      des: project.defectDes,
      electProjectStatusEnum: project.electProjectStatusEnum ?? 1,
      needElectNetwork: false,
    })
    setOpen(true)
  }

  const onFinish = (values: Record<string, unknown>) => {
    update.mutate({ ...values, electProjectId: project.id }, { onSuccess: () => setOpen(false) })
  }

  return (
    <>
      <Button size="small" disabled={project.projectLevelEnum !== 8} onClick={onOpen}>
        تعیین وضعیت
      </Button>
      <Modal
        title={`اقدامات بر روی پرونده: ${project.fileNumber}`}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={680}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[8, 8]}>
            {needNetwork && (
              <Col span={24}>
                <Alert type="info" showIcon message="در صورت نیاز به احداث شبکه، کروکی احداث شبکه را بارگذاری نمایید." />
              </Col>
            )}
            {project.projectLevel === 1 && (
              <Col span={24}>
                <Form.Item
                  name="needElectNetwork"
                  label="نیاز به احداث شبکه"
                  rules={[{ required: true, message: 'الزامی می‌باشد' }]}
                >
                  <Radio.Group>
                    <Radio value={true}>نیاز دارد</Radio>
                    <Radio value={false}>نیاز ندارد</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <Form.Item
                name="electProjectStatusEnum"
                label="یک گزینه را انتخاب کنید"
                rules={[{ required: true, message: 'الزامی می‌باشد' }]}
              >
                <Radio.Group>
                  <Radio value={8}>تایید</Radio>
                  <Radio value={6}>نقص</Radio>
                  <Radio value={10}>بایگان</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {status === 6 && (
              <Col span={24}>
                <Form.Item name="des" label="توضیحات" rules={[{ required: true, message: 'توضیحات الزامی می‌باشد' }]}>
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            )}
          </Row>
          <Space>
            <Button type="primary" htmlType="submit" loading={update.isPending}>
              ذخیره
            </Button>
            <Button onClick={() => form.resetFields()}>ریست فرم</Button>
          </Space>
        </Form>
      </Modal>
    </>
  )
}

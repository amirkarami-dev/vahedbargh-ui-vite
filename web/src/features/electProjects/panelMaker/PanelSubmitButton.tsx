import { useState } from 'react'
import { Checkbox, Form, Input, Modal } from 'antd'
import { useSubmitPanel } from '@/features/electProjects/api/useElectProjectActions'
import type { ElectProject } from '@/features/electProjects/types'

// old-ui ElectPanelSubmit — checkbox opens a modal to confirm the panel + serial.
export function PanelSubmitButton({ project }: { project: ElectProject }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const submit = useSubmitPanel()

  const onOpen = () => {
    form.setFieldsValue({ panelSerialNumber: project.panelSerialNumber })
    setOpen(true)
  }

  const onFinish = (values: { panelSerialNumber: string }) => {
    submit.mutate({ id: project.id, panelSerialNumber: values.panelSerialNumber }, {
      onSuccess: () => setOpen(false),
    })
  }

  return (
    <>
      <Checkbox checked={project.panelMakerSubmit} onChange={onOpen} />
      <Modal
        title={`تایید کردن پرونده شماره: ${project.fileNumber}`}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        okText="ذخیره"
        cancelText="انصراف"
        confirmLoading={submit.isPending}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="panelSerialNumber"
            label="شماره سریال تابلو"
            rules={[{ required: true, message: 'شماره سریال الزامی است' }]}
          >
            <Input.TextArea rows={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

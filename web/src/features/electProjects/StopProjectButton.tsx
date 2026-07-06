import { useState } from 'react'
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import { PauseCircleOutlined } from '@ant-design/icons'
import { useStopElectProject } from '@/features/electProjects/api/useElectProjectActions'
import type { ElectProject } from '@/features/electProjects/types'

// Stop / resume a project (old-ui StopElectProject.js). Body: { stopDes, isStop, gpId }.
export function StopProjectButton({ project }: { project: ElectProject }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const stop = useStopElectProject()

  const onFinish = (values: { stopDes: string; isStop?: boolean }) => {
    stop.mutate(
      { stopDes: values.stopDes, isStop: !!values.isStop, gpId: project.id },
      { onSuccess: () => setOpen(false) },
    )
  }

  return (
    <>
      <Button
        size="small"
        danger={project.isStop}
        type={project.isStop ? 'primary' : 'default'}
        icon={<PauseCircleOutlined />}
        onClick={() => setOpen(true)}
      >
        {project.isStop ? 'متوقف' : 'توقف'}
      </Button>
      <Modal
        title={`توقف پرونده ${project.fileNumber}`}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ stopDes: project.stopDes ?? '', isStop: project.isStop ?? false }}
        >
          <Form.Item
            name="stopDes"
            label="توضیحات توقف پرونده"
            rules={[{ required: true, message: 'توضیحات الزامی است' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="isStop" valuePropName="checked">
            <Checkbox>توقف پرونده</Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={stop.isPending}>
            ذخیره
          </Button>
        </Form>
      </Modal>
    </>
  )
}

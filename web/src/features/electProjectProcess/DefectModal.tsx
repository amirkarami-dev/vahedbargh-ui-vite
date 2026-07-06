import { useState } from 'react'
import { Alert, Button, Col, Form, Input, Modal, Row, Space, Typography } from 'antd'
import { useUpdateByEdc } from '@/features/electProjectProcess/api/useElectProjectProcess'
import type { EppRow } from '@/features/electProjectProcess/types'

const { Text, Paragraph } = Typography

// old-ui UpdateByEdc — engineer records the defect-resolution note.
export function DefectModal({ row }: { row: EppRow }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const update = useUpdateByEdc()
  const ep = row.electProject

  const canSave = (!!ep.isDefectEng || !!ep.solvedDefectEng) && row.inspectionStatus === 0

  const onOpen = () => {
    form.setFieldsValue({ des: ep.defectEngDes })
    setOpen(true)
  }

  const onFinish = (values: { des: string }) => {
    update.mutate(
      {
        des: values.des,
        electProjectId: row.electProjectId,
        electProjectStatusEnum: ep.electProjectStatusEnum,
      },
      { onSuccess: () => setOpen(false) },
    )
  }

  return (
    <>
      <Button size="small" onClick={onOpen}>
        تعیین وضعیت
      </Button>
      <Modal
        title={`اقدامات بر روی پرونده: ${row.fileNumber}`}
        open={open}
        onCancel={() => setOpen(false)}
        width={680}
        destroyOnClose
        footer={null}
      >
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Alert
            type="info"
            showIcon
            message="بعد از رفع نقص توضیحات را نوشته و ذخیره کنید. جهت تایید نهایی، اعلام نظر نیز انجام شود."
          />
          <Row gutter={[10, 10]}>
            <Col xs={24} md={8}>
              <Text strong>توضیحات شرکت توزیع:</Text>
              <Paragraph>{ep.defectDes || '-'}</Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <Text strong>توضیحات کارشناس:</Text>
              <Paragraph>{ep.defectEngDes || '-'}</Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <Text strong>توضیحات نظام:</Text>
              <Paragraph>{ep.defectAdminDes || '-'}</Paragraph>
            </Col>
          </Row>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="توضیحات" name="des" rules={[{ required: true, message: 'توضیحات الزامی می‌باشد' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={update.isPending} disabled={!canSave}>
                ذخیره
              </Button>
              {!canSave && (
                <Text type="secondary">
                  تعیین وضعیت فقط در حالت انتظار تایید و هنگام ثبت نقص قابل انجام است.
                </Text>
              )}
            </Space>
          </Form>
        </Space>
      </Modal>
    </>
  )
}

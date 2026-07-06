import { useState } from 'react'
import { Alert, Button, Col, Form, Input, Modal, Radio, Row, Space, Tag } from 'antd'
import { useEppApprove } from '@/features/electProjectProcess/api/useElectProjectProcess'
import type { EppRow } from '@/features/electProjectProcess/types'

// old-ui EppApproved — engineer declares the verdict; project moves to the next stage.
export function EppApproveModal({ row }: { row: EppRow }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const approve = useEppApprove()
  const needElectNetwork = Form.useWatch('needElectNetwork', form)

  const onOpen = () => {
    form.setFieldsValue({
      des: row.description ?? '',
      inspectionStatusEnum: 1,
      needElectNetwork: false,
    })
    setOpen(true)
  }

  const onFinish = (values: { inspectionStatusEnum: number; des: string; needElectNetwork?: boolean }) => {
    approve.mutate({ eppId: row.id, ...values }, { onSuccess: () => setOpen(false) })
  }

  const disabled = !!row.electProject.isOk || row.inspectionStatus === 3

  return (
    <>
      <Button type="primary" size="small" disabled={disabled} onClick={onOpen}>
        اعلام نظر
      </Button>
      <Modal
        title={`تایید پرونده شماره: ${row.fileNumber}`}
        open={open}
        onCancel={() => setOpen(false)}
        width={680}
        destroyOnClose
        footer={null}
      >
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Space wrap>
            <Tag color="blue">{`مرحله: ${row.projectLevelName || '-'}`}</Tag>
            <Tag color={row.electProject.isOk ? 'success' : 'default'}>
              {row.electProject.isOk ? 'قبلا تایید شده' : 'در انتظار اعلام نظر'}
            </Tag>
          </Space>

          {row.projectLevel === 2 && (
            <Alert
              type="warning"
              showIcon
              message="ابتدا برای محاسبه مبلغ تاییدیه ارت، گزینه ذخیره را انتخاب کنید. پس از محاسبه، امکان کنسل پرونده وجود نخواهد داشت."
            />
          )}
          {needElectNetwork && (
            <Alert type="info" showIcon message="در صورت نیاز به احداث شبکه، کروکی احداث شبکه را بارگذاری نمایید." />
          )}

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={[8, 8]}>
              {row.projectLevel === 1 && (
                <Col xs={24} md={12}>
                  <Form.Item
                    label="نیاز به احداث شبکه"
                    name="needElectNetwork"
                    rules={[{ required: true, message: 'انتخاب این گزینه الزامی است' }]}
                  >
                    <Radio.Group>
                      <Radio value={true}>نیاز دارد</Radio>
                      <Radio value={false}>نیاز ندارد</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              )}
              <Col xs={24} md={12}>
                <Form.Item
                  label="وضعیت پرونده"
                  name="inspectionStatusEnum"
                  rules={[{ required: true, message: 'یک گزینه را انتخاب کنید' }]}
                >
                  <Radio.Group>
                    <Radio value={1}>تایید</Radio>
                    <Radio value={3}>کنسل</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="توضیحات" name="des" rules={[{ required: true, message: 'توضیحات الزامی می‌باشد' }]}>
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
            <Space>
              <Button onClick={() => form.resetFields()}>ریست فرم</Button>
              <Button type="primary" htmlType="submit" loading={approve.isPending} disabled={disabled}>
                ذخیره
              </Button>
            </Space>
          </Form>
        </Space>
      </Modal>
    </>
  )
}

import { useEffect } from 'react'
import { Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd'
import { useUpsertStat } from '@/features/admin/landing/api/useAdminLanding'
import { STAT_ICON_OPTIONS } from '@/features/admin/landing/constants'
import type { StatItem } from '@/features/public/landing/types'

export function StatFormModal({
  open,
  editing,
  onClose,
}: {
  open: boolean
  editing: StatItem | null
  onClose: () => void
}) {
  const [form] = Form.useForm()
  const upsert = useUpsertStat()
  const isEdit = !!editing

  useEffect(() => {
    if (!open) return
    form.resetFields()
    if (editing) {
      form.setFieldsValue({ ...editing })
    } else {
      form.setFieldsValue({ value: 0, sortOrder: 0, iconName: 'FileCheck' })
    }
  }, [open, editing, form])

  const onFinish = (v: Record<string, unknown>) => {
    upsert.mutate(
      {
        id: editing?.id,
        label: String(v.label ?? ''),
        value: Number(v.value ?? 0),
        suffix: v.suffix ? String(v.suffix) : undefined,
        iconName: v.iconName ? String(v.iconName) : undefined,
        sortOrder: Number(v.sortOrder ?? 0),
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Modal
      title={isEdit ? 'ویرایش آمار' : 'افزودن آمار'}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={isEdit ? 'ویرایش' : 'ذخیره'}
      cancelText="انصراف"
      confirmLoading={upsert.isPending}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="label" label="عنوان" rules={[{ required: true, message: 'عنوان را وارد کنید' }]}>
          <Input placeholder="پروانه صادرشده" />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="value" label="مقدار" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="suffix" label="پسوند">
              <Input placeholder="+  یا  %" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="iconName" label="آیکون">
              <Select options={STAT_ICON_OPTIONS} showSearch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="sortOrder" label="ترتیب نمایش">
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

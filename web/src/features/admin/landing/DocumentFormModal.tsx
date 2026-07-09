import { useEffect } from 'react'
import { Col, Form, Input, Modal, Row, Select, Switch } from 'antd'
import { useUpsertDocument } from '@/features/admin/landing/api/useAdminLanding'
import type { DocumentItem } from '@/features/public/landing/types'

export function DocumentFormModal({
  open,
  editing,
  onClose,
}: {
  open: boolean
  editing: DocumentItem | null
  onClose: () => void
}) {
  const [form] = Form.useForm()
  const upsert = useUpsertDocument()
  const isEdit = !!editing

  useEffect(() => {
    if (!open) return
    form.resetFields()
    if (editing) {
      form.setFieldsValue({
        title: editing.title,
        category: editing.category,
        jalaliDate: editing.jalaliDate,
        version: editing.version,
        description: editing.description,
        fileSize: editing.fileSize,
        tags: editing.tags ?? [],
        fileUrl: editing.fileUrl,
        featured: editing.featured,
      })
    } else {
      form.setFieldsValue({ featured: false, tags: [] })
    }
  }, [open, editing, form])

  const onFinish = (v: Record<string, unknown>) => {
    upsert.mutate(
      {
        id: editing?.id,
        title: String(v.title ?? ''),
        category: String(v.category ?? ''),
        jalaliDate: v.jalaliDate ? String(v.jalaliDate) : undefined,
        date: editing?.date ?? new Date().toISOString(),
        version: v.version ? String(v.version) : undefined,
        description: v.description ? String(v.description) : undefined,
        fileSize: v.fileSize ? String(v.fileSize) : undefined,
        tags: (v.tags as string[]) ?? [],
        fileUrl: v.fileUrl ? String(v.fileUrl) : undefined,
        featured: Boolean(v.featured),
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Modal
      title={isEdit ? 'ویرایش سند' : 'افزودن سند'}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={isEdit ? 'ویرایش' : 'ذخیره'}
      cancelText="انصراف"
      confirmLoading={upsert.isPending}
      width={720}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={12}>
          <Col span={16}>
            <Form.Item name="title" label="عنوان" rules={[{ required: true, message: 'عنوان را وارد کنید' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="category" label="دسته‌بندی" rules={[{ required: true, message: 'دسته را وارد کنید' }]}>
              <Input placeholder="نظام‌نامه / تعرفه / چک‌لیست ..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item name="jalaliDate" label="تاریخ (شمسی)">
              <Input dir="ltr" placeholder="1405/02/01" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="version" label="نسخه">
              <Input dir="ltr" placeholder="1.0" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="fileSize" label="حجم فایل">
              <Input dir="ltr" placeholder="1.1 MB" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="description" label="توضیحات">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="tags" label="برچسب‌ها">
          <Select mode="tags" tokenSeparators={[',']} placeholder="برچسب را تایپ و Enter بزنید" />
        </Form.Item>
        <Row gutter={12}>
          <Col span={16}>
            <Form.Item name="fileUrl" label="لینک فایل">
              <Input dir="ltr" placeholder="/documents/..." />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="featured" label="ویژه" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

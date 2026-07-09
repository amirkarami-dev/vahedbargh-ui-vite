import { useEffect } from 'react'
import { Col, Form, Input, Modal, Row, Select, Switch } from 'antd'
import { useUpsertAnnouncement } from '@/features/admin/landing/api/useAdminLanding'
import { PRIORITY_OPTIONS } from '@/features/admin/landing/constants'
import type { Announcement } from '@/features/public/landing/types'

export function AnnouncementFormModal({
  open,
  editing,
  onClose,
}: {
  open: boolean
  editing: Announcement | null
  onClose: () => void
}) {
  const [form] = Form.useForm()
  const upsert = useUpsertAnnouncement()
  const isEdit = !!editing

  useEffect(() => {
    if (!open) return
    form.resetFields()
    if (editing) {
      form.setFieldsValue({ ...editing })
    } else {
      form.setFieldsValue({ priority: 'info', featured: false })
    }
  }, [open, editing, form])

  const onFinish = (v: Record<string, unknown>) => {
    upsert.mutate(
      {
        id: editing?.id,
        slug: String(v.slug ?? ''),
        title: String(v.title ?? ''),
        excerpt: v.excerpt ? String(v.excerpt) : undefined,
        content: v.content ? String(v.content) : undefined,
        category: v.category ? String(v.category) : undefined,
        priority: String(v.priority ?? 'info'),
        jalaliDate: v.jalaliDate ? String(v.jalaliDate) : undefined,
        imageUrl: v.imageUrl ? String(v.imageUrl) : undefined,
        featured: Boolean(v.featured),
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Modal
      title={isEdit ? 'ویرایش اطلاعیه' : 'افزودن اطلاعیه'}
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
            <Form.Item
              name="slug"
              label="نامک (slug)"
              rules={[
                { required: true, message: 'نامک را وارد کنید' },
                { pattern: /^[a-zA-Z0-9-_]+$/, message: 'فقط حروف انگلیسی، عدد و خط‌تیره' },
              ]}
            >
              <Input dir="ltr" placeholder="my-announcement" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item name="priority" label="اولویت" rules={[{ required: true }]}>
              <Select options={PRIORITY_OPTIONS} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="category" label="دسته‌بندی">
              <Input placeholder="مثلاً: تعرفه و مالی" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="jalaliDate" label="تاریخ (شمسی)">
              <Input dir="ltr" placeholder="1405/02/01" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="excerpt" label="خلاصه">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="content" label="متن کامل">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Row gutter={12}>
          <Col span={16}>
            <Form.Item name="imageUrl" label="آدرس تصویر">
              <Input dir="ltr" placeholder="/images/..." />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="featured" label="ویژه (شاخص)" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

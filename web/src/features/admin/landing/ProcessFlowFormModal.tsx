import { useEffect } from 'react'
import { Button, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Switch, Typography } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useUpsertProcessFlow } from '@/features/admin/landing/api/useAdminLanding'
import type { AdminProcessFlow } from '@/features/admin/landing/api/adminLandingApi'

type StepForm = {
  title?: string
  description?: string
  details?: string[]
  requiredDocs?: string[]
  tools?: string[]
  note?: string
  isDecision?: boolean
  decisionYes?: string
  decisionNo?: string
}

export function ProcessFlowFormModal({
  open,
  editing,
  onClose,
}: {
  open: boolean
  editing: AdminProcessFlow | null
  onClose: () => void
}) {
  const [form] = Form.useForm()
  const upsert = useUpsertProcessFlow()
  const isEdit = !!editing

  useEffect(() => {
    if (!open) return
    form.resetFields()
    if (editing) {
      form.setFieldsValue({
        key: editing.key,
        title: editing.title,
        subtitle: editing.subtitle,
        icon: editing.icon,
        sortOrder: editing.sortOrder,
        color: editing.color,
        glowColor: editing.glowColor,
        description: editing.description,
        steps: editing.steps ?? [],
      })
    } else {
      form.setFieldsValue({
        sortOrder: 0,
        icon: '🔧',
        color: 'from-blue-500 to-indigo-600',
        glowColor: 'rgba(99,102,241,0.25)',
        steps: [{ isDecision: false, details: [], requiredDocs: [], tools: [] }],
      })
    }
  }, [open, editing, form])

  const onFinish = (v: Record<string, unknown>) => {
    const steps = ((v.steps as StepForm[]) ?? [])
      .filter(s => s?.title)
      .map(s => ({
        title: String(s.title ?? ''),
        description: s.description ? String(s.description) : undefined,
        details: s.details ?? [],
        requiredDocs: s.requiredDocs ?? [],
        tools: s.tools ?? [],
        note: s.note ? String(s.note) : undefined,
        isDecision: Boolean(s.isDecision),
        decisionYes: s.isDecision ? s.decisionYes : undefined,
        decisionNo: s.isDecision ? s.decisionNo : undefined,
      }))
    upsert.mutate(
      {
        id: editing?.id,
        key: String(v.key ?? ''),
        title: String(v.title ?? ''),
        subtitle: v.subtitle ? String(v.subtitle) : undefined,
        description: v.description ? String(v.description) : undefined,
        color: v.color ? String(v.color) : undefined,
        glowColor: v.glowColor ? String(v.glowColor) : undefined,
        icon: v.icon ? String(v.icon) : undefined,
        sortOrder: Number(v.sortOrder ?? 0),
        steps,
      },
      { onSuccess: onClose },
    )
  }

  const tagSelect = (placeholder: string) => (
    <Select mode="tags" tokenSeparators={[',']} placeholder={placeholder} style={{ width: '100%' }} />
  )

  return (
    <Modal
      title={isEdit ? `ویرایش فرآیند: ${editing?.title ?? ''}` : 'افزودن فرآیند'}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={isEdit ? 'ویرایش' : 'ذخیره'}
      cancelText="انصراف"
      confirmLoading={upsert.isPending}
      width={860}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="title" label="عنوان فرآیند" rules={[{ required: true, message: 'عنوان را وارد کنید' }]}>
              <Input placeholder="مثلاً: بازرسی برق" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="key"
              label="کلید (انگلیسی)"
              rules={[
                { required: true, message: 'کلید را وارد کنید' },
                { pattern: /^[a-zA-Z0-9-_]+$/, message: 'فقط حروف انگلیسی، عدد و خط‌تیره' },
              ]}
            >
              <Input dir="ltr" placeholder="inspection" disabled={isEdit} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="sortOrder" label="ترتیب">
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="subtitle" label="زیرعنوان">
              <Input placeholder="راهنمای فرآیند…" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="icon" label="آیکون (ایموجی)">
              <Input placeholder="🔍" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="color" label="گرادیان رنگ (Tailwind)">
              <Input dir="ltr" placeholder="from-blue-500 to-indigo-600" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item name="glowColor" label="رنگ درخشش (rgba)">
              <Input dir="ltr" placeholder="rgba(99,102,241,0.25)" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item name="description" label="توضیحات">
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="right" style={{ margin: '4px 0 12px' }}>
          مراحل فرآیند
        </Divider>

        <Form.List name="steps">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {fields.map(({ key, name, ...rest }, idx) => (
                <div key={key} style={{ border: '1px solid var(--border, #eee)', borderRadius: 10, padding: 12, position: 'relative' }}>
                  <Row gutter={12} align="middle">
                    <Col flex="none">
                      <span style={{ display: 'inline-flex', width: 26, height: 26, borderRadius: '50%', background: 'rgba(9,88,217,0.1)', color: '#0958d9', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                        {idx + 1}
                      </span>
                    </Col>
                    <Col flex="auto">
                      <Form.Item {...rest} name={[name, 'title']} rules={[{ required: true, message: 'عنوان مرحله' }]} style={{ marginBottom: 8 }}>
                        <Input placeholder="عنوان مرحله" />
                      </Form.Item>
                    </Col>
                    <Col flex="none">
                      <Button danger type="text" icon={<DeleteOutlined />} onClick={() => remove(name)} />
                    </Col>
                  </Row>
                  <Form.Item {...rest} name={[name, 'description']} style={{ marginBottom: 8 }}>
                    <Input.TextArea rows={2} placeholder="توضیح مرحله" />
                  </Form.Item>
                  <Row gutter={8}>
                    <Col span={8}>
                      <Form.Item {...rest} name={[name, 'details']} label="جزئیات اجرایی" style={{ marginBottom: 8 }}>
                        {tagSelect('مورد را تایپ و Enter بزنید')}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item {...rest} name={[name, 'requiredDocs']} label="مدارک مورد نیاز" style={{ marginBottom: 8 }}>
                        {tagSelect('مدرک را تایپ و Enter بزنید')}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item {...rest} name={[name, 'tools']} label="ابزار و تجهیزات" style={{ marginBottom: 8 }}>
                        {tagSelect('ابزار را تایپ و Enter بزنید')}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item {...rest} name={[name, 'note']} label="یادداشت (اختیاری)" style={{ marginBottom: 8 }}>
                    <Input placeholder="یادداشت مهم این مرحله" />
                  </Form.Item>
                  <Row gutter={12} align="middle">
                    <Col flex="none">
                      <Form.Item {...rest} name={[name, 'isDecision']} label="مرحلهٔ تصمیم" valuePropName="checked" style={{ marginBottom: 0 }}>
                        <Switch />
                      </Form.Item>
                    </Col>
                    <Col flex="auto">
                      <Form.Item {...rest} name={[name, 'decisionYes']} style={{ marginBottom: 0 }}>
                        <Input placeholder="شرط قبول (مثلاً: ≤ ۱۰ اهم → قبول)" />
                      </Form.Item>
                    </Col>
                    <Col flex="auto">
                      <Form.Item {...rest} name={[name, 'decisionNo']} style={{ marginBottom: 0 }}>
                        <Input placeholder="شرط رد (مثلاً: > ۱۰ اهم → اصلاح)" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}
              <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add({ isDecision: false, details: [], requiredDocs: [], tools: [] })}>
                افزودن مرحله
              </Button>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                شمارهٔ مراحل بر اساس ترتیب همین فهرست تعیین می‌شود.
              </Typography.Text>
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
}

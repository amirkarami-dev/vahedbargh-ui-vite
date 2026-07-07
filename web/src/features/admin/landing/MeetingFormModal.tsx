import { useEffect } from 'react'
import { Button, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Space } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useUpsertMeeting } from '@/features/admin/landing/api/useAdminLanding'
import { MEETING_STATUS_OPTIONS, RESOLUTION_STATUS_OPTIONS } from '@/features/admin/landing/constants'
import type { Meeting } from '@/features/public/landing/types'

export function MeetingFormModal({
  open,
  editing,
  onClose,
}: {
  open: boolean
  editing: Meeting | null
  onClose: () => void
}) {
  const [form] = Form.useForm()
  const upsert = useUpsertMeeting()
  const isEdit = !!editing

  useEffect(() => {
    if (!open) return
    form.resetFields()
    if (editing) {
      form.setFieldsValue({
        sessionNumber: editing.sessionNumber,
        subject: editing.subject,
        jalaliDate: editing.jalaliDate,
        status: editing.status,
        type: editing.type,
        pdfUrl: editing.pdfUrl,
        attendees: editing.attendees ?? [],
        notes: editing.notes,
        resolutions: editing.resolutions?.map(r => ({ text: r.text, status: r.status })) ?? [],
      })
    } else {
      form.setFieldsValue({ status: 'در دستور کار', attendees: [], resolutions: [] })
    }
  }, [open, editing, form])

  const onFinish = (v: Record<string, unknown>) => {
    upsert.mutate(
      {
        id: editing?.id,
        sessionNumber: Number(v.sessionNumber ?? 0),
        subject: String(v.subject ?? ''),
        jalaliDate: v.jalaliDate ? String(v.jalaliDate) : undefined,
        // date is the sort key; preserve on edit, stamp now on create.
        date: editing?.date ?? new Date().toISOString(),
        status: v.status ? String(v.status) : undefined,
        type: v.type ? String(v.type) : undefined,
        pdfUrl: v.pdfUrl ? String(v.pdfUrl) : undefined,
        attendees: (v.attendees as string[]) ?? [],
        notes: v.notes ? String(v.notes) : undefined,
        resolutions: ((v.resolutions as { text: string; status?: string }[]) ?? []).filter(r => r?.text),
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Modal
      title={isEdit ? 'ویرایش جلسه' : 'افزودن جلسه'}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={isEdit ? 'ویرایش' : 'ذخیره'}
      cancelText="انصراف"
      confirmLoading={upsert.isPending}
      width={760}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item name="sessionNumber" label="شماره جلسه" rules={[{ required: true, message: 'الزامی' }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item name="subject" label="موضوع" rules={[{ required: true, message: 'موضوع را وارد کنید' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item name="jalaliDate" label="تاریخ (شمسی)">
              <Input dir="ltr" placeholder="1405/02/15" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="status" label="وضعیت">
              <Select options={MEETING_STATUS_OPTIONS} allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="type" label="نوع">
              <Input placeholder="هیئت رئیسه" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={16}>
            <Form.Item name="attendees" label="حاضرین">
              <Select mode="tags" tokenSeparators={[',']} placeholder="نام را تایپ و Enter بزنید" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="pdfUrl" label="لینک صورت‌جلسه (PDF)">
              <Input dir="ltr" placeholder="/documents/..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="notes" label="یادداشت">
          <Input.TextArea rows={2} />
        </Form.Item>

        <Divider orientation="right" style={{ margin: '8px 0' }}>
          مصوبات
        </Divider>
        <Form.List name="resolutions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }) => (
                <Space key={key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                  <Form.Item
                    {...rest}
                    name={[name, 'text']}
                    rules={[{ required: true, message: 'متن مصوبه' }]}
                    style={{ flex: 1, marginBottom: 0, minWidth: 380 }}
                  >
                    <Input placeholder="متن مصوبه" />
                  </Form.Item>
                  <Form.Item {...rest} name={[name, 'status']} style={{ marginBottom: 0, width: 160 }}>
                    <Select options={RESOLUTION_STATUS_OPTIONS} placeholder="وضعیت" allowClear />
                  </Form.Item>
                  <Button danger type="text" icon={<DeleteOutlined />} onClick={() => remove(name)} />
                </Space>
              ))}
              <Button type="dashed" onClick={() => add({ status: 'در انتظار' })} icon={<PlusOutlined />} block>
                افزودن مصوبه
              </Button>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
}

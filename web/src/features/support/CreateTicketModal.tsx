import { useState } from 'react'
import { Button, Checkbox, Col, Form, Input, Modal, Row, Select, Space, Upload } from 'antd'
import { SendOutlined, UploadOutlined } from '@ant-design/icons'
import { getCurrentUser, getRoles } from '@/shared/lib/auth'
import { getEnumByValue, getEnums } from '@/shared/lib/enums'
import { FileSupportTypeEnum } from '@/shared/enums/fileSupportType'
import { useUsersForSupport } from '@/features/support/api/useSupport'

const TITLES = [
  'مشکل در پرونده',
  'درخواست افزایش ظرفیت',
  'مشکل در حسابداری',
  'مربوط به اطلاعیه',
  'اخطاریه',
  'سایر',
]

type Props = {
  open: boolean
  loading: boolean
  onCancel: () => void
  onSubmit: (fd: FormData) => void
}

type Values = {
  title: string
  toUserId: string
  fileNumber?: string
  message: string
  sendSms?: boolean
}

// Create a new support ticket (old-ui CreateTicketModal.js), with an optional attachment.
export function CreateTicketModal({ open, loading, onCancel, onSubmit }: Props) {
  const [form] = Form.useForm()
  const { data: users, isLoading } = useUsersForSupport()
  const isAdmin = getRoles().includes('Administrator')
  const title = Form.useWatch('title', form)
  const [file, setFile] = useState<File | null>(null)
  const [fileTypeEnum, setFileTypeEnum] = useState<number | undefined>(undefined)

  const reset = () => {
    form.resetFields()
    setFile(null)
    setFileTypeEnum(undefined)
  }

  const handleCancel = () => {
    reset()
    onCancel()
  }

  const handleFinish = (v: Values) => {
    const sid = String(getCurrentUser()?.sid ?? '')
    const fd = new FormData()
    fd.append('title', v.title)
    fd.append('message', v.message)
    fd.append('sendSms', String(v.sendSms || false))
    fd.append('fileNumber', v.fileNumber ?? '')
    fd.append('toRole', '')
    fd.append('userId', sid)
    fd.append('toUserId', v.toUserId ?? '')
    if (file && fileTypeEnum != null) {
      const name = getEnumByValue(FileSupportTypeEnum, fileTypeEnum)?.enum ?? ''
      const ext = file.name.split('.').pop() ?? ''
      fd.append('file', file, `${name}.${ext}`)
      fd.append('name', `support-${name}`)
      fd.append('des', `Upload with-${sid}`)
      fd.append('fileTypeEnum', name)
      fd.append('FolderName', 'Supports')
      fd.append('FileName', `${name}.${ext}`)
    }
    onSubmit(fd)
    reset()
  }

  return (
    <Modal
      title="ارسال تیکت جدید"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={760}
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="موضوع" name="title" rules={[{ required: true, message: 'نباید خالی باشد' }]}>
              <Select
                placeholder="یکی از موضوعات را انتخاب کنید"
                options={TITLES.map(t => ({ value: t, label: t }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="ارسال به"
              name="toUserId"
              rules={[{ required: true, message: 'انتخاب کاربر الزامی است' }]}
            >
              <Select
                showSearch
                allowClear
                loading={isLoading}
                placeholder="کاربر مورد نظر را انتخاب کنید"
                optionFilterProp="label"
                options={(users ?? []).map(u => ({
                  value: u.id,
                  label: `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() || u.name || 'بدون نام',
                }))}
              />
            </Form.Item>
          </Col>
          {title !== 'مربوط به اطلاعیه' && (
            <Col xs={24} md={12}>
              <Form.Item label="شماره پرونده" name="fileNumber">
                <Input placeholder="مثال: 123456" />
              </Form.Item>
            </Col>
          )}
          {isAdmin && (
            <Col xs={24} md={12}>
              <Form.Item label="ارسال پیامک" name="sendSms" valuePropName="checked">
                <Checkbox />
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Form.Item label="توضیحات" name="message" rules={[{ required: true, message: 'نباید خالی باشد' }]}>
              <Input.TextArea rows={4} placeholder="پیام خود را در اینجا بنویسید" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="نوع فایل (اختیاری)">
              <Select
                placeholder="نوع فایل"
                value={fileTypeEnum}
                onChange={setFileTypeEnum}
                options={getEnums(FileSupportTypeEnum)}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Upload
              beforeUpload={f => {
                setFile(f)
                return false
              }}
              maxCount={1}
              accept=".png,.jpg,.jpeg,.pdf"
              onRemove={() => setFile(null)}
            >
              <Button icon={<UploadOutlined />}>پیوست فایل (اختیاری)</Button>
            </Upload>
          </Col>
          <Col span={24}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} icon={<SendOutlined />}>
                ارسال تیکت
              </Button>
              <Button onClick={handleCancel}>انصراف</Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

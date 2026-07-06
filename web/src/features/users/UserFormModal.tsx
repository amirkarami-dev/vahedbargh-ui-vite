import { useEffect } from 'react'
import { Col, Form, Input, Modal, Row, Select } from 'antd'
import { useAddUser, useUpdateUser } from '@/features/users/api/useUsers'
import { USER_ROLES, type ClientUser } from '@/features/users/types'

const roleOptions = USER_ROLES.map(r => ({ value: r, label: r }))

// old-ui Users add/edit modal. Email + password only on create; active only on edit.
export function UserFormModal({
  open,
  editing,
  onClose,
}: {
  open: boolean
  editing: ClientUser | null
  onClose: () => void
}) {
  const [form] = Form.useForm()
  const add = useAddUser()
  const update = useUpdateUser()
  const isEdit = !!editing

  useEffect(() => {
    if (!open) return
    form.resetFields()
    if (editing) {
      form.setFieldsValue({
        firstName: editing.firstName,
        lastName: editing.lastName,
        nickName: editing.nickName,
        phoneNumber: editing.phoneNumber,
        role: editing.role || 'Employee',
        active: editing.active ?? true,
      })
    } else {
      form.setFieldsValue({ role: 'Employee' })
    }
  }, [open, editing, form])

  const onFinish = (values: Record<string, unknown>) => {
    if (isEdit && editing) {
      update.mutate(
        {
          id: editing.id,
          firstName: String(values.firstName ?? ''),
          lastName: String(values.lastName ?? ''),
          nickName: String(values.nickName ?? ''),
          phoneNumber: values.phoneNumber ? String(values.phoneNumber) : undefined,
          role: String(values.role ?? 'Employee'),
          active: Boolean(values.active),
        },
        { onSuccess: onClose },
      )
    } else {
      add.mutate(
        {
          email: String(values.email ?? ''),
          password: String(values.password ?? ''),
          firstName: String(values.firstName ?? ''),
          lastName: String(values.lastName ?? ''),
          nickName: String(values.nickName ?? ''),
          phoneNumber: values.phoneNumber ? String(values.phoneNumber) : undefined,
          role: String(values.role ?? 'Employee'),
        },
        { onSuccess: onClose },
      )
    }
  }

  return (
    <Modal
      title={isEdit ? `ویرایش کاربر: ${editing?.email ?? ''}` : 'افزودن کاربر'}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={isEdit ? 'ویرایش' : 'ذخیره'}
      cancelText="انصراف"
      confirmLoading={add.isPending || update.isPending}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {!isEdit && (
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="email" label="ایمیل" rules={[{ required: true, message: 'ایمیل را وارد کنید' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="password" label="رمز عبور" rules={[{ required: true, message: 'رمز عبور را وارد کنید' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item name="firstName" label="نام" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="lastName" label="نام خانوادگی" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="nickName" label="نام نمایشی" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="phoneNumber" label="شماره تماس">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="role" label="نقش" rules={[{ required: true }]}>
              <Select options={roleOptions} />
            </Form.Item>
          </Col>
          {isEdit && (
            <Col span={12}>
              <Form.Item name="active" label="وضعیت" rules={[{ required: true }]}>
                <Select
                  options={[
                    { value: true, label: 'فعال' },
                    { value: false, label: 'غیرفعال' },
                  ]}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  )
}

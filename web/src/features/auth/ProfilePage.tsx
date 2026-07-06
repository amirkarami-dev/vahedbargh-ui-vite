import { App, Avatar, Button, Card, Col, Form, Input, Row, Space, Tag, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { BRAND } from '@/app/theme'
import { post } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import { getCurrentUser, getRoles } from '@/shared/lib/auth'

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/

// User profile (old-ui Authentication/user-profile): identity + change password.
export function ProfilePage() {
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const user = getCurrentUser()
  const name = String(user?.name ?? user?.sub ?? 'کاربر')
  const roles = getRoles()

  const change = useMutation<unknown, string, { oldPassword: string; newPassword: string }>({
    mutationFn: data => post(endpoints.auth.changePassword, data),
    onSuccess: () => {
      message.success('رمز عبور با موفقیت تغییر کرد')
      form.resetFields()
    },
    onError: e => message.error(String(e)),
  })

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Typography.Title level={4}>پروفایل</Typography.Title>

      <Card size="small" style={{ marginBottom: 16 }}>
        <Space align="center" size={16}>
          <Avatar size={64} style={{ backgroundColor: BRAND }} icon={<UserOutlined />}>
            {name.charAt(0)}
          </Avatar>
          <div>
            <Typography.Title level={5} style={{ margin: 0 }}>
              {name}
            </Typography.Title>
            <Typography.Text type="secondary">نقش‌های شما</Typography.Text>
            <div style={{ marginTop: 4 }}>
              {roles.length ? roles.map(r => <Tag key={r}>{r}</Tag>) : <Tag>—</Tag>}
            </div>
          </div>
        </Space>
      </Card>

      <Card size="small" title="تغییر رمز عبور">
        <Typography.Paragraph type="secondary">
          رمز جدید باید حداقل ۸ کاراکتر و ترکیبی از حرف کوچک، حرف بزرگ و عدد باشد. مثال: bAbcd123
        </Typography.Paragraph>
        <Form form={form} layout="vertical" onFinish={values => change.mutate(values)} style={{ maxWidth: 480 }}>
          <Row gutter={12}>
            <Col xs={24}>
              <Form.Item name="oldPassword" label="رمز قبلی" rules={[{ required: true, message: 'رمز قبلی را وارد کنید' }]}>
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="newPassword"
                label="رمز جدید"
                rules={[
                  { required: true, message: 'رمز جدید را وارد کنید' },
                  { pattern: PASSWORD_PATTERN, message: 'حداقل ۸ کاراکتر شامل حرف کوچک، بزرگ و عدد' },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" loading={change.isPending}>
            تغییر رمز عبور
          </Button>
        </Form>
      </Card>
    </motion.div>
  )
}

import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLogin } from '@/features/auth/api/useAuth'
import type { LoginRequest } from '@/features/auth/types'

const { Title } = Typography

export function Login() {
  const { t } = useTranslation()
  const [form] = Form.useForm<LoginRequest>()
  const [params] = useSearchParams()
  const login = useLogin()

  // Prefill from query (?u=&p=) — same as old-ui.
  useEffect(() => {
    form.setFieldsValue({
      userName: params.get('u') ?? '',
      password: params.get('p') ?? '',
    })
  }, [params, form])

  const onFinish = (values: LoginRequest) => {
    login.mutate(values)
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 16 }}>
      <Card style={{ width: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <Title level={3} style={{ marginBottom: 0 }}>
            {t('app.title')}
          </Title>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          {login.error && (
            <Alert
              type="error"
              showIcon
              closable
              message={String(login.error)}
              style={{ marginBottom: 16 }}
            />
          )}
          <Form.Item
            name="userName"
            label={t('auth.username')}
            rules={[{ required: true, message: t('auth.usernameRequired') }]}
          >
            <Input prefix={<UserOutlined />} size="large" autoComplete="username" />
          </Form.Item>
          <Form.Item
            name="password"
            label={t('auth.password')}
            rules={[{ required: true, message: t('auth.passwordRequired') }]}
          >
            <Input.Password prefix={<LockOutlined />} size="large" autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={login.isPending}>
            {login.isPending ? t('auth.loggingIn') : t('auth.login')}
          </Button>
        </Form>
      </Card>
    </div>
  )
}

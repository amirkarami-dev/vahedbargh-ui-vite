import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLoginByCode } from '@/features/auth/api/useAuth'

const { Title, Paragraph } = Typography

type CodeForm = {
  code: string
}

// Two-factor SMS code step (old-ui SubmitSms). Username comes from ?username=.
export function SubmitSms() {
  const { t } = useTranslation()
  const [params] = useSearchParams()
  const loginByCode = useLoginByCode()
  const userName = params.get('username') ?? ''

  const onFinish = (values: CodeForm) => {
    loginByCode.mutate({ code: values.code, userName })
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 16 }}>
      <Card style={{ width: 380 }}>
        <Title level={4} style={{ textAlign: 'center' }}>
          {t('auth.sms.title')}
        </Title>
        <Paragraph style={{ textAlign: 'center' }}>{t('auth.sms.sent')}</Paragraph>
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          {loginByCode.error && (
            <Alert
              type="error"
              showIcon
              closable
              message={String(loginByCode.error)}
              style={{ marginBottom: 16 }}
            />
          )}
          <Form.Item name="code" rules={[{ required: true, message: t('auth.sms.codeRequired') }]}>
            <Input size="large" inputMode="numeric" placeholder={t('auth.sms.codePlaceholder')} />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loginByCode.isPending}>
            {t('auth.sms.submit')}
          </Button>
        </Form>
      </Card>
    </div>
  )
}

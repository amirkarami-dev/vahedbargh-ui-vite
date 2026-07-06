import { useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Button, Card, Input, Modal, Radio, Space, Typography } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom'
import { usePaymentMelliPublic } from '@/features/public/api/usePublic'

const BANK_ACTION = 'https://ikc.shaparak.ir/iuiv3/IPG/Index/'

// Public payment page (old-ui Accounting/TP, route /tp). Reads `?e=` (project) and
// `?a=` (amount); on submit fetches a bank token and auto-posts to the gateway.
export function PaymentPublicPage() {
  const [params] = useSearchParams()
  const electProjectId = params.get('e') ?? ''
  const amount = params.get('a') ?? ''
  const result = params.get('result')

  const pay = usePaymentMelliPublic()
  const [token, setToken] = useState('')
  const [open, setOpen] = useState(false)
  const [timer, setTimer] = useState(5)
  const formRef = useRef<HTMLFormElement>(null)

  const returnMessage = useMemo(() => {
    if (!result) return null
    if (result.includes('ok')) return `مبلغ به حساب پرونده شما در واحد برق واریز گردید - کد رهگیری: ${result.split('-')[1] ?? ''}`
    if (result.includes('error')) return 'واریز انجام نشد؛ به دفتر نظارت برق نظام مهندسی مراجعه فرمایید.'
    return null
  }, [result])

  const sendToBank = () => {
    if (!electProjectId || !amount) {
      Modal.error({ title: 'خطا', content: 'مشکل در پارامترهای ارسالی' })
      return
    }
    pay.mutate(
      { electProjectId, amount: Number(amount) },
      {
        onSuccess: res => {
          if (res?.token) {
            setToken(res.token)
            setOpen(true)
          }
        },
      },
    )
  }

  // Count down then auto-submit to the gateway — but only while the modal is open,
  // so cancelling clears the timeout and does NOT redirect (old-ui isModalOpenRef guard).
  useEffect(() => {
    if (!token || !open) return
    setTimer(5)
    const interval = setInterval(() => setTimer(t => t - 1), 1000)
    const timeout = setTimeout(() => formRef.current?.submit(), 5000)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [token, open])

  const showCard = !result || !result.includes('ok')
  const formattedAmount = amount ? Number(amount).toLocaleString('en-US') : ''

  return (
    <div style={{ maxWidth: 420, margin: '50px auto', padding: 20 }}>
      {pay.isError && <Alert type="error" showIcon style={{ marginBottom: 12 }} message={String(pay.error)} />}
      {returnMessage && <Alert type="info" showIcon style={{ marginBottom: 12 }} message={returnMessage} />}

      {showCard && (
        <Card title="صفحه پرداخت پرونده نظارت برق">
          <Typography.Paragraph type="secondary">
            پس از پرداخت، پرونده شما در دفتر نظارت برق نظام مهندسی قبل از تخصیص قرار می‌گیرد.
          </Typography.Paragraph>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Radio.Group defaultValue={1}>
              <Radio value={1}>ایران کیش</Radio>
            </Radio.Group>
            <Input addonAfter="ریال" value={formattedAmount} disabled />
            <Button type="primary" block icon={<SendOutlined />} loading={pay.isPending} onClick={sendToBank}>
              ارسال به بانک
            </Button>
          </Space>
        </Card>
      )}

      <Modal
        title="در حال انتقال به درگاه ..."
        open={open}
        onCancel={() => setOpen(false)}
        footer={<Button onClick={() => setOpen(false)}>انصراف از پرداخت</Button>}
      >
        <form ref={formRef} method="post" action={BANK_ACTION} encType="multipart/form-data">
          <input type="hidden" name="tokenIdentity" value={token} />
        </form>
        <Typography.Text>زمان انتقال: {timer} ثانیه</Typography.Text>
      </Modal>
    </div>
  )
}

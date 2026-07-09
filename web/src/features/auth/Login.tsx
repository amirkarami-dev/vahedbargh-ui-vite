import { useEffect } from 'react'
import { Alert, Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { ArrowLeft, LogIn, ShieldCheck, Zap } from 'lucide-react'
import { PowerTower } from '@/features/public/landing/components/PowerTower'
import { useLogin } from '@/features/auth/api/useAuth'
import { useResolvedTheme } from '@/shared/stores/layoutStore'
import type { LoginRequest } from '@/features/auth/types'
import '@/styles/landing.css'

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const FEATURES = [
  { icon: ShieldCheck, text: 'نظارت فنی بر اجرای پروژه‌های برق' },
  { icon: Zap, text: 'سیستم ارت، تست و تحویل تأسیسات' },
]

export function Login() {
  const { t } = useTranslation()
  const [form] = Form.useForm<LoginRequest>()
  const [params] = useSearchParams()
  const login = useLogin()
  const resolved = useResolvedTheme()

  // Prefill from query (?u=&p=) — same as old-ui.
  useEffect(() => {
    form.setFieldsValue({ userName: params.get('u') ?? '', password: params.get('p') ?? '' })
  }, [params, form])

  const onFinish = (values: LoginRequest) => login.mutate(values)

  return (
    <div className={`landing${resolved === 'dark' ? ' dark' : ''}`} dir="rtl" style={{ minHeight: '100vh' }}>
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
        {/* ── Branded visual panel (always dark) ── */}
        <aside
          className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12"
          style={{ background: 'linear-gradient(150deg, #0b1220 0%, #0f1b35 55%, #0b1120 100%)', color: '#EAF0FA' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(120,150,200,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,200,0.06) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 60% 30%, black, transparent 80%)',
              maskImage: 'radial-gradient(ellipse 90% 70% at 60% 30%, black, transparent 80%)',
            }}
          />
          <div className="absolute -top-24 right-0 w-[460px] h-[460px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(245,166,35,0.14)' }} />

          {/* brand */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden p-1">
              <img src="/logo.png" alt="لوگو" width={44} height={44} className="object-contain" />
            </div>
            <div>
              <p className="font-bold text-base leading-tight">دفتر اجرایی نظارت برق</p>
              <p className="text-xs" style={{ color: '#A7B4C9' }}>سازمان نظام مهندسی ساختمان استان کردستان</p>
            </div>
          </motion.div>

          {/* illustration */}
          <div className="relative z-10 flex-1 flex items-center justify-center py-6">
            <div className="w-full max-w-[380px]">
              <PowerTower />
            </div>
          </div>

          {/* tagline + features */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative z-10 space-y-4">
            <h2 className="text-2xl font-extrabold leading-snug">
              سامانهٔ یکپارچهٔ مدیریت و <span className="text-gold-gradient">نظارت</span> پروژه‌های برق
            </h2>
            <div className="space-y-2.5">
              {FEATURES.map(f => {
                const Icon = f.icon
                return (
                  <div key={f.text} className="flex items-center gap-3 text-sm" style={{ color: '#C6D1E4' }}>
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(245,166,35,0.14)' }}>
                      <Icon className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                    </span>
                    {f.text}
                  </div>
                )
              })}
            </div>
            <p className="text-xs tracking-[0.3em] pt-1" style={{ color: '#6C7A93' }}>نظارت&nbsp;·&nbsp;ایمنی&nbsp;·&nbsp;کیفیت</p>
          </motion.div>
        </aside>

        {/* ── Form panel (adapts to theme) ── */}
        <main className="relative flex items-center justify-center p-6 sm:p-10" style={{ background: 'var(--bg-base)' }}>
          <Link
            to="/"
            className="absolute top-6 right-6 inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            بازگشت به صفحه اصلی
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
            className="w-full max-w-sm"
          >
            {/* compact brand for mobile */}
            <motion.div variants={item} className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center overflow-hidden p-1 shadow">
                <img src="/logo.png" alt="لوگو" width={40} height={40} className="object-contain" />
              </div>
              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>دفتر اجرایی نظارت برق</p>
            </motion.div>

            <motion.div variants={item} className="mb-7">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(245,166,35,0.12)' }}>
                <LogIn className="w-6 h-6" style={{ color: 'var(--gold)' }} />
              </div>
              <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{t('auth.login')}</h1>
              <p className="mt-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                برای ورود، نام کاربری و گذرواژهٔ خود را وارد کنید.
              </p>
            </motion.div>

            <motion.div variants={item}>
              <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} size="large">
                {login.error && (
                  <Alert type="error" showIcon closable message={String(login.error)} style={{ marginBottom: 16 }} />
                )}
                <Form.Item
                  name="userName"
                  label={t('auth.username')}
                  rules={[{ required: true, message: t('auth.usernameRequired') }]}
                >
                  <Input prefix={<UserOutlined />} autoComplete="username" placeholder={t('auth.username')} />
                </Form.Item>
                <Form.Item
                  name="password"
                  label={t('auth.password')}
                  rules={[{ required: true, message: t('auth.passwordRequired') }]}
                >
                  <Input.Password prefix={<LockOutlined />} autoComplete="current-password" placeholder={t('auth.password')} />
                </Form.Item>
                <Button
                  htmlType="submit"
                  block
                  loading={login.isPending}
                  icon={!login.isPending ? <LogIn size={16} /> : undefined}
                  style={{
                    height: 48, marginTop: 4, border: 'none', fontWeight: 700,
                    background: 'var(--gold-bright)', color: '#141003',
                    boxShadow: '0 8px 24px rgba(255,197,61,0.30)',
                  }}
                >
                  {login.isPending ? t('auth.loggingIn') : t('auth.login')}
                </Button>
              </Form>
            </motion.div>

            <motion.p variants={item} className="mt-8 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
              دفتر اجرایی نظارت برق — سازمان نظام مهندسی ساختمان استان کردستان
            </motion.p>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

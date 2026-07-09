import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, Bell, LogIn, ShieldCheck, Zap } from 'lucide-react'
import { PowerTower } from '@/features/public/landing/components/PowerTower'
import { isAuthenticated } from '@/shared/lib/auth'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

// Domains shown as chips under the CTAs (decorative — office focus areas).
const DOMAINS = ['طرح برق', 'نظارت برق', 'سیستم ارت', 'تست و تحویل', 'شناسنامهٔ ارت', 'بازرسی فنی', 'تعرفه‌ها']

export function HeroSection() {
  const authed = isAuthenticated()
  const loginTo = authed ? '/dashboard' : '/login'
  const loginLabel = authed ? 'ورود به داشبورد' : 'ورود به سامانه'

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--page-hero-gradient)' }}>
      {/* faint grid, faded at the edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          opacity: 0.55,
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 78%)',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 78%)',
        }}
      />
      {/* glows */}
      <div className="absolute top-24 right-0 w-[520px] h-[420px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(245,166,35,0.12)' }} />
      <div className="absolute bottom-0 left-0 w-[460px] h-[380px] rounded-full blur-[110px] pointer-events-none" style={{ background: 'rgba(37,99,235,0.10)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Text column ── */}
          <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <motion.div variants={item}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ background: 'rgba(245,166,35,0.10)', border: '1px solid rgba(245,166,35,0.25)', color: 'var(--gold)' }}
              >
                <Zap className="w-4 h-4" />
                سازمان نظام مهندسی ساختمان استان کردستان
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[var(--text-primary)]"
              style={{ lineHeight: 1.35 }}
            >
              دفتر اجرایی <span className="text-gold-gradient">نظارت برق</span>
            </motion.h1>

            <motion.p variants={item} className="max-w-xl text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              سامانهٔ یکپارچهٔ مدیریت، نظارت و هماهنگی پروژه‌های برق — از نظارت بر طراحی و اجرا تا تست، تحویل و صدور
              شناسنامهٔ ارت، همراه مطمئن شما در تمام مراحل پروژه.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-1">
              <Link
                to={loginTo}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'var(--gold-bright)', color: '#141003', boxShadow: '0 8px 28px rgba(255,197,61,0.35)' }}
              >
                <LogIn className="w-4 h-4" />
                {loginLabel}
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link
                to="/announcements"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium border border-[var(--border-active)] text-[var(--text-primary)] hover:bg-[var(--bg-raised)] transition-colors"
              >
                <Bell className="w-4 h-4" />
                مشاهده اطلاعیه‌ها
              </Link>
            </motion.div>

            <motion.div variants={item} className="mt-2">
              <p className="text-sm text-[var(--text-muted)] mb-3">حوزه‌های تخصصی ما</p>
              <div className="flex flex-wrap gap-2">
                {DOMAINS.map(d => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Illustration column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative max-w-[520px] mx-auto">
              <PowerTower />

              {/* floating card — top */}
              <div
                className="absolute -top-2 right-2 sm:right-0 flex items-center gap-3 px-4 py-3 rounded-xl glass"
                style={{ border: '1px solid var(--border)' }}
              >
                <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(245,166,35,0.15)' }}>
                  <Zap className="w-4.5 h-4.5" style={{ color: 'var(--gold)' }} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">تست و تحویل</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">اندازه‌گیری مقاومت زمین</p>
                </div>
              </div>

              {/* floating card — bottom */}
              <div
                className="absolute bottom-6 left-0 sm:-left-2 flex items-center gap-3 px-4 py-3 rounded-xl glass"
                style={{ border: '1px solid var(--border)' }}
              >
                <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(245,166,35,0.15)' }}>
                  <ShieldCheck className="w-4.5 h-4.5" style={{ color: 'var(--gold)' }} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">شناسنامهٔ ارت</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">صدور گواهی رسمی پس از تست</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

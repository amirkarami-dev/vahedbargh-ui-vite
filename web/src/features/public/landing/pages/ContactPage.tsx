import { useState, type FormEvent } from 'react'
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useSendContact } from '@/features/public/landing/api/usePublicContent'

export function ContactPage() {
  const { mutate, isPending, isSuccess } = useSendContact()
  const [form, setForm] = useState({ name: '', email: '', mobile: '', subject: '', message: '' })

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate(form)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">تماس با ما</h1>
          <p className="text-[var(--text-secondary)] mt-2">با دفتر اجرایی نظارت برق در ارتباط باشید</p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] overflow-hidden mb-8 h-64 bg-[var(--bg-raised)] flex items-center justify-center">
          <div className="text-center text-[var(--text-muted)]">
            <MapPin className="w-10 h-10 mx-auto mb-2 text-blue-400" />
            <p className="text-sm">سنندج، میدان کوهنورد، ساختمان نظام مهندسی</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
            <h2 className="font-bold text-[var(--text-primary)] mb-4">ارسال پیام</h2>
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600/15 flex items-center justify-center mx-auto mb-3">
                  <Send className="w-7 h-7 text-emerald-400" />
                </div>
                <p className="text-emerald-400 font-medium">پیام شما ارسال شد</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">در اسرع وقت پاسخ خواهیم داد</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label="نام و نام خانوادگی" placeholder="نام کامل" value={form.name} onChange={set('name')} required />
                <Field label="ایمیل" placeholder="you@example.com" type="email" value={form.email} onChange={set('email')} required />
                <Field label="شماره تماس" placeholder="۰۹۱۲۳۴۵۶۷۸۹" value={form.mobile} onChange={set('mobile')} required />
                <Field label="موضوع" placeholder="موضوع پیام" value={form.subject} onChange={set('subject')} required />
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">پیام</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={set('message')}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-base)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500 text-sm resize-none"
                    placeholder="متن پیام خود را بنویسید..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {isPending ? 'در حال ارسال…' : 'ارسال پیام'}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
              <h2 className="font-bold text-[var(--text-primary)] mb-4">اطلاعات تماس</h2>
              <ul className="space-y-4">
                <InfoRow icon={<MapPin className="w-4 h-4 text-blue-400" />} label="آدرس">
                  سنندج، میدان کوهنورد، ساختمان سازمان نظام مهندسی ساختمان استان کردستان
                </InfoRow>
                <InfoRow icon={<Phone className="w-4 h-4 text-blue-400" />} label="تلفن" dir="ltr">
                  ۰۸۷-۳۳۲۷۰۰۰۰
                </InfoRow>
                <InfoRow icon={<Mail className="w-4 h-4 text-blue-400" />} label="ایمیل">
                  info@inse-kurdistan.ir
                </InfoRow>
                <InfoRow icon={<Clock className="w-4 h-4 text-blue-400" />} label="ساعات کاری">
                  شنبه تا چهارشنبه — ۸ تا ۱۶
                </InfoRow>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm text-[var(--text-secondary)] mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-base)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500 text-sm"
      />
    </div>
  )
}

function InfoRow({
  icon,
  label,
  dir,
  children,
}: {
  icon: React.ReactNode
  label: string
  dir?: 'ltr' | 'rtl'
  children: React.ReactNode
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-[var(--text-muted)] mb-0.5">{label}</p>
        <p className="text-sm text-[var(--text-secondary)]" dir={dir}>
          {children}
        </p>
      </div>
    </li>
  )
}

import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Zap } from 'lucide-react'
import { NAV_ITEMS, ORG_NAME, SITE_NAME } from '@/features/public/landing/lib/constants'
import { toPersianNumber } from '@/features/public/landing/lib/persianNumber'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-600/15 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-500" />
            </div>
            <span className="font-bold text-[var(--text-primary)]">{SITE_NAME}</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{ORG_NAME}</p>
        </div>

        {/* nav */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-[var(--text-primary)]">دسترسی سریع</h4>
          <ul className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <Link to={item.href} className="text-sm text-[var(--text-secondary)] hover:text-blue-500 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-[var(--text-primary)]">تماس با ما</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-[var(--text-secondary)]">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              سنندج، میدان کوهنورد
            </li>
            <li className="flex items-center gap-2" dir="ltr">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              {toPersianNumber('۰۸۷-۳۳۲۷۰۰۰۰')}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              info@inse-kurdistan.ir
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-[var(--text-muted)]">
          © {toPersianNumber('۱۴۰۵')} {ORG_NAME} — تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  )
}

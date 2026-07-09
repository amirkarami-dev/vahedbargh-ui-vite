import { useState } from 'react'
import { GOLD, INK, MUTE } from '@/features/public/landing/learning/tokens'
import { DeviceSim } from '@/features/public/landing/learning/simulator/DeviceSim'
import { ExaminerChat } from '@/features/public/landing/learning/simulator/ExaminerChat'

// «شبیه ساز تست و تحویل» — two modes:
//  1) میز کار دستگاه‌ها: interactive instrument bench (from the attached design)
//  2) آزمون شفاهی: scripted IEC 60364-6 examiner chat
type Mode = 'bench' | 'exam'

const MODES: { id: Mode; label: string; icon: string }[] = [
  { id: 'bench', label: 'میز کار دستگاه‌ها', icon: '🔌' },
  { id: 'exam', label: 'آزمون شفاهی با ممتحن', icon: '👨‍🏫' },
]

export function SimulatorTab() {
  const [mode, setMode] = useState<Mode>('bench')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22, animation: 'learnRise 0.5s cubic-bezier(0.22,1,0.36,1) both' }}>
      {/* section header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: INK }}>
          شبیه‌ساز <span style={{ color: GOLD }}>تست و تحویل</span> تاسیسات برقی
        </h2>
        <p style={{ margin: 0, fontSize: 15.5, fontWeight: 300, color: MUTE, lineHeight: 1.9, maxWidth: 760, textWrap: 'pretty' }}>
          مقادیر ورودی را تغییر بده، آزمون را اجرا کن و نتیجه را روی صفحهٔ دستگاه ببین — یا با ممتحن، آزمون شفاهی
          بر پایهٔ IEC 60364-6 بده.
        </p>
        <div
          style={{
            fontSize: 13, color: MUTE, borderInlineStart: '3px solid #F59E0B',
            background: 'rgba(245,158,11,0.07)', padding: '8px 12px', borderRadius: 8, maxWidth: 760,
          }}
        >
          این یک محیط آموزشی است. مقادیر اندازه‌گیری شبیه‌سازی شده‌اند و جایگزین دستگاه و آزمون واقعی نیستند.
        </div>
      </div>

      {/* mode switch */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {MODES.map(m => {
          const on = m.id === mode
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 12,
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: on ? 700 : 400,
                border: on ? '1px solid rgba(255,197,61,0.6)' : '1px solid var(--border)',
                background: on ? 'rgba(255,197,61,0.12)' : 'var(--bg-elevated)',
                color: on ? GOLD : MUTE, transition: 'all 0.2s ease',
              }}
            >
              <span>{m.icon}</span>
              {m.label}
            </button>
          )
        })}
      </div>

      {mode === 'bench' ? <DeviceSim /> : <ExaminerChat />}
    </div>
  )
}

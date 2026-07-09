import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EarthTab } from '@/features/public/landing/learning/EarthTab'
import { TestTab } from '@/features/public/landing/learning/TestTab'
import { MeterCourse } from '@/features/public/landing/learning/MeterCourse'
import { SimulatorTab } from '@/features/public/landing/learning/simulator/SimulatorTab'
import { GOLD, INK, MUTE } from '@/features/public/landing/learning/tokens'

type Tab = 'earth' | 'test' | 'course' | 'simulator'

const TABS: { id: Tab; label: string }[] = [
  { id: 'earth', label: 'آموزش اتصال ارت' },
  { id: 'test', label: 'آموزش تست و تحویل تاسیسات برقی' },
  { id: 'course', label: 'دوره کنتور' },
  { id: 'simulator', label: 'شبیه ساز تست و تحویل' },
]

const isTab = (v: string | null): v is Tab =>
  v === 'earth' || v === 'test' || v === 'course' || v === 'simulator'

// Theme-adaptive Learning Center (مرکز آموزش). The active tab syncs with the
// `?tab=` query param so the «شبیه ساز» nav item can deep-link into it.
export function LearningPage() {
  const [params, setParams] = useSearchParams()
  const urlTab = params.get('tab')
  const [tab, setTabState] = useState<Tab>(isTab(urlTab) ? urlTab : 'earth')

  // Follow URL changes (e.g. clicking «آموزش» or «شبیه ساز» while on this page).
  useEffect(() => {
    if (isTab(urlTab)) {
      setTabState(urlTab)
    } else if (!urlTab) {
      setTabState('earth')
    }
  }, [urlTab])

  const setTab = (t: Tab) => {
    setTabState(t)
    setParams(t === 'earth' ? {} : { tab: t }, { replace: true })
  }

  return (
    <section
      dir="rtl"
      style={{
        position: 'relative', overflow: 'hidden', width: '100%', minHeight: '100vh',
        background: 'var(--bg-base)', color: INK, boxSizing: 'border-box',
      }}
    >
      {/* background grid + glow */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(120,150,200,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(120,150,200,0.06) 1px, transparent 1px)', backgroundSize: '56px 56px', WebkitMaskImage: 'radial-gradient(ellipse 100% 60% at 50% 0%, black 20%, transparent 100%)', maskImage: 'radial-gradient(ellipse 100% 60% at 50% 0%, black 20%, transparent 100%)' }} />
      <div style={{ position: 'absolute', right: -220, top: -120, width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,197,61,0.12) 0%, transparent 70%)', animation: 'learnGlow 7s ease-in-out infinite' }} />

      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '112px 24px 96px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 48 }}>
        {/* header */}
        <header style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720, animation: 'learnRise 0.8s cubic-bezier(0.22,1,0.36,1) both' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', padding: '8px 16px', border: '1px solid rgba(224,148,85,0.4)', borderRadius: 999, background: 'rgba(224,148,85,0.08)', color: '#E09455', fontSize: 14, fontWeight: 500 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#E09455', boxShadow: '0 0 10px 2px rgba(224,148,85,0.7)', animation: 'learnSpark 1.8s ease-in-out infinite' }} />
            بخش آموزش
          </span>
          <h1 style={{ margin: 0, fontSize: 48, lineHeight: 1.35, fontWeight: 900, color: INK }}>مرکز <span style={{ color: GOLD }}>آموزش</span></h1>
        </header>

        {/* tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: -28 }}>
          {TABS.map(t => {
            const on = t.id === tab
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 26px', borderRadius: 12,
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: 16.5, fontWeight: on ? 700 : 400,
                  border: on ? '1px solid rgba(255,197,61,0.6)' : '1px solid rgba(120,150,200,0.25)',
                  background: on ? 'rgba(255,197,61,0.12)' : 'transparent', color: on ? GOLD : MUTE, transition: 'all 0.25s ease',
                }}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {tab === 'earth' && <EarthTab />}
        {tab === 'test' && <TestTab />}
        {tab === 'course' && <MeterCourse />}
        {tab === 'simulator' && <SimulatorTab />}
      </div>
    </section>
  )
}

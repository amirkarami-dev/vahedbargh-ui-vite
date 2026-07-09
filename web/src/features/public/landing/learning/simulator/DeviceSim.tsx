import { useState, type CSSProperties, type ReactNode } from 'react'
import { INK, MUTE, cardBg, cardBorder } from '@/features/public/landing/learning/tokens'

// Interactive instrument bench — ported from the attached
// "electrical-test-simulator.html". Page chrome follows the theme variables;
// the instrument screens/plot stay dark on purpose (they are device LCDs).
const ACCENT = '#22B8CF'
const PASS = '#10B981'
const FAIL = '#EF4444'
const WARN = '#F59E0B'
const LIME = '#C4D82E'
const SCREEN_BG = '#0A0D12'
const SCREEN_LINE = '#2A313C'
const SCREEN_MUTE = '#8A94A6'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const round = (x: number, n: number) => {
  const f = 10 ** n
  return Math.round(x * f) / f
}
const faTime = () =>
  new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

type Status = 'idle' | 'busy' | 'pass' | 'fail'
type Screen = { status: Status; value: string; unit: string; sub: string; extra?: string }
type SheetRow = { name: string; value: string; limit: string; pass: boolean; time: string }

const idle = (sub: string): Screen => ({ status: 'idle', value: '— —', unit: '', sub })

// ---------- shared UI ----------
const selectStyle: CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: 9, fontFamily: 'inherit', fontSize: 14,
  background: 'var(--bg-raised)', color: 'var(--text-primary)', border: '1px solid var(--border)',
}

function Field({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, color: MUTE, marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  )
}

function RunButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        marginTop: 2, padding: 12, borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
        fontWeight: 700, fontSize: 15, color: '#08252b', border: 'none',
        background: 'linear-gradient(180deg,#54d6ea,#2fb8d0)',
      }}
    >
      {children}
    </button>
  )
}

function PanelHead({ title, clause, desc }: { title: string; clause: string; desc: string }) {
  return (
    <div>
      <h3 style={{ margin: '0 0 3px', fontSize: 17, fontWeight: 700, color: INK }}>{title}</h3>
      <span style={{ fontSize: 12, color: ACCENT, fontFamily: MONO, direction: 'ltr', display: 'inline-block' }}>{clause}</span>
      <p style={{ fontSize: 13, color: MUTE, margin: '4px 0 0', lineHeight: 1.8 }}>{desc}</p>
    </div>
  )
}

function ScreenBox({ title, s }: { title: string; s: Screen }) {
  const led =
    s.status === 'busy' ? { background: WARN, boxShadow: `0 0 10px ${WARN}`, animation: 'learnSpark 0.6s infinite' }
    : s.status === 'pass' ? { background: PASS, boxShadow: `0 0 12px ${PASS}` }
    : s.status === 'fail' ? { background: FAIL, boxShadow: `0 0 12px ${FAIL}` }
    : { background: '#3a4250' }
  const small = s.value.length > 5 || /[A-Za-z]/.test(s.value)
  return (
    <div
      style={{
        background: SCREEN_BG, border: `1px solid ${SCREEN_LINE}`, borderRadius: 12, padding: '20px 16px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 210,
        boxShadow: 'inset 0 2px 18px rgba(0,0,0,.6)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: SCREEN_MUTE, fontFamily: MONO, direction: 'ltr' }}>{title}</span>
        <span style={{ width: 11, height: 11, borderRadius: '50%', transition: '.2s', ...led }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, direction: 'ltr' }}>
        <span
          style={{
            fontFamily: MONO, fontWeight: 700, fontSize: small ? 34 : 48, lineHeight: 1,
            color: ACCENT, textShadow: '0 0 16px rgba(34,184,207,.35)', letterSpacing: 1,
          }}
        >
          {s.status === 'busy' ? '— — —' : s.value}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 20, color: SCREEN_MUTE }}>{s.unit}</span>
      </div>
      {(s.status === 'pass' || s.status === 'fail') && (
        <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: s.status === 'pass' ? PASS : FAIL }}>
          {s.status === 'pass' ? 'قبول (PASS)' : 'مردود (FAIL)'}
        </div>
      )}
      {s.extra && (
        <div style={{ marginTop: 8, fontSize: 12, color: SCREEN_MUTE, fontFamily: MONO, direction: 'ltr' }}>{s.extra}</div>
      )}
      <div style={{ fontSize: 13, color: SCREEN_MUTE, marginTop: 12 }}>{s.status === 'busy' ? 'در حال اندازه‌گیری…' : s.sub}</div>
    </div>
  )
}

const cardStyle: CSSProperties = {
  display: 'grid', gap: 16, background: cardBg, border: cardBorder, borderRadius: 14, padding: 18,
}
const controlsStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 14 }

// ---------- fall-of-potential plot ----------
function FopPlot({ r }: { r: number | null }) {
  if (r == null) return null
  const W = 340, H = 200, mL = 40, mR = 14, mT = 14, mB = 28
  const pw = W - mL - mR, ph = H - mT - mB
  const pts: [number, number][] = []
  let ymax = 0
  for (let x = 2; x <= 98; x += 2) {
    const plateau = r * (1 / (1 + Math.exp(-(x - 30) / 8)))
    const rise = x > 72 ? r * ((x - 72) / 28) ** 2 * 1.6 : 0
    const y = plateau + rise
    pts.push([x, y])
    if (y > ymax) ymax = y
  }
  ymax = Math.max(ymax, r * 1.15)
  const sx = (x: number) => mL + (x / 100) * pw
  const sy = (y: number) => mT + ph - (y / ymax) * ph
  const d = pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1)).join(' ')
  const x62 = sx(62), yR = sy(r)
  return (
    <div style={{ marginTop: 14, background: SCREEN_BG, border: `1px solid ${SCREEN_LINE}`, borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 12, color: SCREEN_MUTE, marginBottom: 6 }}>
        منحنی افت پتانسیل ۶۲٪ — مقاومت بر حسب موقعیت میله‌ی پتانسیل
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {[0, 0.5, 1].map(f => (
          <line key={f} x1={mL} y1={sy(ymax * f)} x2={W - mR} y2={sy(ymax * f)} stroke="#232a34" />
        ))}
        <line x1={mL} y1={mT} x2={mL} y2={H - mB} stroke="#3a4250" />
        <line x1={mL} y1={H - mB} x2={W - mR} y2={H - mB} stroke="#3a4250" />
        <path d={d} fill="none" stroke={ACCENT} strokeWidth="2.2" />
        <line x1={x62} y1={mT} x2={x62} y2={H - mB} stroke={LIME} strokeDasharray="4 3" strokeWidth="1.2" />
        <line x1={mL} y1={yR} x2={x62} y2={yR} stroke={LIME} strokeDasharray="4 3" strokeWidth="1.2" />
        <circle cx={x62} cy={yR} r="4" fill={LIME} />
        <text x={x62} y={H - mB + 16} fill={LIME} fontSize="11" textAnchor="middle" fontFamily="monospace">62%</text>
        <text x={mL - 6} y={yR + 3} fill={SCREEN_MUTE} fontSize="10" textAnchor="end" fontFamily="monospace">{round(r, 1)}Ω</text>
        <text x={W - mR} y={H - mB + 16} fill={SCREEN_MUTE} fontSize="9" textAnchor="end" fontFamily="monospace">فاصله میله</text>
      </svg>
    </div>
  )
}

// ---------- main ----------
type DevTab = 'ins' | 'rcd' | 'earth' | 'loop'
const DEV_TABS: { id: DevTab; label: string }[] = [
  { id: 'ins', label: 'مقاومت عایقی' },
  { id: 'rcd', label: 'عملکرد RCD' },
  { id: 'earth', label: 'مقاومت الکترود زمین' },
  { id: 'loop', label: 'امپدانس حلقه Zs' },
]

export function DeviceSim() {
  const [tab, setTab] = useState<DevTab>('ins')
  const [sheet, setSheet] = useState<SheetRow[]>([])
  const log = (name: string, value: string, limit: string, pass: boolean) =>
    setSheet(prev => [{ name, value, limit, pass, time: faTime() }, ...prev])

  // --- insulation ---
  const [insV, setInsV] = useState('500')
  const [insCond, setInsCond] = useState('healthy')
  const [insS, setInsS] = useState<Screen>(idle('برای شروع، آزمون را اجرا کنید.'))
  const runIns = () => {
    setInsS({ status: 'busy', value: '', unit: 'MΩ', sub: '' })
    window.setTimeout(() => {
      const v = +insV
      const limit = v === 250 ? 0.5 : 1.0
      let mo = insCond === 'healthy' ? rand(50, 500) : insCond === 'damp' ? rand(0.3, 1.6) : rand(0.02, 0.35)
      mo = round(mo, 2)
      const disp = mo >= 500 ? '>500' : String(mo)
      const pass = mo >= limit
      setInsS({ status: pass ? 'pass' : 'fail', value: disp, unit: 'MΩ', sub: `ولتاژ آزمون ${v}V — حداقل مجاز ${limit} MΩ` })
      log('مقاومت عایقی', disp + ' MΩ', '≥ ' + limit + ' MΩ', pass)
    }, 520)
  }

  // --- RCD ---
  const [rcdIdn, setRcdIdn] = useState('30')
  const [rcdFaulty, setRcdFaulty] = useState(false)
  const [rcdS, setRcdS] = useState<Screen>(idle('یکی از ضریب‌ها را بزنید تا آزمون اجرا شود.'))
  const runRcd = (mult: number) => {
    setRcdS({ status: 'busy', value: '', unit: 'ms', sub: '' })
    window.setTimeout(() => {
      let value: string, unit = 'ms', pass: boolean, sub: string, limit: string
      if (mult === 0.5) {
        limit = 'بدون قطع'
        if (rcdFaulty) {
          value = String(Math.round(rand(60, 300))); pass = false; sub = 'در ۰٫۵×IΔn قطع کرد — نادرست'
        } else {
          value = 'OK'; unit = ''; pass = true; sub = 'در ۰٫۵×IΔn قطع نکرد — صحیح'
        }
      } else if (mult === 1) {
        limit = '≤ 300 ms'
        const v = Math.round(rcdFaulty ? rand(320, 900) : rand(25, 280))
        value = String(v); pass = v <= 300; sub = 'حد مجاز عملکرد عمومی: ۳۰۰ میلی‌ثانیه'
      } else {
        limit = '≤ 40 ms'
        const v = Math.round(rcdFaulty ? rand(46, 120) : rand(8, 38))
        value = String(v); pass = v <= 40; sub = 'حد مجاز در ۵×IΔn: ۴۰ میلی‌ثانیه'
      }
      setRcdS({ status: pass ? 'pass' : 'fail', value, unit, sub })
      log(`RCD ${mult}×IΔn (${rcdIdn}mA)`, unit ? value + ' ms' : 'بدون قطع', limit, pass)
    }, 520)
  }

  // --- earth ---
  const [eSoil, setESoil] = useState('500')
  const [eLen, setELen] = useState(2)
  const [eRods, setERods] = useState(1)
  const [eIdn, setEIdn] = useState('30')
  const [eS, setES] = useState<Screen>(idle('آزمون را اجرا کنید تا منحنی افت پتانسیل رسم شود.'))
  const [eR, setER] = useState<number | null>(null)
  const runEarth = () => {
    setES({ status: 'busy', value: '', unit: 'Ω', sub: '' })
    window.setTimeout(() => {
      const rho = +eSoil, L = eLen, n = eRods, idn = +eIdn
      const d = 0.016
      const R1 = (rho / (2 * Math.PI * L)) * (Math.log((8 * L) / d) - 1)
      let R = (R1 / n) * (1 + 0.15 * (n - 1))
      R = Math.max(R, 0.5)
      const maxRA = 50 / (idn / 1000)
      const pass = R <= maxRA
      const disp = R < 100 ? String(round(R, 1)) : String(Math.round(R))
      setES({ status: pass ? 'pass' : 'fail', value: disp, unit: 'Ω', sub: `سیستم TT — حداکثر RA برای ${idn}mA برابر ${Math.round(maxRA)} Ω` })
      setER(R)
      log('مقاومت الکترود زمین', disp + ' Ω', '≤ ' + Math.round(maxRA) + ' Ω', pass)
    }, 520)
  }

  // --- loop ---
  const [lZe, setLZe] = useState(0.35)
  const [lArea, setLArea] = useState('2.5')
  const [lLen, setLLen] = useState(30)
  const [lDev, setLDev] = useState('B16')
  const [lS, setLS] = useState<Screen>(idle('آزمون را اجرا کنید.'))
  const runLoop = () => {
    setLS({ status: 'busy', value: '', unit: 'Ω', sub: '' })
    window.setTimeout(() => {
      const rho = 0.0175 * 1.2
      const R1R2 = (2 * rho * lLen) / +lArea
      const zs = lZe + R1R2
      const type = lDev[0]
      const In = +lDev.slice(1)
      const Ia = (type === 'B' ? 5 : 10) * In
      const maxZs = 230 / Ia
      const If = 230 / zs
      const pass = zs <= maxZs
      setLS({
        status: pass ? 'pass' : 'fail', value: String(round(zs, 2)), unit: 'Ω',
        sub: `کلید ${lDev} — حداکثر Zs مجاز ${round(maxZs, 2)} Ω`,
        extra: `Ze ${lZe}Ω + (R1+R2) ${round(R1R2, 2)}Ω · If ≈ ${Math.round(If)} A`,
      })
      log(`امپدانس حلقه Zs (${lDev})`, round(zs, 2) + ' Ω', '≤ ' + round(maxZs, 2) + ' Ω', pass)
    }, 520)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* device tabs */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        {DEV_TABS.map(t => {
          const on = t.id === tab
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              style={{
                whiteSpace: 'nowrap', cursor: 'pointer', padding: '9px 15px', borderRadius: 10,
                fontFamily: 'inherit', fontSize: 14, fontWeight: on ? 700 : 500, transition: '.15s',
                border: on ? `1px solid ${ACCENT}` : '1px solid var(--border)',
                background: on ? 'rgba(34,184,207,0.1)' : 'var(--bg-elevated)',
                color: on ? ACCENT : MUTE,
              }}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* insulation */}
      {tab === 'ins' && (
        <div style={cardStyle} className="grid md:grid-cols-2">
          <div style={controlsStyle}>
            <PanelHead title="تست مقاومت عایقی" clause="Clause 6.4.3.3 — Table 6.1" desc="مقاومت عایق بین هادی‌ها و زمین را می‌سنجد. مقدار پایین یعنی نشت جریان و عایق ضعیف." />
            <Field label="ولتاژ آزمون">
              <select style={selectStyle} value={insV} onChange={e => setInsV(e.target.value)}>
                <option value="250">۲۵۰ ولت (SELV / PELV) — حداقل ۰٫۵ مگااهم</option>
                <option value="500">۵۰۰ ولت (تا ۵۰۰V) — حداقل ۱٫۰ مگااهم</option>
                <option value="1000">۱۰۰۰ ولت (بالای ۵۰۰V) — حداقل ۱٫۰ مگااهم</option>
              </select>
            </Field>
            <Field label="وضعیت مدار">
              <select style={selectStyle} value={insCond} onChange={e => setInsCond(e.target.value)}>
                <option value="healthy">عایق سالم و خشک</option>
                <option value="damp">رطوبت / آلودگی</option>
                <option value="damaged">عایق آسیب‌دیده</option>
              </select>
            </Field>
            <RunButton onClick={runIns}>اجرای آزمون</RunButton>
          </div>
          <ScreenBox title="INSULATION" s={insS} />
        </div>
      )}

      {/* RCD */}
      {tab === 'rcd' && (
        <div style={cardStyle} className="grid md:grid-cols-2">
          <div style={controlsStyle}>
            <PanelHead title="تست عملکرد کلید جریان باقی‌مانده (RCD)" clause="Clause 6.4.3.7" desc="زمان قطع RCD در جریان‌های مختلف بررسی می‌شود. در ۰٫۵ برابر نباید قطع کند؛ در ۱ و ۵ برابر باید سریع قطع کند." />
            <Field label="جریان نامی IΔn">
              <select style={selectStyle} value={rcdIdn} onChange={e => setRcdIdn(e.target.value)}>
                <option value="30">۳۰ میلی‌آمپر</option>
                <option value="100">۱۰۰ میلی‌آمپر</option>
                <option value="300">۳۰۰ میلی‌آمپر</option>
              </select>
            </Field>
            <Field label="ضریب جریان آزمون">
              <div style={{ display: 'flex', gap: 8 }}>
                {[0.5, 1, 5].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => runRcd(m)}
                    style={{
                      flex: 1, padding: 10, borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit',
                      fontWeight: 600, fontSize: 14, background: 'var(--bg-raised)',
                      color: 'var(--text-primary)', border: '1px solid var(--border)', transition: '.15s',
                    }}
                  >
                    {m === 0.5 ? '۰٫۵' : m === 1 ? '۱' : '۵'}× IΔn
                  </button>
                ))}
              </div>
            </Field>
            <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: MUTE, cursor: 'pointer' }}>
              <input type="checkbox" checked={rcdFaulty} onChange={e => setRcdFaulty(e.target.checked)} style={{ width: 17, height: 17, accentColor: FAIL }} />
              شبیه‌سازی RCD معیوب
            </label>
          </div>
          <ScreenBox title="RCD · TRIP TIME" s={rcdS} />
        </div>
      )}

      {/* earth */}
      {tab === 'earth' && (
        <>
          <div style={cardStyle} className="grid md:grid-cols-2">
            <div style={controlsStyle}>
              <PanelHead title="تست مقاومت الکترود زمین" clause="Clause 6.4.3.6 — روش افت پتانسیل ۶۲٪" desc="مقاومت میله‌ی ارت نسبت به زمین اندازه‌گیری می‌شود. مقدار پایین‌تر بهتر است." />
              <Field label="نوع خاک (مقاومت ویژه ρ)">
                <select style={selectStyle} value={eSoil} onChange={e => setESoil(e.target.value)}>
                  <option value="50">رس / خاک زراعی مرطوب (۵۰ Ω·m)</option>
                  <option value="500">ماسه‌ای (۵۰۰ Ω·m)</option>
                  <option value="3000">سنگی / خشک (۳۰۰۰ Ω·m)</option>
                </select>
              </Field>
              <Field label={<>طول میله (متر) — <b style={{ color: INK, fontFamily: MONO }}>{eLen}</b></>}>
                <input type="range" min={1} max={3} step={0.5} value={eLen} onChange={e => setELen(+e.target.value)} style={{ width: '100%', accentColor: ACCENT }} />
              </Field>
              <Field label={<>تعداد میله موازی — <b style={{ color: INK, fontFamily: MONO }}>{eRods}</b></>}>
                <input type="range" min={1} max={3} step={1} value={eRods} onChange={e => setERods(+e.target.value)} style={{ width: '100%', accentColor: ACCENT }} />
              </Field>
              <Field label="جریان نامی RCD سیستم TT (برای حد مجاز)">
                <select style={selectStyle} value={eIdn} onChange={e => setEIdn(e.target.value)}>
                  <option value="30">۳۰ میلی‌آمپر</option>
                  <option value="100">۱۰۰ میلی‌آمپر</option>
                  <option value="300">۳۰۰ میلی‌آمپر</option>
                  <option value="500">۵۰۰ میلی‌آمپر</option>
                </select>
              </Field>
              <RunButton onClick={runEarth}>اجرای آزمون</RunButton>
            </div>
            <ScreenBox title="EARTH · RA" s={eS} />
          </div>
          <FopPlot r={eR} />
        </>
      )}

      {/* loop */}
      {tab === 'loop' && (
        <div style={cardStyle} className="grid md:grid-cols-2">
          <div style={controlsStyle}>
            <PanelHead title="تست امپدانس حلقه اتصال کوتاه (Zs)" clause="Clause 6.4.3.7 — قطع خودکار در ۰٫۴ ثانیه" desc="Zs = Ze + (R1+R2). باید کمتر از حداکثر مجاز کلید حفاظتی باشد تا قطع سریع تضمین شود." />
            <Field label={<>امپدانس بیرونی حلقه Ze — <b style={{ color: INK, fontFamily: MONO }}>{lZe}</b> Ω</>}>
              <input type="range" min={0.1} max={1} step={0.05} value={lZe} onChange={e => setLZe(+e.target.value)} style={{ width: '100%', accentColor: ACCENT }} />
            </Field>
            <Field label="سطح مقطع کابل (mm²)">
              <select style={selectStyle} value={lArea} onChange={e => setLArea(e.target.value)}>
                <option value="1.5">۱٫۵</option>
                <option value="2.5">۲٫۵</option>
                <option value="4">۴</option>
                <option value="6">۶</option>
              </select>
            </Field>
            <Field label={<>طول مدار (متر) — <b style={{ color: INK, fontFamily: MONO }}>{lLen}</b></>}>
              <input type="range" min={5} max={100} step={5} value={lLen} onChange={e => setLLen(+e.target.value)} style={{ width: '100%', accentColor: ACCENT }} />
            </Field>
            <Field label="کلید حفاظتی (MCB)">
              <select style={selectStyle} value={lDev} onChange={e => setLDev(e.target.value)}>
                <option value="B6">تیپ B — ۶ آمپر</option>
                <option value="B10">تیپ B — ۱۰ آمپر</option>
                <option value="B16">تیپ B — ۱۶ آمپر</option>
                <option value="B32">تیپ B — ۳۲ آمپر</option>
                <option value="C16">تیپ C — ۱۶ آمپر</option>
                <option value="C32">تیپ C — ۳۲ آمپر</option>
              </select>
            </Field>
            <RunButton onClick={runLoop}>اجرای آزمون</RunButton>
          </div>
          <ScreenBox title="LOOP · Zs" s={lS} />
        </div>
      )}

      {/* test sheet */}
      <div style={{ background: cardBg, border: cardBorder, borderRadius: 14, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 10 }}>
          <h3 style={{ fontSize: 16, margin: 0, fontWeight: 700, color: INK }}>تست شیت — گزارش تاییدیه (Clause 6.4.4)</h3>
          <button
            type="button"
            onClick={() => setSheet([])}
            style={{ background: 'var(--bg-raised)', color: MUTE, border: '1px solid var(--border)', padding: '7px 13px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}
          >
            پاک کردن
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 560 }}>
            <thead>
              <tr>
                {['#', 'آزمون', 'مقدار اندازه‌گیری', 'حد مجاز', 'نتیجه', 'زمان'].map(h => (
                  <th key={h} style={{ textAlign: 'right', padding: '10px 10px', borderBottom: '1px solid var(--border)', color: MUTE, fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sheet.length === 0 ? (
                <tr><td colSpan={6} style={{ color: MUTE, fontSize: 13, padding: '14px 4px' }}>هنوز آزمونی ثبت نشده است.</td></tr>
              ) : (
                sheet.map((r, i) => (
                  <tr key={i}>
                    <td style={{ padding: '10px 10px', borderBottom: '1px solid var(--border)', color: MUTE }}>{sheet.length - i}</td>
                    <td style={{ padding: '10px 10px', borderBottom: '1px solid var(--border)', color: INK }}>{r.name}</td>
                    <td style={{ padding: '10px 10px', borderBottom: '1px solid var(--border)' }}><span style={{ fontFamily: MONO, direction: 'ltr', display: 'inline-block', color: INK }}>{r.value}</span></td>
                    <td style={{ padding: '10px 10px', borderBottom: '1px solid var(--border)' }}><span style={{ fontFamily: MONO, direction: 'ltr', display: 'inline-block', color: MUTE }}>{r.limit}</span></td>
                    <td style={{ padding: '10px 10px', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: r.pass ? 'rgba(16,185,129,.14)' : 'rgba(239,68,68,.14)', color: r.pass ? PASS : FAIL }}>
                        {r.pass ? 'قبول' : 'مردود'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 10px', borderBottom: '1px solid var(--border)' }}><span style={{ fontFamily: MONO, direction: 'ltr', display: 'inline-block', color: MUTE }}>{r.time}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { GOLD, INK, MUTE, cardBg, cardBorder, softBg, softBorder } from '@/features/public/landing/learning/tokens'

// آزمون شفاهی با ممتحن — a scripted examiner (IEC 60364-6) that follows the
// user's scenario: one question at a time, realistic "measured" values, the
// student judges pass/fail, and a score + one improvement tip at the end.
const PASS = '#10B981'
const FAIL = '#EF4444'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const round = (x: number, n: number) => {
  const f = 10 ** n
  return Math.round(x * f) / f
}

type Topic = 'instrument' | 'procedure' | 'limit' | 'judge'
type Choice = { t: string; ok?: boolean; ex?: string }
type Step = { q: string; topic: Topic; choices: Choice[] }
type Measured = { text: string; pass: boolean; limit: string; ex: string }
type Scenario = { title: string; intro: string; steps: Step[]; measure: () => Measured }

const SCENARIOS: Scenario[] = [
  {
    title: 'RCD ۳۰ میلی‌آمپر',
    intro: 'سناریو ۱: روی مدار پریزهای آشپزخانه یک کلید RCD با IΔn = 30mA نصب شده. می‌خواهیم عملکردش را تست کنیم.',
    steps: [
      {
        q: 'اول بگو: با کدام دستگاه این تست را انجام می‌دهی؟',
        topic: 'instrument',
        choices: [
          { t: 'تستر RCD (دستگاه مولتی‌فانکشن)', ok: true },
          { t: 'میگر (تستر عایقی)', ex: 'میگر برای مقاومت عایقی است؛ تست RCD دستگاه مخصوص اندازه‌گیری زمان قطع می‌خواهد.' },
          { t: 'کلمپ آمپرمتر', ex: 'کلمپ فقط جریان را می‌خواند؛ زمان قطع RCD را نمی‌سنجد. دستگاه درست: تستر RCD.' },
        ],
      },
      {
        q: 'در جریان ۰٫۵×IΔn انتظار داری چه اتفاقی بیفتد؟',
        topic: 'procedure',
        choices: [
          { t: 'باید زیر ۴۰ms قطع کند', ex: 'نه — قطع در نصف جریان نامی یعنی RCD بیش از حد حساس است. در 0.5×IΔn نباید قطع کند.' },
          { t: 'نباید قطع کند', ok: true },
          { t: 'باید زیر ۳۰۰ms قطع کند', ex: 'نه — در 0.5×IΔn اصلاً نباید قطع کند؛ 300ms حد قطع در 1×IΔn است.' },
        ],
      },
      {
        q: 'حد مجاز زمان قطع در ۱×IΔn چند میلی‌ثانیه است؟',
        topic: 'limit',
        choices: [
          { t: '≤ 40 ms', ex: '40ms مربوط به 5×IΔn است؛ در 1×IΔn حد مجاز ≤300ms است.' },
          { t: '≤ 1000 ms', ex: 'خیلی زیاد است — حد مجاز در 1×IΔn برابر ≤300ms است.' },
          { t: '≤ 300 ms', ok: true },
        ],
      },
    ],
    measure: () => {
      const pass = Math.random() < 0.5
      const v = Math.round(pass ? rand(25, 280) : rand(320, 650))
      return {
        text: `خب، تست را اجرا می‌کنیم. دستگاه در 1×IΔn زمان قطع را ${v} ms نشان می‌دهد. قبول یا مردود؟`,
        pass,
        limit: '≤ 300 ms',
        ex: `حد مجاز در 1×IΔn برابر 300ms است؛ ${v}ms یعنی ${pass ? 'قبول' : 'مردود'}.`,
      }
    },
  },
  {
    title: 'الکترود زمین در خاک ماسه‌ای',
    intro: 'سناریو ۲: یک میله ارت ۲ متری در خاک ماسه‌ای کوبیده شده. سیستم TT است و RCD مدار 30mA دارد. باید مقاومت الکترود را بسنجیم.',
    steps: [
      {
        q: 'با کدام دستگاه و روش اندازه می‌گیری؟',
        topic: 'instrument',
        choices: [
          { t: 'ارت‌سنج سه‌ترمیناله — روش افت پتانسیل', ok: true },
          { t: 'لوپ‌تستر', ex: 'لوپ‌تستر امپدانس حلقه را می‌سنجد؛ برای مقاومت الکترود، ارت‌سنج و روش افت پتانسیل لازم است.' },
          { t: 'ولت‌متر معمولی', ex: 'ولت‌متر مقاومت زمین را نمی‌سنجد. دستگاه درست: ارت‌سنج (روش افت پتانسیل).' },
        ],
      },
      {
        q: 'میل ولتاژ (P) را کجا قرار می‌دهی؟',
        topic: 'procedure',
        choices: [
          { t: 'دقیقاً وسط مسیر (۵۰٪)', ex: 'نقطهٔ درست 62٪ فاصله بین الکترود و میل جریان است تا از ناحیهٔ مقاومتی هر دو خارج باشد.' },
          { t: 'در ۶۲٪ فاصله بین الکترود و میل جریان', ok: true },
          { t: 'چسبیده به الکترود اصلی', ex: 'این‌طور فقط مقاومت ناحیهٔ نزدیک را می‌خوانی؛ جای درست 62٪ فاصله است.' },
        ],
      },
      {
        q: 'در سیستم TT با RCD 30mA حداکثر RA مجاز چقدر است؟',
        topic: 'limit',
        choices: [
          { t: 'همیشه ≤ 2 Ω', ex: 'قاعدهٔ TT این است: RA × IΔn ≤ 50V → برای 30mA حدود 1666Ω. حد 2Ω مربوط به ضوابط دیگری است.' },
          { t: 'همیشه ≤ 10 Ω', ex: 'نه — معیار TT فرمول RA ≤ 50/IΔn است؛ برای 30mA یعنی ≈1666Ω.' },
          { t: 'RA ≤ 50/IΔn ≈ 1666 Ω', ok: true },
        ],
      },
    ],
    measure: () => {
      const pass = Math.random() < 0.5
      const v = Math.round(pass ? rand(120, 1500) : rand(1700, 2600))
      return {
        text: `اندازه می‌گیریم… ارت‌سنج مقدار RA را ${v} Ω نشان می‌دهد. قبول یا مردود؟`,
        pass,
        limit: '≤ 1666 Ω (50/IΔn)',
        ex: `RA × IΔn باید ≤ 50V باشد؛ برای 30mA یعنی حداکثر ≈1666Ω. پس ${v}Ω یعنی ${pass ? 'قبول' : 'مردود'}.`,
      }
    },
  },
  {
    title: 'Zs روی کلید B16',
    intro: 'سناریو ۳: مدار پریز با MCB تیپ B و جریان نامی ۱۶ آمپر (U0 = 230V). باید امپدانس حلقهٔ Zs را کنترل کنیم.',
    steps: [
      {
        q: 'با کدام دستگاه Zs را اندازه می‌گیری؟',
        topic: 'instrument',
        choices: [
          { t: 'لوپ‌تستر (اندازه‌گیری امپدانس حلقه)', ok: true },
          { t: 'ارت‌سنج سه‌ترمیناله', ex: 'ارت‌سنج مقاومت الکترود را می‌سنجد؛ Zs را باید با لوپ‌تستر روی مدار برق‌دار اندازه گرفت.' },
          { t: 'میگر', ex: 'میگر مدار بی‌برق می‌خواهد و عایق را می‌سنجد؛ Zs با لوپ‌تستر اندازه‌گیری می‌شود.' },
        ],
      },
      {
        q: 'قبل از تست حلقه، کدام آزمون باید انجام و قبول شده باشد؟',
        topic: 'procedure',
        choices: [
          { t: 'تست RCD', ex: 'برعکس — تست حلقه باید قبل از RCD انجام شود. پیش‌نیاز تست حلقه، پیوستگی هادی حفاظتی است.' },
          { t: 'پیوستگی هادی حفاظتی', ok: true },
          { t: 'سنجش شدت روشنایی', ex: 'ربطی ندارد — بدون اطمینان از پیوستگی PE، تست حلقه معنی ندارد و خطرناک است.' },
        ],
      },
      {
        q: 'حداکثر Zs مجاز چقدر است؟ (جریان قطع آنی تیپ B برابر ۵×In)',
        topic: 'limit',
        choices: [
          { t: '230/16 ≈ 14.4 Ω', ex: 'باید بر جریان قطع آنی تقسیم کنی نه جریان نامی: Ia = 5×16 = 80A → Zs ≤ 230/80 ≈ 2.87Ω.' },
          { t: '5 Ω', ex: 'نه — فرمول Zs ≤ U0/Ia است: 230/(5×16) ≈ 2.87Ω.' },
          { t: '230/80 ≈ 2.87 Ω', ok: true },
        ],
      },
    ],
    measure: () => {
      const pass = Math.random() < 0.5
      const v = round(pass ? rand(0.9, 2.7) : rand(3.05, 4.3), 2)
      return {
        text: `لوپ‌تستر Zs را ${v} Ω نشان می‌دهد. قبول یا مردود؟`,
        pass,
        limit: '≤ 2.87 Ω (U0/Ia)',
        ex: `Zs ≤ U0/Ia = 230/80 = 2.87Ω. پس ${v}Ω یعنی ${pass ? 'قبول' : 'مردود'}.`,
      }
    },
  },
  {
    title: 'مقاومت عایقی ۵۰۰ ولت',
    intro: 'سناریو ۴ (آخری): مدار روشنایی 230V را با ولتاژ آزمون 500V DC تست عایقی می‌کنیم.',
    steps: [
      {
        q: 'با کدام دستگاه تست می‌کنی؟',
        topic: 'instrument',
        choices: [
          { t: 'میگر (تستر مقاومت عایقی)', ok: true },
          { t: 'تستر RCD', ex: 'تستر RCD زمان قطع را می‌سنجد؛ عایق را باید با میگر و ولتاژ DC تست کرد.' },
          { t: 'توالی‌سنج فاز', ex: 'توالی‌سنج فقط ترتیب فازها را نشان می‌دهد. دستگاه درست: میگر.' },
        ],
      },
      {
        q: 'قبل از اعمال ۵۰۰ ولت چه می‌کنی؟',
        topic: 'procedure',
        choices: [
          { t: 'مدار را بی‌برق و تجهیزات حساس و SPD را جدا می‌کنم', ok: true },
          { t: 'همان‌طور زیر بار تست می‌کنم', ex: 'خطرناک و غلط — تست عایقی روی مدار برق‌دار یا با تجهیزات متصل هم خطر دارد هم نتیجه را خراب می‌کند.' },
          { t: 'فقط فیوز را می‌کشم و دستگاه‌ها را متصل می‌گذارم', ex: 'تجهیزات متصل می‌توانند آسیب ببینند و قرائت را پایین بیاورند؛ باید جدا شوند.' },
        ],
      },
      {
        q: 'حداقل مقاومت عایقی مجاز برای این مدار (تست 500V) چقدر است؟',
        topic: 'limit',
        choices: [
          { t: '≥ 0.5 MΩ', ex: '0.5MΩ برای SELV/PELV با تست 250V است؛ برای مدار تا 500V حد ≥1.0MΩ است.' },
          { t: '≥ 1.0 MΩ', ok: true },
          { t: '≥ 100 Ω', ex: 'خیلی کم است — حد درست ≥1.0MΩ (یک میلیون اهم) است.' },
        ],
      },
    ],
    measure: () => {
      const pass = Math.random() < 0.5
      const v = pass ? round(rand(2, 180), 1) : round(rand(0.1, 0.9), 2)
      return {
        text: `میگر عدد ${v} MΩ نشان می‌دهد. قبول یا مردود؟`,
        pass,
        limit: '≥ 1.0 MΩ',
        ex: `حداقل مجاز برای این مدار 1.0MΩ است؛ پس ${v}MΩ یعنی ${pass ? 'قبول' : 'مردود'}.`,
      }
    },
  },
]

const TIPS: Record<Topic, string> = {
  instrument: 'برای هر آزمون اول دستگاه درست را انتخاب کن — میگر، تستر RCD، ارت‌سنج و لوپ‌تستر هرکدام کار خودشان را دارند.',
  procedure: 'ترتیب و پیش‌نیازهای آزمون‌ها را مرور کن: بازرسی چشمی → پیوستگی → عایقی → حلقه → RCD.',
  limit: 'حدود مجاز را حفظ کن: عایقی ≥0.5/1.0MΩ، RCD ≤300ms و ≤40ms، سیستم TT: RA ≤ 50/IΔn، حلقه: Zs ≤ U0/Ia.',
  judge: 'هر عدد اندازه‌گیری را با حد مجاز استاندارد مقایسه کن، نه با حدس — اول حد را بنویس، بعد قضاوت کن.',
}

type Msg = { role: 'ex' | 'st'; text: string; tone?: 'ok' | 'bad' }
type Phase = 'step' | 'judge' | 'next' | 'done'

export function ExaminerChat() {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [si, setSi] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('step')
  const [measured, setMeasured] = useState<Measured | null>(null)
  const [score, setScore] = useState({ ok: 0, total: 0 })
  const [misses, setMisses] = useState<Topic[]>([])
  const boxRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  const push = (...m: Msg[]) => setMsgs(prev => [...prev, ...m])

  useEffect(() => {
    if (started.current) return
    started.current = true
    push(
      { role: 'ex', text: 'سلام! من ممتحن بازرسی و تست تاسیسات برقی هستم (بر پایهٔ IEC 60364-6). چند سناریو با هم کار می‌کنیم — هر بار یک سؤال. آماده‌ای؟' },
      { role: 'ex', text: SCENARIOS[0].intro },
      { role: 'ex', text: SCENARIOS[0].steps[0].q },
    )
  }, [])

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs])

  const sc = SCENARIOS[si]

  const answerStep = (c: Choice) => {
    const step = sc.steps[stepIdx]
    const okAnswer = sc.steps[stepIdx].choices.find(x => x.ok)?.t ?? ''
    setScore(s => ({ ok: s.ok + (c.ok ? 1 : 0), total: s.total + 1 }))
    if (!c.ok) setMisses(m => [...m, step.topic])
    const fb: Msg = c.ok
      ? { role: 'ex', text: 'درست است ✅', tone: 'ok' }
      : { role: 'ex', text: `درست نیست ❌ — ${c.ex ?? `پاسخ درست: ${okAnswer}`}`, tone: 'bad' }

    if (stepIdx + 1 < sc.steps.length) {
      push({ role: 'st', text: c.t }, fb, { role: 'ex', text: sc.steps[stepIdx + 1].q })
      setStepIdx(stepIdx + 1)
    } else {
      const m = sc.measure()
      setMeasured(m)
      push({ role: 'st', text: c.t }, fb, { role: 'ex', text: m.text })
      setPhase('judge')
    }
  }

  const answerJudge = (guessPass: boolean) => {
    if (!measured) return
    const correct = guessPass === measured.pass
    setScore(s => ({ ok: s.ok + (correct ? 1 : 0), total: s.total + 1 }))
    if (!correct) setMisses(m => [...m, 'judge'])
    const fb: Msg = correct
      ? { role: 'ex', text: `قضاوت درستی بود ✅ (حد مجاز: ${measured.limit})`, tone: 'ok' }
      : { role: 'ex', text: `نه ❌ — ${measured.ex}`, tone: 'bad' }

    if (si + 1 < SCENARIOS.length) {
      push({ role: 'st', text: guessPass ? 'قبول' : 'مردود' }, fb, { role: 'ex', text: 'خوب پیش می‌ری. آماده‌ای بریم سناریوی بعد؟' })
      setPhase('next')
    } else {
      const total = score.total + 1
      const ok = score.ok + (correct ? 1 : 0)
      const missList = correct ? misses : [...misses, 'judge' as Topic]
      const tip = missList.length ? TIPS[missList[0]] : 'عالی بود! برای تمرین بیشتر، مقادیر را در «میز کار دستگاه‌ها» تغییر بده و دوباره قضاوت کن.'
      push(
        { role: 'st', text: guessPass ? 'قبول' : 'مردود' },
        fb,
        { role: 'ex', text: `پایان آزمون 🎓 نمرهٔ تو: ${ok} از ${total}.` },
        { role: 'ex', text: `یک نکته برای بهتر شدن: ${tip}` },
      )
      setPhase('done')
    }
  }

  const nextScenario = () => {
    const n = si + 1
    setSi(n)
    setStepIdx(0)
    setMeasured(null)
    push({ role: 'ex', text: SCENARIOS[n].intro }, { role: 'ex', text: SCENARIOS[n].steps[0].q })
    setPhase('step')
  }

  const restart = () => {
    setMsgs([])
    setSi(0)
    setStepIdx(0)
    setPhase('step')
    setMeasured(null)
    setScore({ ok: 0, total: 0 })
    setMisses([])
    push(
      { role: 'ex', text: 'دوباره شروع می‌کنیم — این بار مقادیر جدید می‌گیری. 💪' },
      { role: 'ex', text: SCENARIOS[0].intro },
      { role: 'ex', text: SCENARIOS[0].steps[0].q },
    )
  }

  const choiceBtn: React.CSSProperties = {
    textAlign: 'right', padding: '11px 14px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
    fontSize: 14, lineHeight: 1.8, background: 'var(--bg-elevated)', color: INK,
    border: '1px solid var(--border)', transition: 'border-color .15s',
  }

  return (
    <div style={{ background: cardBg, border: cardBorder, borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,197,61,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👨‍🏫</span>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: INK }}>ممتحن تست و تحویل</p>
          <p style={{ margin: 0, fontSize: 12, color: MUTE, fontFamily: MONO, direction: 'ltr', textAlign: 'right' }}>IEC 60364-6</p>
        </div>
        <span style={{ fontSize: 12.5, color: MUTE }}>
          سناریو {si + 1} از {SCENARIOS.length} · امتیاز <b style={{ color: GOLD }}>{score.ok}</b>/{score.total}
        </span>
      </div>

      {/* messages */}
      <div ref={boxRef} style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 460, overflowY: 'auto' }}>
        {msgs.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === 'ex' ? 'flex-start' : 'flex-end',
              maxWidth: '85%', padding: '10px 14px', borderRadius: 14, fontSize: 14, lineHeight: 1.9,
              animation: 'learnRise 0.35s cubic-bezier(0.22,1,0.36,1) both',
              ...(m.role === 'ex'
                ? {
                    background: softBg, border: softBorder, color: INK,
                    borderInlineStart: m.tone === 'ok' ? `3px solid ${PASS}` : m.tone === 'bad' ? `3px solid ${FAIL}` : undefined,
                  }
                : { background: 'rgba(255,197,61,0.12)', border: '1px solid rgba(255,197,61,0.35)', color: INK }),
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* input area */}
      <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {phase === 'step' && (
          <>
            <p style={{ margin: 0, fontSize: 12, color: MUTE }}>پاسخ خودت را انتخاب کن:</p>
            {sc.steps[stepIdx].choices.map(c => (
              <button key={c.t} type="button" style={choiceBtn} onClick={() => answerStep(c)}>
                {c.t}
              </button>
            ))}
          </>
        )}
        {phase === 'judge' && (
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" style={{ ...choiceBtn, flex: 1, textAlign: 'center', fontWeight: 700, color: PASS, borderColor: 'rgba(16,185,129,0.4)' }} onClick={() => answerJudge(true)}>
              قبول ✓
            </button>
            <button type="button" style={{ ...choiceBtn, flex: 1, textAlign: 'center', fontWeight: 700, color: FAIL, borderColor: 'rgba(239,68,68,0.4)' }} onClick={() => answerJudge(false)}>
              مردود ✗
            </button>
          </div>
        )}
        {phase === 'next' && (
          <button
            type="button"
            style={{ ...choiceBtn, textAlign: 'center', fontWeight: 700, background: 'rgba(255,197,61,0.12)', borderColor: 'rgba(255,197,61,0.45)', color: GOLD }}
            onClick={nextScenario}
          >
            برو سناریوی بعدی ←
          </button>
        )}
        {phase === 'done' && (
          <button
            type="button"
            style={{ ...choiceBtn, textAlign: 'center', fontWeight: 700, background: 'rgba(255,197,61,0.12)', borderColor: 'rgba(255,197,61,0.45)', color: GOLD }}
            onClick={restart}
          >
            شروع دوباره با مقادیر جدید ↻
          </button>
        )}
      </div>
    </div>
  )
}

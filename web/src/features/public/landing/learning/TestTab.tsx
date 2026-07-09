import type { ReactNode } from 'react'
import { AMBER, GOLD, INK, MUTE, SOFT, cardBg, cardBorder, softBg, softBorder, fa } from '@/features/public/landing/learning/tokens'

const tests: { title: string; desc: string }[] = [
  { title: 'تست پیوستگی هادی حفاظتی', desc: 'اطمینان از وصل بودن هادی‌های حفاظتی و همبندی‌ها و توانایی عبور جریان‌های عادی و خطا؛ اولین آزمون طبق IEC 60364-6 و پیش از راه‌اندازی الزامی است.' },
  { title: 'تست مقاومت عایقی', desc: 'اندازه‌گیری مقاومت عایق بین هادی‌ها برای اطمینان از سلامت سیم‌کشی و نبود نشتی جریان بین فاز، نول و ارت.' },
  { title: 'تست امپدانس حلقه خطا', desc: 'اندازه‌گیری امپدانس حلقهٔ اتصال کوتاه برای اطمینان از عملکرد به‌موقع تجهیزات حفاظتی هنگام بروز خطا.' },
  { title: 'تست عملکرد کلید RCD', desc: 'آزمون کلید جریان باقیمانده (محافظ جان) برای اطمینان از قطع نشتی جریان در زمان و آستانهٔ استاندارد.' },
  { title: 'تست پلاریته', desc: 'آزمون صحت قطبیت اتصالات؛ اطمینان از اینکه کلیدها و فیوزها روی هادی فاز نصب شده‌اند نه نول.' },
  { title: 'تست الکترود زمین (چاه ارت)', desc: 'اندازه‌گیری مقاومت چاه ارت با روش افت پتانسیل (۶۲٪) به‌صورت سالانه؛ در حالت بسته باید زیر ۲ اهم و در حالت باز زیر ۵ اهم باشد، وگرنه چاه باید احیا شود.' },
  { title: 'تست توالی فاز', desc: 'بررسی ترتیب صحیح فازها در مدارهای چندفازه با دستگاه توالی‌سنج؛ گیره‌ها به ترتیب به کابل برق‌دار متصل و جهت چرخش فازها کنترل می‌شود.' },
  { title: 'تست افت ولتاژ', desc: 'اندازه‌گیری کاهش پتانسیل الکتریکی در مسیر عبور جریان — ناشی از مقاومت هادی‌ها، کنتاکت‌ها و اتصالات — از طریق اندازه‌گیری امپدانس یا محاسبه بر اساس نقشه‌ها.' },
  { title: 'سنجش شدت روشنایی', desc: 'اندازه‌گیری شدت روشنایی فضاها با لوکس‌متر و مقایسه با مقادیر استاندارد، به‌عنوان بخشی از آزمون‌های زمان تحویل تاسیسات.' },
]

const visualChecks = [
  'مطابقت تجهیزات نصب‌شده با نقشه‌ها و مشخصات طرح',
  'سالم بودن بدنه‌ها، درپوش‌ها و پوشش‌های حفاظتی کلید و پریزها',
  'باز کردن و بازدید حداقل ۱۰٪ تجهیزات قطع‌ووصل از نظر آسیب و نفوذ مایعات',
  'کنترل سطح مقطع هادی‌ها و رنگ‌بندی استاندارد سیم‌ها (فاز، نول، ارت)',
  'وجود هادی حفاظتی در همهٔ پریزها و اتصالات همبندی اصلی و اضافی',
  'دسترسی‌پذیری تابلوها، برچسب‌گذاری مدارها و وجود علائم هشدار',
]

const continuityNotes = [
  'هدف، بررسی تداوم الکتریکی هادی‌های حفاظتی و همبندی‌های اصلی و اضافی است و پایه‌ای برای تست امپدانس حلقه به‌شمار می‌رود.',
  'برای آزمون همبندی اصلی، اتصال هادی از یک طرف قطع می‌شود تا اثر مسیرهای موازی حذف گردد.',
  'مقاومت سیم‌های رابط (فیش‌های) دستگاه باید از نتیجه کسر شود.',
  'این آزمون نخستین آزمون الزامی طبق IEC 60364-6 و پیش‌نیاز سایر تست‌هاست.',
]

const loopNotes = [
  'امپدانس حلقهٔ اتصال کوتاه فاز به ارت اندازه‌گیری می‌شود تا قطع به‌موقع تجهیزات حفاظتی هنگام خطا تضمین شود.',
  'در این آزمون هادی زمین وصل و تاسیسات برق‌دار است — برخلاف تست عایقی که مدار باید بی‌برق باشد.',
  'هرچه امپدانس حلقه کمتر باشد، جریان خطا بزرگ‌تر و قطع مدار سریع‌تر خواهد بود.',
  'این تست باید پیش از آزمون RCD انجام شود، زیرا تست RCD اتصالی عمدی روی مدار ایجاد می‌کند.',
]

const polaritySteps = [
  'تاسیسات را بی‌برق کنید و مدار مورد آزمون را مشخص نمایید.',
  'با تستر پیوستگی، اتصال سیم فاز به کنتاکت سمت راست پریز را بررسی کنید.',
  'در سرپیچ لامپ‌ها، اتصال فاز به کنتاکت وسط (ته سرپیچ) کنترل شود.',
  'اتصال فاز به کلیدها، پایهٔ فیوزها و وسایل حفاظتی تایید شود — هرگز روی نول نصب نشوند.',
  'نتایج در تست‌شیت ثبت و موارد نادرست پیش از تحویل اصلاح گردد.',
]

const insulationNotes = [
  'تمام تجهیزات قابل حمل از پریز جدا شوند و لامپ‌ها برداشته شوند.',
  'برقگیر حفاظتی (SPD) هنگام تست از مدار خارج شود.',
  'آزمون با دستگاه میگر و ولتاژ DC (معمولاً ۵۰۰ ولت) انجام می‌شود؛ مقاومت عایقی مطلوب حدود ۱ مگااهم است.',
  'تجهیزات متصل‌مانده به مدار می‌توانند آسیب ببینند یا قرائت دستگاه را کاهش دهند — در حین اعمال ۵۰۰ ولت مراقبت کامل الزامی است.',
  'ضعف عایقی با گذر زمان، رطوبت دیوارها و حتی گچ مرطوب در ساختمان‌های نوساز رخ می‌دهد؛ تست دوره‌ای ضروری است.',
]

const svgWrap = { width: '100%', height: 52, display: 'block' } as const

function TestIcon({ i }: { i: number }) {
  const pulse = (d: string, dur: number, delay = 0) => (
    <path d={d} stroke={GOLD} strokeWidth={3} strokeLinecap="round" fill="none" strokeDasharray="18 150" style={{ animation: `learnPulse ${dur}s linear ${delay}s infinite` }} />
  )
  const base = (d: string) => <path d={d} stroke="rgba(224,148,85,0.5)" strokeWidth={2.5} strokeLinecap="round" fill="none" />
  const S = ({ children }: { children: ReactNode }) => (
    <svg viewBox="0 0 120 64" fill="none" style={svgWrap}>{children}</svg>
  )

  switch (i) {
    case 0:
      return <S><circle cx="18" cy="32" r="8" stroke="#8FA3C2" strokeWidth="2" /><circle cx="102" cy="32" r="8" stroke="#8FA3C2" strokeWidth="2" />{base('M27 32 H93')}{pulse('M27 32 H93', 1.8)}</S>
    case 1:
      return <S><path d="M60 8 l22 8 v14 c0 12 -9 20 -22 26 c-13 -6 -22 -14 -22 -26 V16 z" stroke={AMBER} strokeWidth="2.5" fill="rgba(224,148,85,0.08)" /><path d="M60 20 l-6 12 h7 l-5 12" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'learnSpark 1.8s ease-in-out infinite' }} /></S>
    case 2:
      return <S>{base('M14 32 H44 A 16 12 0 1 1 76 32 H106')}{pulse('M14 32 H44 A 16 12 0 1 1 76 32 H106', 2.4)}</S>
    case 3:
      return <S><rect x="38" y="10" width="44" height="44" rx="8" stroke="#8FA3C2" strokeWidth="2" /><line x1="60" y1="40" x2="72" y2="22" stroke={GOLD} strokeWidth="3" strokeLinecap="round" style={{ transformOrigin: '60px 40px', animation: 'learnNeedle 2.6s ease-in-out infinite' }} /><circle cx="60" cy="40" r="3.5" fill={GOLD} /><circle cx="60" cy="40" r="12" stroke="rgba(255,197,61,0.5)" strokeWidth="1.5" style={{ transformOrigin: '60px 40px', animation: 'learnRipple 2.6s ease-out infinite' }} /></S>
    case 4:
      return <S><rect x="38" y="8" width="44" height="48" rx="10" stroke="#8FA3C2" strokeWidth="2" /><circle cx="50" cy="32" r="5" stroke="rgba(143,163,194,0.7)" strokeWidth="2" /><circle cx="70" cy="32" r="5" stroke={GOLD} strokeWidth="2.5" style={{ animation: 'learnSpark 1.8s ease-in-out infinite' }} /></S>
    case 5:
      return <S>{base('M60 6 V30')}{pulse('M60 6 V30', 2)}<path d="M40 32 h40 M47 41 h26 M54 50 h12" stroke={AMBER} strokeWidth="3" strokeLinecap="round" /><circle cx="60" cy="42" r="16" stroke="rgba(224,148,85,0.6)" strokeWidth="1.5" style={{ transformOrigin: '60px 42px', animation: 'learnRipple 2.6s ease-out infinite' }} /></S>
    case 6:
      return (
        <S>
          <path d="M40 48 V16 M60 48 V16 M80 48 V16" stroke="rgba(143,163,194,0.35)" strokeWidth="5" strokeLinecap="round" />
          <path d="M40 48 V16" stroke={GOLD} strokeWidth="5" strokeLinecap="round" style={{ animation: 'learnSpark 1.8s ease-in-out 0s infinite' }} />
          <path d="M60 48 V16" stroke={GOLD} strokeWidth="5" strokeLinecap="round" style={{ animation: 'learnSpark 1.8s ease-in-out 0.6s infinite' }} />
          <path d="M80 48 V16" stroke={GOLD} strokeWidth="5" strokeLinecap="round" style={{ animation: 'learnSpark 1.8s ease-in-out 1.2s infinite' }} />
        </S>
      )
    case 7:
      return <S>{base('M14 18 C 50 20, 80 34, 106 50')}{pulse('M14 18 C 50 20, 80 34, 106 50', 2.2)}<path d="M96 50 h10 v-10" stroke={AMBER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></S>
    case 8:
      return (
        <S>
          <circle cx="60" cy="32" r="10" stroke={GOLD} strokeWidth="2.5" fill="rgba(255,197,61,0.12)" style={{ animation: 'learnGlow 2.4s ease-in-out infinite' }} />
          <g stroke={GOLD} strokeWidth="2" strokeLinecap="round" style={{ animation: 'learnSpark 2.4s ease-in-out infinite' }}>
            <path d="M60 10 v8 M60 46 v8 M38 32 h8 M74 32 h8 M44 16 l6 6 M70 42 l6 6 M76 16 l-6 6 M50 42 l-6 6" />
          </g>
        </S>
      )
    default:
      return null
  }
}

const testCard: React.CSSProperties = { position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, padding: '22px 20px', borderRadius: 16, background: cardBg, border: cardBorder }
const numCircle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 42, height: 42, borderRadius: '50%', border: '1.5px solid rgba(255,197,61,0.5)', color: GOLD, fontSize: 17, fontWeight: 900 }
const deepCard: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, padding: '28px 26px', borderRadius: 20, background: cardBg, border: cardBorder }
const iconBox = (bg: string, color: string): React.CSSProperties => ({ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 12, background: bg, color })

export function TestTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
      <p style={{ margin: '-16px 0 0', maxWidth: 760, fontSize: 18, lineHeight: 2, fontWeight: 300, color: MUTE, textWrap: 'pretty' }}>
        طبق مبحث سیزدهم مقررات ملی ساختمان، تاسیسات الکتریکی باید پیش از بهره‌برداری یا پس از هر تغییر عمده آزموده شوند.
        مجموعهٔ این آزمون‌ها به همراه تهیهٔ تست‌شیت، گزارش آزمون و صدور گواهی چاه ارت، فرآیند «تست و تحویل» را تشکیل می‌دهد.
      </p>

      {/* fall-of-potential diagram + acceptance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div style={{ position: 'relative', border: cardBorder, borderRadius: 20, background: 'var(--bg-elevated)', padding: 24, overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 16, right: 20, fontSize: 12.5, color: '#6C7A93', letterSpacing: '0.06em' }}>اندازه‌گیری مقاومت زمین — روش افت پتانسیل (۶۲٪)</span>
            <svg viewBox="0 0 520 340" fill="none" style={{ width: '100%', height: 'auto', display: 'block', marginTop: 16 }}>
              <rect x="200" y="30" width="120" height="86" rx="10" stroke="#8FA3C2" strokeWidth="2" />
              <path d="M225 92 A 35 35 0 0 1 295 92" stroke="rgba(143,163,194,0.5)" strokeWidth="2" fill="none" />
              <path d="M231 92 A 29 29 0 0 1 260 63" stroke="rgba(255,197,61,0.6)" strokeWidth="3" fill="none" />
              <g style={{ transformOrigin: '260px 92px', animation: 'learnNeedle 3.2s ease-in-out infinite' }}>
                <line x1="260" y1="92" x2="260" y2="62" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
              </g>
              <circle cx="260" cy="92" r="4" fill={GOLD} />
              <text x="260" y="108" fill="#8FA3C2" fontSize="11" textAnchor="middle">Ω</text>
              <text x="260" y="20" fill="#8FA3C2" fontSize="13" textAnchor="middle">دستگاه ارت‌سنج</text>
              <line x1="10" y1="220" x2="510" y2="220" stroke="rgba(167,180,201,0.35)" strokeWidth="2" />
              <g stroke="rgba(224,148,85,0.25)" strokeWidth="1.5">
                <path d="M50 228 l-12 12 M120 228 l-12 12 M190 228 l-12 12 M260 228 l-12 12 M330 228 l-12 12 M400 228 l-12 12 M470 228 l-12 12" />
              </g>
              <path d="M320 80 H440 V218" stroke="rgba(224,148,85,0.55)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M320 80 H440 V218" stroke={GOLD} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="26 200" style={{ animation: 'learnPulse 2.6s linear infinite' }} />
              <rect x="435" y="218" width="10" height="70" rx="3" fill={AMBER} />
              <text x="440" y="312" fill={AMBER} fontSize="13" textAnchor="middle">الکترود اصلی (E)</text>
              <circle cx="440" cy="256" r="22" stroke="rgba(224,148,85,0.6)" strokeWidth="1.5" fill="none" style={{ transformOrigin: '440px 256px', animation: 'learnRipple 2.6s ease-out infinite' }} />
              <path d="M200 100 H160 V218" stroke="rgba(143,163,194,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <rect x="156" y="218" width="8" height="46" rx="3" fill="#8FA3C2" />
              <text x="160" y="290" fill="#8FA3C2" fontSize="13" textAnchor="middle">میل ولتاژ (P) — ۶۲٪</text>
              <path d="M200 60 H60 V218" stroke="rgba(143,163,194,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M200 60 H60 V218" stroke={GOLD} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="22 260" style={{ animation: 'learnPulse 2.6s linear 1.2s infinite' }} />
              <rect x="56" y="218" width="8" height="46" rx="3" fill="#8FA3C2" />
              <text x="60" y="290" fill="#8FA3C2" fontSize="13" textAnchor="middle">میل جریان (C)</text>
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: INK }}>معیار پذیرش و خروجی‌ها</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '18px 20px', borderRadius: 14, background: 'rgba(255,197,61,0.07)', border: '1px solid rgba(255,197,61,0.3)' }}>
              <span style={{ fontSize: 30, fontWeight: 900, color: GOLD }}>{'< ۲ اهم'}</span>
              <span style={{ fontSize: 14, color: MUTE, fontWeight: 300 }}>مقاومت زمین در حالت بسته</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '18px 20px', borderRadius: 14, background: 'rgba(224,148,85,0.07)', border: '1px solid rgba(224,148,85,0.35)' }}>
              <span style={{ fontSize: 30, fontWeight: 900, color: AMBER }}>{'< ۵ اهم'}</span>
              <span style={{ fontSize: 14, color: MUTE, fontWeight: 300 }}>مقاومت زمین در حالت باز</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '18px 20px', borderRadius: 14, background: softBg, border: softBorder }}>
            <span style={{ fontSize: 15.5, fontWeight: 700, color: INK }}>مدارک پایان تست</span>
            <span style={{ fontSize: 14.5, fontWeight: 300, lineHeight: 2, color: MUTE }}>تست‌شیت آزمون‌ها، گزارش آزمون تاسیسات الکتریکی و گواهی (تاییدیهٔ) چاه ارت مطابق مادهٔ ۲۲ آیین‌نامهٔ حفاظتی تاسیسات الکتریکی.</span>
          </div>
        </div>
      </div>

      {/* mandatory tests */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: INK }}>تست‌های الزامی بدو تحویل <span style={{ color: AMBER }}>(IEC 60364-6)</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {tests.map((t, i) => (
            <div key={t.title} style={testCard}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={numCircle}>{fa(i + 1)}</span>
                <span style={{ flex: 1, maxWidth: 130 }}><TestIcon i={i} /></span>
              </div>
              <span style={{ fontSize: 16.5, fontWeight: 700, color: INK }}>{t.title}</span>
              <span style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.9, color: MUTE, textWrap: 'pretty' }}>{t.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* visual inspection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '28px 26px', borderRadius: 20, background: cardBg, border: cardBorder }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={iconBox('rgba(255,197,61,0.12)', GOLD)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" /><circle cx="12" cy="12" r="3" /></svg>
          </span>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: INK }}>بازرسی چشمی — گام نخست پیش از هر آزمون</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {visualChecks.map(vc => (
            <div key={vc} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 16px', borderRadius: 12, background: softBg, border: '1px solid rgba(120,150,200,0.12)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><path d="M20 6L9 17l-5-5" /></svg>
              <span style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.9, color: SOFT, textWrap: 'pretty' }}>{vc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* continuity + loop */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={deepCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={iconBox('rgba(224,148,85,0.12)', AMBER)}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 0 1 4-4h4a4 4 0 0 1 0 8h-1" /><path d="M15 12a4 4 0 0 1-4 4H7a4 4 0 0 1 0-8h1" /></svg>
            </span>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: INK }}>نکات آزمون پیوستگی</h3>
          </div>
          <svg viewBox="0 0 300 44" fill="none" style={{ width: '100%', height: 'auto' }}>
            <circle cx="20" cy="22" r="9" stroke="#8FA3C2" strokeWidth="2" /><circle cx="280" cy="22" r="9" stroke="#8FA3C2" strokeWidth="2" />
            <path d="M30 22 H270" stroke="rgba(224,148,85,0.5)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M30 22 H270" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeDasharray="24 216" style={{ animation: 'learnPulse 2s linear infinite' }} />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {continuityNotes.map(cn => (
              <div key={cn} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ flexShrink: 0, marginTop: 10, width: 6, height: 6, borderRadius: '50%', background: AMBER }} />
                <span style={{ fontSize: 14.5, fontWeight: 300, lineHeight: 1.9, color: SOFT, textWrap: 'pretty' }}>{cn}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={deepCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={iconBox('rgba(255,197,61,0.12)', GOLD)}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><circle cx="12" cy="12" r="6" /><path d="M12 9v3l2 2" /></svg>
            </span>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: INK }}>نکات آزمون امپدانس حلقه خطا</h3>
          </div>
          <svg viewBox="0 0 300 44" fill="none" style={{ width: '100%', height: 'auto' }}>
            <path d="M30 22 H130 A 20 14 0 1 1 170 22 H270" stroke="rgba(255,197,61,0.4)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M30 22 H130 A 20 14 0 1 1 170 22 H270" stroke={GOLD} strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="24 260" style={{ animation: 'learnPulse 2.4s linear 0.5s infinite' }} />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {loopNotes.map(ln => (
              <div key={ln} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ flexShrink: 0, marginTop: 10, width: 6, height: 6, borderRadius: '50%', background: GOLD }} />
                <span style={{ fontSize: 14.5, fontWeight: 300, lineHeight: 1.9, color: SOFT, textWrap: 'pretty' }}>{ln}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* polarity + insulation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ ...deepCard, gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={iconBox('rgba(255,197,61,0.12)', GOLD)}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="9" cy="11" r="1.4" fill="currentColor" stroke="none" /><circle cx="15" cy="11" r="1.4" fill="currentColor" stroke="none" /><path d="M12 15v2.5" /></svg>
            </span>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: INK }}>مراحل انجام آزمون قطبیت در پریزها</h3>
          </div>
          <p style={{ margin: 0, fontSize: 14.5, fontWeight: 300, lineHeight: 1.9, color: MUTE, textWrap: 'pretty' }}>
            پلاریتهٔ نادرست باعث می‌شود حتی پس از قطع کلید، فاز برق‌دار روی دستگاه باقی بماند و بهره‌بردار را تهدید کند.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {polaritySteps.map((ps, i) => (
              <div key={ps} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 30, height: 30, borderRadius: '50%', border: '1.5px solid rgba(255,197,61,0.5)', color: GOLD, fontSize: 14, fontWeight: 700 }}>{fa(i + 1)}</span>
                <span style={{ fontSize: 14.5, fontWeight: 300, lineHeight: 1.9, color: SOFT, textWrap: 'pretty' }}>{ps}</span>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 260 90" fill="none" style={{ width: '100%', maxWidth: 300, height: 'auto', alignSelf: 'center' }}>
            <rect x="85" y="8" width="90" height="74" rx="12" stroke="#8FA3C2" strokeWidth="2" />
            <circle cx="112" cy="45" r="7" stroke="rgba(143,163,194,0.7)" strokeWidth="2" />
            <circle cx="148" cy="45" r="7" stroke={GOLD} strokeWidth="2.5" style={{ animation: 'learnSpark 1.8s ease-in-out infinite' }} />
            <text x="112" y="72" fill="#8FA3C2" fontSize="10" textAnchor="middle">نول</text>
            <text x="148" y="72" fill={GOLD} fontSize="10" textAnchor="middle">فاز</text>
            <text x="212" y="48" fill={AMBER} fontSize="11" textAnchor="middle">کنتاکت راست</text>
          </svg>
        </div>

        <div style={{ ...deepCard, gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={iconBox('rgba(224,148,85,0.12)', AMBER)}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12h6" /></svg>
            </span>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: INK }}>نکات آزمون مقاومت عایقی (میگر)</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 18px', borderRadius: 12, background: 'rgba(255,197,61,0.07)', border: '1px solid rgba(255,197,61,0.3)' }}>
              <span style={{ fontSize: 24, fontWeight: 900, color: GOLD }}>۵۰۰V DC</span>
              <span style={{ fontSize: 12.5, color: MUTE, fontWeight: 300 }}>ولتاژ اعمالی تست</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 18px', borderRadius: 12, background: 'rgba(224,148,85,0.07)', border: '1px solid rgba(224,148,85,0.35)' }}>
              <span style={{ fontSize: 24, fontWeight: 900, color: AMBER }}>≈ ۱ MΩ</span>
              <span style={{ fontSize: 12.5, color: MUTE, fontWeight: 300 }}>مقاومت عایقی مطلوب</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {insulationNotes.map(note => (
              <div key={note} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ flexShrink: 0, marginTop: 10, width: 6, height: 6, borderRadius: '50%', background: AMBER }} />
                <span style={{ fontSize: 14.5, fontWeight: 300, lineHeight: 1.9, color: SOFT, textWrap: 'pretty' }}>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RCD note */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '22px 26px', borderRadius: 16, background: softBg, border: softBorder }}>
        <span style={iconBox('rgba(255,197,61,0.12)', GOLD)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 13.5H11L9.5 22 19 10h-6.5L13 2z" /></svg>
        </span>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.9, color: SOFT, fontWeight: 300, textWrap: 'pretty' }}>
          در آزمون RCD، زمان قطع (تریپ) بر حسب میلی‌ثانیه با اعمال جریان خطای عمدی اندازه‌گیری می‌شود؛ ازآنجاکه این آزمون یک
          اتصالی عمدی روی مدار ایجاد می‌کند، باید پیش از آن تست امپدانس حلقهٔ اتصال کوتاه انجام شده و هشدارهای ایمنی به ساکنین
          داده شده باشد.
        </p>
      </div>

      {/* safety note */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '22px 26px', borderRadius: 16, background: 'rgba(255,197,61,0.07)', border: '1px solid rgba(255,197,61,0.3)' }}>
        <span style={iconBox('rgba(255,197,61,0.14)', GOLD)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.8L2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z" /></svg>
        </span>
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.9, color: INK, fontWeight: 400, textWrap: 'pretty' }}>
          قطع برق تاسیسات لزوماً سیستم زمین را بی‌برق نمی‌کند؛ ولتاژ می‌تواند از پست‌های مجاور به سیستم زمین منتقل شود. پیش
          از تست، ولتاژهای سرگردان روی سیستم زمین سنجیده شود و تست تنها توسط فرد کارآزموده و ماهر انجام گیرد.
        </p>
      </div>
    </div>
  )
}

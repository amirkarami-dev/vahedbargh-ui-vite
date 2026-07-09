import { useState, type ReactNode } from 'react'
import { Bullet, Card, Grid, H3, ModuleHeader, P, Stat, Wrap } from '@/features/public/landing/learning/ui'
import { AMBER, GOLD, INK, MUTE, SOFT, cardBg, fa, softBg, softBorder } from '@/features/public/landing/learning/tokens'

const glyph = { width: '100%', height: '100%' } as const
const mono: React.CSSProperties = { fontFamily: 'monospace', direction: 'ltr', color: INK }
const tile: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 8, padding: '18px 16px', borderRadius: 14, background: softBg, border: softBorder }

// ---------------- module glyphs ----------------
function GEquip() {
  return (
    <svg viewBox="0 0 200 130" fill="none" style={glyph}>
      <rect x="70" y="20" width="60" height="100" rx="4" stroke="#8FA3C2" strokeWidth="2" />
      {[30, 44, 58, 72, 86, 100].flatMap((y, r) =>
        [0, 1, 2].map(c => (
          <rect key={`${y}-${c}`} x={78 + c * 16} y={y} width="10" height="8" rx="1.5" fill={GOLD} style={{ animation: `learnBlink ${2 + (r % 3) * 0.4}s ease-in-out ${(r + c) * 0.2}s infinite` }} />
        )),
      )}
      <path d="M100 20 V6" stroke={AMBER} strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="5" r="3" fill={AMBER} style={{ animation: 'learnSpark 1.6s ease-in-out infinite' }} />
    </svg>
  )
}
function GSubstation() {
  return (
    <svg viewBox="0 0 200 130" fill="none" style={glyph}>
      <circle cx="78" cy="65" r="26" stroke="#8FA3C2" strokeWidth="2" /><circle cx="118" cy="65" r="26" stroke="#8FA3C2" strokeWidth="2" />
      <path d="M20 50 H52" stroke="rgba(224,148,85,0.5)" strokeWidth="2.5" /><path d="M20 50 H52" stroke={GOLD} strokeWidth="3" strokeDasharray="14 40" style={{ animation: 'learnPulse 2s linear infinite' }} />
      <path d="M144 80 H180" stroke="rgba(224,148,85,0.5)" strokeWidth="2.5" /><path d="M144 80 H180" stroke={GOLD} strokeWidth="3" strokeDasharray="14 40" style={{ animation: 'learnPulse 2s linear 0.7s infinite' }} />
      <text x="78" y="70" fill="#8FA3C2" fontSize="13" textAnchor="middle">HV</text><text x="118" y="70" fill={GOLD} fontSize="13" textAnchor="middle">LV</text>
    </svg>
  )
}
function GMeter() {
  return (
    <svg viewBox="0 0 200 130" fill="none" style={glyph}>
      <rect x="60" y="18" width="80" height="96" rx="6" stroke="#8FA3C2" strokeWidth="2" />
      {[0, 1, 2].flatMap(r => [0, 1].map(c => <rect key={`${r}${c}`} x={72 + c * 34} y={30 + r * 26} width="26" height="18" rx="3" stroke="rgba(143,163,194,0.6)" strokeWidth="1.5" />))}
      {[0, 1, 2].flatMap(r => [0, 1].map(c => <circle key={`d${r}${c}`} cx={85 + c * 34} cy={39 + r * 26} r="2.5" fill={GOLD} style={{ animation: `learnBlink ${1.8 + r * 0.3}s ease-in-out ${(r + c) * 0.25}s infinite` }} />))}
      <path d="M100 18 V4 M60 66 H30" stroke="rgba(224,148,85,0.5)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 66 H30" stroke={GOLD} strokeWidth="3" strokeDasharray="12 30" strokeLinecap="round" style={{ animation: 'learnPulse 1.8s linear infinite' }} />
    </svg>
  )
}
function GAmr() {
  const node = (x: number, label: string, c: string) => (
    <g key={label}><rect x={x - 15} y="52" width="30" height="22" rx="4" stroke={c} strokeWidth="2" fill="rgba(255,197,61,0.06)" /><text x={x} y="90" fill="#8FA3C2" fontSize="10" textAnchor="middle">{label}</text></g>
  )
  return (
    <svg viewBox="0 0 200 110" fill="none" style={glyph}>
      <path d="M25 63 H175" stroke="rgba(224,148,85,0.4)" strokeWidth="2" /><path d="M25 63 H175" stroke={GOLD} strokeWidth="2.5" strokeDasharray="10 20" strokeLinecap="round" style={{ animation: 'learnFlow 1.2s linear infinite' }} />
      {node(35, 'MIU', '#8FA3C2')}{node(90, 'LDCU', '#8FA3C2')}{node(145, 'DCU', GOLD)}
      <text x="100" y="24" fill={GOLD} fontSize="12" textAnchor="middle">PLC</text>
    </svg>
  )
}
function GEarth() {
  return (
    <svg viewBox="0 0 200 130" fill="none" style={glyph}>
      <line x1="15" y1="60" x2="185" y2="60" stroke="rgba(167,180,201,0.35)" strokeWidth="2" />
      <path d="M100 20 V96" stroke="rgba(224,148,85,0.55)" strokeWidth="2.5" strokeLinecap="round" /><path d="M100 20 V96" stroke={GOLD} strokeWidth="3" strokeDasharray="16 70" strokeLinecap="round" style={{ animation: 'learnPulse 2.2s linear infinite' }} />
      <rect x="86" y="96" width="28" height="8" rx="2" fill={AMBER} />
      <circle cx="100" cy="100" r="20" stroke="rgba(224,148,85,0.6)" strokeWidth="1.5" style={{ transformOrigin: '100px 100px', animation: 'learnRipple 2.6s ease-out infinite' }} />
      {[40, 70, 130, 160].map(x => <path key={x} d={`M${x} 68 l-8 8`} stroke="rgba(224,148,85,0.3)" strokeWidth="1.5" />)}
    </svg>
  )
}
function GBusduct() {
  return (
    <svg viewBox="0 0 200 130" fill="none" style={glyph}>
      <rect x="86" y="12" width="28" height="106" rx="4" stroke="#8FA3C2" strokeWidth="2" />
      <path d="M100 118 V12" stroke="rgba(224,148,85,0.4)" strokeWidth="3" strokeLinecap="round" /><path d="M100 118 V12" stroke={GOLD} strokeWidth="3.5" strokeDasharray="18 90" strokeLinecap="round" style={{ animation: 'learnPulse 2s linear infinite' }} />
      {[30, 58, 86].map((y, i) => <g key={y}><rect x="114" y={y - 6} width="20" height="12" rx="2" stroke={AMBER} strokeWidth="1.8" /><circle cx="124" cy={y} r="2" fill={GOLD} style={{ animation: `learnBlink 1.8s ease-in-out ${i * 0.4}s infinite` }} /></g>)}
    </svg>
  )
}
function GLight() {
  return (
    <svg viewBox="0 0 200 130" fill="none" style={glyph}>
      <circle cx="100" cy="55" r="22" stroke={GOLD} strokeWidth="2.5" fill="rgba(255,197,61,0.12)" style={{ animation: 'learnGlow 2.4s ease-in-out infinite' }} />
      <path d="M92 77 h16 M94 84 h12 M97 91 h6" stroke="#8FA3C2" strokeWidth="2" strokeLinecap="round" />
      <g stroke={GOLD} strokeWidth="2" strokeLinecap="round" style={{ animation: 'learnSpark 2.4s ease-in-out infinite' }}><path d="M100 22 v-12 M62 55 h-12 M138 55 h12 M74 29 l-8 -8 M126 29 l8 -8" /></g>
    </svg>
  )
}
function GLightning() {
  return (
    <svg viewBox="0 0 200 130" fill="none" style={glyph}>
      <path d="M40 18 h120" stroke="rgba(143,163,194,0.4)" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M100 40 V22" stroke="#8FA3C2" strokeWidth="2.5" strokeLinecap="round" /><circle cx="100" cy="20" r="3" fill={GOLD} />
      <path d="M100 22 L88 8 L96 12 L86 -2" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'learnBolt 3s ease-in-out infinite' }} />
      <path d="M100 40 V112" stroke="rgba(224,148,85,0.55)" strokeWidth="2.5" strokeLinecap="round" /><path d="M100 40 V112" stroke={GOLD} strokeWidth="3" strokeDasharray="16 70" strokeLinecap="round" style={{ animation: 'learnPulse 1.6s linear infinite' }} />
      <path d="M84 112 h32 M90 120 h20" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
function GGen() {
  return (
    <svg viewBox="0 0 200 130" fill="none" style={glyph}>
      <rect x="46" y="44" width="78" height="46" rx="8" stroke="#8FA3C2" strokeWidth="2" />
      <circle cx="140" cy="67" r="20" stroke={AMBER} strokeWidth="2" />
      <g style={{ transformOrigin: '140px 67px', animation: 'learnSpin 1.4s linear infinite' }}><path d="M140 51 V83 M124 67 H156 M129 56 L151 78 M151 56 L129 78" stroke={GOLD} strokeWidth="2" strokeLinecap="round" /></g>
      <rect x="58" y="24" width="8" height="20" rx="2" fill="#8FA3C2" /><circle cx="62" cy="22" r="3" fill={GOLD} style={{ animation: 'learnSpark 1.2s ease-in-out infinite' }} />
      <path d="M46 96 H124" stroke="rgba(224,148,85,0.5)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function GPm() {
  return (
    <svg viewBox="0 0 200 130" fill="none" style={glyph}>
      <rect x="40" y="40" width="54" height="42" rx="8" stroke="#8FA3C2" strokeWidth="2" />
      <circle cx="67" cy="61" r="12" stroke="#8FA3C2" strokeWidth="2" /><circle cx="67" cy="61" r="5" fill={GOLD} style={{ animation: 'learnGlow 1.8s ease-in-out infinite' }} />
      <path d="M94 55 L150 45" stroke={GOLD} strokeWidth="2" strokeDasharray="6 6" style={{ animation: 'learnFlow 1s linear infinite' }} />
      <rect x="150" y="30" width="30" height="60" rx="4" stroke={AMBER} strokeWidth="2" />
      {[0, 1, 2, 3].map(i => <rect key={i} x="154" y={36 + i * 13} width="22" height="8" rx="1.5" fill={AMBER} opacity={0.3 + i * 0.22} style={{ animation: `learnBlink 1.6s ease-in-out ${i * 0.2}s infinite` }} />)}
    </svg>
  )
}

// ---------------- module bodies ----------------
function ModEquip() {
  const items = [
    'ساختمان پست توزیع و متعلقات', 'اتاق تابلو کنتورها', 'کنتورهای قرائت از راه دور',
    'باس‌داکت، ترانکینگ و کابل‌کشی', 'ایمنی الکتریکی (ارت، همبندی، محافظ جان)', 'سیستم صاعقه‌گیر',
    'مولد برق اضطراری', 'روشنایی عمومی، محوطه و پله فرار', 'آبیاری اتوماتیک فضای سبز',
    'مدیریت هوشمند ساختمان (BMS)', 'آنتن مرکزی و دوربین مداربسته', 'درب‌بازکن و آیفون تصویری',
    'خازن‌گذاری ساختمان', 'تجهیزات آسانسور', 'سیستم اعلام و اطفاء حریق',
    'موتورخانه گرمایشی', 'سیستم سرمایشی (چیلر و فن‌کویل)', 'منابع ذخیره آب', 'تهویه مطبوع',
  ]
  return (
    <Wrap>
      <ModuleHeader anim={<GEquip />} title="تجهیزات برقی ساختمان‌های بلندمرتبه" sub="دسته‌بندی سامانه‌های برقی یک ساختمان بلندمرتبه — نقشهٔ راه کل دوره." />
      <Grid cols={3}>
        {items.map((t, i) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, background: cardBg, border: '1px solid rgba(120,150,200,0.14)' }}>
            <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 8, background: 'rgba(255,197,61,0.12)', color: GOLD, fontSize: 13, fontWeight: 900 }}>{fa(i + 1)}</span>
            <span style={{ fontSize: 14, fontWeight: 400, color: SOFT, lineHeight: 1.6 }}>{t}</span>
          </div>
        ))}
      </Grid>
    </Wrap>
  )
}

function ModSubstation() {
  const rows = [
    ['تا ۳۰ کیلووات', 'شبکهٔ فشار ضعیف عمومی (زمینی/هوایی)'],
    ['تا ۵۰ کیلووات', 'شبکهٔ عمومی زمینی'],
    ['۵۰ تا ۱۵۰ کیلووات', 'مستقیم از پست توزیع، فشار ضعیف'],
    ['۱۵۰ تا ۲۵۰ کیلووات', 'احداث پست با هزینهٔ متقاضی (عمومی انحصاری)'],
    ['۲۵۰kW تا ۲MW', 'از فیدرهای ۲۰ کیلوولت موجود'],
    ['۲ تا ۷ مگاوات', 'فیدر اختصاصی از پست ۶۳ کیلوولت'],
    ['بیش از ۷ مگاوات', 'خط ۶۳ کیلوولت و احداث پست فوق‌توزیع'],
  ]
  return (
    <Wrap>
      <ModuleHeader anim={<GSubstation />} title="پست توزیع و ترانسفورماتور" sub="ضوابط واگذاری انشعاب، انواع ترانس و پست، و محاسبهٔ قدرت مورد نیاز." />
      <Grid cols={2}>
        <Card>
          <H3>واگذاری انشعاب بر اساس قدرت</H3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {rows.map((r, i) => (
              <div key={r[0]} style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '8px 0', borderBottom: i < rows.length - 1 ? '1px solid rgba(120,150,200,0.1)' : 'none' }}>
                <span style={{ flexShrink: 0, minWidth: 118, fontSize: 14, fontWeight: 700, color: GOLD }}>{r[0]}</span>
                <span style={{ fontSize: 13.5, color: SOFT, fontWeight: 300, lineHeight: 1.7 }}>{r[1]}</span>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <H3 color={AMBER}>انواع ترانس</H3>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['روغنی', 'خشک', 'هرمتیک'].map(t => <span key={t} style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(224,148,85,0.1)', border: '1px solid rgba(224,148,85,0.3)', fontSize: 14, color: AMBER, fontWeight: 500 }}>{t}</span>)}
            </div>
            <P>قدرت‌های رایج: ۲۵ تا ۲۰۰۰ kVA. ولتاژ امپدانس تا ۲۵۰kVA برابر ۴٪ و بالاتر ۶٪.</P>
          </Card>
          <Card>
            <H3 color={AMBER}>تجهیزات حفاظتی ترانس روغنی</H3>
            <Grid cols={2} gap={8}>{['رله بوخهولتس', 'دژنکتور', 'ترمومتر', 'رطوبت‌گیر سیلیکاژل', 'سکسیونر قابل قطع زیر بار', 'ارت نول و ارت بدنه'].map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
          </Card>
        </div>
      </Grid>
      <Grid cols={2}>
        <Card>
          <H3>مثال محاسبهٔ قدرت پست</H3>
          <P>برج ۲۰ طبقه، هر طبقه ۴ واحد، هر واحد ۱۵kW؛ مصارف عمومی ۳۰kW.</P>
          <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255,197,61,0.06)', border: '1px solid rgba(255,197,61,0.25)', fontSize: 13.5, lineHeight: 2, ...mono }}>
            <div>P = 20×4×15×0.30 + 30×0.80 = 384 kW</div>
            <div>S = 384 / 0.63 = 609.5 kVA → ترانس 630 kVA</div>
          </div>
          <P>ضرایب همزمانی: خانگی ۲۵–۳۵٪، عمومی ۷۰–۸۵٪، تجاری ۵۰–۶۵٪، صنعتی ۹۰–۱۰۰٪.</P>
        </Card>
        <Card>
          <H3 color={AMBER}>انواع پست و الزامات اتاق پست</H3>
          <Grid cols={2} gap={8}>{['روزمینی', 'زیرزمینی', 'هوایی', 'طبقات فوقانی', 'پیش‌ساخته (کیوسک)', 'پدمانتد'].map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
          <P>کف اتاق حداقل ۸۰cm بالاتر از سطح صفر، تهویهٔ طبیعی، سقف بدون نازک‌کاری، و فاصلهٔ ۵ متری از سایر ساختمان‌ها در جبههٔ پست.</P>
        </Card>
      </Grid>
    </Wrap>
  )
}

function ModMeter() {
  const elec = [
    ['تا ۲۵ آمپر تک/سه‌فاز', 'یک الکترود ساده: میلهٔ کاپرولد قطر ≥۱۶mm، طول ≥۲m در زمین بکر'],
    ['۲۵ تا ۶۰ آمپر سه‌فاز', 'دو الکترود ساده با فاصلهٔ ≥۶m، یا یک الکترود به عمق ۴m'],
    ['بیش از ۶۰ آمپر سه‌فاز', 'یک اتصال زمین اساسی (حفر چاه ارت) الزامی است'],
  ]
  return (
    <Wrap>
      <ModuleHeader anim={<GMeter />} title="کابل سرویس و تابلو کنتور" sub="حریم شبکه، کابل سرویس ورودی، ساختار تابلوی کنتور و انتخاب الکترود زمین." />
      <Grid cols={2}>
        <Card>
          <H3>حریم شبکه و کابل سرویس</H3>
          <Bullet>فاصلهٔ شبکهٔ فشار ضعیف از دیوار ساختمان: ۱۳۰ سانتی‌متر</Bullet>
          <Bullet>فاصلهٔ شبکهٔ ۲۰ کیلوولت از دیوار: ۳۰۰ (۲۱۰) سانتی‌متر</Bullet>
          <Bullet>کابل سرویس از جنس PVC؛ سطح مقطع بر اساس بیشترین جریان هر فاز با ضریب همزمانی</Bullet>
          <Bullet>عمق کانال: فشار ضعیف ۷۰cm، فشار متوسط ۱۱۰cm؛ عرض ۵۰cm</Bullet>
          <div style={{ marginTop: 6, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,197,61,0.06)', border: '1px solid rgba(255,197,61,0.25)', fontSize: 13, lineHeight: 1.9, ...mono }}>
            <div>ساختمان ۵ طبقه، ۲ واحد/طبقه، ۲۵A تک‌فاز</div>
            <div>I = 4×25×0.30 + 1×25×0.8 = 50A → کابل 4×10</div>
          </div>
        </Card>
        <Card>
          <H3 color={AMBER}>ساختار تابلوی کنتور</H3>
          <Bullet>سه بخش: ورودی، نصب کنتور، خروجی</Bullet>
          <Bullet>کلید قبل از کنتور (شرکت برق): کندکار و یک رنج بزرگ‌تر؛ فقط فاز را قطع می‌کند</Bullet>
          <Bullet>کلید بعد از کنتور: فاز و نول را قطع می‌کند</Bullet>
          <Bullet>ارتفاع نمایشگر: ردیف پایین ≥۸۰cm، ردیف بالا ≤۲m</Bullet>
          <Bullet>درجهٔ حفاظت درب بسته حداقل IP43؛ سیم رابط کلید–کنتور ≥۶mm²</Bullet>
          <Bullet>دو شینهٔ مجزا برای ارت حفاظتی و ارت الکتریکی</Bullet>
        </Card>
      </Grid>
      <Card>
        <H3>انتخاب الکترود زمین بر اساس آمپراژ کنتور</H3>
        <Grid cols={3}>
          {elec.map(r => (
            <div key={r[0]} style={tile}>
              <span style={{ alignSelf: 'flex-start', padding: '5px 12px', borderRadius: 999, background: 'rgba(255,197,61,0.12)', color: GOLD, fontSize: 13.5, fontWeight: 700 }}>{r[0]}</span>
              <span style={{ fontSize: 14, lineHeight: 1.9, color: SOFT, fontWeight: 300 }}>{r[1]}</span>
            </div>
          ))}
        </Grid>
      </Card>
      <Card>
        <H3 color={AMBER}>چند الزام کلیدی سیم‌کشی (مبحث ۱۳)</H3>
        <Grid cols={2} gap={10}>
          {['لوله‌گذاری توکار با لولهٔ PVC سخت؛ لولهٔ خرطومی پلاستیکی ممنوع', 'مدارهای مجزا: روشنایی/پریز عمومی/نصب ثابت — و تلفن/اعلام حریق/آیفون', 'حداقل سطح مقطع: روشنایی ۱٫۵، پریز ۲٫۵، کولر گازی ۴ mm²', 'کلید مینیاتوری: روشنایی ۱۰، پریز ۱۶، کولر گازی ۲۰ آمپر', 'هر مدار روشنایی/پریز حداکثر ۱۲ نقطه', 'رلهٔ محافظ جان بعد از کنتور و فیوز آن نصب شود', 'فاصلهٔ کابل برق از لولهٔ گاز: موازی ۱m، متقاطع ۵۰cm', 'اتصالات با لحیم و ترمینال؛ پیچاندن سیم و نوارچسب ممنوع'].map(t => <Bullet key={t}>{t}</Bullet>)}
        </Grid>
      </Card>
    </Wrap>
  )
}

function ModAmr() {
  const nodes = [
    ['MIU', 'واحد واسط کنتور', 'پایین‌ترین لایه؛ پالس‌های مصرف را از کنتور دیجیتال می‌خواند و در حافظهٔ غیرفرار با نسخهٔ پشتیبان ذخیره می‌کند. تغذیهٔ ایزوله و مستقل از کنتور.'],
    ['LDCU', 'جمع‌آورندهٔ محلی', 'در مجاورت پست نصب می‌شود؛ تا ۱۵ کنتور (MIU) را هم‌زمان با PLC پوشش می‌دهد. تقویم و ساعت داخلی و قابلیت اعمال تعرفه‌های مختلف.'],
    ['DCU', 'جمع‌آورندهٔ مرکزی', 'مدیریت میانی؛ واسط بین ستاد مرکز و لایه‌های پایین. با ستاد از طریق تلفن/RS232 و تا ۶۴ عدد LDCU ارتباط می‌گیرد.'],
    ['نرم‌افزار HOST', 'ستاد مرکز', 'بالاترین سطح مدیریت شبکهٔ AMR؛ کنترل، جمع‌آوری و گزارش‌گیری مصرف در ساعات مختلف، از جمله اوج مصرف.'],
  ]
  return (
    <Wrap>
      <ModuleHeader anim={<GAmr />} title="کنتور هوشمند و قرائت از راه دور (AMR)" sub="قرائت خودکار کنتور با فناوری PLC روی بستر شبکهٔ برق شهری — بدون خطا و از راه دور." />
      <Grid cols={2}>
        <Card>
          <H3>مزایای سیستم AMR</H3>
          <Grid cols={1} gap={8}>{['قرائت خودکار در تمام ساعات شبانه‌روز بدون خطای انسانی', 'قطع و وصل برق مشترکین بدحساب از راه دور', 'اعمال چند تعرفه بر اساس ساعت مصرف و امکان پیش‌فروش برق', 'کنترل و بهینه‌سازی منحنی مصرف و متعادل‌سازی بار فازها'].map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
        </Card>
        <Card>
          <H3 color={AMBER}>انتقال اطلاعات با PLC</H3>
          <P>فناوری Power Line Carrier اطلاعات کنتور را از طریق همان سیم برق شهری منتقل می‌کند؛ بستر همیشه در دسترس و از پیش نصب‌شده است.</P>
          <P>C/R (کوپلر/ریپیتر) دو شبکهٔ مجزا را به هم وصل و سیگنال را در فواصل طولانی تقویت می‌کند؛ R/F PLC Bridge ارتباط بی‌سیم بین پست‌های بدون کابل را برقرار می‌کند.</P>
        </Card>
      </Grid>
      <Card>
        <H3>معماری چهارلایهٔ شبکه</H3>
        <Grid cols={4}>
          {nodes.map(n => (
            <div key={n[0]} style={{ ...tile, position: 'relative' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 900, color: GOLD }}>{n[0]}</span>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: INK }}>{n[1]}</span>
              <span style={{ fontSize: 13, lineHeight: 1.85, color: MUTE, fontWeight: 300 }}>{n[2]}</span>
            </div>
          ))}
        </Grid>
      </Card>
    </Wrap>
  )
}

function ModEarth() {
  const electrodes = [
    'میلهٔ فولادی با روکش مس (کاپرولد) کوبیده، قطر ≥۱۶mm',
    'میلهٔ فولادی گالوانیزهٔ گرم، قطر ≥۱۶mm و پوشش ۸۰ میکرون',
    'تسمهٔ فولادی گالوانیزه، سطح مقطع ≥۱۰۰mm² و ضخامت ۳mm',
    'صفحهٔ مسی دفن‌شده ۵۰×۵۰cm با ضخامت ۲mm',
    'هادی مسی تسمه‌ای، سطح مقطع ≥۵۰mm²',
    'هادی چندمفتولی ≥۳۵mm²، قطر هر مفتول ≥۱٫۸mm',
    'الکترودهای جاسازی‌شده در پی، ضخامت فولاد ≥۳mm',
  ]
  return (
    <Wrap>
      <ModuleHeader anim={<GEarth />} title="سیستم ارتینگ و چاه ارت" sub="انواع سیستم زمین، الکترودها، مشخصات چاه ارت سنتی و روش بنتونیت." />
      <Grid cols={2}>
        <Card>
          <H3>انواع سیستم زمین</H3>
          <Grid cols={1} gap={8}>{['TN-C — هادی نول و حفاظتی یکی (PEN)', 'TN-S — هادی حفاظتی PE کاملاً مجزا در سرتاسر', 'TN-C-S — سیستم منتخب اکثر ساختمان‌ها؛ از کنتور به بعد PE مجزا', 'TT — نیازمند نظارت ویژه و هزینه‌بر', 'IT — نول به زمین وصل نیست'].map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
          <P>در TN-C-S از هر کنتور تا واحد تک‌فاز ۳ رشته و سه‌فاز ۵ رشته؛ سیم سوم هادی حفاظتی PE است.</P>
        </Card>
        <Card>
          <H3 color={AMBER}>حدود ایمنی و مقاومت</H3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Stat value="> ۵۰ ولت" label="ولتاژ خطرناک برای بدن" />
            <Stat value="> ۳۰ mA" label="جریان خطرناک برای بدن" color={AMBER} />
            <Stat value="< ۲ اهم" label="مقاومت کل مطلوب زمین" />
          </div>
          <P>فرکانس ۵۰ تا ۴۰۰ هرتز مهلک‌ترین است. کلید RCCB با جریان ۳۰mA بدون تأخیر (استاندارد ISIRI 6700 و IEC 61008) برای همهٔ ساختمان‌ها الزامی است.</P>
        </Card>
      </Grid>
      <Card>
        <H3>انواع الکترود زمین (۷ نوع)</H3>
        <Grid cols={2} gap={10}>{electrodes.map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
      </Card>
      <Grid cols={2}>
        <Card>
          <H3 color={AMBER}>چاه ارت سنتی (VDE-140)</H3>
          <Bullet>صفحهٔ مسی ۹۹٫۹٪ به‌صورت قائم در ته چاه؛ سطح مقطع هادی ≥۳۵mm²</Bullet>
          <Bullet>عمق چاه تا رسیدن به نم دائمی زمین</Bullet>
          <Bullet>۵ لایه پودر زغال و ۵ لایه سنگ‌نمک سرندشده (هر لایه ۱۵cm، جمعاً ۱٫۵m)</Bullet>
          <Bullet>اتصال هادی به صفحه با جوش اکسیژن؛ دریچهٔ بازدید بالای چاه</Bullet>
          <Bullet>لولهٔ PVC برای آبیاری و کاهش مقاومت</Bullet>
        </Card>
        <Card>
          <H3 color={AMBER}>روش بنتونیت</H3>
          <Bullet>چاه قطر ۶۰–۹۰cm و عمق ۵m؛ دو میلهٔ ۱٫۵m کاپرولد با کوپلینگ</Bullet>
          <Bullet>دوغاب ۳۵٪ بنتونیت و ۶۵٪ آب اطراف میله</Bullet>
          <Bullet>حدود ۴۰۰ تا ۵۰۰ کیلوگرم بنتونیت خشک برای هر چاه</Bullet>
          <Bullet>در روش صفحهٔ مسی عمودی، استفاده از نمک و زغال ممنوع است</Bullet>
        </Card>
      </Grid>
    </Wrap>
  )
}

function ModBusduct() {
  const models = [
    ['BX', '۴۰–۲۰۰ A', 'IP20–51', 'مصارف کم، ۴ هادی مسی روکش‌دار'],
    ['BXC', '۲۰۰–۱۵۰۰ A', 'IP51–55', 'کمپکت، شینه‌های مسی پلی‌استر، رایزری'],
    ['BC', '۶۳۰–۵۰۰۰ A', 'IP52–55', 'مصارف بالا، ترانس به تابلو، رایزر برج'],
    ['BR', '۱۰۰۰–۵۰۰۰ A', 'IP68', 'رزینی، محیط خورنده و مرطوب، تا ۲۰kV'],
  ]
  return (
    <Wrap>
      <ModuleHeader anim={<GBusduct />} title="باسداکت و ترانکینگ" sub="راه‌حل مدرن انتقال جریان بالا در ساختمان بلندمرتبه، جایگزین کابل و سینی سنتی." />
      <Grid cols={2}>
        <Card>
          <H3>چرا باسداکت؟</H3>
          <Grid cols={1} gap={8}>{['انتقال جریان بالا: کابل تا ۵۰۰A در هر رشته، باسداکت تا ۵۰۰۰A', 'صرفه‌جویی چشمگیر در فضا و تبادل حرارت سریع‌تر بدنهٔ فلزی', 'امکان استفادهٔ کامل از ضریب همزمانی در محاسبات', 'نصب کشویی سریع، قابلیت گسترش و انشعاب‌پذیری آسان', 'ایمنی و محیط زیست: عایق پلی‌استر غیرهالوژنه به‌جای PVC'].map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
          <P>طبق ضوابط توزیع، استفاده در ساختمان‌های بیش از ۱۰ طبقه و مجتمع‌های بیش از ۵۰ واحد توصیه می‌شود.</P>
        </Card>
        <Card>
          <H3 color={AMBER}>کاربردها و کنتور طبقات</H3>
          <Bullet>انتقال: ترانس به تابلوی اصلی توزیع</Bullet>
          <Bullet>رایزر عمودی برق‌رسانی طبقات با جعبه‌های انشعاب</Bullet>
          <Bullet>امکان نصب کنتور در هر طبقه به‌جای تابلوی متمرکز</Bullet>
          <Bullet>جمع‌آوری اطلاعات مصرف طبقات در همکف و قرائت از راه دور</Bullet>
          <H3 color={AMBER}>ترانکینگ</H3>
          <P>برای اجرای هم‌زمان کابل‌کشی برق، تلفن و کامپیوتر با ورقه‌های جداکنندهٔ نویز؛ نصب روکار، کف کاذب یا رایزری.</P>
        </Card>
      </Grid>
      <Card>
        <H3>مدل‌های باسداکت</H3>
        <Grid cols={4}>
          {models.map(r => (
            <div key={r[0]} style={{ ...tile, gap: 6 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 900, color: GOLD }}>{r[0]}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r[1]}</span>
              <span style={{ fontSize: 12.5, color: AMBER, fontWeight: 500 }}>{r[2]}</span>
              <span style={{ fontSize: 12.5, lineHeight: 1.8, color: MUTE, fontWeight: 300 }}>{r[3]}</span>
            </div>
          ))}
        </Grid>
      </Card>
    </Wrap>
  )
}

function ModLight() {
  const lamps = [
    ['رشته‌ای', '۱۲ lm/W', 'راندمان ۱۲٪، عمر ۱۰۰۰h؛ نور گرم اما پرتلف'],
    ['هالوژن', '~۲۰ lm/W', 'گاز هالوژن، عمر بیشتر رشتهٔ تنگستن'],
    ['فلورسنت', '۷۹ lm/W', 'بخار جیوه + بالاست؛ T5/T8 کم‌مصرف‌تر'],
    ['کم‌مصرف (CFL)', '~۶۰ lm/W', '۸۰٪ کمتر از رشته‌ای؛ بالاست سرخود'],
    ['بخار سدیم', '۱۰۸ lm/W', 'معابر و بزرگراه؛ نور زرد پربازده'],
    ['LED', 'بالاترین', 'دیود PN، جریان DC، بدون UV/IR؛ عمر بالا'],
  ]
  const lux = [['نشیمن و پذیرایی', '۲۰۰'], ['مطالعه', '۵۰۰'], ['آشپزخانه', '۲۰۰'], ['دفاتر اداری', '۵۰۰'], ['کلاس درس', '۵۰۰'], ['اتاق عمل (میز)', '۸۰۰۰'], ['پلکان', '۱۵۰'], ['پارکینگ/راهرو', '۱۵۰']]
  return (
    <Wrap>
      <ModuleHeader anim={<GLight />} title="روشنایی و صرفه‌جویی انرژی" sub="حدود ۳۰٪ مصرف برق خانگی مربوط به روشنایی است — انتخاب لامپ و استاندارد لوکس." />
      <Card>
        <H3>انواع لامپ و بهرهٔ نوری</H3>
        <Grid cols={3}>
          {lamps.map(r => (
            <div key={r[0]} style={{ ...tile, gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 15.5, fontWeight: 700, color: INK }}>{r[0]}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: GOLD, whiteSpace: 'nowrap' }}>{r[1]}</span>
              </div>
              <span style={{ fontSize: 12.5, lineHeight: 1.8, color: MUTE, fontWeight: 300 }}>{r[2]}</span>
            </div>
          ))}
        </Grid>
      </Card>
      <Grid cols={2}>
        <Card>
          <H3 color={AMBER}>راهکارهای صرفه‌جویی</H3>
          <Grid cols={1} gap={8}>{['لامپ کم‌مصرف با بهرهٔ ≥۵۵ لومن بر وات', 'کاهنده‌های نور (Dimmer) و کلید مستقل هر فضا', 'سیستم تشخیص حضور/حرکت و کلید هوشمند', 'فتوسل و ساعت نجومی برای روشن/خاموش خودکار معابر', 'بازتابنده روی سقف و رنگ روشن دیوارها'].map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
          <P>روشنایی اضطراری: ایمنی (راه فرار) و جایگزین — با ژنراتور، باتری، اینورتر، UPS یا شبکهٔ مستقل.</P>
        </Card>
        <Card>
          <H3>استاندارد شدت روشنایی (لوکس)</H3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}>
            {lux.map(r => (
              <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '6px 0', borderBottom: '1px solid rgba(120,150,200,0.1)' }}>
                <span style={{ fontSize: 13.5, color: SOFT, fontWeight: 300 }}>{r[0]}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: GOLD }}>{r[1]}</span>
              </div>
            ))}
          </div>
        </Card>
      </Grid>
    </Wrap>
  )
}

function ModLightning() {
  return (
    <Wrap>
      <ModuleHeader anim={<GLightning />} title="سیستم صاعقه‌گیر" sub="حفاظت ساختمان بلندمرتبه در برابر صاعقه — بر پایهٔ مبحث ۱۴ مقررات ملی ساختمان." />
      <Grid cols={2}>
        <Card>
          <H3>سه بخش سیستم صاعقه‌گیر</H3>
          <Bullet>میلهٔ صاعقه‌گیر در بالای ساختمان با ارتفاع و هدایت مناسب</Bullet>
          <Bullet>سیستم انتقال میانی با امپدانس کم</Bullet>
          <Bullet>سیستم زمین مستقل برای تخلیهٔ اضافه‌ولتاژ به زمین</Bullet>
          <P>صاعقه‌گیر الکترونیکی (ESE): افزایش ناگهانی میدان مغناطیسی جو را حس کرده، واحد یونیزاسیون را شارژ و مسیر عمودی یونیزه برای جذب صاعقه ایجاد می‌کند.</P>
        </Card>
        <Card>
          <H3 color={AMBER}>نکتهٔ حیاتی سیستم زمین</H3>
          <div style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(255,197,61,0.07)', border: '1px solid rgba(255,197,61,0.3)' }}>
            <P>استفاده از کابل ارت ساختمان به‌عنوان هادی زمین صاعقه‌گیر به‌هیچ‌عنوان مجاز نیست؛ باید کابلی مستقل به سیستم ارت جداگانه منتقل شود.</P>
          </div>
          <Bullet>اگر دو چاه به هم وصل شوند، در نقاط حساس از ارستر (SPD) استفاده شود</Bullet>
          <Bullet>هادی‌های صاعقه‌گیر از داخل داکت و جدا از سایر هادی‌ها به چاه ارت</Bullet>
          <Bullet>در ساختمان‌های بلندمرتبه احداث چاه ارت مستقل الزامی است</Bullet>
        </Card>
      </Grid>
      <Card>
        <H3 color={AMBER}>نکات ایمنی هنگام وقوع صاعقه</H3>
        <Grid cols={2} gap={10}>{['از استخر و زیر باران خارج شده و بدن را خشک کنید', 'زیر درختان بلند پناه نگیرید؛ در جنگل زیر درختان کوتاه', 'از پنجره فاصله بگیرید و پرده‌ها را بکشید', 'از تلفن باسیم و وسایل برقی استفاده نکنید', 'از ایستادن روی نقاط مرتفع و زمین‌های باز بپرهیزید', 'از آنتن‌ها، تیرها و سیم ارتینگ صاعقه فاصله بگیرید'].map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
      </Card>
    </Wrap>
  )
}

function ModGen() {
  return (
    <Wrap>
      <ModuleHeader anim={<GGen />} title="مولد برق اضطراری" sub="تأمین برق اماکن حیاتی هنگام قطعی — الزامی برای ساختمان با آسانسور بیش از ۲۱ متر." />
      <Grid cols={2}>
        <Card>
          <H3>اماکن تحت پوشش الزامی</H3>
          <Grid cols={1} gap={8}>{['حداقل یک آسانسور از هر گروه', 'پمپ‌های آتش‌نشانی و تهویهٔ محیط‌های فاقد هوا', 'سیستم‌های ارتباطی: سانترال، اعلام حریق، آیفون و دربازکن', 'روشنایی راهرو، پله‌های خروجی و لابی', 'اتاق‌های پست، موتورخانهٔ آسانسور و کنترل'].map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
        </Card>
        <Card>
          <H3 color={AMBER}>مشخصات فنی</H3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
            <Stat value="۴۰۰V / ۵۰Hz" label="سه‌فاز چهارسیمه" />
            <Stat value="۳ تا ۱۵ ثانیه" label="استارت خودکار پس از قطعی" color={AMBER} />
          </div>
          <Bullet>استارت خودکار در قطع برق و رساندن به ≥۹۰٪ ولتاژ نامی</Bullet>
          <Bullet>پس از بازگشت برق، ۵ تا ۱۰ دقیقه کار بدون بار سپس خاموشی خودکار</Bullet>
          <Bullet>تکرار استارت تا ۳ بار؛ در صورت عدم روشن‌شدن، آژیر فعال می‌شود</Bullet>
          <Bullet>الکترود ارت مولد مستقل از الکترود ساختمان و متصل به همبندی</Bullet>
        </Card>
      </Grid>
      <Card>
        <H3>ملاحظات نصب نیروگاه</H3>
        <Grid cols={2} gap={10}>{['حداقل لرزش، صدا و دود؛ فونداسیون مستقل با لرزه‌گیر', 'اگزوز (صداخفه‌کن) متناسب با محل نصب', 'دودکش بلندتر از لبهٔ بام؛ شعاع و ارتفاع ۵۰ متری آزاد', 'مخزن سوخت طبق ضوابط شرکت نفت با حجم کافی', 'تجهیزات اطفاء حریق در محل', 'SPD در ساختمان‌های دارای صاعقه‌گیر الزامی است'].map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
      </Card>
    </Wrap>
  )
}

function ModPm() {
  const hist = [['EM', '۱۹۳۰', 'تعمیر بعد از خرابی'], ['CM', '۱۹۴۰', 'بعد از مشاهدهٔ علائم'], ['PM', '۱۹۵۰', 'در پریودهای زمانی خاص'], ['PDM', '۱۹۶۰', 'بر پایهٔ تحلیل اطلاعات'], ['RCM', '۱۹۷۸', 'بر پایهٔ قابلیت اطمینان']]
  return (
    <Wrap>
      <ModuleHeader anim={<GPm />} title="سرویس و نگهداری پیشگیرانه (PM)" sub="رفع اشکالات پیش از بروز خاموشی با برنامهٔ بازدید و ابزار شناسایی عیب." />
      <Card>
        <H3>تاریخچهٔ نگهداری</H3>
        <Grid cols={5}>
          {hist.map(r => (
            <div key={r[0]} style={{ ...tile, gap: 6 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 900, color: GOLD }}>{r[0]}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: AMBER }}>{r[1]}</span>
              <span style={{ fontSize: 12.5, lineHeight: 1.7, color: MUTE, fontWeight: 300 }}>{r[2]}</span>
            </div>
          ))}
        </Grid>
      </Card>
      <Grid cols={2}>
        <Card>
          <H3 color={AMBER}>برنامهٔ PM و ابزار شناسایی عیب</H3>
          <Bullet>تنظیم برنامهٔ بازدید سالانه از پست‌ها و شبکه‌های هوایی و زمینی</Bullet>
          <Bullet>اجرا بر اساس چک‌لیست‌های مصوب و نرم‌افزار PM</Bullet>
          <Grid cols={2} gap={8}>{['دوربین ترموویژن', 'دوربین کرونا', 'دستگاه ترموپوینت', 'التراسونیک', 'عیب‌یاب ۲۰kV'].map(t => <Bullet key={t} color={GOLD}>{t}</Bullet>)}</Grid>
        </Card>
        <Card>
          <H3>راه‌های کاهش تلفات و خاموشی</H3>
          <Grid cols={1} gap={8}>{['شناسایی اتصالات سست با ترموویژن و رفع آن‌ها', 'اصلاح ضریب قدرت با بانک‌های خازنی (cosφ مسکونی ۰٫۹)', 'تعدیل و تقلیل بار فیدرها و پست‌ها', 'افزایش نقاط مانور و اتوماسیون شبکه', 'تعویض کنتور الکترومکانیکی و لامپ پرمصرف'].map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
        </Card>
      </Grid>
      <Card>
        <H3 color={AMBER}>عیوب رایج شبکه که به سوختن تجهیزات منجر می‌شوند</H3>
        <Grid cols={3} gap={10}>{['اتصالی کابل زمینی (فرسودگی/کلنگ‌خوردگی)', 'معیوب‌شدن سرکابل هوایی و داخلی', 'قطع شدن نول → اتصال فاز به فاز در واحد مجاور', 'پاره‌شدن سیم نول → ولتاژ خطرناک نقطهٔ صفر', 'ضعف و نوسان ولتاژ و عدم تعادل بار', 'برخورد اشیاء، شاخهٔ درختان و حیوانات با شبکه'].map(t => <Bullet key={t}>{t}</Bullet>)}</Grid>
      </Card>
    </Wrap>
  )
}

const MODULES: { id: string; label: string; body: () => ReactNode }[] = [
  { id: 'equip', label: 'تجهیزات ساختمان بلندمرتبه', body: ModEquip },
  { id: 'substation', label: 'پست توزیع و ترانس', body: ModSubstation },
  { id: 'meter', label: 'کابل سرویس و تابلو کنتور', body: ModMeter },
  { id: 'amr', label: 'کنتور هوشمند (AMR)', body: ModAmr },
  { id: 'earth', label: 'ارتینگ و چاه ارت', body: ModEarth },
  { id: 'busduct', label: 'باسداکت و ترانکینگ', body: ModBusduct },
  { id: 'light', label: 'روشنایی و صرفه انرژی', body: ModLight },
  { id: 'lightning', label: 'صاعقه‌گیر', body: ModLightning },
  { id: 'gen', label: 'مولد برق اضطراری', body: ModGen },
  { id: 'pm', label: 'نگهداری پیشگیرانه', body: ModPm },
]

export function MeterCourse() {
  const [mod, setMod] = useState('equip')
  const active = MODULES.find(m => m.id === mod) ?? MODULES[0]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'learnRise 0.8s cubic-bezier(0.22,1,0.36,1) both' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start', padding: '8px 16px', border: '1px solid rgba(255,197,61,0.4)', borderRadius: 999, background: 'rgba(255,197,61,0.08)', color: GOLD, fontSize: 14, fontWeight: 500 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: GOLD, boxShadow: '0 0 10px 2px rgba(255,197,61,0.7)', animation: 'learnSpark 1.8s ease-in-out infinite' }} />
          دورهٔ جامع تجهیزات برق ساختمان
        </span>
        <h2 style={{ margin: 0, fontSize: 34, lineHeight: 1.35, fontWeight: 900, color: INK }}>
          دورهٔ <span style={{ color: GOLD }}>کنتور</span> و تأسیسات برق ساختمان
        </h2>
        <p style={{ margin: 0, maxWidth: 760, fontSize: 16, lineHeight: 2, fontWeight: 300, color: MUTE, textWrap: 'pretty' }}>
          از حریم شبکه و کابل سرویس تا تابلوی کنتور، پست توزیع، ارتینگ، باسداکت، روشنایی، صاعقه‌گیر، مولد اضطراری و نگهداری
          پیشگیرانه — بر پایهٔ مبحث ۱۳ مقررات ملی ساختمان و ضوابط شرکت‌های توزیع.
        </p>
      </header>

      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 10, position: 'sticky', top: 56, zIndex: 5, padding: '14px 0', background: 'linear-gradient(#070D1A 70%, transparent)' }}>
        {MODULES.map((m, i) => {
          const on = m.id === active.id
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMod(m.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px 9px 12px', borderRadius: 999,
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 14.5, fontWeight: on ? 700 : 400,
                border: on ? '1px solid rgba(255,197,61,0.6)' : '1px solid rgba(120,150,200,0.22)',
                background: on ? 'rgba(255,197,61,0.12)' : 'rgba(13,22,40,0.5)', color: on ? GOLD : MUTE, whiteSpace: 'nowrap',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,197,61,0.15)', color: GOLD, fontSize: 12, fontWeight: 900 }}>{fa(i + 1)}</span>
              {m.label}
            </button>
          )
        })}
      </nav>

      <div style={{ minHeight: 640 }}>{active.body()}</div>
    </div>
  )
}

import { AMBER, GOLD, INK, MUTE, cardBg, cardBorder, softBg, softBorder, fa } from '@/features/public/landing/learning/tokens'

const benefits = [
  { icon: '⚡', title: 'حفاظت از جان انسان', desc: 'نشتی جریان به‌جای عبور از بدن، از مسیر کم‌مقاومت سیم ارت به زمین منتقل می‌شود.' },
  { icon: '🛡', title: 'عملکرد صحیح محافظ جان', desc: 'کلید محافظ جان (RCD) تنها با وجود ارت استاندارد، نشتی جریان را به‌موقع قطع می‌کند.' },
  { icon: '⚙', title: 'حفاظت از تجهیزات', desc: 'دستگاه‌های الکتریکی و سیستم‌های الکترونیکی در برابر اضافه‌ولتاژ و اتصالی آسیب نمی‌بینند.' },
  { icon: '☁', title: 'تخلیهٔ صاعقه و الکتریسیتهٔ ساکن', desc: 'جریان‌های ناگهانی صاعقه و بارهای ساکن به‌طور ایمن به زمین هدایت می‌شوند.' },
]

const steps = [
  { title: 'انتخاب محل و حفر چاه', desc: 'چاه در پایین‌ترین نقطهٔ زمین (چمن، باغچه، فضای سبز) حفر می‌شود؛ جایی که رطوبت در عمق کم در دسترس باشد. حفاری تا رسیدن به خاک مرطوب ادامه می‌یابد.' },
  { title: 'توجه به نوع خاک', desc: 'عمق چاه بر اساس نوع خاک و مقاومت زمین تعیین می‌شود؛ هرچه مقاومت خاک بیشتر باشد، چاه عمیق‌تر یا تعداد الکترودها بیشتر خواهد بود.' },
  { title: 'ریختن مواد کاهنده', desc: 'کف چاه با بنتونیت یا مواد کاهندهٔ مقاومت پر می‌شود تا رطوبت حفظ شده و مقاومت اتصال زمین کاهش یابد.' },
  { title: 'نصب الکترود مسی', desc: 'صفحهٔ مسی (یا میلهٔ ارت) به‌صورت عمودی داخل چاه قرار می‌گیرد؛ الکترود قلب سیستم اتصال زمین است.' },
  { title: 'اتصال سیم به الکترود', desc: 'سیم یا تسمهٔ مسی با جوش احتراقی (کدولد) یا کلمپ به الکترود متصل می‌شود؛ هرگونه انشعاب از این هادی ممنوع است.' },
  { title: 'پر کردن چاه', desc: 'فضای باقی‌ماندهٔ چاه با خاک رس یا خاک سرندشده پر و لایه‌به‌لایه کوبیده می‌شود.' },
  { title: 'نصب درپوش بازدید', desc: 'بالای چاه دریچهٔ بازدید با درپوش مناسب نصب می‌شود تا بازرسی و نگهداری دوره‌ای ممکن باشد.' },
  { title: 'تست و صدور شناسنامه', desc: 'مقاومت اتصال زمین اندازه‌گیری می‌شود؛ پس از تأیید مقادیر استاندارد، شناسنامهٔ ارت صادر می‌گردد.' },
]

const stepCard: React.CSSProperties = {
  position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, padding: '22px 20px',
  borderRadius: 16, background: cardBg, border: cardBorder,
}
const numCircle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: '50%',
  border: '1.5px solid rgba(255,197,61,0.5)', color: GOLD, fontSize: 17, fontWeight: 900,
}
const elCard: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 14, padding: '22px 20px', borderRadius: 16, background: cardBg, border: cardBorder }
const elTitle: React.CSSProperties = { fontSize: 16.5, fontWeight: 700, color: INK }
const elDesc: React.CSSProperties = { fontSize: 14, fontWeight: 300, lineHeight: 1.9, color: MUTE, textWrap: 'pretty' }

export function EarthTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      <p style={{ margin: '-16px 0 0', maxWidth: 760, fontSize: 18, lineHeight: 2, fontWeight: 300, color: MUTE, textWrap: 'pretty' }}>
        ارت یا زمین کردن، اتصال بدنه‌های فلزی تجهیزات الکتریکی به زمین از مسیری با مقاومت بسیار کم است؛ تا هر نشتی جریان
        به‌جای بدن انسان، از سیم ارت به زمین منتقل شود. اجرای صحیح ارت باعث عملکرد درست کلید محافظ جان و حفاظت از تجهیزات
        الکتریکی و الکترونیکی می‌شود.
      </p>

      {/* diagram + why */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div style={{ position: 'relative', border: cardBorder, borderRadius: 20, background: 'rgba(13,22,40,0.6)', padding: 24, overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: 16, right: 20, fontSize: 12.5, color: '#6C7A93', letterSpacing: '0.06em' }}>برش عرضی چاه ارت — روش زمین عمقی</span>
            <svg viewBox="0 0 480 460" fill="none" style={{ width: '100%', height: 'auto', display: 'block', marginTop: 12 }}>
              <rect x="70" y="60" width="120" height="150" rx="8" stroke="#8FA3C2" strokeWidth="2" />
              <rect x="88" y="82" width="84" height="34" rx="4" stroke="rgba(143,163,194,0.5)" strokeWidth="1.5" />
              <circle cx="100" cy="140" r="6" stroke="rgba(143,163,194,0.6)" strokeWidth="1.5" />
              <circle cx="122" cy="140" r="6" stroke="rgba(143,163,194,0.6)" strokeWidth="1.5" />
              <path d="M88 168 h84 M88 182 h58" stroke="rgba(143,163,194,0.4)" strokeWidth="1.5" strokeLinecap="round" />
              <text x="130" y="238" fill="#8FA3C2" fontSize="14" textAnchor="middle">تابلو برق</text>
              <line x1="10" y1="260" x2="470" y2="260" stroke="rgba(167,180,201,0.35)" strokeWidth="2" />
              <g stroke="rgba(224,148,85,0.25)" strokeWidth="1.5">
                <path d="M40 268 l-12 12 M90 268 l-12 12 M140 268 l-12 12 M190 268 l-12 12 M240 268 l-12 12 M290 268 l-12 12 M340 268 l-12 12 M390 268 l-12 12 M440 268 l-12 12" />
              </g>
              <path d="M190 190 H330 V400" stroke="rgba(224,148,85,0.55)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M190 190 H330 V400" stroke={GOLD} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeDasharray="30 190" style={{ animation: 'learnPulse 2.4s linear infinite' }} />
              <path d="M290 260 V420 H370 V260" stroke="rgba(120,150,200,0.35)" strokeWidth="2" strokeDasharray="6 6" fill="none" />
              <rect x="292" y="360" width="76" height="58" rx="4" fill="rgba(224,148,85,0.10)" />
              <rect x="306" y="398" width="48" height="10" rx="2" fill={AMBER} />
              <text x="330" y="444" fill={AMBER} fontSize="14" textAnchor="middle">صفحه مسی + بنتونیت</text>
              <rect x="312" y="250" width="36" height="10" rx="3" stroke="#8FA3C2" strokeWidth="2" />
              <text x="415" y="246" fill="#8FA3C2" fontSize="13" textAnchor="middle">درپوش بازدید</text>
              <circle cx="330" cy="403" r="28" stroke="rgba(224,148,85,0.6)" strokeWidth="1.5" fill="none" style={{ transformOrigin: '330px 403px', animation: 'learnRipple 2.6s ease-out infinite' }} />
              <circle cx="330" cy="403" r="28" stroke="rgba(224,148,85,0.45)" strokeWidth="1.5" fill="none" style={{ transformOrigin: '330px 403px', animation: 'learnRipple 2.6s ease-out 1.3s infinite' }} />
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: INK }}>چرا ارت حیاتی است؟</h2>
          {benefits.map(b => (
            <div key={b.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 18px', borderRadius: 14, background: softBg, border: softBorder }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 38, height: 38, borderRadius: 10, background: 'rgba(255,197,61,0.12)', color: GOLD, fontSize: 18, fontWeight: 700 }}>{b.icon}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 16.5, fontWeight: 700, color: INK }}>{b.title}</span>
                <span style={{ fontSize: 14.5, fontWeight: 300, lineHeight: 1.9, color: MUTE }}>{b.desc}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: INK }}>
            نحوهٔ اجرای سیستم اتصال زمین <span style={{ color: AMBER }}>(روش زمین عمقی)</span>
          </h2>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 300, color: MUTE, lineHeight: 1.9 }}>
            پرکاربردترین روش اجرای ارت در ساختمان‌ها؛ گام‌به‌گام از حفر چاه تا نصب درپوش بازدید.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {steps.map((st, i) => (
            <div key={st.title} style={stepCard}>
              <span style={numCircle}>{fa(i + 1)}</span>
              <span style={{ fontSize: 16.5, fontWeight: 700, color: INK }}>{st.title}</span>
              <span style={elDesc}>{st.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* electrode types */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: INK }}>انواع الکترود <span style={{ color: GOLD }}>زمین</span></h2>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 300, color: MUTE, lineHeight: 1.9, maxWidth: 720, textWrap: 'pretty' }}>
            انتخاب نوع الکترود به مقاومت خاک، فضای موجود و مقاومت مطلوب زمین بستگی دارد؛ اگر یک الکترود مقاومت لازم را
            تأمین نکند، چند الکترود به هم متصل و یک زمین واحد را تشکیل می‌دهند.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          <div style={elCard}>
            <svg viewBox="0 0 200 150" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <line x1="10" y1="55" x2="190" y2="55" stroke="rgba(167,180,201,0.35)" strokeWidth="2" />
              <path d="M35 62 l-10 10 M75 62 l-10 10 M115 62 l-10 10 M155 62 l-10 10" stroke="rgba(224,148,85,0.25)" strokeWidth="1.5" />
              <g style={{ animation: 'learnDrive 2.2s ease-in-out infinite' }}>
                <rect x="96" y="20" width="8" height="110" rx="3" fill={AMBER} />
                <path d="M100 130 l-6 10 h12 z" fill={AMBER} />
                <rect x="86" y="12" width="28" height="10" rx="3" stroke="#8FA3C2" strokeWidth="2" />
              </g>
              <circle cx="100" cy="132" r="20" stroke="rgba(224,148,85,0.6)" strokeWidth="1.5" fill="none" style={{ transformOrigin: '100px 132px', animation: 'learnRipple 2.6s ease-out infinite' }} />
            </svg>
            <span style={elTitle}>الکترود میله‌ای (قائم)</span>
            <span style={elDesc}>میلهٔ مسی یا فولادی با روکش مس که به‌صورت عمودی در زمین کوبیده می‌شود؛ ساده‌ترین و مقرون‌به‌صرفه‌ترین روش.</span>
          </div>

          <div style={elCard}>
            <svg viewBox="0 0 200 150" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <line x1="10" y1="40" x2="190" y2="40" stroke="rgba(167,180,201,0.35)" strokeWidth="2" />
              <path d="M35 47 l-10 10 M75 47 l-10 10 M115 47 l-10 10 M155 47 l-10 10" stroke="rgba(224,148,85,0.25)" strokeWidth="1.5" />
              <path d="M100 10 V95" stroke="rgba(224,148,85,0.55)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M100 10 V95" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeDasharray="18 68" style={{ animation: 'learnPulse 2.4s linear infinite' }} />
              <rect x="72" y="95" width="56" height="34" rx="3" fill="rgba(224,148,85,0.2)" stroke={AMBER} strokeWidth="2.5" />
              <circle cx="100" cy="112" r="26" stroke="rgba(224,148,85,0.6)" strokeWidth="1.5" fill="none" style={{ transformOrigin: '100px 112px', animation: 'learnRipple 2.6s ease-out 0.6s infinite' }} />
            </svg>
            <span style={elTitle}>الکترود صفحه‌ای</span>
            <span style={elDesc}>صفحهٔ مسی که به‌صورت قائم در عمق چاه ارت دفن می‌شود؛ متداول در روش زمین عمقی همراه با بنتونیت.</span>
          </div>

          <div style={elCard}>
            <svg viewBox="0 0 200 150" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <line x1="10" y1="40" x2="190" y2="40" stroke="rgba(167,180,201,0.35)" strokeWidth="2" />
              <path d="M35 47 l-10 10 M75 47 l-10 10 M115 47 l-10 10 M155 47 l-10 10" stroke="rgba(224,148,85,0.25)" strokeWidth="1.5" />
              <path d="M60 10 V90" stroke="rgba(224,148,85,0.55)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M25 95 H175" stroke={AMBER} strokeWidth="5" strokeLinecap="round" />
              <path d="M25 95 H175" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeDasharray="12 12" style={{ animation: 'learnDash 1.2s linear infinite' }} />
              <text x="100" y="130" fill="#8FA3C2" fontSize="13" textAnchor="middle">دفن در ترانشهٔ کم‌عمق</text>
            </svg>
            <span style={elTitle}>الکترود افقی (تسمه‌ای)</span>
            <span style={elDesc}>تسمه یا سیم مسی که در ترانشه‌ای کم‌عمق به‌صورت افقی دفن می‌شود؛ مناسب زمین‌هایی که حفر چاه عمیق دشوار است.</span>
          </div>

          <div style={elCard}>
            <svg viewBox="0 0 200 150" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <line x1="10" y1="40" x2="190" y2="40" stroke="rgba(167,180,201,0.35)" strokeWidth="2" />
              <path d="M35 47 l-10 10 M75 47 l-10 10 M115 47 l-10 10 M155 47 l-10 10" stroke="rgba(224,148,85,0.25)" strokeWidth="1.5" />
              <path d="M40 65 H160" stroke={AMBER} strokeWidth="3" strokeLinecap="round" />
              <path d="M40 65 H160" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="10 10" style={{ animation: 'learnDash 1.2s linear infinite' }} />
              <rect x="37" y="65" width="6" height="60" rx="2" fill={AMBER} />
              <rect x="97" y="65" width="6" height="60" rx="2" fill={AMBER} />
              <rect x="157" y="65" width="6" height="60" rx="2" fill={AMBER} />
              <circle cx="100" cy="120" r="16" stroke="rgba(224,148,85,0.6)" strokeWidth="1.5" fill="none" style={{ transformOrigin: '100px 120px', animation: 'learnRipple 2.6s ease-out 1s infinite' }} />
            </svg>
            <span style={elTitle}>الکترود چندمفتولی (موازی)</span>
            <span style={elDesc}>چند میلهٔ به‌هم‌پیوسته وقتی یک الکترود مقاومت مطلوب را تأمین نکند؛ در سازه‌های بلندتر از ۲۰ متر توصیه می‌شود.</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '16px 20px', borderRadius: 14, background: softBg, border: softBorder }}>
          <span style={{ color: AMBER, fontSize: 18, lineHeight: 1.6 }}>●</span>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.9, color: MUTE, fontWeight: 300, textWrap: 'pretty' }}>
            برای سهولت در اندازه‌گیری مقاومت هر الکترود، یک جعبهٔ اتصال زمین (جعبهٔ تست) در نزدیک‌ترین دیوار به محل الکترود
            نصب می‌شود و هرگونه انشعاب از هادی ارتباط‌دهندهٔ الکترودها ممنوع است.
          </p>
        </div>
      </div>

      {/* safety */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '22px 26px', borderRadius: 16, background: 'rgba(255,197,61,0.07)', border: '1px solid rgba(255,197,61,0.3)' }}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 46, height: 46, borderRadius: 12, background: 'rgba(255,197,61,0.14)', color: GOLD }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.8L2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z" /></svg>
        </span>
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.9, color: INK, fontWeight: 400, textWrap: 'pretty' }}>
          سیم ارت و سیم نول را هرگز به‌جای هم استفاده نکنید و بدنهٔ دستگاه‌ها را به لوله‌های آب و گاز یا اسکلت ساختمان متصل
          نکنید — این کار می‌تواند به برق‌گرفتگی کشنده منجر شود. اجرای ارت باید توسط متخصص و مطابق استاندارد انجام و پس از
          تست، شناسنامهٔ ارت صادر شود.
        </p>
      </div>
    </div>
  )
}

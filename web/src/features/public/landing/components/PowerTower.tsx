// Power transmission-tower line illustration for the hero (ported from the
// attached "هیرو خدمات برق" reference). Animated power lines (heroPulse), a top
// spark (heroSpark), and an earth-electrode ripple (heroRipple) — keyframes live
// in landing.css.
export function PowerTower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 560" fill="none" className={className} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* ground line */}
      <line x1="20" y1="470" x2="540" y2="470" stroke="rgba(167,180,201,0.25)" strokeWidth="1.5" />

      {/* tower body */}
      <g stroke="#8FA3C2" strokeWidth="2" strokeLinecap="round">
        <path d="M230 470 L268 130 M330 470 L292 130" />
        <path d="M236 420 L324 420 M236 420 L318 370 M324 420 L242 370 M242 370 L318 370 M242 370 L312 320 M318 370 L248 320 M248 320 L312 320 M248 320 L306 272 M312 320 L254 272 M254 272 L306 272 M254 272 L301 226 M306 272 L259 226 M259 226 L301 226 M259 226 L296 182 M301 226 L264 182 M264 182 L296 182 M264 182 L291 142 M296 182 L269 142" />
        <path d="M268 130 L280 96 L292 130 M268 130 L292 130" />
        <path d="M180 200 L380 200 M196 200 L232 232 M364 200 L328 232 M160 268 L400 268 M178 268 L226 304 M382 268 L334 304" />
      </g>

      {/* insulators */}
      <g stroke="#6C7A93" strokeWidth="3" strokeLinecap="round">
        <path d="M188 200 v22 M372 200 v22 M168 268 v22 M392 268 v22 M280 96 v-14" />
      </g>

      {/* static power lines */}
      <g stroke="rgba(143,163,194,0.5)" strokeWidth="1.8" fill="none">
        <path d="M188 222 C 110 260, 40 268, -10 264" />
        <path d="M372 222 C 450 260, 520 268, 570 264" />
        <path d="M168 290 C 100 330, 30 340, -10 336" />
        <path d="M392 290 C 460 330, 530 340, 570 336" />
      </g>

      {/* animated current pulses */}
      <g stroke="#FFC53D" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M188 222 C 110 260, 40 268, -10 264" strokeDasharray="34 226" style={{ animation: 'heroPulse 2.6s linear infinite' }} />
        <path d="M372 222 C 450 260, 520 268, 570 264" strokeDasharray="34 226" style={{ animation: 'heroPulse 2.6s linear 0.9s infinite' }} />
        <path d="M392 290 C 460 330, 530 340, 570 336" strokeDasharray="34 226" style={{ animation: 'heroPulse 3.1s linear 1.6s infinite' }} />
      </g>

      {/* top spark */}
      <circle cx="280" cy="78" r="6" fill="#FFC53D" style={{ animation: 'heroSpark 2s ease-in-out infinite' }} />

      {/* ground electrode + earth symbol */}
      <g stroke="#E09455" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M330 470 L330 500 L410 500 L410 528" />
      </g>
      <g stroke="#E09455" strokeWidth="3" strokeLinecap="round">
        <path d="M382 528 h56" />
        <path d="M391 538 h38" />
        <path d="M400 548 h20" />
      </g>
      <g stroke="rgba(224,148,85,0.3)" strokeWidth="1.5">
        <path d="M60 484 l-14 14 M110 484 l-14 14 M160 484 l-14 14 M210 484 l-14 14 M260 484 l-14 14 M310 484 l-14 14 M480 484 l-14 14 M520 484 l-14 14" />
      </g>

      {/* earth ripple */}
      <g>
        <circle cx="410" cy="528" r="26" stroke="rgba(224,148,85,0.7)" strokeWidth="1.5" fill="none" style={{ transformOrigin: '410px 528px', animation: 'heroRipple 2.8s ease-out infinite' }} />
        <circle cx="410" cy="528" r="26" stroke="rgba(224,148,85,0.5)" strokeWidth="1.5" fill="none" style={{ transformOrigin: '410px 528px', animation: 'heroRipple 2.8s ease-out 1.4s infinite' }} />
      </g>
    </svg>
  )
}

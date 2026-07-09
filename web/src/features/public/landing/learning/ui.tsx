import type { CSSProperties, ReactNode } from 'react'
import { AMBER, GOLD, INK, MUTE, SOFT, cardBg, cardBorder } from '@/features/public/landing/learning/tokens'

// Shared dark-styled building blocks for the Learning Center (مرکز آموزش),
// ported 1:1 from the attached design. Colors are hard-coded to the reference
// dark palette (self-contained section). Tokens live in ./tokens.

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '22px 22px', borderRadius: 16, background: cardBg, border: cardBorder, ...style }}>
      {children}
    </div>
  )
}

export function H3({ children, color }: { children: ReactNode; color?: string }) {
  return <h3 style={{ margin: '0 0 4px', fontSize: 19, fontWeight: 700, color: color ?? INK }}>{children}</h3>
}

export function P({ children }: { children: ReactNode }) {
  return <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.95, fontWeight: 300, color: SOFT, textWrap: 'pretty' }}>{children}</p>
}

export function Grid({ cols, gap, children }: { cols: number; gap?: number; children: ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gap ?? 16 }}>{children}</div>
}

export function Bullet({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <span style={{ flexShrink: 0, marginTop: 9, width: 6, height: 6, borderRadius: '50%', background: color ?? AMBER }} />
      <span style={{ fontSize: 14.5, lineHeight: 1.95, fontWeight: 300, color: SOFT, textWrap: 'pretty' }}>{children}</span>
    </div>
  )
}

export function Stat({ value, label, color }: { value: ReactNode; label: string; color?: string }) {
  const c = color ?? GOLD
  const bg = c === GOLD ? 'rgba(255,197,61,0.07)' : 'rgba(224,148,85,0.07)'
  const border = c === GOLD ? 'rgba(255,197,61,0.3)' : 'rgba(224,148,85,0.35)'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '16px 18px', borderRadius: 14, background: bg, border: `1px solid ${border}` }}>
      <span style={{ fontSize: 24, fontWeight: 900, color: c }}>{value}</span>
      <span style={{ fontSize: 13, color: MUTE, fontWeight: 300 }}>{label}</span>
    </div>
  )
}

export function Wrap({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 22, animation: 'learnRise 0.5s cubic-bezier(0.22,1,0.36,1) both' }}>{children}</div>
}

// Module header: animated glyph + title + subtitle.
export function ModuleHeader({ anim, title, sub }: { anim: ReactNode; title: string; sub: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', padding: '28px 30px', borderRadius: 22, background: 'var(--bg-elevated)', border: cardBorder, marginBottom: 32, animation: 'learnRise 0.6s cubic-bezier(0.22,1,0.36,1) both' }}>
      <div style={{ flexShrink: 0, width: 200, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{anim}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 260 }}>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900, color: INK }}>{title}</h2>
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.9, fontWeight: 300, color: MUTE }}>{sub}</p>
      </div>
    </div>
  )
}

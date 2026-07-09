// Shared dark-palette tokens + helpers for the Learning Center (مرکز آموزش).
// Kept separate from ui.tsx so that file only exports components (react-refresh).
// Accents stay constant across themes; text/surfaces map to the landing CSS
// variables so the Learning Center adapts to light & dark mode.
export const GOLD = '#FFC53D'
export const AMBER = '#E09455'
export const INK = 'var(--text-primary)'
export const MUTE = 'var(--text-secondary)'
export const SOFT = 'var(--text-secondary)'
export const cardBg = 'var(--bg-elevated)'
export const cardBorder = '1px solid var(--border)'
export const softBg = 'var(--bg-raised)'
export const softBorder = '1px solid var(--border)'

// Persian digits helper.
export const fa = (n: number | string) => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])

// Shared dark-palette tokens + helpers for the Learning Center (مرکز آموزش).
// Kept separate from ui.tsx so that file only exports components (react-refresh).
export const GOLD = '#FFC53D'
export const AMBER = '#E09455'
export const INK = '#EAF0FA'
export const MUTE = '#A7B4C9'
export const SOFT = '#C6D1E4'
export const cardBg = 'rgba(13,22,40,0.7)'
export const cardBorder = '1px solid rgba(120,150,200,0.16)'
export const softBg = 'rgba(120,150,200,0.06)'
export const softBorder = '1px solid rgba(120,150,200,0.14)'

// Persian digits helper.
export const fa = (n: number | string) => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])

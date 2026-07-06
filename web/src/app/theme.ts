import { theme as antdTheme, type ThemeConfig } from 'antd'

// Electrical-industry palette: utility/electric blue primary (power-sector
// standard, e.g. Tavanir), voltage amber accent, earth green for success.
export const BRAND = '#0958d9'

// Dark mode uses a lighter tonal blue so contrast stays AA on dark surfaces
// (never invert; see MD dark-theme guidance).
export const BRAND_DARK = '#4096ff'

// Voltage amber — accent for badges/highlights (lightning, high-voltage signage).
export const VOLT = '#faad14'

export function buildTheme(mode: 'light' | 'dark'): ThemeConfig {
  const dark = mode === 'dark'
  return {
    algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: dark ? BRAND_DARK : BRAND,
      borderRadius: 8,
      fontFamily: 'IRANSansXFaNum, Roboto, system-ui, sans-serif',
      ...(dark ? { colorBgLayout: '#0b101b', colorBgContainer: '#121826' } : {}),
    },
    components: {
      Layout: dark
        ? { headerBg: '#121826', siderBg: '#0d1424' }
        : { headerBg: '#ffffff', siderBg: '#0a2540' },
      Menu: dark
        ? { darkItemBg: '#0d1424', darkSubMenuItemBg: '#090e1a' }
        : { darkItemBg: '#0a2540', darkSubMenuItemBg: '#071a30' },
    },
  }
}

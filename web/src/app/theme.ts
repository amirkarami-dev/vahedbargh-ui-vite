import type { ThemeConfig } from 'antd'

// Brand teal — same as old-ui ($brand / colorPrimary).
export const BRAND = '#004943'

export const theme: ThemeConfig = {
  token: {
    colorPrimary: BRAND,
    borderRadius: 8,
    fontFamily: 'IRANSansXFaNum, Roboto, system-ui, sans-serif',
  },
}

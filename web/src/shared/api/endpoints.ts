// Endpoint constants. Port the full set (~81) from old-ui/src/helpers/url_helper.js
// one domain at a time (see /migrate-feature). Paths are relative to VITE_API_URL,
// exactly as in old-ui (the base URL already includes any /api/v1.0 segment).
export const endpoints = {
  auth: {
    login: '/Identity/Login',
    loginByCode: '/Identity/LoginByCode',
    logout: '/Identity/Logout',
  },
  engineers: {
    list: 'Engineers/GetEngineerByClient',
    upsert: 'Engineers/UpsertEngineer',
    upsertHistory: 'Engineers/UpsertEngHistory',
  },
} as const

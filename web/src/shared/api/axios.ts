import axios, {
  type AxiosError,
  type AxiosResponseHeaders,
  type RawAxiosResponseHeaders,
} from 'axios'
import { getAuthUser, setAuthUser } from '@/shared/lib/auth'

// Single axios instance. baseURL from Vite env (was REACT_APP_API_URL in old-ui).
export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Inject Bearer token on every request.
axiosApi.interceptors.request.use(config => {
  const user = getAuthUser()
  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`
  }
  return config
})

// The API can refresh tokens via response headers (success OR error). Keep this.
function refreshFromHeaders(headers?: RawAxiosResponseHeaders | AxiosResponseHeaders) {
  const accessToken = headers?.['x-access-token'] as string | undefined
  const refreshToken = headers?.['x-refresh-token'] as string | undefined
  if (accessToken) {
    const user = getAuthUser()
    setAuthUser({
      accessToken,
      refreshToken: refreshToken ?? user?.refreshToken ?? '',
    })
  }
}

// Map a failed response to a Persian message string — same switch as old-ui api_helper.js.
// NOTE: consumers receive a string (not an Error), exactly like the legacy app.
function mapErrorMessage(status: number, data: unknown): string {
  switch (status) {
    case 404:
    case 500:
    case 400:
    case 402:
      return `خطا! ${data}`
    case 401:
      return 'Invalid credentials'
    case 403:
      return 'عدم دسترسی'
    case 415:
      return `خطا! ${Object.values((data as Record<string, unknown>) ?? {}).flat()}`
    default:
      try {
        return (data as { message: string }[])[0].message
      } catch {
        return 'Problem'
      }
  }
}

axiosApi.interceptors.response.use(
  response => {
    refreshFromHeaders(response.headers)
    return response
  },
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject('Network Error')
    }
    refreshFromHeaders(error.response.headers)
    // 401 -> hard redirect to login (same behavior as old-ui, no silent retry).
    if (error.response.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(mapErrorMessage(error.response.status, error.response.data))
  },
)

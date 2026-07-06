import { jwtDecode } from 'jwt-decode'

// Auth contract — MUST match old-ui and the .NET API.
// Token lives in localStorage.authUser as { accessToken, refreshToken }.
export type AuthUser = {
  accessToken: string
  refreshToken: string
}

const KEY = 'authUser'

// Common .NET role claim type, plus the short "role" claim.
const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

export function getAuthUser(): AuthUser | null {
  const raw = localStorage.getItem(KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function setAuthUser(user: AuthUser) {
  localStorage.setItem(KEY, JSON.stringify(user))
}

export function clearAuthUser() {
  localStorage.removeItem(KEY)
}

export function getAccessToken(): string {
  return getAuthUser()?.accessToken ?? ''
}

export function isAuthenticated(): boolean {
  return !!getAuthUser()?.accessToken
}

type TokenClaims = Record<string, unknown>

// Role claim is the short `role` key (old-ui jwt-token-access), with the long
// .NET claim URI as a fallback. Confirmed by role-gated menus/routes working.
export function getRoles(): string[] {
  const token = getAccessToken()
  if (!token) return []
  try {
    const claims = jwtDecode<TokenClaims>(token)
    const raw = claims['role'] ?? claims[ROLE_CLAIM] ?? []
    return Array.isArray(raw) ? (raw as string[]) : [String(raw)]
  } catch {
    return []
  }
}

// Decoded JWT claims (includes `sid`, `cid`, `name`…). old-ui getCurrentUser.
export function getCurrentUser(): TokenClaims | null {
  const token = getAccessToken()
  if (!token) return null
  try {
    return jwtDecode<TokenClaims>(token)
  } catch {
    return null
  }
}

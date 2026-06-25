import { post } from '@/shared/api/http'
import { endpoints } from '@/shared/api/endpoints'
import type { AuthResponse, LoginByCodeRequest, LoginRequest } from '@/features/auth/types'

// Wrappers mirror old-ui backend_helper.js (postJwtLogin / postJwtLoginByCode / delJwtSession).
// The request body must match the legacy shape exactly.
export function postLogin(req: LoginRequest) {
  return post<AuthResponse>(endpoints.auth.login, {
    oneMinute: false,
    userName: req.userName,
    password: req.password,
    deviceToken: '',
    platformType: 2,
  })
}

export function postLoginByCode(req: LoginByCodeRequest) {
  return post<AuthResponse>(endpoints.auth.loginByCode, {
    code: req.code.toString(),
    userName: req.userName,
  })
}

export function postLogout() {
  return post(endpoints.auth.logout, {})
}

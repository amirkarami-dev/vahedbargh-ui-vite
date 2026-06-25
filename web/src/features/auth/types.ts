export type LoginRequest = {
  userName: string
  password: string
}

export type LoginByCodeRequest = {
  code: string
  userName: string
}

// Shape returned by /Identity/Login and /Identity/LoginByCode.
export type AuthResponse = {
  token: string
  refreshToken: string
  urlRedirect: string
}

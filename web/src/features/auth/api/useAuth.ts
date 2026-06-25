import { useMutation } from '@tanstack/react-query'
import { useNavigate, type NavigateFunction } from 'react-router-dom'
import { postLogin, postLoginByCode, postLogout } from '@/features/auth/api/authApi'
import { clearAuthUser, setAuthUser } from '@/shared/lib/auth'
import type { AuthResponse, LoginByCodeRequest, LoginRequest } from '@/features/auth/types'

// Same branching as old-ui login saga.
function storeAndRedirect(res: AuthResponse, navigate: NavigateFunction, userName?: string) {
  // MFA path: server asks for the SMS code first — do NOT store the token yet.
  if (res.urlRedirect === '/submit-sms') {
    navigate(`/submit-sms?username=${encodeURIComponent(userName ?? '')}`)
    return
  }
  setAuthUser({ accessToken: res.token, refreshToken: res.refreshToken })
  navigate(res.urlRedirect || '/dashboard')
}

export function useLogin() {
  const navigate = useNavigate()
  return useMutation<AuthResponse, string, LoginRequest>({
    mutationFn: req => {
      localStorage.removeItem('authUser') // old-ui clears before logging in
      return postLogin(req)
    },
    onSuccess: (res, req) => storeAndRedirect(res, navigate, req.userName),
  })
}

export function useLoginByCode() {
  const navigate = useNavigate()
  return useMutation<AuthResponse, string, LoginByCodeRequest>({
    mutationFn: req => postLoginByCode(req),
    onSuccess: res => storeAndRedirect(res, navigate),
  })
}

export function useLogout() {
  const navigate = useNavigate()
  return useMutation<unknown, string, void>({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      clearAuthUser()
      navigate('/login')
    },
  })
}

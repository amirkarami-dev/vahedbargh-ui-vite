import type { AxiosRequestConfig } from 'axios'
import { axiosApi } from '@/shared/api/axios'
import { getAccessToken } from '@/shared/lib/auth'

// Thin HTTP helpers — port of old-ui helpers/api_helper.js.
// React Query hooks call domain wrappers, which call these. Never call axios in components.

export async function get<T = unknown>(url: string, config: AxiosRequestConfig = {}) {
  const res = await axiosApi.get<T>(url, config)
  return res.data
}

export async function post<T = unknown>(url: string, data?: unknown, config: AxiosRequestConfig = {}) {
  const res = await axiosApi.post<T>(url, data, config)
  return res.data
}

export async function put<T = unknown>(url: string, data?: unknown, config: AxiosRequestConfig = {}) {
  const res = await axiosApi.put<T>(url, data, config)
  return res.data
}

export async function del<T = unknown>(url: string, config: AxiosRequestConfig = {}) {
  const res = await axiosApi.delete<T>(url, config)
  return res.data
}

// Multipart upload — every file upload in old-ui used this (postAttach).
export async function postAttach<T = unknown>(url: string, data: FormData) {
  const res = await axiosApi.post<T>(url, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

// Fetch an image as base64 PNG (old-ui getImageFile used fetch, not axios).
export async function getImageFile(url: string): Promise<string> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  })
  const body = await res.text()
  return `data:image/png;base64,${body}`
}

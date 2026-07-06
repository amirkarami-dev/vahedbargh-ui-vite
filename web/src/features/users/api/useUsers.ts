import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { addUser, deleteUser, getUsers, updateUser } from '@/features/users/api/usersApi'
import type { AddUser, UpdateUser } from '@/features/users/types'

const KEY = ['users']

export function useUsers() {
  return useQuery({ queryKey: KEY, queryFn: getUsers })
}

export function useAddUser() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, AddUser>({
    mutationFn: addUser,
    onSuccess: () => {
      message.success('کاربر ایجاد شد')
      qc.invalidateQueries({ queryKey: KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useUpdateUser() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, UpdateUser>({
    mutationFn: updateUser,
    onSuccess: () => {
      message.success('کاربر به‌روزرسانی شد')
      qc.invalidateQueries({ queryKey: KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useDeleteUser() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      message.success('کاربر حذف شد')
      qc.invalidateQueries({ queryKey: KEY })
    },
    onError: e => message.error(String(e)),
  })
}

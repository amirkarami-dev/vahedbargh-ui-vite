import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { addUserFile, deleteUserFile, getUserFiles } from '@/features/userFiles/api/userFilesApi'

export function useUserFiles(userId: string | number | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ['userFiles', userId],
    queryFn: () => getUserFiles(userId!),
    enabled: enabled && userId != null && userId !== '',
  })
}

export function useAddUserFile(userId: string | number | undefined) {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, FormData>({
    mutationFn: fd => addUserFile(fd),
    onSuccess: () => {
      message.success('فایل ذخیره شد')
      qc.invalidateQueries({ queryKey: ['userFiles', userId] })
      // Refresh the engineer row so its uploaded-document tags update.
      qc.invalidateQueries({ queryKey: ['engineers'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useDeleteUserFile(userId: string | number | undefined) {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, string>({
    mutationFn: id => deleteUserFile(id),
    onSuccess: () => {
      message.success('فایل حذف شد')
      qc.invalidateQueries({ queryKey: ['userFiles', userId] })
      qc.invalidateQueries({ queryKey: ['engineers'] })
    },
    onError: e => message.error(String(e)),
  })
}

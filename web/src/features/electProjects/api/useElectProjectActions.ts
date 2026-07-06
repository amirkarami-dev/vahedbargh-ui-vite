import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import {
  addPanelMaker,
  addProjectFile,
  amountSms,
  deleteElectProject,
  getPanelMakers,
  getProjectFiles,
  stopElectProject,
  submitByAdmin,
  submitPanel,
  updateElectProject,
  upsertElectProject,
} from '@/features/electProjects/api/electProjectsApi'
import type { AmountSmsRequest } from '@/features/electProjects/types'

export function useProjectFiles(id: string, enabled: boolean) {
  return useQuery({
    queryKey: ['projectFiles', id],
    queryFn: () => getProjectFiles(id),
    enabled: enabled && !!id,
  })
}

export function useAddProjectFile(id: string) {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, FormData>({
    mutationFn: fd => addProjectFile(fd),
    onSuccess: () => {
      message.success('فایل ذخیره شد')
      qc.invalidateQueries({ queryKey: ['projectFiles', id] })
      qc.invalidateQueries({ queryKey: ['electProjects'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useUpdateElectProject() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, Record<string, unknown>>({
    mutationFn: data => updateElectProject(data),
    onSuccess: () => {
      message.success('پرونده به‌روزرسانی شد')
      qc.invalidateQueries({ queryKey: ['electProjects'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useUpsertElectProject() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, Record<string, unknown>>({
    mutationFn: data => upsertElectProject(data),
    onSuccess: () => {
      message.success('پرونده ثبت شد')
      qc.invalidateQueries({ queryKey: ['electProjects'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useDeleteElectProject() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, string>({
    mutationFn: id => deleteElectProject(id),
    onSuccess: () => {
      message.success('پرونده حذف شد')
      qc.invalidateQueries({ queryKey: ['electProjects'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useSubmitByAdmin() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, string>({
    mutationFn: id => submitByAdmin(id),
    onSuccess: () => {
      message.success('پرونده ارسال شد')
      qc.invalidateQueries({ queryKey: ['electProjects'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useAmountSms() {
  const { message } = App.useApp()
  return useMutation<unknown, string, AmountSmsRequest>({
    mutationFn: data => amountSms(data),
    onSuccess: () => message.success('پیامک ارسال شد'),
    onError: e => message.error(String(e)),
  })
}

export function useStopElectProject() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, { stopDes: string; isStop: boolean; gpId: string }>({
    mutationFn: data => stopElectProject(data),
    onSuccess: () => {
      message.success('پرونده به‌روزرسانی شد')
      qc.invalidateQueries({ queryKey: ['electProjects'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useSubmitPanel() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, { id: string; panelSerialNumber: string }>({
    mutationFn: data => submitPanel(data),
    onSuccess: () => {
      message.success('پرونده تایید شد')
      qc.invalidateQueries({ queryKey: ['electProjects'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function usePanelMakers(enabled: boolean) {
  return useQuery({ queryKey: ['panelMakers'], queryFn: getPanelMakers, enabled })
}

export function useAddPanelMaker() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, { panelMakerId: string; electProjectId: string }>({
    mutationFn: data => addPanelMaker(data),
    onSuccess: () => {
      message.success('تابلوساز ثبت شد')
      qc.invalidateQueries({ queryKey: ['electProjects'] })
    },
    onError: e => message.error(String(e)),
  })
}

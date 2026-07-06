import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import {
  deleteEpp,
  eppAccepted,
  eppApproved,
  eppEngChange,
  eppUpdateIsMain,
  getAssignEngineers,
  getListProjectProcessEng,
  projectProcess,
  updateByEdc,
  upsertCheckList,
  upsertCheckListEdc,
  upsertComment,
  upsertErtForm,
} from '@/features/electProjectProcess/api/electProjectProcessApi'
import { updateElectProjectByEng } from '@/features/electProjects/api/electProjectsApi'
import type { EppFilter, ProjectProcessPayload } from '@/features/electProjectProcess/types'

const LIST_KEY = ['projectProcessEng']

// Engineer edits the project's owner/address details (old-ui ProjectDetails).
export function useUpdateProjectDetails() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, Record<string, unknown>>({
    mutationFn: data => updateElectProjectByEng(data),
    onSuccess: () => {
      message.success('اطلاعات پرونده ذخیره شد')
      qc.invalidateQueries({ queryKey: LIST_KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useAssignEngineers(engineerGradeTypeEnum: number, filterCertEnum: number) {
  return useQuery({
    queryKey: ['assignEngineers', engineerGradeTypeEnum, filterCertEnum],
    queryFn: () => getAssignEngineers({ engineerGradeTypeEnum, filterCertEnum }),
  })
}

export function useProjectProcess() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, ProjectProcessPayload>({
    mutationFn: data => projectProcess(data),
    onSuccess: () => {
      message.success('تخصیص انجام شد')
      qc.invalidateQueries({ queryKey: ['electProjects'] })
      qc.invalidateQueries({ queryKey: LIST_KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useProjectProcessEng(filter: EppFilter) {
  return useQuery({
    queryKey: [...LIST_KEY, filter],
    queryFn: () => getListProjectProcessEng(filter),
  })
}

export function useDeleteEpp() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, string>({
    mutationFn: id => deleteEpp(id),
    onSuccess: () => {
      message.success('تخصیص حذف شد')
      qc.invalidateQueries({ queryKey: LIST_KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useEppEngChange() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, { id: string; idEngineer: number | string }>({
    mutationFn: data => eppEngChange(data),
    onSuccess: () => {
      message.success('کارشناس تغییر کرد')
      qc.invalidateQueries({ queryKey: LIST_KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useEppUpdateIsMain() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, { id: string; isMain: boolean }>({
    mutationFn: data => eppUpdateIsMain(data),
    onSuccess: () => {
      message.success('وضعیت اصلی/فرعی ثبت شد')
      qc.invalidateQueries({ queryKey: LIST_KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useEppAccept() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, { eppId: string }>({
    mutationFn: data => eppAccepted(data),
    onSuccess: () => {
      message.success('پرونده قبول شد')
      qc.invalidateQueries({ queryKey: LIST_KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useEppApprove() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<
    unknown,
    string,
    { eppId: string; inspectionStatusEnum: number; des: string; needElectNetwork?: boolean }
  >({
    mutationFn: data => eppApproved(data),
    onSuccess: () => {
      message.success('اعلام نظر ثبت شد')
      qc.invalidateQueries({ queryKey: LIST_KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useUpdateByEdc() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<
    unknown,
    string,
    { des: string; electProjectId: string; electProjectStatusEnum?: number }
  >({
    mutationFn: data => updateByEdc(data),
    onSuccess: () => {
      message.success('وضعیت ثبت شد')
      qc.invalidateQueries({ queryKey: LIST_KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useUpsertComment() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, Record<string, unknown>>({
    mutationFn: data => upsertComment(data),
    onSuccess: () => {
      message.success('فرم شماره ۳ ذخیره شد')
      qc.invalidateQueries({ queryKey: LIST_KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useUpsertCheckList() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, Record<string, unknown>>({
    mutationFn: data => upsertCheckList(data),
    onSuccess: () => {
      message.success('چک لیست ذخیره شد')
      qc.invalidateQueries({ queryKey: LIST_KEY })
    },
    onError: e => message.error(String(e)),
  })
}

export function useUpsertCheckListEdc() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, Record<string, unknown>>({
    mutationFn: data => upsertCheckListEdc(data),
    onSuccess: () => {
      message.success('چک لیست توزیع ذخیره شد')
      qc.invalidateQueries({ queryKey: ['electProjects'] })
    },
    onError: e => message.error(String(e)),
  })
}

// EDC status/defect update (old-ui ElectProjectProcessEdc/UpdateByEdc).
export function useEdcDefect() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, Record<string, unknown>>({
    mutationFn: data => updateByEdc(data),
    onSuccess: () => {
      message.success('وضعیت ثبت شد')
      qc.invalidateQueries({ queryKey: ['electProjects'] })
    },
    onError: e => message.error(String(e)),
  })
}

export function useUpsertErtForm() {
  const qc = useQueryClient()
  const { message } = App.useApp()
  return useMutation<unknown, string, Record<string, unknown>>({
    mutationFn: data => upsertErtForm(data),
    onSuccess: () => {
      message.success('شناسنامه ارت ذخیره شد')
      qc.invalidateQueries({ queryKey: LIST_KEY })
    },
    onError: e => message.error(String(e)),
  })
}

import type { EnumMap } from '@/shared/lib/enums'

// old-ui models/types/file-support-type.js (labels from the fa locale `enums.*`).
// Only the types the support files UI offers (old-ui hides ids 3/5/6).
export const FileSupportTypeEnum: EnumMap = {
  IdCard: { value: 1, label: 'کارت ملی' },
  ElectPlan: { value: 2, label: 'نقشه برق' },
  ErtMap: { value: 4, label: 'شناسنامه ارت' },
  ElectNetwork: { value: 7, label: 'کروکی احداث شبکه' },
  TestAndDelivery: { value: 8, label: 'تست و تحویل' },
  CrookyOfElectrode: { value: 14, label: 'کروکی چیدمان الکترودها' },
  SupervisorApproveForm: { value: 15, label: 'فرم تایید ناظر' },
  ExpertDocument: { value: 16, label: 'مستندات بازرس برق' },
  ErtDocument: { value: 17, label: 'مستندات مجری ارت' },
  TestAndDeliveryDocument: { value: 18, label: 'مستندات تست و تحویل' },
  SupervisionDocument: { value: 19, label: 'مستندات نظارت' },
  ForAnnouncement: { value: 20, label: 'مربوط به اطلاعیه' },
  Other: { value: 21, label: 'سایر' },
  Notice: { value: 22, label: 'اخطاریه' },
  AzbuiltMap: { value: 23, label: 'نقشه ازبیلت' },
  ForUpperCapacity: { value: 24, label: 'افزایش ظرفیت' },
}

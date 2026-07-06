// old-ui models/types/file-elect-project-type.js (FileElectProjectType).
// `name` = backend enum name (used in upload FormData); `label` = Persian display.
export type FileTypeEntry = { value: number; name: string; label: string }

export const fileElectProjectTypes: FileTypeEntry[] = [
  { value: 2, name: 'ElectPlan', label: 'نقشه برق' },
  { value: 3, name: 'RelatedPermit', label: 'جواز/پروانه' },
  { value: 1, name: 'IdCard', label: 'کارت ملی' },
  { value: 4, name: 'ErtMap', label: 'نقشه ارت' },
  { value: 5, name: 'CheckListBoard', label: 'چک‌لیست تابلو' },
  { value: 6, name: 'Crooky', label: 'کروکی' },
  { value: 7, name: 'ElectNetwork', label: 'شبکه برق' },
  { value: 8, name: 'TestAndDelivery', label: 'تست و تحویل' },
  { value: 14, name: 'CrookyOfElectrode', label: 'کروکی الکترود' },
  { value: 15, name: 'SupervisorApproveForm', label: 'فرم تایید ناظر' },
  { value: 16, name: 'ExpertDocument', label: 'مدرک کارشناسی' },
  { value: 17, name: 'ErtDocument', label: 'مدرک ارت' },
  { value: 18, name: 'TestAndDeliveryDocument', label: 'مدرک تست و تحویل' },
  { value: 19, name: 'SupervisionDocument', label: 'مدرک نظارت' },
  { value: 23, name: 'AzbuiltMap', label: 'نقشه ازبیلت' },
]

export const fileTypeByValue = (v: number) => fileElectProjectTypes.find(t => t.value === v)

export const fileTypeLabelByName = (name: string) =>
  fileElectProjectTypes.find(t => t.name === name)?.label ?? name

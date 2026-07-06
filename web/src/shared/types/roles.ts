// The 7 roles (from old-ui common/enums/rolesType.js). Used by the route guard.
export enum Role {
  Administrator = 'Administrator',
  Engineer = 'Engineer',
  Employee = 'Employee',
  Accountant = 'Accountant',
  PanelMaker = 'PanelMaker',
  ElectAdmin = 'ElectAdmin',
  Section = 'Section',
}

export const ALL_ROLES: string[] = Object.values(Role)

// Persian display names (old-ui rolesType values).
export const ROLE_LABELS: Record<string, string> = {
  Administrator: 'مدیر',
  Engineer: 'کارشناس',
  Employee: 'کارمند',
  Accountant: 'حسابدار',
  PanelMaker: 'تابلوساز',
  ElectAdmin: 'توزیع برق',
  Section: 'شهرستان',
}

export const roleLabel = (r: string): string => ROLE_LABELS[r] ?? r

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

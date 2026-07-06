// Client user (api ClientUserDto). Admin-managed accounts.
export type ClientUser = {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  nickName?: string
  phoneNumber?: string
  active: boolean
  role?: string
}

// AddUser payload (api AddClientUserCommand).
export type AddUser = {
  email: string
  password: string
  firstName: string
  lastName: string
  nickName: string
  phoneNumber?: string
  role: string
}

// UpdateUser payload (api UpdateClientUserCommand).
export type UpdateUser = {
  id: string
  firstName: string
  lastName: string
  nickName: string
  phoneNumber?: string
  role: string
  active: boolean
}

export const USER_ROLES = ['Employee', 'Engineer', 'Executor', 'Accountant', 'Administrator']

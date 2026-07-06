// old-ui ProjectMainEdit building-group selects + BuildingGroupParameterTypeEnum.
export const BuildingGroupTypes = [
  { value: 1, label: 'گروه الف' },
  { value: 2, label: 'گروه ب' },
  { value: 3, label: 'گروه ج' },
  { value: 4, label: 'گروه د' },
]

export type BuildingGroupParam = { value: number; label: string; group: number }

export const BuildingGroupParams: BuildingGroupParam[] = [
  { value: 0, label: 'نامشخص', group: 0 },
  { value: 1, label: 'از 1 تا 2', group: 1 },
  { value: 2, label: 'از 3 تا 5', group: 2 },
  { value: 3, label: 'از 6 تا 7', group: 3 },
  { value: 4, label: 'از 8 تا 10', group: 3 },
  { value: 5, label: 'از 11 تا 12', group: 4 },
  { value: 6, label: 'از 13 تا 15', group: 4 },
  { value: 7, label: 'از 16 به بالا', group: 4 },
]

export const ErtSystemTypes = [
  { value: 0, label: 'ندارد' },
  { value: 1, label: 'الکترود ساده1' },
  { value: 2, label: 'الکترود زمین افقی' },
  { value: 3, label: 'الکترود زمین ساده2' },
  { value: 4, label: 'دو راد' },
  { value: 5, label: 'الکتروداساسی-5حلقه' },
  { value: 6, label: 'الکترود فونداسیون' },
]

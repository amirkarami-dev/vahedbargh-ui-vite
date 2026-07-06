// Port of old-ui helpers/utilities getEnums / getEnumByValue.
export type EnumEntry = { value: number; label: string }
export type EnumMap = Record<string, EnumEntry>
export type EnumOption = { enum: string; value: number; label: string }

export function getEnums(obj: EnumMap): EnumOption[] {
  return Object.entries(obj).map(([key, v]) => ({ enum: key, value: v.value, label: v.label }))
}

export function getEnumByValue(obj: EnumMap, value: number): EnumOption | null {
  const ent = Object.entries(obj).find(([, v]) => v.value === value)
  return ent ? { enum: ent[0], value: ent[1].value, label: ent[1].label } : null
}

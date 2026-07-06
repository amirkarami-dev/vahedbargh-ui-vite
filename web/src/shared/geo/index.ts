import { Provinces as P } from './provinces'
import { Cities as C } from './cities'
import { Section as S } from './sections'

// Static geo reference data (ported from old-ui common/data). Typed re-export.
export type Province = { Id: number; ProvinceName: string; ProvinceCenter?: string }
export type City = {
  Id: number
  CityName: string
  Longitude: number
  Latitude: number
  Id_Province: number
}
export type Section = { Id: number; SectionName: string; Id_City: number }

export const Provinces = P as unknown as Province[]
export const Cities = C as unknown as City[]
export const Sections = S as unknown as Section[]

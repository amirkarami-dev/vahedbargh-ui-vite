import { Cities, Sections, type City } from '@/shared/geo'

// Ported from old-ui hooks/returnCityName.js.
export const CityFromSection = (sectionId: number): string => {
  const s = Sections.find(e => e.Id === sectionId)
  if (!s) return ''
  return Cities.find(e => e.Id === s.Id_City)?.CityName ?? ''
}

export const GetCityWithSection = (sectionId: number): string => {
  const s = Sections.find(e => e.Id === sectionId)
  if (!s) return ''
  const c = Cities.find(e => e.Id === s.Id_City)
  return `${c?.CityName ?? ''}-${s.SectionName}`
}

export const GetCityIdWithSection = (sectionId: number): City | undefined => {
  const s = Sections.find(e => e.Id === sectionId)
  if (!s) return undefined
  return Cities.find(e => e.Id === s.Id_City)
}

export const GetSectionIdWithCityId = (cityId: number): number => {
  if (!cityId) return 0
  return Sections.find(f => f.Id_City === cityId && f.SectionName === 'مرکزی')?.Id ?? 0
}

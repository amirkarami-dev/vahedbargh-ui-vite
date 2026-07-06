import { useEffect, useState } from 'react'
import { Col, Input, Row, Select, Typography } from 'antd'
import { Cities, Provinces, Sections } from '@/shared/geo'

export type DataAddress = {
  sectionId: number
  cityId?: number
  provinceId?: number
  // Free-text street address the user types (only when `showAddress` is on).
  mainAddress?: string
  fullAddress?: {
    pro: string
    cit: string
    sec: string
    lat: number
    lng: number
  }
}

type Props = {
  setDataAddress: (d: DataAddress) => void
  idSection?: number
  isAccessCity?: boolean
  isAccessSection?: boolean
  // Optional free-text address textarea (reusable across create/edit forms).
  showAddress?: boolean
  addressLabel?: string
  addressPlaceholder?: string
  defaultAddress?: string
}

type Opt = { label: string; value: number }

// Province / city / section cascade. Ported from old-ui components/Common/Locations.js
// (MUI -> antd). Province is fixed to Kurdistan (id 13), like the original.
export function Locations({
  setDataAddress,
  idSection,
  isAccessCity = true,
  isAccessSection = true,
  showAddress = false,
  addressLabel = 'آدرس',
  addressPlaceholder = 'آدرس کامل را وارد کنید',
  defaultAddress = '',
}: Props) {
  const [cityList, setCityList] = useState<Opt[]>([])
  const [sectionList, setSectionList] = useState<Opt[]>([])
  const [selectProvince, setSelectProvince] = useState({ id: 13, label: '' })
  const [selectCity, setSelectCity] = useState({ id: 0, label: '' })
  const [selectSection, setSelectSection] = useState({ id: 0, label: '' })
  const [address, setAddress] = useState(defaultAddress)

  const provinceList: Opt[] = Provinces.map(v => ({ label: v.ProvinceName, value: v.Id }))

  const getLatLongCity = (idCity: number) =>
    idCity ? Cities.filter(c => c.Id === idCity) : Cities.filter(c => c.Id === 3101)

  const handleChangeCity = (cityId: number) => {
    const newListSection = Sections.filter(e => e.Id_City === cityId)
    const citySelected = Cities.find(e => e.Id === cityId)
    setSectionList(newListSection.map(v => ({ label: v.SectionName, value: v.Id })))
    setSelectCity({ id: cityId, label: citySelected?.CityName ?? '' })
    const center = newListSection.find(ls => ls.SectionName === 'مرکزی')
    setSelectSection({ id: center?.Id ?? 0, label: 'مرکزی' })
  }

  const handleChangeSection = (sectionId: number) => {
    const s = Sections.find(e => e.Id === sectionId)
    setSelectSection({ id: sectionId, label: s?.SectionName ?? '' })
  }

  useEffect(() => {
    setCityList(
      Cities.filter(e => e.Id_Province === 13).map(v => ({ label: v.CityName, value: v.Id })),
    )
    if (idSection) {
      const s = Sections.find(e => e.Id === idSection)
      if (s) {
        const c = Cities.find(e => e.Id === s.Id_City)
        setSelectCity({ id: c?.Id ?? 0, label: c?.CityName ?? '' })
        setSelectProvince({ id: 13, label: 'کردستان' })
        return
      }
    }
    setSelectCity({ id: 3101, label: 'سنندج شمالی' })
    setSelectProvince({ id: 13, label: 'کردستان' })
  }, [idSection])

  useEffect(() => {
    if (idSection) {
      const s = Sections.find(e => e.Id === idSection)
      const list = Sections.filter(e => e.Id_City === s?.Id_City)
      setSectionList(list.map(v => ({ label: v.SectionName, value: v.Id })))
      setSelectSection({ id: s?.Id ?? 0, label: s?.SectionName ?? '' })
      return
    }
    const list = Sections.filter(e => e.Id_City === 3101)
    setSectionList(list.map(v => ({ label: v.SectionName, value: v.Id })))
    setSelectSection({ id: 10184, label: 'مرکزی' })
  }, [idSection])

  useEffect(() => {
    const ll = getLatLongCity(selectCity.id)[0]
    setDataAddress({
      sectionId: selectSection.id,
      cityId: selectCity.id,
      provinceId: selectProvince.id,
      mainAddress: address,
      fullAddress: {
        pro: selectProvince.label,
        cit: selectCity.label,
        sec: selectSection.label,
        lat: ll?.Longitude ?? 0,
        lng: ll?.Latitude ?? 0,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectProvince, selectCity, selectSection, address])

  return (
    <>
      <Row gutter={8}>
        <Col xs={8}>
          <Select
            style={{ width: '100%' }}
            disabled
            value={selectProvince.id}
            options={provinceList}
            placeholder="استان"
          />
        </Col>
        <Col xs={8}>
          <Select
            style={{ width: '100%' }}
            disabled={!isAccessCity}
            value={selectCity.id || undefined}
            options={cityList}
            onChange={handleChangeCity}
            placeholder="شهرستان"
          />
        </Col>
        <Col xs={8}>
          <Select
            style={{ width: '100%' }}
            disabled={!isAccessSection}
            value={selectSection.id || undefined}
            options={sectionList}
            onChange={handleChangeSection}
            placeholder="بخش"
          />
        </Col>
      </Row>
      {showAddress && (
        <div style={{ marginTop: 12 }}>
          <Typography.Text type="secondary">{addressLabel}</Typography.Text>
          <Input.TextArea
            rows={2}
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder={addressPlaceholder}
          />
        </div>
      )}
    </>
  )
}

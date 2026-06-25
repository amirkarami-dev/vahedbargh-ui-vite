import React, { useEffect, useState } from "react"
import { Provinces } from "../../common/data/Provinces"
import { Cities } from "../../common/data/CitiesElect"
import { Section } from "../../common/data/Section"
import { Select, MenuItem, FormControl, InputLabel, Grid } from "@mui/material"

const LocationElect = ({
  setDataAddress,
  matches_sm,
  idSection,
  isAccessCity = true,
  isAccessSection = true,
}) => {
  const [cityList, setCityList] = useState([])
  const [sectionList, setSectionList] = useState([])
  const [selectProvince, setSelectProvince] = useState({ id: 13, label: "" })
  const [selectCity, setSelectCity] = useState({ id: 0, label: "" })
  const [selectSection, setSelectSection] = useState({ id: 0, label: "" })
  const provinceList = Provinces.map(val => ({
    label: val.ProvinceName,
    value: val.Id,
  }))
  const getLatLongCity = idCity => {
    return idCity
      ? Cities.filter(c => c.Id === idCity)
      : Cities.filter(c => c.Id === 3101)
  }

  const handleChangeProvince = e => {
    const newListCity = Cities.filter(ee => ee.Id !==31 && ee.Id_Province === e.value)

    setCityList(
      newListCity.map(val => ({ label: val.CityName, value: val.Id }))
    )

    setSelectProvince({ id: e.value, label: e.label })
  }

  const handleChangeCity = e => {
    const newListSection = Section.filter(ee => ee?.Id_City === e.target.value && ee.Id.toString().length >= 6)
    const CitySelected = Cities.find(ee => ee.Id === e.target.value)
    setSectionList(
      newListSection.map(val => ({ label: val.SectionName, value: val.Id }))
    )
    setSelectCity({ id: e.target.value, label: CitySelected.CityName })
    const findCenterId = newListSection.find(ls => ls.SectionName === "امور شمالی")
    if(findCenterId?.Id) setSelectSection({ id: findCenterId.Id, label: "امور شمالی" })
  }

  const handleChangeSection = e => {
    const SectionSelected = Section.find(ee => ee.Id === e.target.value)
    setSelectSection({ id: e.target.value, label: SectionSelected.SectionName })
  }

  useEffect(() => {
    const newListCity = Cities.filter(ee => ee.Id!==31 && ee.Id_Province === 13)
    setCityList(
      newListCity.map(val => ({ label: val.CityName, value: val.Id }))
    )
    if (idSection) {
      
      const SectionSelected = Section.find(ee => ee.Id === idSection)
      if(SectionSelected){
        const CitySelected = Cities.find(ee => ee.Id === SectionSelected?.Id_City)
        setSelectCity({ id: CitySelected.Id, label: CitySelected.CityName })
        setSelectProvince({ id: 13, label: "کردستان" })
        return
      }
    }
    setSelectCity({ id: 3101, label: "سنندج شمالی" })
    setSelectProvince({ id: 13, label: "کردستان" })
  }, [Cities, idSection])

  useEffect(() => {
    if (idSection) {
      const SectionSelected = Section.find(ee => ee.Id === idSection)

      const newListSection = Section.filter(
        ee => ee.Id_City === SectionSelected?.Id_City && ee.Id.toString().length >= 6
      )
      setSectionList(
        newListSection.map(val => ({ label: val.SectionName, value: val.Id }))
      )
      setSelectSection({
        id: SectionSelected?.Id,
        label: SectionSelected.SectionName,
      })
      return
    }
    const newListSection = Section.filter(ee =>ee?.Id_City === 3101 && ee.Id.toString().length >= 6)
    setSectionList(
      newListSection.map(val => ({ label: val.SectionName, value: val.Id }))
    )
    setSelectSection({ id: 123311, label: "امور شمالی" })
  }, [Section, idSection])

  useEffect(() => {
    const getlatlong = getLatLongCity(selectCity.id)[0]
    setDataAddress({
      sectionId: selectSection.id,
      cityId: selectCity.id,
      provinceId: selectProvince.id,
      fullAddress: {
        pro: selectProvince.label,
        cit: selectCity.label,
        sec: selectSection.label,
        lat: getlatlong.Longitude,
        lng: getlatlong.Latitude,
      },
    })
  }, [selectProvince, selectCity, selectSection])
  return (
      <Grid container item spacing={matches_sm ? 1 : 6}>
        <Grid style={{display:'none'}} item xs={4}>
          <FormControl fullWidth={true}>
            <InputLabel>استان</InputLabel>
            <Select
               size="small"
              label="استان"
              value={selectProvince.id}
              onChange={handleChangeProvince}
              disabled={true}
            >
              {provinceList?.map(option => {
                return (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label ?? option.value}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth={true}>
            <InputLabel>شهرستان</InputLabel>
            <Select
              size="small"
              disabled={!isAccessCity}
              label="شهرستان"
              value={selectCity.id}
              onChange={handleChangeCity}
            >
              {cityList?.map(option => {
                return (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label ?? option.value}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth={true}>
            <InputLabel>امور</InputLabel>
            <Select
              size="small"
              disabled={!isAccessSection}
              label="امور"
              value={selectSection.id}
              onChange={handleChangeSection}
            >
              {sectionList?.map(option => {
                return (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label ?? option.value}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
  )
}

export default LocationElect

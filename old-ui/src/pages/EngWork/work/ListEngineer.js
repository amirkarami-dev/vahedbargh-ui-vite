import { Select } from 'antd'
import { GetCityWithSection } from 'hooks/returnCityName'
import React, { useEffect } from 'react'

export const ListEngineer = ({props,selectEngineer}) => {
    const {lstEngineer } = props
    useEffect(()=>{
        const {onGetListEngineer} = props
        onGetListEngineer()
    },[])

    const handleChange = (value) => {
      selectEngineer(value)
      };
  return (
    <div>
    <Select
    style={{ width: '100%' }}
    showSearch
    allowClear
    placeholder="انتخاب کارشناس"
    options={lstEngineer  && lstEngineer.map(engineer=>({value:engineer.id,label:engineer.fullDescription + GetCityWithSection(engineer.idSection)}))}
    onChange={handleChange}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    />


    </div>
  )
}

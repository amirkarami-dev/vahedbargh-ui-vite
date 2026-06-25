import { Select } from 'antd'
import { currencyFormat } from 'helpers/service_helper'
import React, { useEffect } from 'react'

export const ListQuarterTariff = ({props,selectQuarter}) => {
    const {lstQuarterTariff } = props
    useEffect(()=>{
        const {onGetListQuarterTariff} = props
        onGetListQuarterTariff()
    },[])

    const handleChange = (value) => {
      console.log(value);
      selectQuarter(value)
      };
  return (
    <div>
    <Select
    style={{ width: '100%' }}
    showSearch
    defaultActiveFirstOption={true}
    placeholder="انتخاب دوره تخصیص"
    options={lstQuarterTariff  && lstQuarterTariff.map(qt=>({value:qt.id,label:qt.quarterTypeName + "-" + qt.allotmentRoundTypeName + "_" +  qt.year + "مبلغ تخصیص:" + currencyFormat(qt.fee )}))}
    onChange={handleChange}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    />


    </div>
  )
}

import { Select } from 'antd'
import React, { useEffect, useState } from 'react'

export const EngPaymentTaskList = ({props,selectEngPaymentTask}) => {
    const {lstEngPaymentTask } = props

  const [selectOption, setSelectOption] = useState(null)

    useEffect(()=>{
        const {onGetEngPaymentTasks} = props
        onGetEngPaymentTasks()
    },[])
    useEffect(()=>{
     if(lstEngPaymentTask.length>0){
      setSelectOption(lstEngPaymentTask[0].id)
      selectEngPaymentTask(lstEngPaymentTask[0].id)

     }
  },[lstEngPaymentTask])

    const handleChange = (value) => {
      console.log(value);
      selectEngPaymentTask(value)
      setSelectOption(value)
      };
  return (
    <div>
    {lstEngPaymentTask.length>0 && 
      <Select
    style={{ width: '100%' }}
    showSearch
    defaultActiveFirstOption={true}
    value={selectOption}
    placeholder="انتخاب دوره پرداخت"
    options={lstEngPaymentTask.map(task=>({value:task.id,label:"دوره:" + task.period + "-تاریخ ایجاد:" + task.solarCreated + "-تاریخ پرداخت: " + 
    task.solarPay + "-توضیحات: " + task.des + "-از تاریخ: " + task.fromSolar + "-تا تاریخ: " + task.toSolar}))}
    onChange={handleChange}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    />
    }



    </div>
  )
}

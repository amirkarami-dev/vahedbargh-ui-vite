import { DeleteFilled, DeleteTwoTone, EditFilled } from "@ant-design/icons"
import { Delete, Remove } from "@mui/icons-material"
import { Button, Popconfirm, Row, Tag } from "antd"
import { findEnumLabelWithValue } from "helpers/utilities"
import { CityFromSection, GetCityWithSection } from "hooks/returnCityName"
import BranchingTypeEnum from "models/types/BranchingTypeEnum"
import FazNumberEnum from "models/types/FazNumberEnum"


export const renderEditButton = (params, { mainProps, handleEdit, handleDelete }) => {
  return (
    params.id?
    <Row className="gap-1" dir="rtl">
    <Button  style={{marginRight:4}} size="small" icon={<EditFilled />} onClick={() => handleEdit(params)} />
    <Popconfirm
      title="حذف آیتم"
      description="آیا مطمن هستید؟"
      onConfirm={() => handleDelete(params)}
      okText="Yes"
      cancelText="No"> 
       <Button  style={{color:'red'}} size="small"   icon={<Delete  />} /> 
      </Popconfirm>
      <span>تاریخ بازدید : {params.solarChecked}</span>
      <span>شرح بازدید : {params.resultDes}</span>
    </Row>:''
  )
}

export const ChecklistEdcColumns = props => [
  //fileNumber
  
  {
    title: "",
    key: "edit",
    width:"2rem",
  },
  {
    title: "شرح بازرسی",
    key: "checkListEdcName",
    render: record =>{
      if(record.children){
        return  <div dir="rtl">{record.groupByValue}</div>
      }
      else{
        return <>{renderEditButton(record, props)}</>
      }
    },
  },

  {
    title: "وضعیت تایید",
    key: "isComplete",
    width:"5rem",
    render: record => {
      let isComplete = false
      if(record.children){
        isComplete =record.children.findIndex(f=>f.isComplete==true) !== -1
      }
      else{
        isComplete =record.isComplete
      }
      return (
        <Tag color={isComplete? "green" : "red"}>
          {isComplete? "کامل شده" : "نقص دارد"}
        </Tag>)
    }
    
  }
]

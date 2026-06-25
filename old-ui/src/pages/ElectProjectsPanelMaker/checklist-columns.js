import { DeleteFilled, DeleteTwoTone, EditFilled } from "@ant-design/icons"
import { Delete, Remove } from "@mui/icons-material"
import { Button, Popconfirm, Row, Tag } from "antd"
import { findEnumLabelWithValue } from "helpers/utilities"
import { CityFromSection, GetCityWithSection } from "hooks/returnCityName"
import BranchingTypeEnum from "models/types/BranchingTypeEnum"
import FazNumberEnum from "models/types/FazNumberEnum"
import InspectionDesEnum from "models/types/InspectionDesEnum"


export const renderEditButton = (params, { mainProps, handleEdit, handleDelete }) => {
  return (
    params.id?
    <Row gutter={[3,4]}>
    <Button  style={{marginRight:4}} size="small" icon={<EditFilled />} onClick={() => handleEdit(params)} />
    <Popconfirm
      title="حذف آیتم"
      description="آیا مطمن هستید؟"
      onConfirm={() => handleDelete(params)}
      okText="Yes"
      cancelText="No"> 
       <Button  style={{color:'red'}} size="small"   icon={<Delete  />} /> 
      </Popconfirm>
    </Row>:''
  )
}

export const ChecklistColumns = props => [
  //fileNumber
  

  {
    title: "شرح بازرسی",
    key: "inspectionDesEnum",
    render: record =>{
      if(record.children){
        return  <div dir="rtl">{record.inspectionDesEnum}</div>
      }
      else{
        return ''
      }
    },
    width:"15rem"
  },

  {
    title: "تاریخ بازدید",
    key: "solarChecked",
    width:"6rem",
    dataIndex: "solarChecked",
  },
  {
    title: "شرح بازدید",
    key: "resultDes",
    dataIndex: "resultDes",
    width:"20rem",
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

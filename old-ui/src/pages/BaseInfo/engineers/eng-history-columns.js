import { Button, Tag } from "antd"
import { CityFromSection, GetCityWithSection } from "hooks/returnCityName"


export const renderEditButton = (params, { mainProps, handleEdit }) => {
  return (
    <Button type="link" onClick={() => handleEdit(params)}>
      Edit
    </Button>
  )
}

export const EngHistoryColumns = props => [
  //fileNumber
  {
    title: "ویرایش",
    key: "edit",
    render: params => renderEditButton(params, props)
  },
  {
    title: "شماره پروانه",
    key: "workPermitNum",
    dataIndex: "workPermitNum"
  },
  {
    title: "نوع مجوز",
    key: "workPermitTypeName",
    dataIndex: "workPermitTypeName"
  },
  {
    title: "تاریخ اخذ",
    key: "solarIssueDate",
    dataIndex: "solarIssueDate"
  },
  {
    title: "تاریخ اعتبار",
    key: "solarValidityDate",
    dataIndex: "solarValidityDate"
  },
  {
    title: "اجازه کار",
    key: "workPermission",
    render: record => (
      <Tag color={record.workPermission ? "green" : "red"}>
        {record.workPermission ? "دارد" : "ندارد"}
      </Tag>
    ),
    width: "6rem"
  },
  {
    title: "پایه",
    key: "engineerGradeTypeName",
    dataIndex: "engineerGradeTypeName"
  },
  {
    title: "نظارت",
    key: "is2p",
    render: record => (
      <Tag color={record.is2p ? "green" : "red"}>
        {record.is2p ? "دارد" : "ندارد"}
      </Tag>
    ),
    width: "6rem",
  },
]

import {
  Button,
  Tag,
  Popconfirm
} from "antd"
import { DeleteTwoTone } from "@ant-design/icons"


export const renderFloorNumber = params => {
  if (params.numberOfFloor == 0 && params.unitNumber == 1)
    return <small>همکف</small>
  if (params.numberOfFloor == 0 && params.unitNumber > 1)
    return <small>چند واحدی</small>
  return params.numberOfFloor
}


export const renderRowNumber = (index, {pageIndex,pageSize}) => {
  return (pageIndex -1) * pageSize + index + 1
}

export const projectColumnsAnt = props => [
    //index row
    {
      title: "#",
      key: "id",
      render: (id, record, index)=> renderRowNumber(index, props),
      width: "3rem",
    },
  {
    title: "مالک",
    key: "landLordName",
    dataIndex : "landLordName",
    width: "6rem",
  },
  {
    title: "تاریخ تخصیص",
    key: "solarDateDeliverEngineer",
    dataIndex: "solarDateDeliverEngineer",
    width: "7rem"
  },
  {
    title: "واحد",
    key: "unitNumber",
    dataIndex : "unitNumber",
    width: "3rem",
  },
  {
    title: "طبقه",
    key: "numberOfFloor",
    render: params => renderFloorNumber(params),
    width: "3rem",
  },
  {
    title: "کارشناس",
    key: "enName",
    dataIndex : "enName",
    width: "6rem",
  },
  {
    title: "مجری",
    key: "executorName",
    dataIndex : "executorName",
    width: "6rem",
  },
  {
    title: "نوع بازرسی",
    key: "inspectionTypeName",
    dataIndex : "inspectionTypeName",
    width: "4rem",
  },
  {
    title: "سایز کنتور",
    key: "inspectionParameterTypeName",
    dataIndex: "inspectionParameterTypeName",
    width: "5rem",
  },
  {
    title: "لوله کشی",
    key: "pipingTypeName",
    render: params =>
      `${props.props.t("project." + params.pipingTypeName)}`,
    width: "3rem",
  },
  {
    title: "پکیج/آبگرمکن",
    key: "packageNeed",
    render: params => {
      if (params.packageNeed) {
        return 'دارد'
      }
      return 'ندارد'
    },
    width: "5rem",
  },
  {
    title: "تاریخ تایید",
    key: "solarDateDeliverOffice",
    dataIndex: "solarDateDeliverOffice",
    width: "5rem",
    hidden:params=> props.matches_sm || params.projectLevel === 4,
  },
  {
    title: "وضعیت",
    key: "inspectionStatus",
    render: record=> (
            <Tag color={record.inspectionStatus === 1?"green":"red" } >
              {record.inspectionStatusName}{record.defect?'+نقص':''}
            </Tag>
    ),
    width: "6rem",
  },
].filter(item => !item.hidden)

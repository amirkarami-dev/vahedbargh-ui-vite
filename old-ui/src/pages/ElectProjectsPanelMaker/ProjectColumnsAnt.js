import { GetCityWithSection } from "hooks/returnCityName"
import { ProjectFiles } from "./ProjectFiles"
import { ProjectProcess } from "./ProjectProcess"
import ProjectFileNumber from "./ProjectFileNumber"
import { Button, Popconfirm, Tag, Tooltip } from "antd"
import { CreditCardFilled } from "@ant-design/icons"
import { DeleteTwoTone } from "@mui/icons-material"
import CheckListEdit from "./CheckListEdit"
import CommentEdit from "./CommentEdit"
import { ElectPanelSubmit } from "./ElectPanelSubmit"

export const renderFileButton = (row, { props, setErrorMessage }) => {
  return (
    <ProjectFiles
      rowData={row}
      mainProps={props}
      setErrorMessage={setErrorMessage}
    />
  )
}

export const renderFloorNumber = row => {
  if (row.numberOfFloor == 0 && row.unitNumber == 1) return <small>همکف</small>
  if (row.numberOfFloor == 0 && row.unitNumber > 1)
    return <small>چند واحدی</small>
  return row.numberOfFloor
}

export const renderProjectProcess = (row, { props }) => {
  return <ProjectProcess rowData={row} mainProps={props} />
}

export const renderSubmitPanelButton = (row, { props, setErrorMessage }) => {
  return (
    <ElectPanelSubmit
      rowData={row}
      mainProps={props}
      setErrorMessage={setErrorMessage}
    />
  )
}


export const renderEditButton = (row, { props }) => {
  return <ProjectFileNumber rowData={row} mainProps={props} />
}


export const renderEditCommentButton = (params, { props }) => {
  return (
    <CommentEdit
      mainRowData={params}
      rowData={params.commentEngForms}
      mainProps={props}
    />
  )
}

export const renderEditCheckListButton = (params, { props }) => {
  return (
    <CheckListEdit
      mainRowData={params}
      rowData={params.checkListForms}
      mainProps={props}
    />
  )
}

export const projectColumnsAnt = props =>
  [

    //fileNumber
    {
      title: "تایید",
      key: "submitPanel",
      render: row => renderSubmitPanelButton(row, props),
      width: "3rem",
    },
    {
      title: "شماره پرونده",
      key: "fileNumber",
      render: row => renderEditButton(row, props),
      width: "7rem",
    },
    //   // Fils
    {
      title: "فایلها",
      key: "File",
      render: row => renderFileButton(row, props),
      width: "5rem",
    },

    // ProjectProcess
    {
      title: "فرم شماره3",
      key: "commentEngForms",
      render: params => renderEditCommentButton(params, props),
      width: "5rem",
    },
    {
      title: "چک لیست",
      key: "checkListForm",
      render: params => renderEditCheckListButton(params, props),
      width: "5rem",
    },
    {
      title: "تاریخ ثبت",
      key: "solarDatePanelRegister",
      dataIndex: "solarDatePanelRegister",
      width: "6rem",
    },
    {
      title: "تاریخ تایید",
      key: "solarDatePanelSubmit",
      dataIndex: "solarDatePanelSubmit",
      width: "6rem",
    },
    {
      title: "شماره سریال تابلو",
      key: "panelSerialNumber",
      dataIndex: "panelSerialNumber",
      width: "10rem",
    },
    {
      title: "مالک",
      key: "landlordName",
      dataIndex: "landlordName",
      width: "7rem",
    },
    //   // section
    {
      title: "شهر",
      key: "section",
      render: row => {
        let returnValue = "-"
        if (row.idSection > 0) {
          returnValue = GetCityWithSection(row.idSection)
        }
        return returnValue
      },
      width: "7rem",
    },
    // {
    //   title: "آدرس",
    //   key: "address",
    //   render: row => {
    //     return (
    //       <Tooltip title={row.address.split(":")[1]} placement="left">
    //         <div>
    //           {row.address.split(":").length > 1
    //             ? row.address.split(":")[1].slice(0, 20) + "..."
    //             : " -- "}
    //         </div>
    //       </Tooltip>
    //     )
    //   },
    //   width: "11rem",
    // },
    {
      title: "مرحله پرونده",
      key: "projectLevel",
      dataIndex: "projectLevel",
      width: "8rem",
    },
    //   // engFullName
    {
      title: "کارشناس",
      key: "engCurrentName",
      dataIndex: "engCurrentName",
      width: "8rem",
    },
    {
      title: "تاریخ تخصیص",
      key: "solarDateDeliverEngineer",
      dataIndex: "solarDateDeliverEngineer",
      width: "7rem",
    },

    //   // isOk
    // {
    //   key: "isOk",
    //   title: "تاییدواحدبرق",
    //   type: "boolean",
    //   onCell: (record, index) => ({
    //       className: record.isOk ? 'negative' : 'positive'
    //     }),
    //   render: (row) => {
    //     if (row.isOk) {
    //       return "بله"
    //     }
    //     return "خیر"
    //   },
    //   hidden: props.matches_sm,
    // },
    //   // submitAdmin
  ].filter(x => !x.hidden)

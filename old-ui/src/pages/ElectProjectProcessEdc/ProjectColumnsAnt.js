import { CityFromSection, GetCityWithSection } from "hooks/returnCityName"
import { ProjectFiles } from "./ProjectFiles"
import ProjectDelete from "./ProjectDelete"
import ProjectFileNumber from "./ProjectFileNumber"
import { Tag, Tooltip, Popconfirm, Row, Col, Button, Table } from "antd"
import { StopElectProject } from "./StopElectProject"
import { CreditCardOutlined } from "@ant-design/icons"
import CheckListEdit from "./CheckListEdit"
import { UpdateByEdc } from "./UpdateByEdc"

export const renderFileButton = (row, { props, setErrorMessage }) => {
  return row?.parentId? (<small>-</small>):
    (<ProjectFiles
      rowData={row}
      mainProps={props}
      setErrorMessage={setErrorMessage}
    />)

    }
  


export const renderFloorNumber = row => {
  if (row.numberOfFloor == 0 && row.unitNumber == 1) return <small>همکف</small>
  if (row.numberOfFloor == 0 && row.unitNumber > 1)
    return <small>چند واحدی</small>
  return row.numberOfFloor
}

// export const renderProjectProcess = (row, { props }) => {
//   return <ProjectProcess rowData={row} mainProps={props} />
// }

export const renderSubmitAdminButton = (row, { props, setErrorMessage }) => {
 
  return row.projectLevelEnum === 4 ? (
    <Popconfirm
      title="ارسال پرونده"
      description="بعد از تایید پرونده برای شرکت برق ارسال میگردد آیا مطمن هستید؟"
      onConfirm={() => props.onSubmitElectProjectByAdmin(row.id)}
      okText="Yes"
      cancelText="No"
    >
      <Button type="default">{row.countSendToElectCo} - {row.solarDateSendToElectCo}</Button>
    </Popconfirm>
  ) : (
    "تایید نشده"
  )
}

export const renderStopElectProjectButton = (
  row,
  { props, setErrorMessage }
) => {
  return (
    <StopElectProject
      rowData={row}
      mainProps={props}
      setErrorMessage={setErrorMessage}
    />
  )
}

export const renderDeleteButton = (params, { props }) => {
  return <ProjectDelete rowData={params} mainProps={props} />
}

export const renderEditButton = (params, { props }) => {
  return <ProjectFileNumber rowData={params} mainProps={props} />
}

export const renderRowNumber = (index, { pageIndex, pageSize }) => {
  return (pageIndex - 1) * pageSize + index + 1
}

export const renderAmountSms = (params, { props }) => {
  const payAmount = `${Math.abs(params.projectBalance)}`.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  )
  
  return params.projectBalance < 0 ? (
    <Popconfirm
      title={`ارسال پیامک جهت واریز مالک به مبلغ:${payAmount}ریال`}
      description="آیا مطمنید؟"
      onConfirm={() =>
        props.onAmountSms({
          electProjectId: params.id,
          amount: Math.abs(params.projectBalance),
          smsTypeEnum:0
        })
      }
      okText="Yes"
      cancelText="No"
    >
      <Tag
        style={{ cursor: "pointer" }}
        icon={<CreditCardOutlined />}
        color={params.projectBalance >= 0 ? "green" : "red"}
      >
        {payAmount}
      </Tag>
    </Popconfirm>
  ) : (
    <Tag color={params.projectBalance >= 0 ? "green" : "red"}>{payAmount}</Tag>
  )
}
export const renderUpdateByEdcButton = (params, { props }) => {
  return <UpdateByEdc rowData={params} mainProps={props} />
}

export const renderEditCheckListEdcButton = (params, { props }) => {
  return (
    <CheckListEdit
      mainRowData={params}
      rowData={params.checkListEdcs?params.checkListEdcs:[]}
      mainProps={props}
    />
  )
}


export const projectColumnsAnt = props =>
  [
    //index row
    // {
    //   title: "#",
    //   key: "id",
    //   render: (id, record, index)=> renderRowNumber(index, props),
    //   width: "3rem",
    // },
    //fileNumber
    // Table.SELECTION_COLUMN,
    Table.EXPAND_COLUMN,

    {
      title: "مالک/آدرس",
      key: "landlordName",
      render: row => (
        <Row gutter={[8, 2]} justify="start" className="flex-row-reverse">
          <Tag>{row.landlordName}</Tag>
          <Tag>{row.idSection > 0 && GetCityWithSection(row.idSection)}</Tag>
        </Row>
      ),
      width: "10rem",
    },
    {
      title: "ارسال پرونده",
      key: "submitAdmin",
      render: row => renderSubmitAdminButton(row, props),
      width: "7rem",
      hidden:(
        props.currentUser.role !== "Administrator" &&
        props.currentUser.role !== "Section") || props.projectLevel !== 4
    },
    {
      title: "شماره تقاضا",
      key: "fileNumber",
      render: params => (
        <Tag color={params.electRequestNumber>0 ? "green" : "red"}>
        {params.electRequestNumber}
      </Tag>
      ),
      width: "7rem",
    },
    {
      title: "فایل ها",
      key: "fileNumber",
      render: params => (
        <Row justify="start" className="flex-row-reverse">
          {renderFileButton(params, props)}
        </Row>
      ),
      width: "5rem",
    },
    //   // section
    {
      title: "شماره پرونده",
      key: "fileNumber",
      render: params => (
        <Row justify="start" className="flex-row-reverse">
          {renderEditButton(params, props)}
        </Row>
      ),
      width: "7rem",
    },
    {
      title: "چک لیست",
      key: "checkListEdcForm",
      render: params => renderEditCheckListEdcButton(params, props),
      width: "8rem",
    },
    {
      title: "عملیات",
      key: "Edit",
      render: params => renderUpdateByEdcButton(params, props),
      hidden: props.matches_sm,
      width: "8rem",
    },
    {
      title: "فایل",
      key: "isUploadElectPlan",
      render: row => (
        <>
          <Tag color={row.isUploadRelatedPermit ? "green" : "red"}>
            جواز
          </Tag>
          <Tag color={row.isUploadElectPlan ? "green" : "red"}>
            نقشه
          </Tag>
        </>
      ),
      width: "4rem",
    },
    {
      title: "تاریخ ثبت/ تخصیص",
      key: "solarRegisterDate",
      render: row => (
        <Row justify="start" className="flex-row-reverse">
          <Tag>{row.solarRegisterDate}</Tag>
          {row.solarDateDeliverEngineer && (
            <Tag>{row.solarDateDeliverEngineer}</Tag>
          )}
        </Row>
      ),
      width: "7rem",
    },
    {
      title: "درخواست",
      key: "isEarthSystem",
      render: row => (
        <Row gutter={[8, 2]} justify="start" className="flex-row-reverse">

          <Tag color={row.isEarthSystem ? "green" : "red"}>
            ارت
          </Tag>
          <Tag color={row.isBuildingInspection ? "green" : "red"}>
            بازرسی
          </Tag>
          <Tag color={row.isTestAndDelivery ? "green" : "red"}>
            تست-تحویل
          </Tag>
        </Row>
      ),
      width: "5rem",
    },

    {
      title: "مرحله جاری پرونده/ کارشناس",
      key: "projectLevel",
      render: row => (
        <Row justify="start" className="flex-row-reverse">
          <Tag>{row.projectLevel}</Tag>
          <Tag>{row.engCurrentName ? row.engCurrentName : "ندارد"}</Tag>
        </Row>
      ),
      width: "8rem",
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
  ].filter(x => !x.hidden)

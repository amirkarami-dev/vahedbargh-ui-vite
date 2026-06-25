import { CityFromSection, GetCityWithSection } from "hooks/returnCityName"
import { ProjectFiles } from "./ProjectFiles"
import clsx from "clsx"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ProjectProcess } from "./ProjectProcess"
import ProjectDelete from "./ProjectDelete"
import { ProjectEdit } from "./ProjectEdit"
import { Paper, styled } from "@mui/material"
import ProjectFileNumber from "./ProjectFileNumber"
import { Tag, Tooltip, Popconfirm, Row, Col, Button, Table } from "antd"
import { StopElectProject } from "./StopElectProject"
import { CreditCardOutlined, NumberOutlined, SendOutlined } from "@ant-design/icons"
import CheckListEdcEdit from "./CheckListEdcEdit"
import { UpdateByEdc } from "./UpdateByEdc"

export const renderFileButton = (row, { props, setErrorMessage }) => {
  return row?.parentId ? (
    <small>-</small>
  ) : (
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

export const renderSubmitAdminButton = (row, { props, setErrorMessage }) => {
  return row.projectLevelEnum === 4 || row.electProjectStatusEnum === 6 ? (
    <Popconfirm
      title="ارسال پرونده"
      description="بعد از تایید پرونده برای شرکت برق ارسال میگردد آیا مطمن هستید؟"
      onConfirm={() => props.onSubmitElectProjectByAdmin(row.id)}
      okText="Yes"
      cancelText="No"
    >
      <Button type="default">
      <SendOutlined />
      </Button>
    <span>{row.solarDateSendToElectCo}</span>
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

export const renderAmountSmsBigProject = (params, { props }) => {
  const payAmount = `${Math.abs(params.amountPerArea)}`.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  )
  return(
    <Popconfirm
      title={`ارسال پیامک جهت واریز مالک به مبلغ:${payAmount}ریال`}
      description="آیا مطمنید؟"
      onConfirm={() =>
        props.onAmountSms({
          electProjectId: params.id,
          amount: Math.abs(params.amountPerArea),
        })
      }
      okText="Yes"
      cancelText="No"
    >
      <Tag
        style={{ cursor: "pointer" }}
        icon={<CreditCardOutlined />}
        color="lime-inverse"
      >
        {payAmount}
      </Tag>
    </Popconfirm>
  )
}

export const renderEditCheckListEdcButton = (params, { props }) => {
  return (
    <CheckListEdcEdit
      mainRowData={params}
      rowData={params.checkListEdcs?params.checkListEdcs:[]}
      mainProps={props}
    />
  )
}

export const renderUpdateByAdminButton = (params, { props }) => {
  return <UpdateByEdc rowData={params} mainProps={props} />
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
    Table.SELECTION_COLUMN,
    Table.EXPAND_COLUMN,
    {
      title: "مالک/آدرس/وضعیت",
      key: "landlordName",
      render: row => (
        <Row gutter={[8, 2]} justify="start" className="flex-row-reverse">
          <Tag>{row.landlordName}</Tag>
          <Tag>{row.idSection > 0 && GetCityWithSection(row.idSection)}</Tag>
          <Tag>{row.electProjectStatusName}</Tag>
        </Row>
      ),
      width: "10rem",
    },
    {
      title: "ارسال پرونده",
      key: "submitAdmin",
      render: row => (
        <Row gutter={[0, 4]} justify="start" className="flex-row-reverse">
          {renderSubmitAdminButton(row, props)}
          {renderEditCheckListEdcButton(row, props)}
        </Row>
      ),
      width: "9rem",
      hidden:
        (props.currentUser.role !== "Administrator" &&
          props.currentUser.role !== "Section") ||
        (props.projectLevel !== 4 && props.projectLevel !== 8),
    },
    //   // section
    {
      title: "شماره پرونده/بالانس پرونده/شماره تقاضا",
      key: "fileNumber",
      render: row => (
        <Row justify="start" className="flex-row-reverse">
          {renderEditButton(row, props)}
          { row.isBigProject?renderAmountSmsBigProject(row, props): renderAmountSms(row, props)}
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() => navigator.clipboard.writeText(row.electRequestNumber)}
            icon={<NumberOutlined />}
          >
            {row.electRequestNumber}
          </Tag>
        </Row>
      ),
      width: "7rem",
    },

    //   // Fils
    {
      title: "فایل",
      key: "isUploadElectPlan",
      render: row => (
        <Row justify="center" gutter={[0,4]} className="flex-row-reverse">
          {renderFileButton(row, props)}
          <Tag color={row.isUploadRelatedPermit ? "green" : "red"}>جواز</Tag>
          <Tag color={row.isUploadElectPlan ? "green" : "red"}>نقشه</Tag>
        </Row>
      ),
      width: "6rem",
    },
    {
      title: "نقص/رفع نقص",
      key: "Edit",
      render: row => (
        <Row gutter={[8, 2]} justify="center" className="flex-row-reverse">
        {row.parentElectProject && 
          <Tag color="blue">مربوط به: {row.parentElectProject.fileNumber}</Tag>
        }
          {renderUpdateByAdminButton(row, props)}
          <Tag color={row.isDefectEng ? "green" : "red"}>نقص</Tag>
          <Tag color={row.solvedDefectEng ? "green" : "red"}>رفع نقص</Tag>
        </Row>
      ),
      width: "9rem",
    },
    {
      title: "گروه/ طبقه/ نوع ارت",
      key: "buildingGroupTypeName",
      render: row => (
        <Row gutter={[8, 2]} justify="start" className="flex-row-reverse">
          <Tag>{row.buildingGroupTypeName}</Tag>
          <Tag>{renderFloorNumber(row)}</Tag>
          <Tag>{row.ertSystemTypeName}</Tag>
          {row.needElectNetwork && <Tag color="green-inverse">احداث شبکه</Tag>}
        </Row>
      ),
      width: "8rem",
    },
      // ProjectProcess
    {
      title: "کارشناس",
      key: "ProjectProcess",
      render: row => renderProjectProcess(row, props),
      width: "5rem",
    },
    // {
    //   title: "توقف",z
    //   key: "stopProject",
    //   render: row => renderStopElectProjectButton(row, props),
    //   width: "5rem",
    //   hidden: props.currentUser.role !== "Administrator"
    // },
    {
      title: "تاریخ ثبت/ تاریخ تخصیص",
      key: "solarRegisterDate",
      render: row => (
        <Row justify="start" className="flex-row-reverse">
          <Tag>{row.solarRegisterDate}</Tag>
          {row.solarDateDeliverEngineer && (
            <Tag>{row.solarDateDeliverEngineer}</Tag>
          )}
        </Row>
      ),
      width: "8rem",
    },
    {
      title: "درخواست",
      key: "isEarthSystem",
      render: row => (
        <Row gutter={[8, 2]} justify="start" className="flex-row-reverse">
          <Tag color={row.isEarthSystem ? "green" : "red"}>ارت</Tag>
          <Tag color={row.isBuildingInspection ? "green" : "red"}>بازرسی</Tag>
          <Tag color={row.isTestAndDelivery ? "green" : "red"}>تست-تحویل</Tag>
        </Row>
      ),
      width: "5rem",
    },
    // {
    //   title: "آدرس",
    //   key: "address",
    //   render: (row) => { return <Tooltip title={row.address.split(":")[1]} placement='left'>
    //   <div>{  row.address.split(":").length>1 ? row.address.split(":")[1].slice(0, 20) + '...' : ' -- ' }</div>
    //     </Tooltip>},
    //     width: "11rem",
    // },
    //   // unitNumber

    //   // numberOfFloor
    //   // ownershipType
    //   {
    //     field: "inspectionParameterType",
    //     headerName: "تعرفه",
    //     hidden: useMediaQuery("(max-width:768px)"),
    //     width: "60",
    //   },
    //   // buildingType
    //   {
    //     field: "buildingType",
    //     headerName: "نوع کاربری",
    //     hidden: useMediaQuery("(max-width:768px)"),
    //     width: "70",
    //   },
    // projectLevel
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

import { GetCityWithSection } from "hooks/returnCityName"
import { ProjectFiles } from "./ProjectFiles"
import { ProjectProcess } from "./ProjectProcess"
import ProjectMainEdit from "./ProjectMainEdit"
import { Button, Popconfirm, Tag, Row, Table } from "antd"
import { StopElectProject } from "./StopElectProject"
import {
  CreditCardFilled,
  InfoCircleOutlined,
  NumberOutlined,
} from "@ant-design/icons"
import { CreditCardOutlined, DeleteTwoTone } from "@mui/icons-material"
import { ListPanelMaker } from "./ListPanelMaker"

export const renderFileButton = (row, { props, setErrorMessage }) => {
  return row?.parentId ? (
    <ProjectFiles
      rowData={row}
      mainProps={props}
      setErrorMessage={setErrorMessage}
    />
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
  return row.projectLevelEnum === 4 || row.electProjectStatusEnum == 6 ? (
    <Popconfirm
      title="ارسال پرونده"
      description="بعد از تایید پرونده برای شرکت برق ارسال میگردد آیا مطمن هستید؟"
      onConfirm={() => props.onSubmitElectProjectByAdmin(row.id)}
      okText="Yes"
      cancelText="No"
      disabled={row.parentId !== null}
    >
      <Button type="default">
        {row.countSendToElectCo} - {row.solarDateSendToElectCo}
      </Button>
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

export const renderDeleteButton = (row, { props, searchQuery }) => {
  if(row.isBigProject){
    return ( <Row gutter={[8, 2]} justify="start" className="flex-row-reverse">
      <Tag color="red">پروژه بزرگ</Tag>
      <Tag color="blue">هزینه:</Tag>
      <Tag color="blue">{row.amountPerArea?.toLocaleString()}</Tag>
    </Row>)
  }
  return row.invoice === null ||
    row.invoice?.invoicePayType === 0 ||
    row.invoice?.invoicePayType === 4 ||
    row.invoice?.invoicePayType === 6 ? (
    <Popconfirm
      title="حذف پرونده"
      description="آیا مطمنید؟"
      onConfirm={() => props.onDeleteElectProject({ id: row.id, searchQuery })}
      okText="Yes"
      cancelText="No"
    >
      <Button icon={<DeleteTwoTone />} />{" "}
    </Popconfirm>
  ) : (' فاکتور شده')
}

export const renderEditButton = (row, { props }) => {
  return (
    <Tag color="blue">
      <ProjectMainEdit rowData={row} mainProps={props} />
    </Tag>
  )
}

export const renderInvoiceButton = (row, { props }) => {
  return row.invoice === null ? (
    <Popconfirm
      title="ایجاد فاکتور"
      description="آیا مطمنید؟"
      onConfirm={() => props.onDeleteElectProject(row.id)}
      okText="Yes"
      cancelText="No"
    >
      {" "}
      <Button icon={<CreditCardFilled />} />{" "}
    </Popconfirm>
  ) : (
    "ایجاد شده"
  )
}

export const renderPanelMakerButton = (row, { props }) => {
  return <ListPanelMaker rowData={row} mainProps={props} />
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
          smsTypeEnum: 0,
        })
      }
      okText="Yes"
      cancelText="No"
    >
      <Tag
        style={{ cursor: "pointer" }}
        icon={<CreditCardOutlined fontSize="12" />}
        color={params.projectBalance >= 0 ? "green" : "red"}
      >
        {payAmount}
      </Tag>
    </Popconfirm>
  ) : (
    <Tag color={params.projectBalance >= 0 ? "green" : "red"}>{payAmount}</Tag>
  )
}

export const renderProjectPublicSms = (params, { props }) => {
  return (
    <Popconfirm
      title={`ارسال پیامک جهت آپلود مدارک توسط مالک `}
      description="آیا مطمنید؟"
      onConfirm={() =>
        props.onAmountSms({
          electProjectId: params.id,
          amount: 0,
          smsTypeEnum: 1,
        })
      }
      okText="Yes"
      cancelText="No"
    >
      <Tag
        style={{ cursor: "pointer" }}
        icon={<InfoCircleOutlined fontSize="12" />}
      >
        sms مدارک
      </Tag>
    </Popconfirm>
  )
}

export const projectColumnsAnt = props =>
  [
    Table.EXPAND_COLUMN,

    // Delete
    {
      title: "حذف پرونده",
      key: "delete",
      render: row => (
        row.parentElectProject ? 'p:'+row.parentElectProject.fileNumber : renderDeleteButton(row, props)
      ),
      width: "6rem",
      hidden:
        props.currentUser.role !== "Administrator" &&
        props.currentUser.role !== "Section",
    },
    {
      title: "مالک/ آدرس/ ایجادکننده/وضعیت",
      key: "landlordName",
      render: row => (
        <Row gutter={[8, 2]} justify="start" className="flex-row-reverse">
          <Tag>{row.landlordName}</Tag>
          <Tag>{row.idSection > 0 && GetCityWithSection(row.idSection)}</Tag>
          <Tag>{row.projectCreatedTypeName}</Tag>
          <Tag>{row.electProjectStatusName}</Tag>
        </Row>
      ),
      width: "9rem",
    },
    //fileNumber
    {
      title: "شماره پرونده/بالانس پرونده /ت-ثبت",
      key: "fileNumber",
      render: row => (
        <Row gutter={[8, 4]} justify="start" className="flex-row-reverse">
          {renderEditButton(row, props)}
          {renderAmountSms(row, props)}
          <Tag>{row.solarRegisterDate}</Tag>
          {+row.projectBalance < 0 && (
            <Tag color="green">
              <a href={row.projectBalanceLinkForPay} target="_blank">
                پرداخت مستقیم
              </a>
            </Tag>
          )}
        </Row>
      ),
      width: "7rem",
      hidden:
        props.currentUser.role !== "Administrator" &&
        props.currentUser.role !== "Section",
    },

    {
      title: "فایلها",
      key: "File",
      render: row => (
        <Row gutter={[8, 4]} justify="start" className="flex-row-reverse">
          {renderFileButton(row, props)}
          {renderProjectPublicSms(row, props)}
        </Row>
      ),
      width: "6rem",
    },
    {
      title: "ارسال پرونده/شماره تقاضا",
      key: "submitAdmin",
      render: row => (
        <Row gutter={[8, 6]} justify="start" className="flex-row-reverse">
          {renderSubmitAdminButton(row, props)}
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigator.clipboard.writeText(row.electRequestNumber)
            }
            icon={<NumberOutlined />}
          >
            {row.electRequestNumber}
          </Tag>
        </Row>
      ),
      width: "7rem",
      hidden:
        props.currentUser.role !== "Administrator" &&
        props.currentUser.role !== "Section",
    },
    {
      title: "شماره تقاضا",
      key: "submitAdmin",
      render: row => (
        <Row gutter={[8, 6]} justify="start" className="flex-row-reverse">
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigator.clipboard.writeText(row.electRequestNumber)
            }
            icon={<NumberOutlined />}
          >
            {row.electRequestNumber}
          </Tag>
        </Row>
      ),
      width: "5rem",
      hidden: props.currentUser.role !== "ElectAdmin",
    },
    // ProjectProcess
    {
      title: "تخصیص/ تابلوساز",
      key: "projectProcess",
      render: row => (
        <Row gutter={[8, 6]} justify="start" className="flex-row-reverse">
          {renderProjectProcess(row, props)}
          {renderPanelMakerButton(row, props)}
        </Row>
      ),
      width: "6rem",
      hidden:
        props.currentUser.role !== "Administrator" &&
        props.currentUser.role !== "Section",
    },
    {
      title: "مرحله پرونده/ کارشناس/ تاریخ تخصیص",
      key: "projectLevel",
      render: row => (
        <Row gutter={[8, 2]} justify="start" className="flex-row-reverse">
          <Tag>{row.projectLevel}</Tag>
          <Tag>{row.engCurrentName ? row.engCurrentName : "ندارد"}</Tag>
          {row.solarDateDeliverEngineer && (
            <Tag>{row.solarDateDeliverEngineer}</Tag>
          )}
        </Row>
      ),
      width: "13rem",
    },
    // {
    //   title: "توقف",
    //   key: "stopProject",
    //   render: row => renderStopElectProjectButton(row, props),
    //   width: "5rem",
    //   hidden: props.currentUser.role !== "Administrator"&&
    //   props.currentUser.role !== "Section"
    // },

    {
      title: "فایل",
      key: "isUploadElectPlan",
      render: row => (
        <>
          <Tag color={row.isUploadRelatedPermit ? "green" : "red"}>جواز</Tag>
          <Tag color={row.isUploadElectPlan ? "green" : "red"}>نقشه</Tag>
        </>
      ),
      width: "4rem",
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
    {
      title: "نیازبه همبندی/مساحت EB",
      key: "isEarthSystem",
      render: row => (
        <Row gutter={[8, 2]} justify="start" className="flex-row-reverse">
          <Tag color={row.isNeedEb ? "green" : "red"}>
            {row.isNeedEb ? "دارد" : "ندارد"}
          </Tag>
          <Tag>{row.foundationElectrodeArea}</Tag>
        </Row>
      ),
      width: "4rem",
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
    //   // unitNumber

    //   // numberOfFloor
    // {
    //   title: "طبقه",
    //   key: "numberOfFloor",
    //   render: row => renderFloorNumber(row),
    //   width: "4rem",
    // },
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

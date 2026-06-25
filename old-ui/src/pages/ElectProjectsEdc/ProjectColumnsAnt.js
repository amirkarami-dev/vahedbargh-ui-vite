import { GetCityWithSection } from "hooks/returnCityName"
import { ProjectFiles } from "./ProjectFiles"
import { Button, Popconfirm, Tag, Row, Table } from "antd"
import {
  CopyTwoTone,
} from "@ant-design/icons"
import { DeleteTwoTone } from "@mui/icons-material"
import ProjectElectEdit from "./ProjectElectEdit"

export const renderFileButton = (row, { props, setErrorMessage }) => {
  return row?.parentId?  (
    <small>-</small>
  ) : (
    <ProjectFiles
      rowData={row}
      mainProps={props}
      setErrorMessage={setErrorMessage}
    />
  )
}


export const renderDeleteButton = (row, { props, searchQuery }) => {
  return row.invoice === null ||
    row.invoice?.invoicePayType === 0 ||
    row.invoice?.invoicePayType === 4 ? (
    <Popconfirm
      title="حذف پرونده"
      description="آیا مطمنید؟"
      onConfirm={() => props.onDeleteElectProject({ id: row.id, searchQuery })}
      okText="Yes"
      cancelText="No"
    >
      <Button icon={<DeleteTwoTone />} />{" "}
    </Popconfirm>
  ) : (
    "-"
  )
}


export const renderElectEditButton = (row, { props }) => {
  return (
    <Tag color="blue">
      <ProjectElectEdit rowData={row} mainProps={props} />
    </Tag>
  )
}


export const projectColumnsAnt = props =>
  [
    Table.EXPAND_COLUMN,

    // Delete
    {
      title: "حذف",
      key: "delete",
      render: row => renderDeleteButton(row, props),
      width: "3rem",
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
            icon={<CopyTwoTone />}
          >
            {renderElectEditButton(row, props)}
          </Tag>
          <Tag>{row.electProjectStatusName}</Tag>
        </Row>
      ),
      width: "9rem",
      hidden: props.currentUser.role !== "ElectAdmin",
    },
    {
      title: "مالک/ آدرس/ ایجادکننده",
      key: "landlordName",
      render: row => (
        <Row gutter={[8, 2]} justify="start" className="flex-row-reverse">
          <Tag>{row.landlordName}</Tag>
          <Tag>{row.idSection > 0 && GetCityWithSection(row.idSection)}</Tag>
          <Tag>{row.projectCreatedTypeName}</Tag>
        </Row>
      ),
      width: "9rem",
    },
    //fileNumber
    {
      title: "شماره پرونده /ت-ثبت",
      key: "fileNumber",
      render: row => (
        <Row gutter={[8, 4]} justify="start" className="flex-row-reverse">
          <Tag>{row.fileNumber}</Tag>
          <Tag>{row.solarRegisterDate}</Tag>
        </Row>
      ),
      width: "6rem",
      hidden: props.currentUser.role !== "ElectAdmin",
    },
    {
      title: "فایلها",
      key: "File",
      render: row => renderFileButton(row, props),
      width: "4rem",
    },

    {
      title: "مرحله پرونده/کارشناس/تاریخ تخصیص",
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
      width: "11rem",
    },

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
  ].filter(x => !x.hidden)

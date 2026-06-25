import clsx from "clsx"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material"
import {
  Table,
  Layout,
  Pagination,
  Input,
  Space,
  Button,
  Alert,
  Divider,
  Row,
  Col,
  notification,
  Tag,
  Popconfirm,
  Switch,
} from "antd"
import { CheckOutlined, DeleteTwoTone } from "@ant-design/icons"
import { ListEngineer } from "./ListEngineer"
import { ListEngineerDialog } from "./ListEngineerDialog"

export const renderRowNumber = (index, { pageIndex, pageSize }) => {
  return (pageIndex - 1) * pageSize + index + 1
}

export const renderDeleteButton = (params, { props, handleDelete }) => {
  return params.projectLevel !== 4 ? (
    <Popconfirm
      title="حذف تخصیص"
      description="مطمئنی یا نه؟"
      onConfirm={() => handleDelete(params)}
      okText="Yes"
      cancelText="No"
    >
      {" "}
      <Button icon={<DeleteTwoTone />} />{" "}
    </Popconfirm>
  ) : (
    "-"
  )
}

export const renderEppEngChange = (row, { props }) => {
  return <ListEngineerDialog rowData={row} mainProps={props} />
}

export const renderIsMainSwitch = (row, { props }) => {
  return (
    <Switch
      checked={row.isMain}
      disabled={!row.electProject?.parentProject}
      checkedChildren="اصلی"
      unCheckedChildren="فرعی"
      onChange={checked =>
        props.onEppUpdateIsMain({ id: row.id, isMain: checked })
      }
    />
  )
}

export const renderAcceptedButton = (row, { props }) => {
  return !row.accepted ? (
    <Popconfirm
      title="قبول کردن پرونده"
      description="بعد از تایید فاکتور این پرونده برای شما صادر میشود و قابل برگشت نیست؟"
      onConfirm={() => props.onEppAccepted({ eppId: row.id })}
      okText="Yes"
      cancelText="No"
    >
      <Button disabled={row.inspectionStatus !== 0} type="primary">
        قبول پرونده
      </Button>
    </Popconfirm>
  ) : (
    <Tag color="success">{`تاریخ: ${row.solarDateAccepted}`}</Tag>
  )
}

export const projectColumnsAnt = props =>
  [
    //index row
    {
      title: "#",
      key: "id",
      render: (id, record, index) => renderRowNumber(index, props),
      width: "3rem",
    },
    {
      title: "حذف",
      key: "delete",
      render: params => renderDeleteButton(params, props),
      width: "3rem",
    },
    {
      title: "قبول کردن",
      key: "accepted",
      render: params => (
        <>
          {renderAcceptedButton(params, props)}
          {renderEppEngChange(params, props)}
        </>
      ),
      width: "7rem",
    },
    {
      title: "شماره پرونده",
      key: "fileNumber",
      dataIndex: "fileNumber",
      width: "7.5rem",
    },
    {
      title: "تاریخ تخصیص",
      key: "solarDateDeliverEngineer",
      dataIndex: "solarDateDeliverEngineer",
      width: "7rem",
    },
    {
      title: "طبقه",
      key: "numberOfFloor",
      dataIndex: "numberOfFloor",
      width: "3rem",
    },
    {
      title: "کارشناس",
      key: "enName",
      dataIndex: "enName",
      width: "6rem",
    },
    {
      title: "مالک",
      key: "landLordName",
      dataIndex: "landLordName",
      width: "6rem",
    },
    {
      title: "مرحله",
      key: "projectLevelName",
      dataIndex: "projectLevelName",
      width: "7rem",
    },
    {
      title: "اصلی/فرعی",
      key: "isMain",
      render: params => renderIsMainSwitch(params, props),
      width: "5rem",
      hidden: !props.isAdmin,
    },
    {
      title: "نیازبه تابلو",
      key: "packageNeed",
      render: params => {
        if (params.electProject.panelNeed) {
          return `دارد-:${
            params.electProject.panelMakerSubmit ? "تایید شده" : "تایید نشده"
          }`
        }
        return "ندارد"
      },
      width: "5rem",
    },
    {
      title: "تاریخ تایید",
      key: "solarDateDeliverOffice",
      dataIndex: "solarDateDeliverOffice",
      width: "5rem",
      hidden: params => props.matches_sm || params.projectLevel === 4,
    },
    {
      title: "وضعیت",
      key: "inspectionStatus",
      render: record => (
        <Tag color={record.inspectionStatus === 1 ? "green" : "red"}>
          {record.inspectionStatusName}
        </Tag>
      ),
      width: "6rem",
    },
  ].filter(item => !item.hidden)

import { ProjectFiles } from "./ProjectFiles"
import ProjectDetails from "./ProjectDetails"
import CommentEdit from "./CommentEdit"
import CheckListEdit from "./CheckListEdit"
import ErtFormEdit from "./ErtformEditNew"
import { EppApproved } from "./EppApproved"
import CheckListEdcEdit from "./CheckListEdcEdit"
import { UpdateByEdc } from "./UpdateByEdc"
import { ProjectProcess } from "./ProjectProcess"
import {
  CheckCircleFilled,
  CheckCircleTwoTone,
  FileTextOutlined,
  FolderOpenOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons"
import { Button, Collapse, Divider, Popconfirm, Space, Tag, Typography } from "antd"

const getStageColor = stageName => {
  if (!stageName) return "default"
  const title = String(stageName)
  if (title.includes("نقص")) return "volcano"
  if (title.includes("تایید")) return "green"
  return "blue"
}

const getInspectionStatusColor = status => {
  if (status === 1) return "success"
  if (status === 0) return "processing"
  if (status === 3) return "default"
  return "error"
}

export const renderEppApprovedButton = (params, { props }) => {
  return <EppApproved rowData={params} mainProps={props} />
}

export const renderProjectProcess = (row, { props }) => {
  return <ProjectProcess rowData={row} mainProps={props} />
}

export const renderFileButton = (params, { props }) => {
  return <ProjectFiles rowData={params} mainProps={props} />
}

export const renderDetailsButton = (params, { props }) => {
  return <ProjectDetails rowData={params} mainProps={props} />
}

export const renderRowNumber = (index, { pageIndex, pageSize }) => {
  return (pageIndex - 1) * pageSize + index + 1
}

export const renderEditCommentButton = (params, { props }) => {
  return params.projectLevel === 1 ? (
    <CommentEdit mainRowData={params} rowData={params.commentEngForm} mainProps={props} />
  ) : (
    <Typography.Text type="secondary">لازم ندارد</Typography.Text>
  )
}

export const renderAcceptedButton = (params, { props }) => {
  return !params.accepted ? (
    <Popconfirm
      title="قبول کردن پرونده"
      description="بعد از تایید فاکتور این پرونده برای شما صادر می شود و قابل برگشت نیست."
      onConfirm={() => props.onEppAccepted({ eppId: params.id })}
      okText="بله"
      cancelText="خیر"
    >
      <Button disabled={params.inspectionStatus !== 0} type="primary">
        قبول پرونده
      </Button>
    </Popconfirm>
  ) : (
    <Tag color="success">{`تاریخ: ${params.solarDateAccepted || "-"}`}</Tag>
  )
}

export const renderEditCheckListButton = (params, { props }) => {
  return params.projectLevel === 1 ? (
    <CheckListEdit mainRowData={params} rowData={params.checkListForms} mainProps={props} />
  ) : (
    <Typography.Text type="secondary">لازم ندارد</Typography.Text>
  )
}

export const renderEditCheckListEdcButton = (params, { props }) => {
  return (
    <CheckListEdcEdit
      mainRowData={params}
      rowData={params.checkListEdcs ? params.checkListEdcs : []}
      mainProps={props}
    />
  )
}

export const renderEditErtFormButton = (params, { props }) => {
  return params.projectLevel === 2 ? (
    <ErtFormEdit mainRowData={params} rowData={params.electProjectErtForm} mainProps={props} />
  ) : (
    <Typography.Text type="secondary">لازم ندارد</Typography.Text>
  )
}

export const renderUpdateByEngButton = (params, { props }) => {
  return <UpdateByEdc rowData={params} mainProps={props} />
}

const renderBalance = params => {
  if (+params.projectBalance >= 0) return <Tag color="green">0</Tag>

  return (
    <Space wrap>
      <Tag color="green">
        <a href={params.projectBalanceLinkForPay} target="_blank" rel="noreferrer">
          پرداخت مستقیم
        </a>
      </Tag>
      <Tag color="red">
        {`${Math.abs(params.projectBalance)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Tag>
    </Space>
  )
}

const renderMobileCard = (params, props) => {
  const facts = [
    { key: "owner", label: "مالک", value: params.landLordName || "-" },
    { key: "deliverDate", label: "تاریخ تخصیص", value: params.solarDateDeliverEngineer || "-" },
    { key: "approveDate", label: "تاریخ تایید", value: params.solarDateDeliverOffice || "-" },
    { key: "floor", label: "طبقه", value: params.numberOfFloor || "-" },
  ]

  const formRows = [
    {
      key: "form3",
      icon: <FileTextOutlined />,
      title: "فرم شماره 3",
      action: renderEditCommentButton(params, props),
    },
    {
      key: "checklist",
      icon: <CheckCircleFilled />,
      title: "چک لیست",
      action: renderEditCheckListButton(params, props),
    },
    {
      key: "edcReport",
      icon: <CheckCircleTwoTone twoToneColor="#1677ff" />,
      title: "گزارش شرکت توزیع",
      action: renderEditCheckListEdcButton(params, props),
    },
    {
      key: "ert",
      icon: <InfoCircleOutlined />,
      title: "شناسنامه ارت",
      action: renderEditErtFormButton(params, props),
    },
  ]

  const header = (
    <div className="eng-mobile-record__header">
      <div className="eng-mobile-record__headline">
        <Typography.Text strong className="eng-mobile-record__file">
          {`پرونده: ${params.fileNumber || "-"}`}
        </Typography.Text>
        <Space wrap size={[6, 6]}>
          <Tag color={getStageColor(params.projectLevelName)}>{params.projectLevelName || "-"}</Tag>
          <Tag color={getInspectionStatusColor(params.inspectionStatus)}>{params.inspectionStatusName || "-"}</Tag>
        </Space>
      </div>
      <div
        className="eng-mobile-record__header-action"
        onClick={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
      >
        {renderDetailsButton(params, props)}
      </div>
    </div>
  )

  const content = (
    <div className="eng-mobile-record__content">
      <div className="eng-mobile-record__section">
        <Typography.Text className="eng-mobile-record__section-title">عملیات اصلی</Typography.Text>
        <div className="eng-mobile-record__primary-actions">
          <div className="eng-mobile-record__action-slot">{renderAcceptedButton(params, props)}</div>
          <div className="eng-mobile-record__action-slot">{renderFileButton(params, props)}</div>
          <div className="eng-mobile-record__action-slot">{renderEppApprovedButton(params, props)}</div>
          <div className="eng-mobile-record__action-slot">{renderProjectProcess(params, props)}</div>
        </div>
      </div>

      <div className="eng-mobile-record__facts">
        {facts.map(item => (
          <div key={item.key} className="eng-mobile-record__fact-item">
            <span className="eng-mobile-record__fact-label">{item.label}</span>
            <span className="eng-mobile-record__fact-value">{item.value}</span>
          </div>
        ))}
      </div>

      <Divider style={{ margin: "2px 0 0" }} />

      <div className="eng-mobile-record__section">
        <Typography.Text className="eng-mobile-record__section-title">فرم ها و گزارش ها</Typography.Text>
        <div className="eng-mobile-record__form-list">
          {formRows.map((item, index) => (
            <div
              key={item.key}
              className={`eng-mobile-record__form-row ${
                index % 2 === 0 ? "eng-mobile-record__form-row--even" : "eng-mobile-record__form-row--odd"
              }`}
            >
              <div className="eng-mobile-record__form-head">
                <span className="eng-mobile-record__form-icon">{item.icon}</span>
                <Typography.Text className="eng-mobile-record__form-title">{item.title}</Typography.Text>
              </div>
              <div className="eng-mobile-record__form-action">{item.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="eng-mobile-record__section eng-mobile-record__section--footer">
        <div className="eng-mobile-record__defect">
          <span className="eng-mobile-record__form-label">
            <FolderOpenOutlined />
            <Typography.Text>نقص/رفع نقص</Typography.Text>
          </span>
          <Space wrap size={[6, 6]}>
            {renderUpdateByEngButton(params, props)}
            <Tag color={params.electProject?.isDefectEng ? "error" : "default"}>نقص</Tag>
            <Tag color={params.electProject?.solvedDefectEng ? "success" : "default"}>رفع نقص</Tag>
          </Space>
        </div>

        <div className="eng-mobile-record__balance">
          <Typography.Text className="eng-mobile-record__balance-label">بالانس پرونده</Typography.Text>
          {renderBalance(params)}
        </div>
      </div>
    </div>
  )

  return (
    <div className="eng-mobile-record">
      <Collapse ghost className="eng-mobile-record__collapse" expandIconPosition="end">
        <Collapse.Panel key={String(params?.id || params?.fileNumber || "mobile-row")} header={header}>
          {content}
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

export const projectColumnsAnt = props => {
  const cols = [
    {
      title: "#",
      key: "id",
      width: "3rem",
      hidden: props.matches_sm,
      render: (_id, _record, index) => <span className="eng-row-number">{renderRowNumber(index, props)}</span>,
    },
    {
      title: "اطلاعات پرونده",
      key: "allColumn",
      hidden: !props.matches_sm,
      render: params => renderMobileCard(params, props),
    },
    {
      title: "قبول کردن پرونده",
      key: "accepted",
      render: params => renderAcceptedButton(params, props),
      hidden: props.matches_sm,
      width: "8rem",
    },
    {
      title: "شماره پرونده",
      key: "fileNumber",
      render: params => renderDetailsButton(params, props),
      hidden: props.matches_sm,
      width: "8rem",
    },
    {
      title: "مرحله",
      key: "projectLevelName",
      render: row => <Tag color={getStageColor(row.projectLevelName)}>{row.projectLevelName || "-"}</Tag>,
      hidden: props.matches_sm,
      width: "7rem",
    },
    {
      title: "نقص/رفع نقص",
      key: "defectControls",
      hidden: props.matches_sm,
      width: "11rem",
      render: params => (
        <Space wrap>
          {renderUpdateByEngButton(params, props)}
          <Tag color={params.electProject?.isDefectEng ? "error" : "default"}>نقص</Tag>
          <Tag color={params.electProject?.solvedDefectEng ? "success" : "default"}>رفع نقص</Tag>
        </Space>
      ),
    },
    {
      title: "فرم شماره3",
      key: "commentEngForm",
      render: params => renderEditCommentButton(params, props),
      hidden: props.matches_sm,
      width: "6rem",
    },
    {
      title: "چک لیست",
      key: "checkListForm",
      render: params => renderEditCheckListButton(params, props),
      width: "6rem",
      hidden: props.matches_sm,
    },
    {
      title: "شناسنامه ارت",
      key: "ertform",
      render: params => renderEditErtFormButton(params, props),
      width: "6rem",
      hidden: props.matches_sm,
    },
    {
      title: "فایلها",
      key: "File",
      render: params => renderFileButton(params, props),
      hidden: props.matches_sm,
      width: "5.5rem",
    },
    {
      title: "اعلام نظر",
      key: "approve",
      render: params => renderEppApprovedButton(params, props),
      hidden: props.matches_sm,
      width: "7rem",
    },
    {
      title: "نظرکارشناس",
      key: "projectProcess",
      render: row => renderProjectProcess(row, props),
      width: "8rem",
      hidden: props.matches_sm,
    },
    {
      title: "بالانس پرونده",
      key: "projectBalance",
      render: params => renderBalance(params),
      width: "8rem",
      hidden: props.matches_sm,
    },
    {
      title: "وضعیت",
      key: "inspectionStatus",
      render: params => (
        <Tag color={params.inspectionStatus === 1 ? "success" : "error"}>{params.inspectionStatusName}</Tag>
      ),
      width: "6rem",
      hidden: props.matches_sm,
    },
    {
      title: "مالک",
      key: "landLordName",
      dataIndex: "landLordName",
      hidden: props.matches_sm,
      width: "7rem",
    },
    {
      title: "تاریخ تخصیص",
      key: "solarDateDeliverEngineer",
      dataIndex: "solarDateDeliverEngineer",
      hidden: props.matches_sm,
      width: "8rem",
    },
    {
      title: "طبقه",
      key: "numberOfFloor",
      dataIndex: "numberOfFloor",
      hidden: props.matches_sm,
      width: "5rem",
    },
    {
      title: "تاریخ تایید",
      key: "solarDateDeliverOffice",
      dataIndex: "solarDateDeliverOffice",
      hidden: props.matches_sm,
      width: "8rem",
    },
  ]

  return cols
    .filter(item => !item.hidden)
    .filter(item => props.filterColumn?.indexOf(item.title) === -1)
}

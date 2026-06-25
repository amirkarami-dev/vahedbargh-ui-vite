import { Tag, Tooltip, Typography, Space, Badge } from "antd"
import { withRouter, Link } from "react-router-dom"
import ClosedSupport from "./ClosedSupport"
import { EyeOutlined, PaperClipOutlined } from "@ant-design/icons"
import { SupportFiles } from "./SupportFiles"

export const renderTicketsButton = (params, { props }) => {
  const unread = Number(params.unreadMessageCount || 0)
  const link = (
    <Link to={`/support/${params.id}`} style={{ whiteSpace: "nowrap", color: "#1890ff" }}>
      <Space size={4}>
        <EyeOutlined /> {params.ticketNumber}
      </Space>
    </Link>
  )
  return unread > 0 ? (
    <Badge count={unread} overflowCount={99} size="small" offset={[6, 0]}>
      {link}
    </Badge>
  ) : (
    link
  )
}

export const renderClosedSupportButton = (params, { props }) => {
  return <ClosedSupport rowData={params} mainProps={props} />
}

export const renderFileButton = (row, { props, setErrorMessage }) => (
  <SupportFiles
    rowData={row}
    mainProps={props}
    setErrorMessage={setErrorMessage}
  />
)
export const columns = props =>
  [
    {
      title: "وضعیت",
      key: "closed",
      align: "center",
      render: record => (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <Tag color={record.closed ? "red" : "green"}>
            {record.closed ? "بسته" : "باز"}
          </Tag>
          <Tag color={record.isRead ? "green" : "red"}>
            {record.isRead ? "خوانده شده" : "خوانده نشده"}
          </Tag>
        </div>
      ),
      width: 70,
      hidden: false,
    },
    {
      title: "فایل",
      key: "File",
      align: "center",
      render: row => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.2 }}>
          {renderFileButton(row, props)}
          <Typography.Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>
            {row.fileNumber || "-"}
          </Typography.Text>
        </div>
      ),
      // preserve fileNumber filtering on this column
      filters: props.fileNumberFilter,
      filterSearch: true,
      onFilter: (value, record) => (record.fileNumber || "").toString().startsWith(value),
      width: 60,
    },
    //ticket number
    {
      title: "تیکت",
      key: "ticketNumber",
      sorter: (a, b) =>
        (a.ticketNumber || "").localeCompare(b.ticketNumber || ""),
      render: row => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.2 }}>
          {renderTicketsButton(row, props)}
          {row.solarCreate && (
            <Typography.Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>
              {row.solarCreate}
            </Typography.Text>
          )}
        </div>
      ),
      width: 70,
      hidden: false,
    },
    {
      title: "از طرف / به",
      key: "fromTo",
      width: 120,
      hidden: props.currentUser.role === "Engineer",
      render: row => (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <Tooltip title={`از طرف: ${row.name || "-"}`} placement="left">
            <Typography.Text style={{ color: "#1677ff" }} ellipsis>
              {row.name || "-"}
            </Typography.Text>
          </Tooltip>
          <Tooltip title={`به: ${row.toName || "-"}`} placement="left">
            <Typography.Text style={{ color: "#52c41a", marginTop: 4 }} ellipsis>
              {row.toName || "-"}
            </Typography.Text>
          </Tooltip>
        </div>
      ),
    },
    
  
    {
      title: "موضوع",
      key: "title",
      render: row => (
        <Tooltip title={row.title} placement="left">
          <Typography.Text
            strong={!row.isRead}
            style={{ color: row.isRead ? "#555" : "#1677ff" }}
            ellipsis
          >
            {row.title}
          </Typography.Text>
        </Tooltip>
      ),
      width: 320,
      hidden: false,
    },
  ].filter(f => f.hidden !== true)

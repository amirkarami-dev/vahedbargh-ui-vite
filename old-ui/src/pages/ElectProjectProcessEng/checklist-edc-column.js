import { DeleteOutlined, EditFilled } from "@ant-design/icons"
import { Button, Popconfirm, Space, Tag, Typography } from "antd"

export const renderEditButton = (params, { handleEdit, handleDelete }) => {
  if (!params.id) return null

  return (
    <Space wrap>
      <Button size="small" icon={<EditFilled />} onClick={() => handleEdit(params)} />
      <Popconfirm title="حذف آیتم" description="آیا مطمئن هستید؟" onConfirm={() => handleDelete(params)} okText="بله" cancelText="خیر">
        <Button size="small" danger icon={<DeleteOutlined />} />
      </Popconfirm>
      <Typography.Text type="secondary">{`تاریخ بازدید: ${params.solarChecked || "-"}`}</Typography.Text>
      <Typography.Text type="secondary">{`شرح: ${params.resultDes || "-"}`}</Typography.Text>
    </Space>
  )
}

export const ChecklistEdcColumns = props => [
  {
    title: "",
    key: "edit",
    width: "2rem",
  },
  {
    title: "شرح",
    key: "checkListEdcName",
    render: record => {
      if (record.children) {
        return <div dir="rtl">{record.groupByValue}</div>
      }
      return renderEditButton(record, props)
    },
  },
  {
    title: "وضعیت تایید",
    key: "isComplete",
    width: "8rem",
    render: record => {
      let isComplete = false
      if (record.children) {
        isComplete = record.children.findIndex(f => f.isComplete === true) !== -1
      } else {
        isComplete = record.isComplete
      }
      return <Tag color={isComplete ? "green" : "red"}>{isComplete ? "کامل شده" : "نقص دارد"}</Tag>
    },
  },
]

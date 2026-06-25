import { DeleteOutlined, EditFilled } from "@ant-design/icons"
import { Button, Popconfirm, Row, Space, Tag, Typography } from "antd"
import { findEnumLabelWithValue } from "helpers/utilities"
import BranchingTypeEnum from "models/types/BranchingTypeEnum"
import FazNumberEnum from "models/types/FazNumberEnum"

export const renderEditButton = (params, { handleEdit, handleDelete }) => {
  if (!params.id) return <Typography.Text type="secondary">مجموع کل</Typography.Text>

  return (
    <Space>
      <Button size="small" icon={<EditFilled />} onClick={() => handleEdit(params)} />
      <Popconfirm title="حذف آیتم" description="آیا مطمئن هستید؟" onConfirm={() => handleDelete(params)} okText="بله" cancelText="خیر">
        <Button size="small" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Space>
  )
}

export const CommentColumns = props => [
  {
    title: "ویرایش",
    key: "edit",
    width: "6rem",
    render: params => renderEditButton(params, props),
    fixed: "right",
  },
  {
    title: "نوع انشعاب",
    key: "branchingTypeName",
    width: "8rem",
    render: row => findEnumLabelWithValue(BranchingTypeEnum, row.branchingTypeEnum) || "-",
  },
  {
    title: "نوع کنتور",
    key: "fazNumberEnum",
    width: "8rem",
    render: row => findEnumLabelWithValue(FazNumberEnum, row.fazNumberEnum) || "-",
  },
  {
    title: "تعداد انشعاب",
    key: "branchingCount",
    dataIndex: "branchingCount",
    width: "7rem",
  },
  {
    title: "جریان مورد نیاز",
    key: "ampere",
    dataIndex: "ampere",
    width: "8rem",
  },
  {
    title: "توان مورد نیاز",
    key: "power",
    dataIndex: "power",
    width: "8rem",
  },
  {
    title: "مجموع توان مورد نیاز",
    key: "powerSum",
    dataIndex: "powerSum",
    width: "9rem",
  },
  {
    title: "توضیحات/شماره اشتراک/رمز رایانه/کنتور",
    key: "des",
    dataIndex: "des",
    width: "16rem",
    render: value => value || "-",
  },
]

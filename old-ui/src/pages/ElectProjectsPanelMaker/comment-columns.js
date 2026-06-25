import { EditFilled } from "@ant-design/icons"
import { Delete } from "@mui/icons-material"
import { Button, Col, Popconfirm, Row, Tag } from "antd"
import { findEnumLabelWithValue } from "helpers/utilities"
import { CityFromSection, GetCityWithSection } from "hooks/returnCityName"
import BranchingTypeEnum from "models/types/BranchingTypeEnum"
import FazNumberEnum from "models/types/FazNumberEnum"

export const renderEditButton = (
  params,
  { mainProps, handleEdit, handleDelete }
) => {
  return params.id ? (
    <Row gutter={[8]} justify={"end"}>
      <Col>
        <Button
          size="small"
          icon={<EditFilled />}
          onClick={() => handleEdit(params)}
        />
      </Col>
      <Col>
        <Popconfirm
          title="حذف آیتم"
          description="آیا مطمن هستید؟"
          onConfirm={() => handleDelete(params)}
          okText="Yes"
          cancelText="No"
        >
          <Button style={{ color: "red" }} size="small" icon={<Delete />} />
        </Popconfirm>
      </Col>
    </Row>
  ) : (
    "مجموع کل"
  )
}

export const CommentColumns = props => [
  //fileNumber


  {
    title: "نوع انشعاب",
    key: "branchingTypeName",
    width: "6rem",
    render: row =>
      findEnumLabelWithValue(BranchingTypeEnum, row.branchingTypeEnum),
  },
  {
    title: "نوع کنتور",
    key: "fazNumberEnum",
    width: "6rem",
    render: row => findEnumLabelWithValue(FazNumberEnum, row.fazNumberEnum),
  },
  {
    title: "تعداد انشعاب",
    key: "branchingCount",
    dataIndex: "branchingCount",
    width: "6rem",
  },
  {
    title: "جریان مورد نیاز",
    key: "ampere",
    width: "6rem",
    dataIndex: "ampere",
  },
  {
    title: "توان مورد نیاز",
    width: "6rem",
    key: "power",
    dataIndex: "power",
  },
  {
    width: "6rem",
    title: "مجموع توان مورد نیاز",
    key: "powerSum",
    dataIndex: "powerSum",
  },
  {
    title: "توضیحات ",
    key: "des",
    dataIndex: "des",
    width: "10rem",
  },
]

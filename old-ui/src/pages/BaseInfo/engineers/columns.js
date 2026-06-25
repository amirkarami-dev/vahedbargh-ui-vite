import { Button, Tag, Space, Tooltip } from "antd"
import { GetCityWithSection } from "hooks/returnCityName"
import EngHistoryEdit from "./EngHistoryEdit"
import { UserFiles } from "./user-files"
import {
  EditFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons"

// Boolean status tag: green + check when true, red + cross when false.
// Color is never the only signal (icon + label too) — accessibility.
const boolTag = (cond, label, key) => (
  <Tag
    key={key}
    color={cond ? "green" : "red"}
    icon={cond ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
  >
    {label}
  </Tag>
)

const hasFile = (row, code) => (row.engFiles || []).some(x => x.name === code)

export const renderEditEngHistoryButton = (params, { props }) => {
  return (
    <EngHistoryEdit
      mainRowData={params}
      rowData={params.engineerHistoryViewModel}
      mainProps={props}
    />
  )
}
export const renderEditButton = (params, { handleEdit }) => {
  return (
    <Button
      icon={<EditFilled />}
      size="small"
      type="primary"
      ghost
      block
      onClick={() => handleEdit(params)}
    >
      ویرایش کارشناس
    </Button>
  )
}
export const renderFileButton = (params, { props }) => {
  return <UserFiles rowData={params} mainProps={props} />
}

export const columns = props => [
  {
    title: "عملیات",
    key: "actions",
    width: 150,
    render: params => (
      <Space direction="vertical" size={4} style={{ width: "100%" }}>
        {renderEditButton(params, props)}
        {renderEditEngHistoryButton(params, props)}
        {renderFileButton(params, props)}
      </Space>
    ),
  },
  {
    title: "نام و نام خانوادگی",
    key: "fullName",
    width: 160,
    render: row => (
      <div className="cell-stack">
        <span className="cell-title">{row.fullName}</span>
        {row.idSection > 0 && (
          <span className="cell-sub">{GetCityWithSection(row.idSection)}</span>
        )}
      </div>
    ),
  },
  {
    title: <Tooltip title="مدارک آپلود شده">مدارک پایه</Tooltip>,
    key: "docsLicense",
    width: 130,
    render: row => (
      <Space size={[4, 4]} wrap>
        {boolTag(hasFile(row, "F3"), "پروانه", "f3")}
        {boolTag(hasFile(row, "F2"), "امضاء", "f2")}
      </Space>
    ),
  },
  {
    title: "مدارک مجوز",
    key: "docsCerts",
    width: 170,
    render: row => (
      <Space size={[4, 4]} wrap>
        {boolTag(hasFile(row, "F7"), "بازرسی", "f7")}
        {boolTag(hasFile(row, "F5"), "ارت", "f5")}
        {boolTag(hasFile(row, "F4"), "تست", "f4")}
        {boolTag(hasFile(row, "F6"), "فیبر", "f6")}
      </Space>
    ),
  },
  {
    title: "مجوزها",
    key: "permits",
    width: 170,
    render: row => (
      <Space size={[4, 4]} wrap>
        {boolTag(row.certOfInspection, "بازرسی", "ci")}
        {boolTag(row.certOfEarth, "ارت", "ce")}
        {boolTag(row.certOfTest, "تست", "ct")}
        {boolTag(row.certOfFiber, "فیبر", "cf")}
      </Space>
    ),
  },
  {
    title: "کاربری / پایه / موبایل",
    key: "userInfo",
    width: 200,
    render: row => (
      <Space size={[4, 4]} wrap>
        <Tag>{row.userName}</Tag>
        <Tag color="blue">{row.engineerGradeTypeName}</Tag>
        <Tag>{row.cellPhone}</Tag>
      </Space>
    ),
  },
  {
    title: "تیک ۱ درصد",
    key: "has1Percent",
    width: 110,
    render: row => boolTag(row.has1Percent, row.has1Percent ? "دارد" : "ندارد"),
  },
  {
    title: "افزایش درصدی",
    key: "hasQuarterIncrease",
    width: 120,
    render: row =>
      boolTag(
        row.hasQuarterIncrease,
        row.hasQuarterIncrease ? "دارد" : "ندارد"
      ),
  },
  {
    title: "عضویت / اعتبار",
    key: "membership",
    width: 220,
    render: record => (
      <Space size={[4, 4]} wrap>
        <Tag color={record.solarMembershipDate ? "green" : "red"}>
          {record.solarMembershipDate
            ? record.solarMembershipDate
            : "عضویت ندارد"}
        </Tag>
        <Tag color={record.expiredDateWork ? "red" : "green"}>
          {record.solarValidityDate}
        </Tag>
        {boolTag(!record.inactive, "وضعیت فعال", "active")}
        {boolTag(!record.bankAccountBlocked, "وضعیت حساب", "bank")}
      </Space>
    ),
  },
]

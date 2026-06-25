import { Tag, Tooltip, Typography } from "antd"



export const columns = props => [
  {
    title: "دریافت شده",
    key: "isReceive",
    render: record => (
      <Tag color={record.isReceive ?  "green": "red" }>
        {record.isReceive ? "بله" : "خیر"}
      </Tag>
    ),
    align: "center",
    width: 90,
  },
  {
    title: "ایجاد",
    key: "solarCreated",
    dataIndex: "solarCreated",
    width: 120,
    ellipsis: true,
  },
  {
    title: "از طرف",
    key: "name",
    dataIndex: "name",
    width: 120,
    ellipsis: true,
  },
  //Message
  {
    title: "متن پیام",
    key: "message",
    dataIndex: "message",
    render: text => (
      <Tooltip title={text} placement="left">
        <Typography.Text ellipsis>{text}</Typography.Text>
      </Tooltip>
    ),
    width: 320,
  },
  {
    title: "وضعیت ",
    key: "isSend",
    render: record => (
      <Tag color={record.isSend ?  "green": "red" }>
        {record.isSend ? "ارسال شده" : "در صف ارسال"}
      </Tag>
    ),
    align: "center",
    width: 110,
  }
]

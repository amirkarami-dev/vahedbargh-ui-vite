import { Tooltip } from "@mui/material"
import { CityFromSection } from "hooks/returnCityName"
import NumberFormat from "react-number-format"
import { Space,Row, Typography } from 'antd';
const { Text, Link } = Typography;


export const renderRowNumber = (index, { pageIndex, pageSize }) => {
  return (pageIndex - 1) * pageSize + index + 1
}

export const columnsClientGrid = props => [
  {
    title: "#",
    key: "id",
    render: (id, record, index) => renderRowNumber(index, props),
    width: "3rem",
  },
  {
    title: "مبلغ-ریال",
    key: "fullName",
    render: row => (
      <Text>{row.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
    ),
    width: "6rem",
  },
  {
    title: "تاریخ تراکنش",
    key: "solarCreated",
    render: row => (
      <Text>{row.solarCreated.substr(0,10)}</Text>
    ),
    width: "6rem",
  },
  {
    title: "شهرستان",
    key: "idCity",
    render: row => (
      <Text>{CityFromSection(row.idSection)}</Text>
    ),
    width: "5rem",
  },
  {
    title: "شماره پیگیری",
    key: "fullName",
    render: row => (
      <Text>{row.bankTransactionId}</Text>
    ),
    width: "10rem",
  },
  {
    title: "درگاه",
    key: "fullName",
    render: row => (
      <Text>{row.gatewayTypeName}</Text>
    ),
    width: "4rem",
  },
  {
    title: "واریز/برداشت",
    key: "transactionStatusName",
    render: row => (
      <Text>{row.transactionStatusName}</Text>
    ),
    width: "4rem",
  },
  {
    title: "مربوط به پرونده",
    key: "fileNumber",
    render: row => (
      <Text>{row.fileNumber}</Text>
    ),
    width: "6rem",
  },
  {
    title: "توضیحات",
    key: "des",
    render: row => (
      <Text>{row.des}</Text>
    ),
    width: "12rem",
  },

]

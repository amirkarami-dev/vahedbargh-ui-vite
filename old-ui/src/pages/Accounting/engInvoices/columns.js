import NumberFormat from "react-number-format"

export const columnsGrid = t => [

  {
    field: "amount",
    headerName: "مبلغ (ریال)",
    width: 130,
    renderCell: ({ row }) => {
      return (
        <NumberFormat
          displayType={"text"}
          value={row.amount}
          thousandSeparator={true}
        />
      )
    },
  },
  // {
  //   field: "transactionSolarCreated",
  //   headerName: "تاریخ تراکنش",
  //   width: 150,
  // },
  {
    field: "solarDateDeliverOffice",
    headerName: "تاریخ انجام و تحویل به واحد برق ",
    width: 210,
  },
  {
    field: "executorName",
    headerName: "مجری",
    width: 130,
  },
  {
    field: "fileNumber",
    headerName: "مربوط به پرونده",
  },
  {
    field: "transactionDes",
    headerName: "توضیحات",
    width: 180,
  },
]
